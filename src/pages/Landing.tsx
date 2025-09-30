import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Coins, Users, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pigeonMascot from '@/assets/pigeon-mascot.png';

export const Landing: React.FC = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Mock sign up - in real app would connect to auth system
    if (email && username) {
      localStorage.setItem('user', JSON.stringify({
        username,
        email,
        credits: 5 // Free starter credits
      }));
      navigate('/dashboard');
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: 'Pixel Art Cards',
      description: 'Collect beautiful retro-style trading cards with unique pixel art designs'
    },
    {
      icon: Coins,
      title: 'Pigeon Coins',
      description: 'Earn and spend our special currency to unlock rare collectibles'
    },
    {
      icon: Users,
      title: 'Trade & Share',
      description: 'Connect with other collectors to trade your duplicate cards'
    },
    {
      icon: Trophy,
      title: 'Rare Grails',
      description: 'Hunt for legendary grail cards with incredible rarity and value'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Mascot */}
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src={pigeonMascot}
                alt="PigeonHole Mascot"
                className="w-48 h-48 pixel-art animate-bounce-slow hover-lift"
              />
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold animate-glow">
                NEW!
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-gradient-primary leading-tight">
              PigeonHole
            </h1>
            <p className="text-2xl text-gradient-secondary font-semibold">
              Retro Gacha Collecting
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Step into the arcade and discover rare pixel art collectibles. 
              Spin the gacha machine, reveal stunning cards, and build your ultimate collection.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg"
                  className="bg-gradient-primary hover:bg-primary/90 arcade-button text-lg px-8 py-3 retro-border hover-glow"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Collecting
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-center text-gradient-primary">
                    Join PigeonHole
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose your collector name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    onClick={handleSignUp}
                    className="w-full bg-gradient-secondary hover:bg-secondary/90 arcade-button"
                    disabled={!email || !username}
                  >
                    Join the Adventure
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Start with 5 free Pigeon Coins!
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 arcade-button text-lg px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient-primary">
            Why Collectors Love PigeonHole
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 text-center hover-lift bg-card/50 border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/20 border border-primary/30">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">
            &copy; 2024 PigeonHole. Built with love for collectors.
          </p>
        </div>
      </footer>
    </div>
  );
};