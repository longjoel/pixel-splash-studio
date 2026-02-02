export const openImageFilePicker = () =>
  new Promise<File | null>((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.position = 'fixed';
    input.style.left = '-1000px';
    input.style.opacity = '0';
    input.setAttribute('aria-hidden', 'true');
    let settled = false;
    const cleanup = () => {
      if (input.isConnected) {
        input.remove();
      }
      window.removeEventListener('focus', handleWindowFocus);
    };
    const finalize = (file: File | null) => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      resolve(file);
    };
    const handleWindowFocus = () => {
      window.setTimeout(() => {
        if (settled) {
          return;
        }
        if (!input.files?.length) {
          finalize(null);
        }
      }, 0);
    };
    input.addEventListener('change', () => {
      const file = input.files?.[0] ?? null;
      finalize(file);
    });
    window.addEventListener('focus', handleWindowFocus);
    document.body.appendChild(input);
    input.click();
  });

