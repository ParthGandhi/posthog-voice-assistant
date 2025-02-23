
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom';
import { useVoiceStore } from '@/lib/store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Settings = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useVoiceStore();

  const voices = [
    { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah' },
    { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam' },
    { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte' },
  ];

  const languages = [
    { id: 'en', name: 'English' },
    { id: 'es', name: 'Spanish' },
    { id: 'fr', name: 'French' },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Voice Settings</h2>
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-medium">Voice</label>
                <Select
                  value={settings.voiceId}
                  onValueChange={(value) => updateSettings({ voiceId: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id}>
                        {voice.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Language</label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => updateSettings({ language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.id} value={lang.id}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Volume</label>
                <Slider
                  value={[settings.volume]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={([value]) => updateSettings({ volume: value })}
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Speech Rate</label>
                <Slider
                  value={[settings.speechRate]}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onValueChange={([value]) => updateSettings({ speechRate: value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
