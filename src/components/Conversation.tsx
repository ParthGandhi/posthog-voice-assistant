'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';

export function Conversation() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

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
              window.open(embed_url, '_blank', 'noopener,noreferrer');
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
    window.open('https://us.posthog.com/embedded/C26s9-2wLHmRJ4WmOd9i9czYefMB-Q?whitelabel&detailed', '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div className="flex flex-col items-center gap-y-8 w-full">
      <div className="flex justify-center w-full">
        <Card className="rounded-3xl">
          <CardContent>
            <CardHeader>
              <CardTitle className="text-center">
                {isConnected ? (
                  isSpeaking ? 'Agent is speaking' : 'Agent is listening'
                ) : (
                  'Disconnected'
                )}
              </CardTitle>
            </CardHeader>
            <div className="flex flex-col gap-y-4 text-center">
              <div 
                className={cn('orb my-16 mx-12',
                  isSpeaking ? 'animate-orb' : (conversation && 'animate-orb-slow'),
                  isConnected ? 'orb-active' : 'orb-inactive'
                )}
              />
              <Button
                variant="outline"
                className="rounded-full"
                size="lg"
                disabled={conversation !== null && isConnected}
                onClick={startConversation}
              >
                Start conversation
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
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

      <div className="w-full flex flex-col gap-y-4">
        <Button
          variant="outline"
          className="rounded-full w-fit mx-auto"
          size="lg"
          onClick={openDashboard}
        >
          Open Dashboard in New Tab
        </Button>
        
        <iframe 
          src="https://us.posthog.com/embedded/C26s9-2wLHmRJ4WmOd9i9czYefMB-Q?whitelabel&detailed"
          width="100%" 
          height="400" 
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
} 