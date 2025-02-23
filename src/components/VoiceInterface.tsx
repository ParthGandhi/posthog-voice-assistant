
import { useState, useEffect } from 'react';
import { useVoiceStore } from '@/lib/store';

const VoiceInterface = () => {
  const { settings, updateSettings } = useVoiceStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedVoiceId = localStorage.getItem('selectedVoice');
      if (storedVoiceId) {
        updateSettings({ voiceId: storedVoiceId });
      }
    }
  }, [updateSettings]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      
    </div>
  );
};

export default VoiceInterface;
