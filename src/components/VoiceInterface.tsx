
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const VoiceInterface = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center p-4">
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
      
      <elevenlabs-convai 
        agent-id="GUJNhApgKgFtYc6ZUvgM"
        className="w-full max-w-2xl h-[600px] rounded-lg shadow-lg"
      ></elevenlabs-convai>
    </div>
  );
};

export default VoiceInterface;
