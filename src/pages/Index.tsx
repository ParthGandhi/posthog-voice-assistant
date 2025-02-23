
import { Conversation } from "@/components/Conversation";
import VoiceInterface from "@/components/VoiceInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <VoiceInterface />
      <main className="flex flex-col items-center p-6 lg:p-12">
        <div className="w-full max-w-[1600px]">
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
