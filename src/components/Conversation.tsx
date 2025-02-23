
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';

export function Conversation() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>("https://us.posthog.com/shared/C26s9-2wLHmRJ4WmOd9i9czYefMB-Q?whitelabel&detailed");

  const conversation = useConversation({
    onConnect: () => {
      setIsConnected(true);
      setIsSpeaking(true);
    },
    onDisconnect: () => {
      setIsConnected(false);
      setIsSpeaking(false);
    },
    onMessage: (message) => console.log('Message:', message),
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
            setEmbedUrl(embed_url);
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
  }, [conversation]);

  const openDashboard = useCallback(() => {
    if (embedUrl) {
      window.open(embedUrl, '_blank', 'noopener,noreferrer');
    }
  }, [embedUrl]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full min-h-[600px] h-[calc(100vh-300px)]">
      <div className="w-full lg:w-[400px] h-[600px] lg:h-full shrink-0">
        <Card className="rounded-3xl h-full">
          <CardContent className="h-full flex flex-col justify-between p-6">
            <CardHeader className="p-0">
              <CardTitle className="text-center">
                {isConnected ? (
                  isSpeaking ? 'Agent is speaking' : 'Agent is listening'
                ) : (
                  'Disconnected'
                )}
              </CardTitle>
            </CardHeader>
            
            <div className="flex-1 flex items-center justify-center">
              <div 
                className={cn('orb w-[120px] h-[120px] lg:w-[160px] lg:h-[160px]',
                  isSpeaking ? 'animate-orb' : (conversation && 'animate-orb-slow'),
                  isConnected ? 'orb-active' : 'orb-inactive'
                )}
              />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <Button
                variant="outline"
                className="rounded-full w-full"
                size="lg"
                disabled={conversation !== null && isConnected}
                onClick={startConversation}
              >
                Start conversation
              </Button>
              <Button
                variant="outline"
                className="rounded-full w-full"
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

      {embedUrl && (
        <div className="w-full flex-1 h-[calc(100vh-300px-600px-1.5rem)] lg:h-full flex flex-col">
          <Button
            variant="outline"
            className="rounded-full w-fit mx-auto mb-4"
            size="lg"
            onClick={openDashboard}
          >
            Open Dashboard in New Tab
          </Button>
          
          <div className="flex-1 w-full h-0 rounded-3xl overflow-hidden border border-border">
            <iframe 
              src={embedUrl}
              width="100%" 
              height="100%" 
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
