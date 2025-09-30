import { HoleSet, CardPool } from '@/types/hole-sets';

// Cyberpunk Theme Cards
const cyberpunkCards: CardPool = {
  common: [
    {
      id: 'cyber-pigeon-1',
      name: 'Neon Pigeon',
      image: '/placeholder.svg',
      description: 'A cyberpunk pigeon with glowing neon feathers.',
      theme: 'cyberpunk',
      rarity: 'common',
      estimatedValue: 5
    },
    {
      id: 'cyber-pigeon-2',
      name: 'Circuit Breaker',
      image: '/placeholder.svg',
      description: 'A pigeon with electric circuits running through its wings.',
      theme: 'cyberpunk',
      rarity: 'common',
      estimatedValue: 8
    },
    {
      id: 'cyber-pigeon-3',
      name: 'Data Courier',
      image: '/placeholder.svg',
      description: 'A pigeon that carries digital messages across the net.',
      theme: 'cyberpunk',
      rarity: 'common',
      estimatedValue: 6
    }
  ],
  rare: [
    {
      id: 'cyber-pigeon-4',
      name: 'Hologram Pigeon',
      image: '/placeholder.svg',
      description: 'A shimmering holographic pigeon from the future.',
      theme: 'cyberpunk',
      rarity: 'rare',
      estimatedValue: 25
    },
    {
      id: 'cyber-pigeon-5',
      name: 'Quantum Messenger',
      image: '/placeholder.svg',
      description: 'A pigeon that exists in multiple dimensions simultaneously.',
      theme: 'cyberpunk',
      rarity: 'rare',
      estimatedValue: 30
    }
  ],
  epic: [
    {
      id: 'cyber-pigeon-6',
      name: 'Neural Network',
      image: '/placeholder.svg',
      description: 'A pigeon with advanced AI consciousness.',
      theme: 'cyberpunk',
      rarity: 'epic',
      estimatedValue: 75
    },
    {
      id: 'cyber-pigeon-7',
      name: 'Cyber Ghost',
      image: '/placeholder.svg',
      description: 'A phantom pigeon that exists only in cyberspace.',
      theme: 'cyberpunk',
      rarity: 'epic',
      estimatedValue: 85
    }
  ],
  legendary: [
    {
      id: 'cyber-pigeon-8',
      name: 'AI Overlord',
      image: '/placeholder.svg',
      description: 'The legendary AI pigeon that rules the digital realm.',
      theme: 'cyberpunk',
      rarity: 'legendary',
      estimatedValue: 200
    }
  ]
};

// Fantasy Theme Cards
const fantasyCards: CardPool = {
  common: [
    {
      id: 'fantasy-pigeon-1',
      name: 'Forest Guardian',
      image: '/placeholder.svg',
      description: 'A mystical pigeon protector of ancient forests.',
      theme: 'fantasy',
      rarity: 'common',
      estimatedValue: 5
    },
    {
      id: 'fantasy-pigeon-2',
      name: 'Crystal Carrier',
      image: '/placeholder.svg',
      description: 'A pigeon that carries magical crystals in its beak.',
      theme: 'fantasy',
      rarity: 'common',
      estimatedValue: 7
    },
    {
      id: 'fantasy-pigeon-3',
      name: 'Wind Whisperer',
      image: '/placeholder.svg',
      description: 'A pigeon that speaks the language of the wind.',
      theme: 'fantasy',
      rarity: 'common',
      estimatedValue: 6
    }
  ],
  rare: [
    {
      id: 'fantasy-pigeon-4',
      name: 'Dragon Rider',
      image: '/placeholder.svg',
      description: 'A brave pigeon that rides alongside dragons.',
      theme: 'fantasy',
      rarity: 'rare',
      estimatedValue: 28
    },
    {
      id: 'fantasy-pigeon-5',
      name: 'Phoenix Feather',
      image: '/placeholder.svg',
      description: 'A pigeon blessed with phoenix-like immortality.',
      theme: 'fantasy',
      rarity: 'rare',
      estimatedValue: 32
    }
  ],
  epic: [
    {
      id: 'fantasy-pigeon-6',
      name: 'Mystic Oracle',
      image: '/placeholder.svg',
      description: 'A pigeon that can see into the future.',
      theme: 'fantasy',
      rarity: 'epic',
      estimatedValue: 80
    },
    {
      id: 'fantasy-pigeon-7',
      name: 'Elemental Master',
      image: '/placeholder.svg',
      description: 'A pigeon that controls all four elements.',
      theme: 'fantasy',
      rarity: 'epic',
      estimatedValue: 90
    }
  ],
  legendary: [
    {
      id: 'fantasy-pigeon-8',
      name: 'World Tree Keeper',
      image: '/placeholder.svg',
      description: 'The ancient pigeon guardian of the mystical World Tree.',
      theme: 'fantasy',
      rarity: 'legendary',
      estimatedValue: 250
    }
  ]
};

// Retro Arcade Theme Cards
const retroCards: CardPool = {
  common: [
    {
      id: 'retro-pigeon-1',
      name: 'Pixel Pigeon',
      image: '/placeholder.svg',
      description: 'A classic 8-bit pigeon from the golden age of gaming.',
      theme: 'retro',
      rarity: 'common',
      estimatedValue: 4
    },
    {
      id: 'retro-pigeon-2',
      name: 'Arcade Champion',
      image: '/placeholder.svg',
      description: 'A pigeon that mastered every arcade game.',
      theme: 'retro',
      rarity: 'common',
      estimatedValue: 6
    },
    {
      id: 'retro-pigeon-3',
      name: 'High Score Hero',
      image: '/placeholder.svg',
      description: 'A pigeon known for setting unbeatable high scores.',
      theme: 'retro',
      rarity: 'common',
      estimatedValue: 5
    }
  ],
  rare: [
    {
      id: 'retro-pigeon-4',
      name: 'Game Over Guardian',
      image: '/placeholder.svg',
      description: 'A pigeon that appears when games end.',
      theme: 'retro',
      rarity: 'rare',
      estimatedValue: 22
    },
    {
      id: 'retro-pigeon-5',
      name: 'Continue Coin',
      image: '/placeholder.svg',
      description: 'A pigeon that grants extra lives to players.',
      theme: 'retro',
      rarity: 'rare',
      estimatedValue: 26
    }
  ],
  epic: [
    {
      id: 'retro-pigeon-6',
      name: 'Retro Legend',
      image: '/placeholder.svg',
      description: 'A pigeon that transcends all retro games.',
      theme: 'retro',
      rarity: 'epic',
      estimatedValue: 70
    },
    {
      id: 'retro-pigeon-7',
      name: 'Arcade Master',
      image: '/placeholder.svg',
      description: 'The ultimate retro gaming pigeon champion.',
      theme: 'retro',
      rarity: 'epic',
      estimatedValue: 75
    }
  ],
  legendary: [
    {
      id: 'retro-pigeon-8',
      name: 'Final Boss',
      image: '/placeholder.svg',
      description: 'The ultimate pigeon boss of all arcade games.',
      theme: 'retro',
      rarity: 'legendary',
      estimatedValue: 180
    }
  ]
};

// Space Theme Cards
const spaceCards: CardPool = {
  common: [
    {
      id: 'space-pigeon-1',
      name: 'Cosmic Courier',
      image: '/placeholder.svg',
      description: 'A pigeon that delivers messages across galaxies.',
      theme: 'space',
      rarity: 'common',
      estimatedValue: 6
    },
    {
      id: 'space-pigeon-2',
      name: 'Asteroid Navigator',
      image: '/placeholder.svg',
      description: 'A pigeon skilled at navigating asteroid fields.',
      theme: 'space',
      rarity: 'common',
      estimatedValue: 7
    },
    {
      id: 'space-pigeon-3',
      name: 'Stellar Scout',
      image: '/placeholder.svg',
      description: 'A pigeon that explores distant star systems.',
      theme: 'space',
      rarity: 'common',
      estimatedValue: 5
    }
  ],
  rare: [
    {
      id: 'space-pigeon-4',
      name: 'Black Hole Diver',
      image: '/placeholder.svg',
      description: 'A pigeon that can escape from black holes.',
      theme: 'space',
      rarity: 'rare',
      estimatedValue: 30
    },
    {
      id: 'space-pigeon-5',
      name: 'Nebula Navigator',
      image: '/placeholder.svg',
      description: 'A pigeon that guides ships through colorful nebulas.',
      theme: 'space',
      rarity: 'rare',
      estimatedValue: 28
    }
  ],
  epic: [
    {
      id: 'space-pigeon-6',
      name: 'Wormhole Walker',
      image: '/placeholder.svg',
      description: 'A pigeon that travels through space-time tunnels.',
      theme: 'space',
      rarity: 'epic',
      estimatedValue: 85
    },
    {
      id: 'space-pigeon-7',
      name: 'Cosmic Guardian',
      image: '/placeholder.svg',
      description: 'A pigeon that protects entire solar systems.',
      theme: 'space',
      rarity: 'epic',
      estimatedValue: 90
    }
  ],
  legendary: [
    {
      id: 'space-pigeon-8',
      name: 'Galaxy Guardian',
      image: '/placeholder.svg',
      description: 'The legendary pigeon protector of entire galaxies.',
      theme: 'space',
      rarity: 'legendary',
      estimatedValue: 220
    }
  ]
};

export const holeSets: HoleSet[] = [
  {
    id: 'cyberpunk-set',
    name: 'Cyberpunk Collection',
    description: 'Neon-lit pigeons from the digital future',
    theme: 'cyberpunk',
    image: '/placeholder.svg',
    totalHoles: 24,
    openedHoles: [],
    costPerHole: 1,
    discountMultiplier: 0.8,
    cardPool: cyberpunkCards,
    isActive: true,
    releaseDate: '2024-01-01'
  },
  {
    id: 'fantasy-set',
    name: 'Mystical Realms',
    description: 'Magical pigeons from enchanted forests',
    theme: 'fantasy',
    image: '/placeholder.svg',
    totalHoles: 24,
    openedHoles: [],
    costPerHole: 1,
    discountMultiplier: 0.8,
    cardPool: fantasyCards,
    isActive: true,
    releaseDate: '2024-01-15'
  },
  {
    id: 'retro-set',
    name: 'Arcade Legends',
    description: 'Classic pigeons from the golden age of gaming',
    theme: 'retro',
    image: '/placeholder.svg',
    totalHoles: 24,
    openedHoles: [],
    costPerHole: 1,
    discountMultiplier: 0.8,
    cardPool: retroCards,
    isActive: true,
    releaseDate: '2024-02-01'
  },
  {
    id: 'space-set',
    name: 'Cosmic Explorers',
    description: 'Intergalactic pigeons exploring the universe',
    theme: 'space',
    image: '/placeholder.svg',
    totalHoles: 24,
    openedHoles: [],
    costPerHole: 1,
    discountMultiplier: 0.8,
    cardPool: spaceCards,
    isActive: true,
    releaseDate: '2024-02-15'
  }
];
