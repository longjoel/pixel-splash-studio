import { create } from 'zustand';

type RecordingState = {
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
};

export const useRecordingStore = create<RecordingState>((set) => ({
  isRecording: false,
  setIsRecording: (recording) => set({ isRecording: recording }),
}));
