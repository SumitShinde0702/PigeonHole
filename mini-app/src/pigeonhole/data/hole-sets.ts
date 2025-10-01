import { HoleSet, CardPool } from '@/pigeonhole/types/hole-sets';

// Base Set (1999) - The Original 102 Cards
const baseSetCards: CardPool = {
  common: [
    {
      id: 'base-charmander-psa7',
      name: 'Charmander 46/102 Base Set',
      image: '/placeholder.svg',
      description: 'PSA 7 Near Mint - Light whitening on edges, good centering. Classic starter Pokemon from the original 1999 set.',
      theme: 'base-set',
      rarity: 'common',
      estimatedValue: 35,
      gradingCompany: 'PSA',
      gradeNumber: '7',
      cardNumber: '46/102',
      setName: 'Base Set'
    },
    {
      id: 'base-squirtle-psa6',
      name: 'Squirtle 63/102 Base Set',
      image: '/placeholder.svg',
      description: 'PSA 6 Excellent-Near Mint - Minor corner wear, slightly off-center. Iconic water starter.',
      theme: 'base-set',
      rarity: 'common',
      estimatedValue: 28,
      gradingCompany: 'PSA',
      gradeNumber: '6',
      cardNumber: '63/102',
      setName: 'Base Set'
    },
    {
      id: 'base-pikachu-bgs7',
      name: 'Pikachu 58/102 Base Set',
      image: '/placeholder.svg',
      description: 'BGS 7 Near Mint - The mascot Pokemon! Minor surface scratches, good corners. Yellow cheeks version.',
      theme: 'base-set',
      rarity: 'common',
      estimatedValue: 45,
      gradingCompany: 'BGS',
      gradeNumber: '7',
      cardNumber: '58/102',
      setName: 'Base Set'
    }
  ],
  rare: [
    {
      id: 'base-hitmonchan-psa9',
      name: 'Hitmonchan 7/102 Base Set Holo',
      image: '/placeholder.svg',
      description: 'PSA 9 Mint - Excellent centering (55/45), clean surface. One of the better holos in Base Set.',
      theme: 'base-set',
      rarity: 'rare',
      estimatedValue: 180,
      gradingCompany: 'PSA',
      gradeNumber: '9',
      cardNumber: '7/102',
      setName: 'Base Set'
    },
    {
      id: 'base-machamp-bgs8',
      name: 'Machamp 8/102 Base Set Holo',
      image: '/placeholder.svg',
      description: 'BGS 8 Near Mint-Mint - First Edition stamp. Strong subgrades on surface. Fighting-type powerhouse.',
      theme: 'base-set',
      rarity: 'rare',
      estimatedValue: 220,
      gradingCompany: 'BGS',
      gradeNumber: '8',
      cardNumber: '8/102',
      setName: 'Base Set'
    }
  ],
  epic: [
    {
      id: 'base-blastoise-psa10',
      name: 'Blastoise 2/102 Base Set Holo',
      image: '/placeholder.svg',
      description: 'PSA 10 Gem Mint - Perfect centering (50/50), pristine corners, flawless surface. One of the Big Three!',
      theme: 'base-set',
      rarity: 'epic',
      estimatedValue: 2800,
      gradingCompany: 'PSA',
      gradeNumber: '10',
      cardNumber: '2/102',
      setName: 'Base Set'
    },
    {
      id: 'base-venusaur-bgs95',
      name: 'Venusaur 15/102 Base Set Holo',
      image: '/placeholder.svg',
      description: 'BGS 9.5 Gem Mint - All 9.5 subgrades. Razor-sharp edges, incredible surface. The grass starter final evolution.',
      theme: 'base-set',
      rarity: 'epic',
      estimatedValue: 2200,
      gradingCompany: 'BGS',
      gradeNumber: '9.5',
      cardNumber: '15/102',
      setName: 'Base Set'
    }
  ],
  legendary: [
    {
      id: 'base-charizard-psa10',
      name: 'Charizard 4/102 Base Set Shadowless Holo',
      image: '/placeholder.svg',
      description: 'PSA 10 Gem Mint - THE HOLY GRAIL. Shadowless first edition print. Perfect centering, corners, edges, and surface. Museum quality.',
      theme: 'base-set',
      rarity: 'legendary',
      estimatedValue: 15000,
      gradingCompany: 'PSA',
      gradeNumber: '10',
      cardNumber: '4/102',
      setName: 'Base Set'
    }
  ]
};

// Jungle Set (1999) - 64 Cards
const jungleCards: CardPool = {
  common: [
    {
      id: 'jungle-pikachu-psa7',
      name: 'Pikachu 60/64 Jungle',
      image: '/placeholder.svg',
      description: 'PSA 7 Near Mint - Jungle variant with different art. Minor edge wear, solid corners.',
      theme: 'jungle',
      rarity: 'common',
      estimatedValue: 32,
      gradingCompany: 'PSA',
      gradeNumber: '7',
      cardNumber: '60/64',
      setName: 'Jungle'
    },
    {
      id: 'jungle-eevee-bgs6',
      name: 'Eevee 51/64 Jungle',
      image: '/placeholder.svg',
      description: 'BGS 6 Excellent-Near Mint - The evolution Pokemon! Slight surface scratches, off-center 60/40.',
      theme: 'jungle',
      rarity: 'common',
      estimatedValue: 25,
      gradingCompany: 'BGS',
      gradeNumber: '6',
      cardNumber: '51/64',
      setName: 'Jungle'
    },
    {
      id: 'jungle-meowth-psa6',
      name: 'Meowth 56/64 Jungle',
      image: '/placeholder.svg',
      description: 'PSA 6 Excellent-Near Mint - Team Rocket\'s favorite! Light corner wear, good overall condition.',
      theme: 'jungle',
      rarity: 'common',
      estimatedValue: 22,
      gradingCompany: 'PSA',
      gradeNumber: '6',
      cardNumber: '56/64',
      setName: 'Jungle'
    }
  ],
  rare: [
    {
      id: 'jungle-scyther-psa9',
      name: 'Scyther 10/64 Jungle Holo',
      image: '/placeholder.svg',
      description: 'PSA 9 Mint - One of the most playable cards from Jungle. Sharp corners, clean holo pattern.',
      theme: 'jungle',
      rarity: 'rare',
      estimatedValue: 280,
      gradingCompany: 'PSA',
      gradeNumber: '9',
      cardNumber: '10/64',
      setName: 'Jungle'
    },
    {
      id: 'jungle-pinsir-bgs8',
      name: 'Pinsir 9/64 Jungle Holo',
      image: '/placeholder.svg',
      description: 'BGS 8 Near Mint-Mint - Bug-type with great artwork. Centering 60/40, strong surface grade.',
      theme: 'jungle',
      rarity: 'rare',
      estimatedValue: 195,
      gradingCompany: 'BGS',
      gradeNumber: '8',
      cardNumber: '9/64',
      setName: 'Jungle'
    }
  ],
  epic: [
    {
      id: 'jungle-vaporeon-psa10',
      name: 'Vaporeon 12/64 Jungle Holo',
      image: '/placeholder.svg',
      description: 'PSA 10 Gem Mint - Eevee evolution with stunning holo. Perfect in every aspect. Highly sought after.',
      theme: 'jungle',
      rarity: 'epic',
      estimatedValue: 1200,
      gradingCompany: 'PSA',
      gradeNumber: '10',
      cardNumber: '12/64',
      setName: 'Jungle'
    },
    {
      id: 'jungle-flareon-bgs95',
      name: 'Flareon 3/64 Jungle Holo',
      image: '/placeholder.svg',
      description: 'BGS 9.5 Gem Mint - Fire-type Eeveelution. All 9.5 subgrades, beautiful holo shimmer.',
      theme: 'jungle',
      rarity: 'epic',
      estimatedValue: 1100,
      gradingCompany: 'BGS',
      gradeNumber: '9.5',
      cardNumber: '3/64',
      setName: 'Jungle'
    }
  ],
  legendary: [
    {
      id: 'jungle-wigglytuff-bgs10black',
      name: 'Wigglytuff 16/64 Jungle Holo',
      image: '/placeholder.svg',
      description: 'BGS 10 BLACK LABEL - All perfect 10 subgrades! Centering, corners, edges, surface - flawless. Extremely rare achievement.',
      theme: 'jungle',
      rarity: 'legendary',
      estimatedValue: 5500,
      gradingCompany: 'BGS',
      gradeNumber: '10',
      cardNumber: '16/64',
      setName: 'Jungle'
    }
  ]
};

// Fossil Set (1999) - 62 Cards
const fossilCards: CardPool = {
  common: [
    {
      id: 'fossil-geodude-psa6',
      name: 'Geodude 47/62 Fossil',
      image: '/placeholder.svg',
      description: 'PSA 6 Excellent-Near Mint - Rock-type basic. Minor whitening, decent centering.',
      theme: 'fossil',
      rarity: 'common',
      estimatedValue: 18,
      gradingCompany: 'PSA',
      gradeNumber: '6',
      cardNumber: '47/62',
      setName: 'Fossil'
    },
    {
      id: 'fossil-psyduck-bgs7',
      name: 'Psyduck 53/62 Fossil',
      image: '/placeholder.svg',
      description: 'BGS 7 Near Mint - Confused duck Pokemon. Light edge wear, good surface.',
      theme: 'fossil',
      rarity: 'common',
      estimatedValue: 20,
      gradingCompany: 'BGS',
      gradeNumber: '7',
      cardNumber: '53/62',
      setName: 'Fossil'
    },
    {
      id: 'fossil-zubat-psa7',
      name: 'Zubat 57/62 Fossil',
      image: '/placeholder.svg',
      description: 'PSA 7 Near Mint - Cave-dwelling bat. Clean card with minor imperfections.',
      theme: 'fossil',
      rarity: 'common',
      estimatedValue: 19,
      gradingCompany: 'PSA',
      gradeNumber: '7',
      cardNumber: '57/62',
      setName: 'Fossil'
    }
  ],
  rare: [
    {
      id: 'fossil-aerodactyl-psa9',
      name: 'Aerodactyl 1/62 Fossil Holo',
      image: '/placeholder.svg',
      description: 'PSA 9 Mint - Prehistoric flying Pokemon. Excellent centering, vibrant holo pattern.',
      theme: 'fossil',
      rarity: 'rare',
      estimatedValue: 320,
      gradingCompany: 'PSA',
      gradeNumber: '9',
      cardNumber: '1/62',
      setName: 'Fossil'
    },
    {
      id: 'fossil-kabutops-bgs85',
      name: 'Kabutops 9/62 Fossil Holo',
      image: '/placeholder.svg',
      description: 'BGS 8.5 Near Mint-Mint+ - Fossil Pokemon evolution. Strong corners (9), nice surface (9).',
      theme: 'fossil',
      rarity: 'rare',
      estimatedValue: 210,
      gradingCompany: 'BGS',
      gradeNumber: '8.5',
      cardNumber: '9/62',
      setName: 'Fossil'
    }
  ],
  epic: [
    {
      id: 'fossil-moltres-psa10',
      name: 'Moltres 12/62 Fossil Holo',
      image: '/placeholder.svg',
      description: 'PSA 10 Gem Mint - Legendary bird of fire! Perfect centering, no print lines, pristine holo.',
      theme: 'fossil',
      rarity: 'epic',
      estimatedValue: 1800,
      gradingCompany: 'PSA',
      gradeNumber: '10',
      cardNumber: '12/62',
      setName: 'Fossil'
    },
    {
      id: 'fossil-zapdos-bgs95',
      name: 'Zapdos 16/62 Fossil Holo',
      image: '/placeholder.svg',
      description: 'BGS 9.5 Gem Mint - Electric legendary bird. All subgrades 9.5, stunning card.',
      theme: 'fossil',
      rarity: 'epic',
      estimatedValue: 1650,
      gradingCompany: 'BGS',
      gradeNumber: '9.5',
      cardNumber: '16/62',
      setName: 'Fossil'
    }
  ],
  legendary: [
    {
      id: 'fossil-dragonite-psa10',
      name: 'Dragonite 4/62 Fossil Holo',
      image: '/placeholder.svg',
      description: 'PSA 10 Gem Mint - The dragon Pokemon! Museum-quality with perfect centering (50/50), razor corners. Completing the original 150!',
      theme: 'fossil',
      rarity: 'legendary',
      estimatedValue: 8500,
      gradingCompany: 'PSA',
      gradeNumber: '10',
      cardNumber: '4/62',
      setName: 'Fossil'
    }
  ]
};

// Gym Heroes (2000) - 132 Cards
const gymHeroesCards: CardPool = {
  common: [
    {
      id: 'gym-misty-staryu-psa7',
      name: 'Misty\'s Staryu 90/132 Gym Heroes',
      image: '/placeholder.svg',
      description: 'PSA 7 Near Mint - Cerulean City Gym! Light edge wear, good centering.',
      theme: 'gym-heroes',
      rarity: 'common',
      estimatedValue: 22,
      gradingCompany: 'PSA',
      gradeNumber: '7',
      cardNumber: '90/132',
      setName: 'Gym Heroes'
    },
    {
      id: 'gym-surge-pikachu-bgs6',
      name: 'Lt. Surge\'s Pikachu 81/132 Gym Heroes',
      image: '/placeholder.svg',
      description: 'BGS 6 Excellent-Near Mint - Vermillion City\'s electric mouse. Minor corner wear.',
      theme: 'gym-heroes',
      rarity: 'common',
      estimatedValue: 28,
      gradingCompany: 'BGS',
      gradeNumber: '6',
      cardNumber: '81/132',
      setName: 'Gym Heroes'
    },
    {
      id: 'gym-brock-geodude-psa6',
      name: 'Brock\'s Geodude 66/132 Gym Heroes',
      image: '/placeholder.svg',
      description: 'PSA 6 Excellent-Near Mint - Pewter City Gym rock-type. Solid condition.',
      theme: 'gym-heroes',
      rarity: 'common',
      estimatedValue: 20,
      gradingCompany: 'PSA',
      gradeNumber: '6',
      cardNumber: '66/132',
      setName: 'Gym Heroes'
    }
  ],
  rare: [
    {
      id: 'gym-erika-vileplume-psa9',
      name: 'Erika\'s Vileplume 5/132 Gym Heroes Holo',
      image: '/placeholder.svg',
      description: 'PSA 9 Mint - Celadon City\'s grass master. Beautiful holo, excellent centering.',
      theme: 'gym-heroes',
      rarity: 'rare',
      estimatedValue: 240,
      gradingCompany: 'PSA',
      gradeNumber: '9',
      cardNumber: '5/132',
      setName: 'Gym Heroes'
    },
    {
      id: 'gym-sabrina-alakazam-bgs8',
      name: 'Sabrina\'s Alakazam 16/132 Gym Heroes Holo',
      image: '/placeholder.svg',
      description: 'BGS 8 Near Mint-Mint - Saffron City psychic powerhouse. Strong subgrades.',
      theme: 'gym-heroes',
      rarity: 'rare',
      estimatedValue: 285,
      gradingCompany: 'BGS',
      gradeNumber: '8',
      cardNumber: '16/132',
      setName: 'Gym Heroes'
    }
  ],
  epic: [
    {
      id: 'gym-blaine-charizard-psa10',
      name: 'Blaine\'s Charizard 2/132 Gym Heroes Holo',
      image: '/placeholder.svg',
      description: 'PSA 10 Gem Mint - Charizard from Cinnabar Island! Perfect in every way. Highly collectible gym leader card.',
      theme: 'gym-heroes',
      rarity: 'epic',
      estimatedValue: 3200,
      gradingCompany: 'PSA',
      gradeNumber: '10',
      cardNumber: '2/132',
      setName: 'Gym Heroes'
    },
    {
      id: 'gym-rocket-mewtwo-bgs95',
      name: 'Rocket\'s Mewtwo 14/132 Gym Heroes Holo',
      image: '/placeholder.svg',
      description: 'BGS 9.5 Gem Mint - Dark version of the legendary psychic Pokemon! All subgrades pristine.',
      theme: 'gym-heroes',
      rarity: 'epic',
      estimatedValue: 2800,
      gradingCompany: 'BGS',
      gradeNumber: '9.5',
      cardNumber: '14/132',
      setName: 'Gym Heroes'
    }
  ],
  legendary: [
    {
      id: 'gym-giovanni-machamp-bgs10black',
      name: 'Giovanni\'s Machamp 6/132 Gym Heroes Holo',
      image: '/placeholder.svg',
      description: 'BGS 10 BLACK LABEL - Viridian City Gym Leader\'s ace! All perfect 10s across the board. Investment-grade specimen.',
      theme: 'gym-heroes',
      rarity: 'legendary',
      estimatedValue: 7200,
      gradingCompany: 'BGS',
      gradeNumber: '10',
      cardNumber: '6/132',
      setName: 'Gym Heroes'
    }
  ]
};

export const holeSets: HoleSet[] = [
  {
    id: 'base-set',
    name: 'Base Set 1999',
    description: 'The original 102 cards that started it all - featuring Charizard, Blastoise, and Venusaur',
    theme: 'base-set',
    image: '/placeholder.svg',
    totalHoles: 24,
    openedHoles: [],
    costPerHole: 1,
    discountMultiplier: 0.8,
    cardPool: baseSetCards,
    isActive: true,
    releaseDate: '1999-01-09'
  },
  {
    id: 'jungle-set',
    name: 'Jungle Set 1999',
    description: 'Venture into the wild with 64 cards including Scyther, Vaporeon, and Wigglytuff',
    theme: 'jungle',
    image: '/placeholder.svg',
    totalHoles: 24,
    openedHoles: [],
    costPerHole: 1,
    discountMultiplier: 0.8,
    cardPool: jungleCards,
    isActive: true,
    releaseDate: '1999-06-16'
  },
  {
    id: 'fossil-set',
    name: 'Fossil Set 1999',
    description: 'Discover prehistoric Pokemon with 62 cards featuring Aerodactyl, Kabutops, and legendary birds',
    theme: 'fossil',
    image: '/placeholder.svg',
    totalHoles: 24,
    openedHoles: [],
    costPerHole: 1,
    discountMultiplier: 0.8,
    cardPool: fossilCards,
    isActive: true,
    releaseDate: '1999-10-10'
  },
  {
    id: 'gym-heroes-set',
    name: 'Gym Heroes 2000',
    description: 'Battle Gym Leaders with 132 cards including Blaine\'s Charizard and Sabrina\'s Alakazam',
    theme: 'gym-heroes',
    image: '/placeholder.svg',
    totalHoles: 24,
    openedHoles: [],
    costPerHole: 1,
    discountMultiplier: 0.8,
    cardPool: gymHeroesCards,
    isActive: true,
    releaseDate: '2000-08-14'
  }
];