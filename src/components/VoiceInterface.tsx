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
    <div className="relative flex flex-col items-center justify-center">
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
      
    </div>
  );
};

export default VoiceInterface;
