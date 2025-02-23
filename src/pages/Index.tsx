import VoiceInterface from '@/components/VoiceInterface';
import { Conversation } from "@/components/Conversation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold mb-8 text-center">
            ElevenLabs Conversational AI
          </h1>
          <Conversation />
        </div>
      </main>
    </div>
  );
};

export default Index;
