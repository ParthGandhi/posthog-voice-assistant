
import { create } from 'zustand';

interface VoiceSettings {
  voiceId: string;
  volume: number;
  speechRate: number;
  language: string;
}

interface VoiceStore {
  settings: VoiceSettings;
  updateSettings: (settings: Partial<VoiceSettings>) => void;
}

export const useVoiceStore = create<VoiceStore>((set) => ({
  settings: {
    voiceId: "EXAVITQu4vr4xnSDxMaL", // Sarah voice
    volume: 1.0,
    speechRate: 1.0,
    language: "en",
  },
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));
