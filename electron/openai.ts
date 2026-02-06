import { getOpenAiApiKey, getOpenAiImageModel } from './settings';

type GenerateSpriteRequest = {
  prompt: string;
  palette: string[];
  cellWidth: number;
  cellHeight: number;
  columns: number;
  rows: number;
  referencePngBase64: string | null;
};

type OpenAiImageResponse = {
  data?: Array<{ b64_json?: string; revised_prompt?: string }>;
};

const OPENAI_API_BASE = 'https://api.openai.com/v1';

const buildSystemPrompt = (req: GenerateSpriteRequest) => {
  const totalWidth = req.cellWidth * req.columns;
  const totalHeight = req.cellHeight * req.rows;
  const palette = req.palette.filter((c) => typeof c === 'string' && c.trim()).join(', ');

  return [
    req.prompt.trim(),
    '',
    `Create a pixel art sprite sheet.`,
    `Grid: ${req.columns} columns × ${req.rows} rows.`,
    `Cell size: ${req.cellWidth}×${req.cellHeight} pixels.`,
    `Total size: ${totalWidth}×${totalHeight} pixels.`,
    `Transparent background.`,
    `Use ONLY this palette (hex): ${palette}`,
    `No anti-aliasing. Crisp pixel edges.`,
    `No extra padding or margins.`,
  ].join('\n');
};

const decodeBase64 = (value: string) => Buffer.from(value, 'base64');

export const generateSprite = async (
  req: GenerateSpriteRequest
): Promise<{ pngBase64: string; revisedPrompt?: string }> => {
  const apiKey = process.env.OPENAI_API_KEY?.trim() || (await getOpenAiApiKey());
  if (!apiKey) {
    throw new Error('OpenAI API key not set. Open Options → OpenAI…');
  }

  const model = await getOpenAiImageModel();
  const prompt = buildSystemPrompt(req);

  // Use image edits when a reference image is provided, otherwise use generations.
  if (req.referencePngBase64) {
    const form = new FormData();
    form.set('model', model);
    form.set('prompt', prompt);
    form.set('background', 'transparent');
    form.set('size', '1024x1024');
    form.append(
      'image[]',
      new Blob([decodeBase64(req.referencePngBase64)], { type: 'image/png' }),
      'reference.png'
    );

    const response = await fetch(`${OPENAI_API_BASE}/images/edits`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`OpenAI image edit failed (${response.status}): ${text || response.statusText}`);
    }
    const json = (await response.json()) as OpenAiImageResponse;
    const first = json.data?.[0];
    const b64 = first?.b64_json;
    if (!b64) {
      throw new Error('OpenAI image edit returned no image.');
    }
    return { pngBase64: b64, revisedPrompt: first?.revised_prompt };
  }

  const response = await fetch(`${OPENAI_API_BASE}/images/generations`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      prompt,
      size: '1024x1024',
      background: 'transparent',
    }),
  });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `OpenAI image generation failed (${response.status}): ${text || response.statusText}`
    );
  }
  const json = (await response.json()) as OpenAiImageResponse;
  const first = json.data?.[0];
  const b64 = first?.b64_json;
  if (!b64) {
    throw new Error('OpenAI image generation returned no image.');
  }
  return { pngBase64: b64, revisedPrompt: first?.revised_prompt };
};
