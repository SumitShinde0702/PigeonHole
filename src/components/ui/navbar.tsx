import React from 'react';
import { Button } from '@/components/ui/button';
import { Coins, User, Home } from 'lucide-react';
import pigeonLogo from '@/assets/pigeon-logo.png';

interface NavbarProps {
  credits?: number;
  username?: string;
  onSignIn?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  credits = 0, 
  username, 
  onSignIn 
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src={pigeonLogo}
            alt="PigeonHole Logo"
            className="w-8 h-8 pixel-art animate-bounce-slow"
          />
          <h1 className="text-xl font-bold text-gradient-primary">
            PigeonHole
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          {username ? (
            <>
              {/* Credits Display */}
              <div className="flex items-center gap-2 bg-secondary/20 px-3 py-1 rounded-lg border border-secondary/30">
                <Coins className="w-4 h-4 text-secondary" />
                <span className="text-secondary font-semibold">{credits}</span>
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-lg border border-primary/30">
                <User className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium">{username}</span>
              </div>
            </>
          ) : (
            <Button 
              onClick={onSignIn}
              variant="default"
              className="bg-gradient-primary hover:bg-primary/90 arcade-button"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};