import React from 'react';
import { Button } from '@/pigeonhole/components/ui/button';
import { Coins, User } from 'lucide-react';
import pigeonLogo from '@/pigeonhole/assets/pigeon-logo.png';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img 
            src={pigeonLogo}
            alt="PigeonHole Logo"
            className="w-6 h-6"
          />
          <h1 className="text-lg font-semibold text-foreground">
            PigeonHole
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {username ? (
            <>
              {/* Credits Display */}
              <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                <Coins className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm font-medium">{credits}</span>
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{username}</span>
              </div>
            </>
          ) : (
            <Button 
              onClick={onSignIn}
              size="sm"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};