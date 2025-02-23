import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Settings } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useVoiceStore } from '@/lib/store';
import { supabase } from "@/integrations/supabase/client";
import { LogOut } from "lucide-react";

const VoiceInterface = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { settings, updateSettings } = useVoiceStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedVoiceId = localStorage.getItem('selectedVoice');
      if (storedVoiceId) {
        updateSettings({ voiceId: storedVoiceId });
      }
    }
  }, [updateSettings]);

  const handleSpeak = () => {
    if (!text.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter some text to speak.',
        variant: 'destructive',
      });
      return;
    }

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis
      .getVoices()
      .find((voice) => voice.voiceURI === settings.voiceId) || null;
    utterance.volume = settings.volume;
    utterance.rate = settings.speechRate;
    utterance.lang = settings.language;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      toast({
        title: 'Error',
        description: 'Failed to speak the text.',
        variant: 'destructive',
      });
    };

    speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out",
      });
    }
  };

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="hover:bg-accent"
        >
          <LogOut className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/settings')}
          className="hover:bg-accent"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <Input
        type="text"
        placeholder="Enter text to speak"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full max-w-md mb-4"
      />
      <div className="flex gap-2">
        <Button
          onClick={handleSpeak}
          disabled={isSpeaking}
        >
          {isSpeaking ? 'Speaking...' : 'Speak'}
        </Button>
        <Button
          variant="secondary"
          onClick={handleStop}
          disabled={!isSpeaking}
        >
          Stop
        </Button>
      </div>
    </div>
  );
};

export default VoiceInterface;
