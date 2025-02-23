'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useConversation } from '@11labs/react';
import { AlertCircle, Search } from "lucide-react";
import { useCallback, useState } from 'react';

export function Conversation() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      setIsConnected(true);
      setIsSpeaking(true);
    },
    onDisconnect: () => {
      setIsConnected(false);
      setIsSpeaking(false);
    },
    onMessage: (message) => {
      console.log('Message:', message);
      if (message.source === 'user') {
        console.log('Setting embedUrl to null');
        setEmbedUrl(null);
        setHasError(false);
      }
    },
    onError: (error) => console.error('Error:', error),
    onModeChange: ({mode}) => {
      setIsSpeaking(mode === 'speaking');
    },
  });

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: 'jpUm5UqpTnR1MFlJHtdV',
        clientTools: {
          embed_url_in_display: async ({embed_url}) => {
            console.log(embed_url);
            if (!embed_url || embed_url.trim() === '') {
              setHasError(true);
              setEmbedUrl(null);
            } else {
              setHasError(false);
              setEmbedUrl(embed_url);
            }
          }
        },
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      alert('No permission');
    }
  }, [conversation]);

  const endConversation = useCallback(async () => {
    if (!conversation) return;
    await conversation.endSession();
    setHasError(false);
  }, [conversation]);

  const openDashboard = useCallback(() => {
    if (embedUrl) {
      window.open(embedUrl, '_blank', 'noopener,noreferrer');
    }
  }, [embedUrl]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full min-h-[600px] h-[calc(100vh-300px)]">
      <div className="w-full lg:w-[400px] h-[600px] lg:h-full shrink-0">
        <Card className="rounded-3xl h-full border-[#D0D1C9] shadow-lg transition-all duration-200 hover:shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="h-full flex flex-col justify-between p-6">
            <CardHeader className="p-0">
              <CardTitle className="text-center flex items-center justify-center gap-2 text-[#151515]/90">
                <div className={cn(
                  "w-2 h-2 rounded-full transition-colors duration-300",
                  isConnected ? (isSpeaking ? "bg-[#F54E00]" : "bg-[#1D4AFF]") : "bg-[#BFBFBC]"
                )} />
                {isConnected ? (
                  isSpeaking ? 'Agent is speaking' : 'Agent is listening'
                ) : (
                  'Disconnected'
                )}
              </CardTitle>
            </CardHeader>
            
            <div className="flex-1 flex items-center justify-center">
              <div 
                className={cn(
                  'orb w-[120px] h-[120px] lg:w-[160px] lg:h-[160px] transition-all duration-300',
                  isSpeaking ? 'animate-orb' : (conversation && 'animate-orb-slow'),
                  isConnected ? 'orb-active shadow-glow' : 'orb-inactive'
                )}
              />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <Button
                variant="outline"
                className={cn(
                  "rounded-full w-full border-2 transition-all duration-200",
                  !isConnected && "border-[#1D4AFF] text-[#1D4AFF] hover:bg-[#1D4AFF] hover:text-white"
                )}
                size="lg"
                disabled={conversation !== null && isConnected}
                onClick={startConversation}
              >
                Start conversation
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "rounded-full w-full border-2 transition-all duration-200",
                  isConnected && "border-[#F54E00] text-[#F54E00] hover:bg-[#F54E00] hover:text-white"
                )}
                size="lg"
                disabled={conversation === null && !isConnected}
                onClick={endConversation}
              >
                End conversation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full flex-1 h-[calc(100vh-300px-600px-1.5rem)] lg:h-full flex flex-col">
        {embedUrl ? (
          <>
            <div className="flex-1 w-full h-0 rounded-3xl overflow-hidden border border-[#D0D1C9] bg-white/80 backdrop-blur-sm">
              <iframe 
                src={embedUrl}
                width="100%" 
                height="100%" 
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            
            <Button
              variant="outline"
              className="rounded-full w-fit mx-auto mt-4 border-2 border-[#DC9300] text-[#DC9300] hover:bg-[#DC9300] hover:text-white transition-all duration-200"
              size="lg"
              onClick={openDashboard}
            >
              Open Dashboard in New Tab
            </Button>
          </>
        ) : (
          <div className="flex-1 w-full rounded-3xl border border-[#D0D1C9] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
            {hasError ? (
              <>
                <AlertCircle className="w-16 h-16 text-[#F54E00]" />
                <p className="text-[#151515]/90 mt-4 font-medium">Dashboard cannot be displayed</p>
              </>
            ) : (
              <Search className="w-16 h-16 text-[#BFBFBC]" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
