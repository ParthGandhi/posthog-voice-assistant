
import { Conversation } from "@/components/Conversation";
import VoiceInterface from "@/components/VoiceInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#EEEFE9]">
      <VoiceInterface />
      <main className="flex flex-col items-center p-6 lg:p-12">
        <div className="w-full max-w-[1600px] space-y-6">
          <header className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-[#151515]/90 flex items-center justify-center gap-3">
              <img 
                src="/lovable-uploads/f4c7fe3a-ab81-4ed8-b86c-6d809689606d.png" 
                alt="PostHog Logo" 
                className="h-8 w-auto"
              />
              Talk to your analytics
            </h1>
            <p className="text-lg text-[#151515]/70 max-w-2xl mx-auto">
              Interact with our AI assistant using voice commands to analyze your data
            </p>
            <div className="h-px w-full max-w-md mx-auto bg-[#D0D1C9]" />
          </header>
          <Conversation />
        </div>
      </main>
    </div>
  );
};

export default Index;
