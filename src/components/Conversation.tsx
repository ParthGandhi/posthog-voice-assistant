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
        agentId: 'GUJNhApgKgFtYc6ZUvgM',
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

  return (
    <div className="flex justify-center items-center gap-x-4">
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
  );
} 