
import { useState, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Mic, MicOff, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useVoiceStore } from '@/lib/store';
import { useNavigate } from 'react-router-dom';
import { toast } from './ui/use-toast';

const VoiceInterface = () => {
  const [isListening, setIsListening] = useState(false);
  const { settings } = useVoiceStore();
  const navigate = useNavigate();
  
  const conversation = useConversation({
    overrides: {
      tts: {
        voiceId: settings.voiceId,
      },
      agent: {
        language: settings.language,
      },
    },
    onMessage: (message) => {
      if (message.type === 'error') {
        toast({
          variant: "destructive",
          title: "Error",
          description: message.content,
        });
      }
    },
  });

  const toggleListening = async () => {
    try {
      if (!isListening) {
        await conversation.startSession({
          agentId: "your-agent-id", // Replace with your agent ID
        });
        setIsListening(true);
      } else {
        await conversation.endSession();
        setIsListening(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to toggle voice input",
      });
    }
  };

  useEffect(() => {
    return () => {
      conversation.endSession();
    };
  }, []);

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/settings')}
          className="hover:bg-accent"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="w-full max-w-md p-8 backdrop-blur-sm bg-white/10 rounded-2xl shadow-lg border border-white/20">
        <div className="flex flex-col items-center space-y-8">
          <div className={`transition-transform duration-300 ${isListening ? 'scale-110' : 'scale-100'}`}>
            <Button
              size="lg"
              className={`h-24 w-24 rounded-full transition-colors ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-primary hover:bg-primary/90'
              }`}
              onClick={toggleListening}
            >
              {isListening ? (
                <MicOff className="h-10 w-10" />
              ) : (
                <Mic className="h-10 w-10" />
              )}
            </Button>
          </div>
          
          <p className="text-xl font-light text-center">
            {isListening ? "I'm listening..." : "Click to start"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
