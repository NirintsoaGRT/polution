import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SunMoon } from "lucide-react";
import { useTheme } from "@/ThemeContext";

const Swhits: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex space-x-3 ">
      <Label htmlFor="airplane-mode">
        <SunMoon size={32} className="cursor-pointer" />
      </Label>
      <Switch 
        id="airplane-mode" 
        checked={darkMode} 
        onCheckedChange={toggleDarkMode} 
        className="mt-1" 
      />
    </div>
  );
};

export default Swhits;
