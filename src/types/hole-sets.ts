export interface HoleSet {
  id: string;
  name: string;
  description: string;
  theme: string;
  image: string;
  totalHoles: number;
  openedHoles: number[];
  costPerHole: number;
  discountMultiplier: number;
  cardPool: CardPool;
  isActive: boolean;
  releaseDate?: string;
  endDate?: string;
}

export interface CardPool {
  common: CardTemplate[];
  rare: CardTemplate[];
  epic: CardTemplate[];
  legendary: CardTemplate[];
}

export interface CardTemplate {
  id: string;
  name: string;
  image: string;
  description: string;
  theme: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  estimatedValue: number;
}

export interface RevealedCard {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  description: string;
  theme: string;
  holeSetId: string;
  estimatedValue: number;
}
