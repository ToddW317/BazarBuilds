'use client'

import { useState } from 'react'
import { Encounter, Loot } from '@/types/encounters'

const LEVEL_1_ENCOUNTERS: Encounter[] = [
  {
    id: 'banannabal-1',
    name: 'Banannabal',
    level: 1,
    imageUrl: '/encounters/banannabal.webp',
    loot: [
      {
        name: 'Medkit',
        size: 'Small',
        effect: 'When sold, it grants +5 Heal to the leftmost Heal item.',
      },
      {
        name: 'Bluenanas',
        size: 'Small',
        type: 'Food',
        castTime: 9.0,
        effect: 'Heals for +10.',
        additionalEffect: 'When you sell this, grants +20 Max Health.',
      },
      {
        name: 'Duct Tape',
        size: 'Small',
        type: 'Tool',
        castTime: 6.0,
        effect: 'Slows 1 item for 1 second.',
        additionalEffect: 'When you use an adjacent item, Shield 5.',
      }
    ]
  },
  {
    id: 'fanged-inglet-1',
    name: 'Fanged Inglet',
    level: 1,
    imageUrl: '/encounters/fanged-inglet.png',
    skill: {
      name: 'Deadly Eye',
      effect: 'Your Weapons have +4% Crit chance.',
    },
    loot: [
      {
        name: 'Pelt',
        size: 'Small',
        effect: 'Sells for gold.',
        quantity: 2
      },
      {
        name: 'Fang',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deals 3 Damage.',
        critChance: 4,
        quantity: 2
      }
    ]
  },
  {
    id: 'haunted-kimono-1',
    name: 'Haunted Kimono',
    level: 1,
    imageUrl: '/encounters/haunted-kimono.png',
    skill: {
      name: 'Standardized Defenses',
      effect: 'Grants your Medium Shield items an additional +6 Shield.',
    },
    loot: [
      {
        name: 'Scrap',
        size: 'Small',
        effect: 'When you sell this, give your leftmost Shield item + 4 Shield.',
        quantity: 2
      },
      {
        name: 'Silk',
        size: 'Medium',
        castTime: 7.0,
        effect: 'Provides 16 Shield.',
        additionalEffect: 'When you sell another non-Weapon item, this gains +5 Shield.',
      }
    ]
  },
  {
    id: 'kyver-drone-1',
    name: 'Kyver Drone',
    level: 1,
    imageUrl: '/encounters/kyver-drone.png',
    skill: {
      name: 'Trained',
      effect: 'When you Slow, a random Weapon gains +5 Damage for this fight.',
    },
    loot: [
      {
        name: 'Insect Wing',
        size: 'Small',
        effect: "When you sell this, reduce your items' Cooldowns by 3%"
      },
      {
        name: 'Stinger',
        size: 'Small',
        type: 'Weapon',
        castTime: 9.0,
        effect: 'Deal 5 Damage, Slow 1 item for 1 second.',
        additionalEffect: 'Lifesteal.'
      },
      {
        name: 'Langxian',
        size: 'Medium',
        type: 'Weapon',
        castTime: 10.0,
        effect: 'Deals 25 Damage.',
        additionalEffect: 'When you win a fight with Langxian, this gains +25 Damage.'
      },
      {
        name: 'Eagle Talisman',
        size: 'Small',
        effect: 'When sold, grants +5% Crit Chance to your leftmost item.'
      }
    ]
  },
  {
    id: 'pyro-1',
    name: 'Pyro',
    level: 1,
    imageUrl: '/encounters/pyro.png',
    loot: [
      {
        name: 'Cinders',
        size: 'Small',
        effect: 'When you sell this, your leftmost Burn item gains +1 Burn.',
        quantity: 2
      },
      {
        name: 'Lighter',
        size: 'Small',
        type: 'Tool',
        castTime: 3.0,
        effect: 'Applies 1 Burn.'
      }
    ]
  },
  {
    id: 'viper-1',
    name: 'Viper',
    level: 1,
    imageUrl: '/encounters/viper.png',
    skill: {
      name: 'Lash Out',
      effect: 'At the start of each fight, applies Poison 3.',
    },
    loot: [
      {
        name: 'Gland',
        size: 'Small',
        effect: 'When you sell this, gain 2 Regeneration.'
      },
      {
        name: 'Toxic Fang',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 3 Damage, Poison 2.'
      },
      {
        name: 'Extract',
        size: 'Small',
        effect: 'When you sell this, your leftmost Poison item gains +1 Poison.'
      }
    ]
  }
]

const LEVEL_2_ENCOUNTERS: Encounter[] = [
  {
    id: 'coconut-crab-2',
    name: 'Coconut Crab',
    level: 2,
    imageUrl: '/encounters/coconut-crab.webp',
    skill: {
      name: 'Hard Shell & Toughness',
      effect: 'The first time you fall below half health each fight, Shield equal to 20% of your Max Health. [50 Shield] & Your Shield items have +2 Shield.',
    },
    loot: [
      {
        name: 'Coconut',
        size: 'Small',
        effect: 'When you sell this, gain +30 Max Health.',
      },
      {
        name: 'Crusher Claw',
        size: 'Medium',
        type: 'Weapon',
        castTime: 8.0,
        effect: 'Your Shield items gain +2 Shield for the fight. Deal Damage equal to the highest Shield value of items you have.',
      },
      {
        name: 'Sea Shell',
        size: 'Small',
        type: 'Aquatic',
        castTime: 5.0,
        effect: 'Shield 15 for each Aquatic item you have.',
      }
    ]
  },
  {
    id: 'giant-mosquito-2',
    name: 'Giant Mosquito',
    level: 2,
    imageUrl: '/encounters/giant-mosquito.png',
    skill: {
      name: 'Keen Eye & Rush',
      effect: 'Your items have +3% Crit chance & At the start of each fight, Haste a Weapon 3 seconds.',
    },
    loot: [
      {
        name: 'Insect Wing',
        size: 'Small',
        effect: "When you sell this, reduce your items' Cooldowns by 6%.",
      },
      {
        name: 'Proboscis',
        size: 'Small',
        type: 'Weapon',
        effect: 'When you Slow, deal 6 Damage.',
      },
      {
        name: 'Amber',
        size: 'Small',
        castTime: 5.0,
        effect: 'Slow 1 items for 3 seconds.',
        additionalEffect: 'Your other Slow items have +1 Slow.',
      }
    ]
  }
]

const LEVEL_3_ENCOUNTERS: Encounter[] = [
  {
    id: 'covetous-thief-3',
    name: 'Covetous Thief',
    level: 3,
    imageUrl: '/encounters/covetous-thief.png',
    skill: {
      name: 'Keen Eye & Pickpocket',
      effect: 'Your items have +3% Crit chance & At the start of each fight, gain 1 gold.',
    },
    loot: [
      {
        name: 'Safe',
        size: 'Medium',
        effect: 'When you sell this, get 3 Spare Change.',
      },
      {
        name: 'Shadowed Cloak',
        size: 'Medium',
        effect: 'When you use the item to the right of this, give it Haste for 1 second and +3 Damage for the fight.',
      },
      {
        name: 'Concealed Dagger',
        size: 'Small',
        type: 'Weapon',
        castTime: 8.0,
        effect: 'Deal 35 Damage. Gain 1 gold.',
        additionalEffect: 'Crit Chance: 3%',
      },
      {
        name: 'Grindstone',
        size: 'Medium',
        type: 'Tool',
        castTime: 3.0,
        effect: 'Give the Weapon to the left of this +10 Damage for the fight.',
      },
      {
        name: 'Sharpening Stone',
        size: 'Small',
        effect: 'When you sell this, your leftmost Weapon gains +6 Damage.',
      }
    ]
  },
  {
    id: 'dabbling-apprentice-3',
    name: 'Dabbling Apprentice',
    level: 3,
    imageUrl: '/encounters/dabbling-apprentice.png',
    skill: {
      name: 'Panic',
      effect: 'The first time you fall below 50% health each fight, reload 2 items.',
    },
    loot: [
      {
        name: 'Vial of Blood',
        size: 'Small',
        effect: 'When you sell this, gain 1 XP.',
      },
      {
        name: 'Bottled Lightning',
        size: 'Small',
        type: 'Potion',
        castTime: 5.0,
        effect: 'Deal 75 Damage, Burn 6.',
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Tazidian Dagger',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 5 Damage.',
        additionalEffect: 'Adjacent Potions have +1 Ammo.',
      },
      {
        name: 'Fire Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 5.0,
        effect: 'Burn 9.',
        additionalEffect: 'Ammo: 2',
      }
    ]
  },
  {
    id: 'tempest-flamedancer-3',
    name: 'Tempest Flamedancer',
    level: 3,
    imageUrl: '/encounters/tempest-flamedancer.png',
    skill: {
      name: 'Flamedancer',
      effect: 'Your Burn items have +2% Crit Chance.',
    },
    loot: [
      {
        name: 'Cinders',
        size: 'Small',
        effect: 'When you sell this, your leftmost Burn item gains +1 Burn.',
      },
      {
        name: 'Bar of Gold',
        size: 'Small',
        effect: 'Sells for gold.',
      },
      {
        name: 'Fiery Cutlass',
        size: 'Medium',
        type: 'Weapon',
        castTime: 5.0,
        effect: 'Deal 6 Damage, Burn 3.',
        critChance: 2,
        additionalEffect: 'This deals double Crit Damage.',
      },
      {
        name: 'Sharpening Stone',
        size: 'Small',
        effect: 'When you sell this, your leftmost Weapon gains +6 Damage.',
      }
    ]
  },
  {
    id: 'tent-city-mayor-3',
    name: 'Tent City Mayor',
    level: 3,
    imageUrl: '/encounters/tent-city-mayor.png',
    skill: {
      name: 'Augmented Defenses & Augmented Weaponry',
      effect: 'When you sell a small item, give a Shield equal to 3 Shield & When you sell a small item, a Weapon gains +3 Damage.',
    },
    loot: [
      {
        name: 'Scrap',
        size: 'Small',
        effect: 'When you sell this, give your leftmost Shield item +8 Shield.',
      },
      {
        name: 'Dog',
        size: 'Medium',
        type: 'Weapon',
        castTime: 6.0,
        effect: 'Deal 10 Damage.',
        additionalEffect: 'When you sell a small item, this gains +6 Damage.',
      },
      {
        name: 'Temporary Shelter',
        size: 'Large',
        type: 'Property',
        castTime: 6.0,
        effect: 'Shield 30.',
        additionalEffect: 'When you sell a small item, this gains +10 Shield.',
      },
      {
        name: 'Sharpening Stone',
        size: 'Small',
        effect: 'When you sell this, your leftmost Weapon gains +6 Damage.',
      }
    ]
  }
]

const LEVEL_4_ENCOUNTERS: Encounter[] = [
  {
    id: 'boarrior-4',
    name: 'Boarrior',
    level: 4,
    imageUrl: '/encounters/boarrior.png',
    skill: {
      name: 'Strength & Frontal Shielding',
      effect: 'Your Weapons deal +6 Damage & Your leftmost Shield item has +15 Shield.',
    },
    loot: [
      {
        name: 'Scrap',
        size: 'Small',
        effect: 'When you sell this, give your leftmost Shield item +12 Shield.',
      },
      {
        name: 'Tusked Helm',
        size: 'Small',
        type: 'Weapon',
        castTime: 10.0,
        effect: 'Deal 25 Damage, Shield 30.',
        additionalEffect: 'Multicast: 2',
      },
      {
        name: 'Old Sword',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 37 Damage.',
        additionalEffect: 'When you sell this, give your leftmost Weapon +6 Damage.',
      },
      {
        name: 'Red Piggles A',
        size: 'Small',
        effect: 'Give your adjacent Weapons +2 Damage for the fight.',
      },
      {
        name: 'Red Gumball',
        size: 'Small',
        effect: 'When you sell this, your Weapons gain +2 Damage.',
      },
      {
        name: 'Shoe Blade',
        size: 'Small',
        type: 'Weapon',
        castTime: 6.0,
        effect: 'Deal 42 Damage.',
        additionalEffect: 'CRIT CHANCE: 30%',
      },
      {
        name: 'Red Piggles X',
        size: 'Small',
        castTime: 3.0,
        effect: 'Your Weapons gain +2 Damage for the fight',
      },
      {
        name: 'Sharpening Stone',
        size: 'Small',
        effect: 'When you sell this, your leftmost Weapon gains +9 Damage.',
      }
    ]
  },
  {
    id: 'boilerroom-brawler-4',
    name: 'Boilerroom Brawler',
    level: 4,
    imageUrl: '/encounters/boilerroom-brawler.png',
    skill: {
      name: 'Flashy Mechanic & Time to Tinker',
      effect: 'When you use a Tool, your items gain 5% Crit chance & When you Haste, Shield 10.',
    },
    loot: [
      {
        name: 'Sharpening Stone',
        size: 'Small',
        effect: 'When you sell this, your leftmost Weapon gains 6 Damage.',
      },
      {
        name: 'Hammer',
        size: 'Small',
        type: 'Weapon',
        castTime: 8.6,
        effect: 'Deal 20 Damage.',
        additionalEffect: 'When you Level Up, if you have at least 3 Tools, upgrade an item.',
      },
      {
        name: 'Wrench',
        size: 'Small',
        type: 'Weapon',
        castTime: 2.9,
        effect: 'Deal 5 Damage.',
        additionalEffect: 'At the start of each day, upgrade a Tool.',
      },
      {
        name: 'Toolbox',
        size: 'Medium',
        type: 'Tool',
        castTime: 6.0,
        effect: 'Shield 10.',
        additionalEffect: 'Your other Tools have their Cooldowns reduced by 5%.',
      },
      {
        name: 'Multitool',
        size: 'Small',
        type: 'Tool',
        castTime: 3.8,
        effect: 'Haste another item for 2 seconds. Slow 1 item for 2 seconds.',
      },
      {
        name: 'Energy Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 4.0,
        effect: 'Haste your items for 4 seconds.',
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Eagle Talisman',
        size: 'Small',
        effect: 'When you sell this, your leftmost item gains 5% Crit Chance.',
      }
    ]
  },
  {
    id: 'frost-street-challenger-4',
    name: 'Frost Street Challenger',
    level: 4,
    imageUrl: '/encounters/frost-street-challenger.png',
    skill: {
      name: 'Snowstorm',
      effect: 'When you Freeze, your Weapons gain +2 Damage for the fight.',
    },
    loot: [
      {
        name: 'Icicle',
        size: 'Small',
        effect: 'At the start of each fight, Freeze 1 item for 3 seconds.',
      },
      {
        name: 'Weights',
        size: 'Medium',
        type: 'Tool',
        castTime: 5.0,
        effect: 'Your Weapons gain +5 Damage and your Heal items +5 Heal for the fight.',
        additionalEffect: 'When you Heal while at max health, Charge this 1 second.',
      },
      {
        name: 'Handaxe',
        size: 'Small',
        type: 'Weapon',
        castTime: 7.0,
        effect: 'Deal 42 Damage.',
        additionalEffect: 'Your Weapons have +6 Damage.',
      },
      {
        name: 'Frozen Bludgeon',
        size: 'Medium',
        type: 'Weapon',
        castTime: 12.0,
        effect: 'Deal 57 Damage. Freeze 1 item for 2 seconds.',
        additionalEffect: 'When you Freeze an item, your Weapons gain +6 Damage for the fight.',
      },
      {
        name: 'Snow Globe',
        size: 'Medium',
        type: 'Property',
        castTime: 6.0,
        effect: 'Freeze 1 item for 1 second.',
        additionalEffect: 'This has +1 Multicast for each adjacent Property.',
      }
    ]
  },
  {
    id: 'outlands-dervish-4',
    name: 'Outlands Dervish',
    level: 4,
    imageUrl: '/encounters/outlands-dervish.png',
    skill: {
      name: 'Keen Eye',
      effect: 'Your items have +6% Crit chance.',
    },
    loot: [
      {
        name: 'Bar of Gold',
        size: 'Small',
        effect: 'Sells for gold.',
      },
      {
        name: 'Shoe Blade',
        size: 'Small',
        type: 'Weapon',
        castTime: 6.0,
        effect: 'Deal 30 Damage.',
        critChance: 36,
        quantity: 2
      },
      {
        name: 'Clockwork Blades',
        size: 'Medium',
        type: 'Weapon',
        castTime: 6.0,
        effect: 'Deal 30 Damage.',
        critChance: 6,
        additionalEffect: "When you sell this, reduce your items' Cooldown by 2%.",
        quantity: 2
      }
    ]
  },
  {
    id: 'rogue-scrapper-4',
    name: 'Rogue Scrapper',
    level: 4,
    imageUrl: '/encounters/rogue-scrapper.png',
    skill: {
      name: 'Rust',
      effect: 'At the start of each fight, Slow an item for 3 seconds.',
    },
    loot: [
      {
        name: 'Scrap',
        size: 'Small',
        effect: 'When you sell this, give your leftmost Shield item +12 Shield.',
      },
      {
        name: 'Gearnola Bar',
        size: 'Small',
        castTime: 4.0,
        effect: 'Shield 20.',
        additionalEffect: 'When you sell a Tool, this gains 1 Max Ammo.\nAmmo: 1',
      },
      {
        name: 'Junkyard Club',
        size: 'Medium',
        type: 'Weapon',
        castTime: 10.0,
        effect: 'Deal 60 Damage.',
        additionalEffect: 'When you sell this, your Weapons gain +6 Damage.',
      },
      {
        name: 'Junkyard Repairbot',
        size: 'Medium',
        type: 'Friend',
        castTime: 7.0,
        effect: 'Heal 60.',
        additionalEffect: 'When you sell this, give your leftmost Heal item +15 Heal.',
      },
      {
        name: 'Barbed Wire',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 20 Damage.',
        additionalEffect: 'When you Shield, this gains +5 Damage for the fight.',
      },
      {
        name: 'Medkit',
        size: 'Small',
        effect: 'When you sell this, your leftmost Heal item gains +15 Heal.',
      }
    ]
  }
]

const LEVEL_5_ENCOUNTERS: Encounter[] = [
  {
    id: 'bloodreef-raider-5',
    name: 'Bloodreef Raider',
    level: 5,
    imageUrl: '/encounters/bloodreef-raider.png',
    skill: {
      name: 'Multiple Skills',
      effect: 'Ammo Stash: Your leftmost Ammo item has +2 Max Ammo\nRight-Handed: Your rightmost Weapon deals +12 Damage\nLeft-Handed: Your leftmost Weapon deals +12 Damage\nSmall Weaponry: Your Small Weapons deal +9 Damage',
    },
    loot: [
      {
        name: 'Bar of Gold',
        size: 'Small',
        effect: 'Sells for gold',
      },
      {
        name: "Crow's Nest",
        size: 'Large',
        type: 'Property',
        effect: 'Your Weapons have +75% Crit chance when you have exactly one Weapon. If you have exactly one Weapon, that Weapon has lifesteal.',
      },
      {
        name: 'Powder Flask',
        size: 'Small',
        type: 'Tool',
        castTime: 4.0,
        effect: 'Reload the item to the right of this 2 Ammo',
      },
      {
        name: 'Revolver',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 48 Damage',
        critChance: 95,
        additionalEffect: 'When you Crit, fully reload this; Lifesteal\nAmmo: 10',
      },
      {
        name: 'Cannonball',
        size: 'Small',
        effect: 'Adjacent items have +2 Ammo',
      },
      {
        name: 'Shield Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 4.0,
        effect: 'Shield 150',
        additionalEffect: 'Ammo: 3',
      }
    ]
  },
  {
    id: 'eccentric-etherwright-5',
    name: 'Eccentric Etherwright',
    level: 5,
    imageUrl: '/encounters/eccentric-etherwright.png',
    skill: {
      name: 'Toughness & Rigged',
      effect: 'Your shield items have +6 shield & At the start of each fight, haste 2 items for 3 seconds.',
    },
    loot: [
      {
        name: 'Scrap',
        size: 'Small',
        effect: 'When you sell this, give your leftmost Shield item +12 Shield',
      },
      {
        name: 'Force Field',
        size: 'Large',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Shield 36, Deal Damage equal to your Shield',
        critChance: 4,
      },
      {
        name: 'Goggles',
        size: 'Small',
        type: 'Tool',
        castTime: 7.0,
        effect: 'Shield 36',
        critChance: 4,
        additionalEffect: 'When this gains Haste, give your items +4% Crit Chance for the fight',
      },
      {
        name: 'Barbed Wire',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 25 Damage',
        critChance: 4,
        additionalEffect: 'When you Shield, this gains +5 Damage for the fight',
      }
    ]
  },
  {
    id: 'preening-duelist-5',
    name: 'Preening Duelist',
    level: 5,
    imageUrl: '/encounters/preening-duelist.png',
    skill: {
      name: 'All Talk',
      effect: 'While you have more than half health, your Weapons have +25 Damage',
    },
    loot: [
      {
        name: 'Gunpowder',
        size: 'Small',
        effect: 'When you sell this, your leftmost Ammo item gains +1 Max Ammo',
      },
      {
        name: 'Powder Flask',
        size: 'Small',
        type: 'Tool',
        castTime: 4.0,
        effect: 'Reload the item to the right of this 2 Ammo',
      },
      {
        name: 'Revolver',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 40 Damage',
        critChance: 20,
        additionalEffect: 'When you Crit, fully reload this\nAmmo: 10',
      },
      {
        name: 'Cannonball',
        size: 'Small',
        effect: 'Adjacent items have +2 Ammo',
      },
      {
        name: 'Pistol Sword',
        size: 'Medium',
        type: 'Weapon',
        castTime: 3.0,
        effect: 'Deal 40 Damage',
        additionalEffect: 'When you use an Ammo item, deal +40 Damage\nAmmo: 5',
      },
      {
        name: 'Throwing Knives',
        size: 'Small',
        type: 'Weapon',
        castTime: 3.0,
        effect: 'Deal 40 Damage',
        additionalEffect: 'When you Crit, use this\nAmmo: 3',
      },
      {
        name: 'Gunpowder',
        size: 'Small',
        effect: 'When you sell this, your leftmost Ammo item gains +1 Max Ammo',
      }
    ]
  },
  {
    id: 'retiree-5',
    name: 'Retiree',
    level: 5,
    imageUrl: '/encounters/retiree.png',
    skill: {
      name: 'Extreme Comfort',
      effect: 'When you Heal, your Shield items gain +3 Shield for the fight',
    },
    loot: [
      {
        name: 'Spare Change',
        size: 'Small',
        effect: 'Sells for gold',
      },
      {
        name: 'Succulents',
        size: 'Small',
        castTime: 4.0,
        effect: 'Heal +2',
        additionalEffect: 'This permanently gains +2 Heal',
      },
      {
        name: 'Golf Clubs',
        size: 'Medium',
        type: 'Weapon',
        castTime: 6.0,
        effect: 'Deal 60 Damage',
        additionalEffect: 'When you Heal, this gains +20 Damage for the fight',
      },
      {
        name: 'Bushel',
        size: 'Medium',
        castTime: 5.0,
        effect: 'Heal 10',
        additionalEffect: 'When you Heal, Shield 29',
      },
      {
        name: 'Medkit',
        size: 'Small',
        effect: 'When sold, it grants +5 Heal to the leftmost Heal item.',
      }
    ]
  },
  {
    id: 'sabretooth-5',
    name: 'Sabretooth',
    level: 5,
    imageUrl: '/encounters/sabretooth.png',
    skill: {
      name: 'Diamond Fangs & Small Weaponry',
      effect: 'Your Small Diamond items have their Cooldowns reduced by 30% & Your Small Weapons deal +3 Damage',
    },
    loot: [
      {
        name: 'Pelt',
        size: 'Small',
        effect: 'Sells for gold',
        quantity: 8
      },
      {
        name: 'Shiny Fang',
        size: 'Small',
        type: 'Weapon',
        castTime: 2.8,
        effect: 'Deal 33 Damage',
        additionalEffect: 'Multicast: 2',
        quantity: 2
      }
    ]
  },
  {
    id: 'scout-trooper-5',
    name: 'Scout Trooper',
    level: 5,
    imageUrl: '/encounters/scout-trooper.png',
    skill: {
      name: 'Small Weaponry & Gunner',
      effect: 'Your Small Weapons deal +9 Damage & Your items have +1 Max Ammo',
    },
    loot: [
      {
        name: 'Gunpowder',
        size: 'Small',
        effect: 'When you sell this, your leftmost Ammo item gains +1 Max Ammo',
      },
      {
        name: 'Laser Pistol',
        size: 'Small',
        type: 'Weapon',
        castTime: 5.0,
        effect: 'Deal 39 Damage',
      },
      {
        name: 'Uzi',
        size: 'Small',
        type: 'Weapon',
        castTime: 2.0,
        effect: 'Deal 15 Damage',
        additionalEffect: 'Ammo: 12',
      },
      {
        name: 'Bolas',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 29 Damage, Slow 1 item for 2 seconds',
        additionalEffect: 'Ammo: 3',
      },
      {
        name: 'Weakpoint Detector',
        size: 'Medium',
        type: 'Tool',
        castTime: 6.0,
        effect: 'Your Weapons gain +3 Damage for the fight',
        additionalEffect: 'When you Slow, Charge this 2 seconds',
      },
      {
        name: 'Grappling Hook',
        size: 'Small',
        type: 'Weapon',
        castTime: 7.0,
        effect: 'Deal 22 Damage',
        additionalEffect: 'Slow 1 item for 3 seconds',
      },
      {
        name: 'Eagle Talisman',
        size: 'Small',
        effect: 'When you sell this, your leftmost item gains +5% Crit Chance',
      }
    ]
  }
]

const LEVEL_6_ENCOUNTERS: Encounter[] = [
  {
    id: 'deadly-crooner-6',
    name: 'Deadly Crooner',
    level: 6,
    imageUrl: '/encounters/deadly-crooner.png',
    skill: {
      name: 'Left-Handed',
      effect: 'Your leftmost Weapon deals +12 Damage',
    },
    loot: [
      {
        name: 'Medkit',
        size: 'Small',
        effect: 'When you sell this, your leftmost Heal item gains +15 Heal',
      },
      {
        name: 'Yo-Yo',
        size: 'Small',
        type: 'Weapon',
        castTime: 8.0,
        effect: 'Deal 17 Damage',
        additionalEffect: 'When you use an adjacent item, use this',
      },
      {
        name: 'Ganjo',
        size: 'Medium',
        castTime: 4.0,
        effect: 'Adjacent Weapons gain +10 Damage for the fight, Adjacent Heal items gain +10 Heal for the fight, Adjacent Shield items gain +10 Shield for the fight',
      },
      {
        name: 'Textiles',
        size: 'Medium',
        castTime: 5.0,
        effect: 'Shield 40; Heal equal to your Shield',
      },
      {
        name: 'Scrap',
        size: 'Small',
        effect: 'When you sell this, give your leftmost Shield item +16 Shield',
      }
    ]
  },
  {
    id: 'dire-inglet-6',
    name: 'Dire Inglet',
    level: 6,
    imageUrl: '/encounters/dire-inglet.png',
    skill: {
      name: 'Aggressive',
      effect: 'When you use a Weapon, give it +4% Crit Chance for the fight',
    },
    loot: [
      {
        name: 'Pelt',
        size: 'Small',
        effect: 'Sells for gold',
        quantity: 2
      },
      {
        name: 'Broken Shackles',
        size: 'Small',
        castTime: 6.0,
        effect: 'Your Weapons gain +2 Damage for the fight',
        additionalEffect: 'When you use a Weapon, Charge this 1 second',
      },
      {
        name: 'Claws',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 24 Damage',
        additionalEffect: 'This deals double Crit Damage',
        quantity: 2
      },
      {
        name: 'Obsidian Fang',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 9 Damage',
        additionalEffect: 'Lifesteal',
        quantity: 2
      },
      {
        name: 'Eagle Talisman',
        size: 'Small',
        effect: 'When you sell this, your leftmost item gains +5% Crit chance.',
      }
    ]
  },
  {
    id: 'flame-juggler-6',
    name: 'Flame Juggler',
    level: 6,
    imageUrl: '/encounters/flame-juggler.png',
    skill: {
      name: 'Burst of Flame & Fiery',
      effect: 'The first time your opponent falls below half health, Burn 10 & Your Burn items have +1 Burn',
    },
    loot: [
      {
        name: 'Lighter',
        size: 'Small',
        type: 'Tool',
        castTime: 3.0,
        effect: 'Burn 3',
      },
      {
        name: 'Magma Core',
        size: 'Small',
        effect: 'At the start of each fight, Burn 10',
        quantity: 4
      },
      {
        name: 'Cinders',
        size: 'Small',
        effect: 'When you sell this, your leftmost Burn item gains +1 Burn',
      }
    ]
  },
  {
    id: 'infernal-envoy-6',
    name: 'Infernal Envoy',
    level: 6,
    imageUrl: '/encounters/infernal-envoy.png',
    skill: {
      name: 'Vengeance & Strength',
      effect: 'Your leftmost and rightmost items have their cooldowns reduced by 5% & Your weapons deal +6 damage.',
    },
    loot: [
      {
        name: 'Restorative Fire Claw',
        size: 'Medium',
        castTime: 5.7,
        effect: 'Burn 4, Heal 90.',
        additionalEffect: 'This has +burn equal to the burn of your other items.',
      },
      {
        name: 'Cinders',
        size: 'Small',
        effect: 'When you sell this, your leftmost burn item gains +2 Burn.',
      },
      {
        name: 'Sunlight Spear',
        size: 'Medium',
        castTime: 6.0,
        effect: 'Heal 30, Burn 1',
        additionalEffect: 'When you heal, this gains +2 burn for the fight.',
      }
    ]
  },
  {
    id: 'zookeeper-6',
    name: 'Zookeeper',
    level: 6,
    imageUrl: '/encounters/zookeeper.png',
    skill: {
      name: 'Toxic Friendship',
      effect: 'When you use a Friend, Poison 1',
    },
    loot: [
      {
        name: 'Pelt',
        size: 'Small',
        effect: 'Sells for gold',
        quantity: 2
      },
      {
        name: 'Dragon Whelp',
        size: 'Small',
        type: 'Weapon',
        castTime: 9.0,
        effect: 'Deal 31 Damage',
        additionalEffect: "Burn equal to this item's Damage",
      },
      {
        name: 'Crook',
        size: 'Medium',
        type: 'Tool',
        castTime: 5.0,
        effect: 'Deal 40 Damage',
        additionalEffect: 'Your Weapons have +10 Damage for each Medium item you have',
      },
      {
        name: 'Leeches',
        size: 'Medium',
        type: 'Friend',
        castTime: 6.0,
        effect: 'Deal 55 Damage',
        additionalEffect: 'When you Poison, this gains this gains 5 Damage for the fight, Lifesteal',
      },
      {
        name: 'Salamander Pup',
        size: 'Medium',
        type: 'Friend',
        castTime: 8.0,
        effect: 'Burn 6',
        additionalEffect: 'When you sell this, your leftmost Burn item gains +6 Burn',
      },
      {
        name: 'Trained Spider',
        size: 'Small',
        type: 'Friend',
        castTime: 5.0,
        effect: 'Poison 2',
        additionalEffect: 'When you sell this, your leftmost Poison item gains +2 Poison',
      }
    ]
  }
]

const LEVEL_7_ENCOUNTERS: Encounter[] = [
  {
    id: 'foreman-7',
    name: 'Foreman',
    level: 7,
    imageUrl: '/encounters/foreman.png',
    skill: {
      name: 'Flashy Mechanic',
      effect: 'When you use a Tool, your items gain 5% Crit chance',
    },
    loot: [
      {
        name: 'Scrap',
        size: 'Small',
        effect: 'When you sell this, give your leftmost Shield item +12 Shield',
      },
      {
        name: 'Chris Army Knife',
        size: 'Small',
        type: 'Friend',
        castTime: 5.0,
        effect: 'Deal 10 Damage, Shield 10',
      },
      {
        name: 'Power Sander',
        size: 'Small',
        type: 'Tool',
        castTime: 4.0,
        effect: 'Adjacent Weapons gain +6 Damage for the fight',
        additionalEffect: 'Adjacent Shield items gain +6 Shield for the fight',
      },
      {
        name: 'Crane',
        size: 'Large',
        type: 'Vehicle',
        castTime: 10.0,
        effect: 'Deal 106 Damage',
        additionalEffect: 'When you use an adjacent Large item, this gains 30% Damage for the fight. When you use an adjacent Medium item, this gains 20% Damage for the fight',
      },
      {
        name: 'Fork Lift',
        size: 'Large',
        type: 'Vehicle',
        castTime: 10.0,
        effect: 'Deal 30 Damage for each item to the left of this, Haste this and the items on the right of this for 3 seconds',
      },
      {
        name: 'Cog',
        size: 'Small',
        type: 'Tool',
        castTime: 4.0,
        effect: 'Haste an adjacent item for 1 second',
      }
    ]
  },
  {
    id: 'gorgon-noble-7',
    name: 'Gorgon Noble',
    level: 7,
    imageUrl: '/encounters/gorgon-noble.png',
    skill: {
      name: 'Multiple Skills',
      effect: 'Paralytic Poison: The first time you Poison each fight, Freeze an item for 3 seconds\nInitial Dose: Your leftmost Poison item has +4 Poison\nPetrifying Gaze: The first time you fall below half health each fight, Freeze all enemy items for 3 seconds',
    },
    loot: [
      {
        name: 'Vial of Blood',
        size: 'Small',
        effect: 'When you sell this, gain 1 XP',
      },
      {
        name: 'Black Rose',
        size: 'Small',
        castTime: 5.0,
        effect: 'Heal 15',
        additionalEffect: 'When you Poison, Charge this 1 second',
      },
      {
        name: 'Toxic Clockwork Blades',
        size: 'Medium',
        type: 'Weapon',
        castTime: 6.0,
        effect: 'Deal 30 Damage, Poison 10',
        additionalEffect: "When you sell this, reduce your items' Cooldown by 2%",
      },
      {
        name: 'Nightshade',
        size: 'Medium',
        castTime: 4.0,
        effect: 'Poison 2, Heal 20',
      },
      {
        name: 'Trained Spider',
        size: 'Small',
        type: 'Friend',
        castTime: 5.0,
        effect: 'Poison 2',
        additionalEffect: 'When you sell this, your leftmost Poison item gains +2 Poison',
      },
      {
        name: 'Basilisk Fang',
        size: 'Small',
        type: 'Weapon',
        castTime: 3.0,
        effect: 'Deal 10 Damage',
        critChance: 10,
        additionalEffect: 'When you Poison, this gains 10% Crit Chance for the fight, Lifesteal',
      }
    ]
  },
  {
    id: 'hydrodude-7',
    name: 'Hydrodude',
    level: 7,
    imageUrl: '/encounters/hydrodude.png',
    skill: {
      name: 'Slow and Steady & Slowed Targets',
      effect: 'When you Slow, your Weapons gain +3 Damage for the fight & When you Slow, your items gain +2% Crit Chance for the fight',
    },
    loot: [
      {
        name: 'Coconut',
        size: 'Small',
        effect: 'When you sell this, gain +40 Max Health',
      },
      {
        name: 'Chum',
        size: 'Small',
        type: 'Aquatic',
        castTime: 4.0,
        effect: 'Your Aquatic items gain +3% Crit Chance for the fight',
        additionalEffect: 'When you buy this, get a Piranha',
      },
      {
        name: 'Piranha',
        size: 'Small',
        type: 'Aquatic',
        castTime: 5.0,
        effect: 'Deal 15 Damage',
        additionalEffect: 'This deals double Crit Damage',
      },
      {
        name: 'IllusoRay',
        size: 'Small',
        type: 'Aquatic',
        castTime: 7.0,
        effect: 'Slow 1 item for 2 seconds, Multicast 2',
        additionalEffect: 'For each adjacent Friend, this gains 1 Multicast',
      },
      {
        name: 'Narwhal',
        size: 'Small',
        type: 'Aquatic',
        castTime: 4.0,
        effect: 'Deal 12 Damage',
        critChance: 3,
      },
      {
        name: 'Electric Eels',
        size: 'Large',
        type: 'Aquatic',
        effect: 'When your enemy uses a Weapon, deal 5 Damage. When your enemy uses a non-Weapon item, Slow it for 1 second.',
      },
      {
        name: 'Citrus',
        size: 'Small',
        effect: 'When you sell this, gain +4 Regeneration.',
      }
    ]
  },
  {
    id: 'mod-squad-7',
    name: 'Mod Squad',
    level: 7,
    imageUrl: '/encounters/mod-squad.png',
    skill: {
      name: 'Beautiful Friendship',
      effect: 'When you use a Friend, your Weapons gain +2 Damage for the fight.',
    },
    loot: [
      {
        name: 'Crypto',
        size: 'Small',
        effect: "At the start of each hour, set this item's value to a number between 0 and 20.",
        quantity: 2
      },
      {
        name: 'First Aiden',
        size: 'Small',
        type: 'Friend',
        castTime: 3.6,
        effect: 'Haste 1 item for 1 seconds.',
        additionalEffect: 'When you Haste, Heal +5.',
      },
      {
        name: 'Chris Army Knife',
        size: 'Small',
        type: 'Friend',
        castTime: 4.5,
        effect: 'Deal 10 Damage, Shield: 10.',
      },
      {
        name: 'Bill Dozer',
        size: 'Large',
        type: 'Friend',
        castTime: 5.0,
        effect: 'Deal 20 Damage.',
        additionalEffect: "When you use another Friend, this gains +10 Damage for the fight. Your other Friends' Cooldowns are reduced by 20%.",
      },
      {
        name: 'Bomb Squad',
        size: 'Small',
        type: 'Friend',
        castTime: 6.3,
        effect: 'Burn 4.',
        additionalEffect: 'When you use an adjacent Friend, this gains Haste for 3 seconds.',
      },
      {
        name: 'Char Cole',
        size: 'Small',
        type: 'Friend',
        castTime: 7.2,
        effect: 'Burn 2.',
        additionalEffect: 'When you use another Friend, this gains 1 Burn for the fight.',
      }
    ]
  },
  {
    id: 'sergeant-suds-7',
    name: 'Sergeant Suds',
    level: 7,
    imageUrl: '/encounters/sergeant-suds.png',
    skill: {
      name: 'Clean Storefront',
      effect: 'Your leftmost item has +15 value during combat',
    },
    loot: [
      {
        name: 'Dishwasher',
        size: 'Large',
        type: 'Tool',
        castTime: 8.0,
        effect: 'Haste your Tools for 3 seconds. Your Weapons gain +40 Damage for the fight',
      },
      {
        name: 'Hogwash',
        size: 'Large',
        type: 'Property',
        castTime: 4.0,
        effect: 'Heal equal to 8% of your Max Health',
        additionalEffect: 'When you Heal, gain +15 Max Health for the fight',
      },
      {
        name: 'Rivet Gun',
        size: 'Small',
        type: 'Weapon',
        castTime: 9.0,
        effect: 'Deal 15 Damage',
        additionalEffect: 'When you use the item to the right of this, Charge the item to the left of this 1 second',
      },
      {
        name: 'Orbital Polisher',
        size: 'Small',
        type: 'Tool',
        castTime: 7.0,
        effect: 'Adjacent items gain +5 Damage for the fight, Adjacent items gain +5 Shield for the fight',
      },
      {
        name: 'Hydraulic Squeezer',
        size: 'Medium',
        type: 'Tool',
        castTime: 9.0,
        effect: 'Deal 26 Damage',
        additionalEffect: 'When you use a Tool, your Weapons gain +2 Damage for the fight',
      }
    ]
  },
  {
    id: 'trash-golem-7',
    name: 'Trash Golem',
    level: 7,
    imageUrl: '/encounters/trash-golem.png',
    skill: {
      name: 'Jury Rigger',
      effect: 'When you use an Ammo item, reload the item to the left of it 1 Ammo',
    },
    loot: [
      {
        name: 'Junkyard Catapult',
        size: 'Large',
        type: 'Weapon',
        castTime: 6.0,
        effect: 'Deal 50 Damage, Burn 8, Poison 6',
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Plasma Grenade',
        size: 'Small',
        castTime: 4.0,
        effect: 'Burn both players 5, Slow enemy items for 1 second',
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Grenade',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 40 Damage',
        critChance: 25,
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Noxious Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 3.0,
        effect: 'Poison both players 4',
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Rainbow Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 7.0,
        effect: 'Burn 4, Poison 2, Freeze 1 item for 2 seconds, Slow 1 item for 4 seconds',
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Grapeshot',
        size: 'Small',
        type: 'Weapon',
        castTime: 3.0,
        effect: 'Deal 15 Damage',
        additionalEffect: 'When you use another Ammo item, this reloads 1 Ammo\nAmmo: 2',
      },
      {
        name: 'Powder Keg',
        size: 'Medium',
        type: 'Weapon',
        castTime: 20.0,
        effect: "Deal Damage equal to 40% of your enemy's Max Health and destroy this",
        additionalEffect: 'When you Burn, Charge this 1 second\nAmmo: 1',
      }
    ]
  },
  {
    id: 'viper-tyrant-7',
    name: 'Viper Tyrant',
    level: 7,
    imageUrl: '/encounters/viper-tyrant.png',
    skill: {
      name: 'Revitalizing Toxins',
      effect: 'When you Poison, gain +4 Regeneration for the fight',
    },
    loot: [
      {
        name: 'Gland',
        size: 'Small',
        effect: 'When you sell this, gain +4 Regeneration',
      },
      {
        name: 'Extract',
        size: 'Small',
        effect: 'When you sell this, your leftmost Poison item gains +1 Poison',
      },
      {
        name: 'Venom',
        size: 'Small',
        effect: 'When you use an adjacent Weapon, Poison 1',
      },
      {
        name: 'Toxic Fang',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 9 Damage, Poison 2',
      },
      {
        name: 'Basilisk Fang',
        size: 'Small',
        type: 'Weapon',
        castTime: 3.0,
        effect: 'Deal 10 Damage',
        critChance: 20,
        additionalEffect: 'When you Poison, this gains 10% Crit Chance for the fight, Lifesteal',
      },
      {
        name: 'Copper Ed',
        size: 'Small',
        type: 'Friend',
        castTime: 6.0,
        effect: 'Poison 3, Shield 15',
      },
      {
        name: 'Noxious Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 3.0,
        effect: 'Poison both players 4',
        additionalEffect: 'Ammo: 1',
      }
    ]
  }
]

const LEVEL_8_ENCOUNTERS: Encounter[] = [
  {
    id: 'cosmic-roc-8',
    name: 'Cosmic Roc',
    level: 8,
    imageUrl: '/encounters/cosmic-roc.png',
    skill: {
      name: 'Keen Eye & Cosmic Wind',
      effect: 'Your items have +9% Crit chance & When you Crit, Haste an item for 1 second.',
    },
    loot: [
      {
        name: 'Feather',
        size: 'Small',
        effect: "When you sell this, reduce your leftmost item's Cooldown by 12%.",
      },
      {
        name: 'Cosmic Amulet',
        size: 'Small',
        castTime: 8.0,
        effect: 'Shield 50.',
        critChance: 9,
        additionalEffect: 'When this gains Haste, give your items +3% Crit Chance for the fight.',
      },
      {
        name: 'Cosmic Plumage',
        size: 'Medium',
        castTime: 6.0,
        effect: 'Your Shield items gain +4 Shield and your Weapons +4 Damage for the fight.',
        additionalEffect: 'When you Crit, Charge this 1 second.',
      },
      {
        name: 'Claws',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 16 Damage.',
        critChance: 9,
        additionalEffect: 'This deals double Crit Damage.',
      }
    ]
  },
  {
    id: 'enclave-weeper-8',
    name: 'Enclave Weeper',
    level: 8,
    imageUrl: '/encounters/enclave-weeper.png',
    loot: [
      {
        name: 'Extract',
        size: 'Small',
        effect: 'When you sell this, your leftmost Poison item gains +1 Poison.',
      },
      {
        name: 'Bandages',
        size: 'Small',
        castTime: 4.0,
        effect: 'Heal 10, Shield 10.',
      },
      {
        name: 'Ouroboros Statue',
        size: 'Medium',
        castTime: 9.0,
        effect: 'Poison 4',
        additionalEffect: 'When you Poison, gain +1 Regeneration for the fight.',
      },
      {
        name: 'Death Caps',
        size: 'Medium',
        castTime: 5.0,
        effect: 'Poison 1, increase the Poison of your items by 1 for the fight.',
      },
      {
        name: 'Thurible',
        size: 'Small',
        type: 'Tool',
        castTime: 8.0,
        effect: 'Gain +2 Regeneration for the fight.',
        additionalEffect: 'When you gain Regeneration, Burn 2',
      },
      {
        name: 'Ectoplasm',
        size: 'Small',
        castTime: 6.0,
        effect: "Poison 2, Heal equal to your opponent's Poison.",
        critChance: 2,
      },
      {
        name: 'Vial of Blood',
        size: 'Small',
        effect: 'When you sell this, gain 1 XP.',
      }
    ]
  },
  {
    id: 'joyful-jack-8',
    name: 'Joyful Jack',
    level: 8,
    imageUrl: '/encounters/joyful-jack.png',
    skill: {
      name: 'Multiple Skills',
      effect: 'Equivalent Exchange: When you Heal, Poison 1.\nRapid Reconstruction: Your Heal items have their Cooldowns reduced by 8%.\nCritical Aid: Your Heal items have +6% Crit chance.',
    },
    loot: [
      {
        name: 'Extract',
        size: 'Small',
        effect: 'When you sell this, your leftmost Poison item gains +3 Poison.',
      },
      {
        name: 'Black Rose',
        size: 'Small',
        castTime: 5.5,
        effect: 'Heal 30.',
        critChance: 6,
        additionalEffect: 'When you Poison, Charge this 1 second.',
      },
      {
        name: 'Poppy Field',
        size: 'Large',
        type: 'Property',
        castTime: 8.1,
        effect: 'Poison 6',
        additionalEffect: "If you have no Weapons, reduce your items' Cooldowns by 10%.",
      },
      {
        name: 'Succulents',
        size: 'Small',
        castTime: 3.7,
        effect: 'Heal 4.',
        critChance: 6,
        additionalEffect: 'This permanently gains +2 Heal.',
      },
      {
        name: 'Bushel',
        size: 'Medium',
        castTime: 4.6,
        effect: 'Heal 10.',
        critChance: 6,
        additionalEffect: 'When you Heal, Shield 20.',
      }
    ]
  },
  {
    id: 'loan-shark-8',
    name: 'Loan Shark',
    level: 8,
    imageUrl: '/encounters/loan-shark.png',
    skill: {
      name: 'Power Broker & Crashing Waves',
      effect: 'Your Weapons have +Damage equal to your Income & When you use an Aquatic item, Haste a Weapon for 1 second.',
    },
    loot: [
      {
        name: 'Sharkray',
        size: 'Medium',
        type: 'Aquatic',
        castTime: 7.0,
        effect: 'Deal 37 Damage',
        additionalEffect: 'When you Haste, this gains +25 Damage for the fight.',
      },
      {
        name: 'Sharkclaws',
        size: 'Medium',
        type: 'Aquatic',
        castTime: 4.0,
        effect: 'Deal 27 Damage',
        additionalEffect: 'Your Weapons gain +6 Damage for the fight.',
      },
      {
        name: 'ATM',
        size: 'Medium',
        type: 'Property',
        castTime: 3.0,
        effect: 'Gain Shield equal to double your Income.',
        additionalEffect: 'When you buy this, you gain +2 Income.',
      },
      {
        name: 'Cash Cannon',
        size: 'Medium',
        type: 'Weapon',
        castTime: 6.0,
        effect: 'Deal 44 Damage.',
        additionalEffect: 'When you gain gold, permanently this gains Damage equal to double the amount of gold gained.',
      }
    ]
  },
  {
    id: 'thug-8',
    name: 'Thug',
    level: 8,
    imageUrl: '/encounters/thug.png',
    skill: {
      name: 'Multiple Skills',
      effect: 'Bonk: Enemy Cooldowns are increased by 1 second.\nStrength: Your Weapons deal +6 Damage.\nSmall Weaponry: Your Small Weapons deal +9 Damage.',
    },
    loot: [
      {
        name: 'Thieves Guild Medallion',
        size: 'Small',
        effect: 'When you sell this, gain access to the Thieves Guild.',
      },
      {
        name: 'Toxic Concealed Dagger',
        size: 'Small',
        type: 'Weapon',
        castTime: 8.0,
        effect: 'Deal 39 Damage, Gain 2 gold.',
        additionalEffect: 'Poison 4.',
      },
      {
        name: 'Anchor',
        size: 'Medium',
        type: 'Aquatic',
        castTime: 15.0,
        effect: "Deal Damage equal to 20% of your enemy's Max Health.",
        additionalEffect: 'When you use a Medium item, this gains Haste for 2 seconds.',
      },
      {
        name: 'Improvised Bludgeon',
        size: 'Medium',
        type: 'Weapon',
        castTime: 7.0,
        effect: 'Deal 66 Damage',
        additionalEffect: 'Slow 2 items for 4 seconds, When you sell this, your leftmost Slow item gains +2 Slow.',
      },
      {
        name: 'Spices',
        size: 'Small',
        castTime: 8.0,
        effect: "Your Weapons gain Damage equal to your weakest weapon's Damage for the fight.",
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Junkyard Club',
        size: 'Medium',
        type: 'Weapon',
        castTime: 10.0,
        effect: 'Deal 66 Damage.',
        additionalEffect: 'When you sell this, your Weapons gain +6 Damage.',
      },
      {
        name: 'Toxic Brass Knuckles',
        size: 'Small',
        type: 'Weapon',
        castTime: 8.0,
        effect: 'Deal 84 Damage, Poison 4.',
        additionalEffect: 'While this has 40 or more Damage, this has +1 Multicast.\nMulticast: 2',
      }
    ]
  }
]

const LEVEL_9_ENCOUNTERS: Encounter[] = [
  {
    id: 'bounty-hunter-9',
    name: 'Bounty Hunter',
    level: 9,
    imageUrl: '/encounters/bounty-hunter.png',
    skill: {
      name: 'Ambush',
      effect: "At the start of each fight, deal Damage equal to 15% of the enemy's Max Health.",
    },
    loot: [
      {
        name: 'Revolver',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 48 Damage',
        critChance: 30,
        additionalEffect: 'When you Crit, fully reload this\nAmmo: 6',
      },
      {
        name: 'Thrown Net',
        size: 'Medium',
        type: 'Weapon',
        castTime: 5.0,
        effect: 'Deal 28 Damage',
        critChance: 10,
        additionalEffect: "Your Weapons gain +3 Damage for the fight, and your opponent's Weapons lose 3 Damage for the fight.",
      },
      {
        name: 'Cutlass',
        size: 'Medium',
        type: 'Weapon',
        castTime: 5.0,
        effect: 'Deal 36 Damage.',
        critChance: 10,
        additionalEffect: 'This deals double Crit Damage.',
      },
      {
        name: 'Wanted Poster',
        size: 'Medium',
        effect: 'When you win a fight against a player, gain 1 XP. If you had Wanted Poster on your board, gain 1 additional XP.',
        additionalEffect: 'Your items have 10% Crit Chance.',
      },
      {
        name: 'Flashbang',
        size: 'Small',
        castTime: 6.0,
        effect: 'Slow all enemy items for 3 seconds',
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Broken Shackles',
        size: 'Small',
        castTime: 6.0,
        effect: 'Your Weapons gain +4 Damage for the fight',
        additionalEffect: 'When you use a Weapon, Charge this 1 second.',
      }
    ]
  },
  {
    id: 'chilly-charles-9',
    name: 'Chilly Charles',
    level: 9,
    imageUrl: '/encounters/chilly-charles.png',
    skill: {
      name: 'Reaching the Summit',
      effect: 'When you Freeze, your items gain +2% Crit Chance for the fight.',
    },
    loot: [
      {
        name: 'Icicle',
        size: 'Small',
        effect: 'At the start of each fight, Freeze 1 item for 5 seconds.',
      },
      {
        name: 'Ice Cubes',
        size: 'Small',
        type: 'Food',
        castTime: 9.0,
        effect: 'Freeze 3 small items for 1 second.',
      },
      {
        name: 'Ice Cream Truck',
        size: 'Large',
        type: 'Vehicle',
        castTime: 6.0,
        effect: 'Freeze 1 item for 2 seconds.',
        additionalEffect: 'When you use another non-Weapon item, Charge this 1 second.',
      },
      {
        name: 'Icy Hammock',
        size: 'Medium',
        castTime: 2.0,
        effect: 'Heal 100; Freeze 1 item for 1 second.',
        critChance: 8,
        additionalEffect: "This item's Cooldown is reduced by 5 seconds for each adjacent large item.",
      },
      {
        name: 'Igloo',
        size: 'Large',
        type: 'Property',
        castTime: 6.0,
        effect: 'Freeze 1 item for 3 seconds.',
        critChance: 8,
        additionalEffect: 'When you Freeze, Shield 30.',
      }
    ]
  },
  {
    id: 'elite-duelist-9',
    name: 'Elite Duelist',
    level: 9,
    imageUrl: '/encounters/elite-duelist.png',
    skill: {
      name: 'Big Ego & Small Weaponry',
      effect: 'Your Weapons have Lifesteal & Your Small Weapons deal +18 Damage.',
    },
    loot: [
      {
        name: 'Revolver',
        size: 'Small',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 54 Damage.',
        critChance: 20,
        additionalEffect: 'When you Crit, fully reload this; Lifesteal.\nAmmo: 6',
        quantity: 2
      },
      // ... continue with remaining Elite Duelist loot
    ]
  },
  {
    id: 'infernal-9',
    name: 'Infernal',
    level: 9,
    imageUrl: '/encounters/infernal.png',
    skill: {
      name: 'Multiple Skills',
      effect: 'Tracer Fire: When you Burn, your items gain +2% Crit Chance for the fight.\nBurning Rage: When you Burn, your Weapons gain +4 Damage for the fight.\nStrength: At the start of each fight, Burn 11.',
    },
    loot: [
      {
        name: 'Magma Core',
        size: 'Small',
        effect: 'At the start of each fight, Burn 11.',
        quantity: 2
      },
      {
        name: 'Infernal Greatsword',
        size: 'Large',
        type: 'Weapon',
        castTime: 8.0,
        effect: "Deal 185 Damage. Burn equal to this item's Damage. This item gains + Damage for the fight equal to your enemy's Burn.",
        critChance: 12,
      },
      {
        name: 'Cinders',
        size: 'Small',
        effect: 'When you sell this, your leftmost Burn item gains +4 Burn.',
        quantity: 2
      },
      {
        name: 'Ruby',
        size: 'Small',
        castTime: 10.0,
        effect: 'Burn 4.',
        critChance: 12,
        additionalEffect: "Increase your other items' Burn by 2.",
      }
    ]
  },
  {
    id: 'infernal-frigate-9',
    name: 'Infernal Frigate',
    level: 9,
    imageUrl: '/encounters/infernal-frigate.png',
    skill: {
      name: 'Firestarter',
      effect: 'At the start of each fight, Burn 17.',
    },
    loot: [
      {
        name: 'Trebuchet',
        size: 'Large',
        type: 'Weapon',
        castTime: 8.0,
        effect: 'Burn 12; Deal 50 Damage',
        additionalEffect: 'When you Burn, Haste an item for 3 seconds.',
      },
      {
        name: 'Rocket Launcher',
        size: 'Medium',
        type: 'Weapon',
        castTime: 6.0,
        effect: 'Deal 20 Damage, Burn 2, Multicast 3',
        additionalEffect: 'While your enemy has Burn, this has double Damage.',
      },
      {
        name: 'Pop Snappers',
        size: 'Small',
        castTime: 3.0,
        effect: 'Burn 6.',
      },
      {
        name: 'Incendiary Rounds',
        size: 'Small',
        effect: 'When you use an adjacent item, Burn 2, Adjacent items have +1 Ammo.',
      },
      {
        name: 'Thrusters',
        size: 'Small',
        castTime: 5.3,
        effect: 'Burn both players 4.',
        additionalEffect: 'Adjacent items have their Cooldowns reduced by 12%.',
      }
    ]
  },
  {
    id: 'oasis-guardian-9',
    name: 'Oasis Guardian',
    level: 9,
    imageUrl: '/encounters/oasis-guardian.png',
    skill: {
      name: 'Waters of Infinity',
      effect: 'You have +8 Regeneration.',
    },
    loot: [
      {
        name: 'Ouroboros Statue',
        size: 'Medium',
        castTime: 9.0,
        effect: 'Poison 4',
        additionalEffect: 'When you Poison, gain +1 Regeneration for the fight.',
      },
      {
        name: 'Venomander',
        size: 'Small',
        type: 'Friend',
        castTime: 8.0,
        effect: 'Poison 1',
        additionalEffect: 'When you use the item to the left of this, gain +1 Regeneration for the fight.',
      },
      {
        name: 'Sleeping Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 5.0,
        effect: 'Slow 2 items for 6 seconds.',
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Incense',
        size: 'Small',
        castTime: 10.0,
        effect: 'Slow 1 item for 4 seconds.',
        additionalEffect: 'When you Slow, Heal 16.',
      },
      {
        name: 'Fossilized Femur',
        size: 'Large',
        type: 'Weapon',
        castTime: 12.0,
        effect: 'Deal 200 Damage.',
        additionalEffect: 'When you Slow, Charge this 1 second.',
      },
      {
        name: 'Nightshade',
        size: 'Medium',
        castTime: 4.0,
        effect: 'Poison 3, Heal 30',
      }
    ]
  },
  {
    id: 'treasure-turtle-9',
    name: 'Treasure Turtle',
    level: 9,
    imageUrl: '/encounters/treasure-turtle.png',
    skill: {
      name: 'Toughness & Hunker Down',
      effect: 'Your Shield items have +12 Shield & The first time you fall below half health each fight, Shield equal to 30% of your Max Health.',
    },
    loot: [
      {
        name: 'Bag of Jewels',
        size: 'Small',
        effect: 'Sells for gold.',
        quantity: 2
      },
      {
        name: 'Seaweed',
        size: 'Small',
        type: 'Aquatic',
        castTime: 6.0,
        effect: 'Heal 20.',
        additionalEffect: 'When you use an Aquatic item, this gains +10 Heal for the fight.',
      },
      {
        name: 'Sea Shell',
        size: 'Small',
        type: 'Aquatic',
        castTime: 5.0,
        effect: 'Shield 15 for each Aquatic item you have.',
      },
      {
        name: 'Turtle Shell',
        size: 'Medium',
        type: 'Aquatic',
        castTime: 5.0,
        effect: 'Give your items +5 Shield for the fight.',
        additionalEffect: 'When you use another non-Weapon item, Shield 32.',
      },
      {
        name: 'Catfish',
        size: 'Small',
        type: 'Aquatic',
        castTime: 6.0,
        effect: 'Poison 3.',
        additionalEffect: 'When this gains Haste, give it +3 Poison for the fight.',
      },
      {
        name: 'Pearl',
        size: 'Small',
        type: 'Aquatic',
        effect: 'When you use an Aquatic item, Shield 27.',
      },
      {
        name: 'Clamera',
        size: 'Small',
        type: 'Aquatic',
        castTime: 9.0,
        effect: 'Slow 2 items for 2 seconds.',
        additionalEffect: 'At the start of each fight, use this.',
      },
      {
        name: 'Genie Lamp',
        size: 'Small',
        effect: 'When you sell this, gain access to the genie Rift.',
      }
    ]
  }
]

const LEVEL_10_ENCOUNTERS: Encounter[] = [
  {
    id: 'bloodreef-captain-10',
    name: 'Bloodreef Captain',
    level: 10,
    imageUrl: '/encounters/bloodreef-captain.png',
    skill: {
      name: 'Full Arsenal',
      effect: "Your items' Cooldowns are reduced by 5% if you have a Vehicle, reduced by 5% if you have a Weapon, and reduced by 5% if you have a Tool.",
    },
    loot: [
      {
        name: "Captain's Wheel",
        size: 'Medium',
        type: 'Aquatic',
        castTime: 3.4,
        effect: 'Haste adjacent items for 2 seconds.',
        additionalEffect: 'When you use a large item, use this.',
      },
      {
        name: "Crow's Nest",
        size: 'Large',
        type: 'Property',
        effect: 'Your Weapons have +75% Crit Chance. If you have exactly one Weapon, that Weapon has lifesteal.',
      },
      {
        name: 'Flagship',
        size: 'Large',
        type: 'Vehicle',
        castTime: 5.1,
        effect: 'Deal 50 Damage, Multicast: 5.',
        critChance: 75,
        additionalEffect: 'If you have another Tool, Ammo, Property, or Friend, this has +1 Multicast for each, Lifesteal.',
      },
      {
        name: 'Pop Snappers',
        size: 'Small',
        castTime: 2.6,
        effect: 'Burn 6.',
        additionalEffect: 'Ammo: 3',
      },
      {
        name: 'Pesky Pete',
        size: 'Small',
        type: 'Friend',
        castTime: 5.1,
        effect: 'Burn 4.',
        additionalEffect: 'For each adjacent Friend or Property, this gains +4 Burn.',
      }
    ]
  },
  {
    id: 'boss-harrow-10',
    name: 'Boss Harrow',
    level: 10,
    imageUrl: '/encounters/boss-harrow.png',
    skill: {
      name: 'Multiple Skills',
      effect: 'Strength: Your Weapons deal +12 Damage.\nKeen Eye: Your items have +9% Crit chance.\nAssault Focus: When any non-Weapon item is used, Slow it for 2 seconds.',
    },
    loot: [
      {
        name: 'Weakpoint Detector',
        size: 'Medium',
        type: 'Tool',
        castTime: 6.0,
        effect: 'Your Weapons gain +4 Damage for the fight.',
        additionalEffect: 'When you Slow, Charge this 3 seconds.',
      },
      {
        name: 'Runic Double Bow',
        size: 'Medium',
        type: 'Weapon',
        castTime: 6.0,
        effect: 'Deal 84 Damage, Multicast 2',
        critChance: 9,
        additionalEffect: 'This deals double Crit Damage, Lifesteal.',
      },
      {
        name: 'Bayonet',
        size: 'Small',
        type: 'Weapon',
        effect: 'When you use the Weapon to the left of this, deal 39 Damage.',
      },
      {
        name: 'Grappling Hook',
        size: 'Small',
        type: 'Weapon',
        castTime: 7.0,
        effect: 'Deal 34 Damage, Slow 1 item for 3 seconds.',
        critChance: 9,
      },
      {
        name: 'Jitte',
        size: 'Small',
        type: 'Weapon',
        castTime: 5.0,
        effect: 'Deal 118 Damage, Slow 1 item for 2 seconds',
        critChance: 9,
        additionalEffect: 'When you Slow, this gains +10 Damage for the fight.',
      },
      {
        name: 'Katana',
        size: 'Medium',
        type: 'Weapon',
        castTime: 2.0,
        effect: 'Deal 44 Damage.',
        additionalEffect: 'Crit Chance: 9%.',
      },
      {
        name: 'Bayonet',
        size: 'Small',
        type: 'Weapon',
        effect: 'When you use the Weapon to the left of this, deal 51 Damage.',
      }
    ]
  },
  {
    id: 'dr-vortex-10',
    name: 'Dr. Vortex',
    level: 10,
    imageUrl: '/encounters/dr-vortex.png',
    skill: {
      name: 'Neophiliac',
      effect: 'The first time you Freeze, Burn, Slow, Poison, and Haste each fight, Charge an item 2 seconds.',
    },
    loot: [
      {
        name: 'Lightning Rod',
        size: 'Large',
        type: 'Weapon',
        castTime: 10.0,
        effect: 'Deal 360 Damage, Shield 360.',
        critChance: 24,
        additionalEffect: 'When any player uses an item, this gains +10 Damage and +10 Shield for the fight.',
      },
      {
        name: 'Lightbulb',
        size: 'Small',
        castTime: 3.0,
        effect: 'Adjacent items gain +6% Crit Chance for the fight.',
      },
      {
        name: 'Tesla Coil',
        size: 'Medium',
        type: 'Weapon',
        castTime: 5.0,
        effect: 'Deal 20 Damage.',
        additionalEffect: 'Crit Chance: 54%, When you use an adjacent item, deal 20 Damage.',
      },
      {
        name: 'Cog',
        size: 'Small',
        type: 'Tool',
        castTime: 4.0,
        effect: 'Haste an adjacent item for 2 seconds.',
      },
      {
        name: 'Weather Machine',
        size: 'Large',
        type: 'Vehicle',
        castTime: 3.0,
        effect: 'Burn 2, Freeze 1 item for 2 seconds.',
        additionalEffect: 'Slow 1 item for 1 second.',
      }
    ]
  },
  {
    id: 'ferros-khan-10',
    name: 'Ferros Khan',
    level: 10,
    imageUrl: '/encounters/ferros-khan.png',
    skill: {
      name: 'Multiple Skills',
      effect: 'One Shot, One Kill: If you only have one Weapon, it deals triple Damage and has its Cooldown increased by 50%.\nLeft-Handed: Your leftmost Weapon deals +24 Damage.\nRight-Handed: Your rightmost Weapon has +24 Damage.',
    },
    loot: [
      {
        name: 'Shadowed Cloak',
        size: 'Medium',
        type: 'Cloak',
        effect: 'When you use the item to the right of this, give it Haste for 3 seconds and +7 Damage for the fight.',
      },
      {
        name: 'Sniper Rifle',
        size: 'Medium',
        type: 'Weapon',
        castTime: 10.5,
        effect: 'Deal 2670 Damage.',
        additionalEffect: 'Crit Chance: 30%. This deals 5 times more Damage if it is your only Weapon.',
      },
      {
        name: 'Silencer',
        size: 'Small',
        type: 'Weapon',
        effect: 'The Weapon to the left of this has +30 Damage.',
        additionalEffect: 'If you have exactly one Weapon, reduce its Cooldown by 30%.',
      },
      {
        name: 'Barrel',
        size: 'Medium',
        type: 'Shield',
        castTime: 4.0,
        effect: 'Shield 30.',
        additionalEffect: 'Crit Chance: 30%. When you use a non-Weapon item, this gains +10 Shield for the fight.',
      },
      {
        name: 'Disguise',
        size: 'Medium',
        effect: 'When you buy this, get a non-Vanessa item. Your items from other Heroes have +30% Crit Chance.',
      },
      {
        name: 'Energy Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 4.0,
        effect: 'Haste your items for 4 seconds.',
        additionalEffect: 'Ammo: 1',
      }
    ]
  },
  {
    id: 'hulking-experiment-10',
    name: 'Hulking Experiment',
    level: 10,
    imageUrl: '/encounters/hulking-experiment.png',
    skill: {
      name: 'Parting Shot & Adaptive Ordinance',
      effect: 'When you use an Ammo item, give it +5% Crit Chance for the fight & You have +2 Regeneration for each Ammo item you have.',
    },
    loot: [
      {
        name: 'Athanor',
        size: 'Large',
        type: 'Property',
        castTime: 6.0,
        effect: 'Burn 6, Poison 3, Reload your Potions.',
      },
      {
        name: 'Bottled Lightning',
        size: 'Small',
        type: 'Potion',
        castTime: 6.0,
        effect: 'Deal 75 Damage, Burn 6.',
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Energy Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 5.0,
        effect: 'Haste your items for 6 seconds.',
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Fire Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 6.0,
        effect: 'Burn 9.',
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Rainbow Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 8.0,
        effect: 'Burn 4, Poison 2, Freeze 1 item for 2 seconds, Slow 1 item for 4 seconds.',
      },
      {
        name: 'Noxious Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 4.0,
        effect: 'Poison both players 6.',
        critChance: 5,
      }
    ]
  },
  {
    id: 'lich-10',
    name: 'Lich',
    level: 10,
    imageUrl: '/encounters/lich.png',
    loot: [
      {
        name: 'Cauldron',
        size: 'Medium',
        type: 'Tool',
        castTime: 5.0,
        effect: 'Burn 4, Poison 5.',
      },
      {
        name: 'Ectoplasm',
        size: 'Small',
        castTime: 7.0,
        effect: 'Poison 5',
        additionalEffect: "Heal equal to your opponent's Poison.",
      },
      {
        name: 'Icicle',
        size: 'Small',
        effect: 'At the start of each fight, Freeze 1 item for 5 seconds.',
      },
      {
        name: 'Necronomicon',
        size: 'Medium',
        effect: 'When any non-Weapon item is used, Poison 4 and gain +1 Regen for the fight. Your items have their Cooldowns increased by 1 second.',
      },
      {
        name: 'Wand',
        size: 'Small',
        castTime: 6.0,
        effect: 'Charge your other non-Weapon items 1 second.',
      },
      {
        name: 'Emerald',
        size: 'Small',
        castTime: 7.0,
        effect: 'Poison 3',
        additionalEffect: "Increase your other items' Poison by 1.",
      },
      {
        name: 'Soul Ring',
        size: 'Small',
        castTime: 9.0,
        effect: 'Poison equal to your Regeneration.',
        additionalEffect: 'You have +2 Regeneration.',
      }
    ]
  },
  {
    id: 'master-alchemist-10',
    name: 'Master Alchemist',
    level: 10,
    imageUrl: '/encounters/master-alchemist.png',
    skill: {
      name: 'Retool',
      effect: 'When you use a Tool, reload 1 Ammo to adjacent items.',
    },
    loot: [
      {
        name: 'Mortar & Pestle',
        size: 'Medium',
        type: 'Tool',
        castTime: 9.0,
        effect: 'Give your Lifesteal Weapons +10 Damage for the fight.',
        additionalEffect: 'The Weapon on the right has Lifesteal.',
      },
      {
        name: 'Refractor',
        size: 'Medium',
        type: 'Weapon',
        castTime: 8.0,
        effect: 'Deal 20 Damage.',
        additionalEffect: 'When you Slow, Freeze, Burn or Poison, this gains +10 Damage for the fight. Lifesteal.',
      },
      {
        name: 'Rainbow Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 8.0,
        effect: 'Burn 4, Poison 2.',
        additionalEffect: 'Freeze 1 item for 2 seconds. Slow 1 item for 4 seconds.',
      },
      {
        name: 'Cauldron',
        size: 'Medium',
        type: 'Tool',
        castTime: 5.0,
        effect: 'Burn 2, Poison 1.',
      },
      {
        name: 'Weather Glass',
        size: 'Medium',
        type: 'Tool',
        castTime: 7.0,
        effect: 'Burn 6, Poison 3.',
        additionalEffect: 'Multicast: 5. If you have another item with Burn, Poison, Slow, or Freeze, this has +1 Multicast for the fight.',
      }
    ]
  },
  {
    id: 'robo-bouncer-10',
    name: 'Robo Bouncer',
    level: 10,
    imageUrl: '/encounters/robo-bouncer.png',
    skill: {
      name: 'Sharpened Steel',
      effect: 'When you use a Weapon, adjacent items gain 8% Crit Chance for the fight.',
    },
    loot: [
      {
        name: 'Cybersecurity',
        size: 'Medium',
        type: 'Friend',
        castTime: 13.0,
        effect: 'Deal 20 Damage for each Weapon you have.',
        additionalEffect: 'This deals triple Damage if it is your only Friend.',
      },
      {
        name: 'Pulse Rifle',
        size: 'Medium',
        type: 'Weapon',
        castTime: 4.0,
        effect: 'Deal 30 Damage.',
        additionalEffect: 'Multicast: 2. This has +1 Multicast if it is adjacent to a Friend.',
      },
      {
        name: 'Katana',
        size: 'Medium',
        type: 'Weapon',
        castTime: 3.0,
        effect: 'Deal 24 Damage.',
      },
      {
        name: 'Laser Pistol',
        size: 'Small',
        type: 'Weapon',
        castTime: 6.0,
        effect: 'Deal 60 Damage.',
        additionalEffect: 'Crit Chance: 8%.',
      },
      {
        name: 'Sunderer',
        size: 'Small',
        type: 'Weapon',
        castTime: 5.0,
        effect: 'Deal 30 Damage, Your enemy\'s Shield items lose 6 Shield for the fight.',
      },
      {
        name: 'Gatling Gun',
        size: 'Medium',
        type: 'Weapon',
        castTime: 5.0,
        effect: 'Deal 10 Damage, Reduce this item\'s Cooldown by 10% for the fight.',
      }
    ]
  },
  {
    id: 'wandering-shoal-10',
    name: 'Wandering Shoal',
    level: 10,
    imageUrl: '/encounters/wandering-shoal.png',
    skill: {
      name: 'Improved Toxins & Thick Hide',
      effect: 'Your Poison items have +3 Poison & When you Slow, Charge an item 1 second.',
    },
    loot: [
      {
        name: 'Electric Eels',
        size: 'Large',
        type: 'Aquatic',
        effect: 'When your enemy uses a Weapon, deal 5 Damage. When your enemy uses a non-Weapon item, Slow it for 2 seconds.',
      },
      {
        name: 'Catfish',
        size: 'Small',
        type: 'Aquatic',
        castTime: 6.0,
        effect: 'Poison 6',
        additionalEffect: 'When this gains Haste, give it +3 Poison for the fight.',
      },
      {
        name: 'Jellyfish',
        size: 'Small',
        type: 'Aquatic',
        castTime: 8.0,
        effect: 'Poison 6',
        additionalEffect: 'When you use another Aquatic item, this gains Haste for 3 seconds.',
      },
      {
        name: 'Piranha',
        size: 'Small',
        type: 'Aquatic',
        castTime: 5.0,
        effect: 'Deal 15 Damage.',
        additionalEffect: 'This deals double Crit Damage.',
      },
      {
        name: 'Amber',
        size: 'Small',
        castTime: 5.0,
        effect: 'Slow 2 items for 3 seconds.',
        additionalEffect: 'Your other Slow items have +1 Slow.',
      },
      {
        name: 'Seaweed',
        size: 'Small',
        type: 'Aquatic',
        castTime: 6.0,
        effect: 'Heal 10.',
        additionalEffect: 'When you use an Aquatic item, this gains +10 Heal for the fight.',
      },
      {
        name: 'Pufferfish',
        size: 'Medium',
        type: 'Aquatic',
        effect: 'When you Haste, Poison 7.',
      }
    ]
  }
]

const LEVEL_11_ENCOUNTERS: Encounter[] = [
  {
    id: 'roaming-isle-11',
    name: 'Roaming Isle',
    level: 11,
    imageUrl: '/encounters/roaming-isle.png',
    skill: {
      name: 'Multiple Skills',
      effect: 'Shored Up: When you Heal, Shield 100.\nFirst Responder: Your leftmost Heal item has +6 Heal.\nFollow-Up Care: Your rightmost Heal item has +6 Heal.',
    },
    loot: [
      {
        name: 'Tropical Island',
        size: 'Large',
        type: 'Property',
        effect: 'When you Slow, gain +2 Regeneration for the fight. At the start of each hour, get a Coconut or Citrus.',
      },
      {
        name: 'Sea Shell',
        size: 'Small',
        type: 'Aquatic',
        castTime: 5.0,
        effect: 'Shield 30 for each Aquatic item you have.',
      },
      {
        name: 'Pet Rock',
        size: 'Small',
        type: 'Friend',
        castTime: 5.0,
        effect: 'Deal 30 Damage.',
        additionalEffect: 'If this is your only Friend, your items have +15% Crit Chance.',
      },
      {
        name: 'Catfish',
        size: 'Small',
        type: 'Aquatic',
        castTime: 6.0,
        effect: 'Poison 3.',
        additionalEffect: 'When this gains Haste, give it +3 Poison for the fight.',
      },
      {
        name: 'Jellyfish',
        size: 'Small',
        type: 'Aquatic',
        castTime: 8.0,
        effect: 'Poison 3.',
        additionalEffect: 'When you use another Aquatic item, this gains Haste for 3 seconds.',
      },
      {
        name: 'Seaweed',
        size: 'Small',
        type: 'Aquatic',
        castTime: 6.0,
        effect: 'Heal 56.',
        additionalEffect: 'When you use an Aquatic item, this gains +10 Heal for the fight.',
        quantity: 2
      },
      {
        name: 'Clamera',
        size: 'Small',
        type: 'Aquatic',
        castTime: 9.0,
        effect: 'Slow 2 items for 2 seconds.',
        additionalEffect: 'At the start of each fight, use this.',
      }
    ]
  },
  {
    id: 'trash-titan-11',
    name: 'Trash Titan',
    level: 11,
    imageUrl: '/encounters/trash-titan.png',
    skill: {
      name: 'Juggler & Heavy Weaponry',
      effect: 'When you use a small item, Charge a large item for 1 second & Your large Weapons deal +72 Damage.',
    },
    loot: [
      {
        name: 'Venom',
        size: 'Small',
        type: 'Potion',
        effect: 'When you use an adjacent Weapon, Poison 2.',
      },
      {
        name: 'Emerald',
        size: 'Small',
        type: 'Potion',
        castTime: 6.0,
        effect: 'Poison 1.',
        additionalEffect: "Increase your other items' Poison by 1.",
      },
      {
        name: 'Catalyst',
        size: 'Small',
        type: 'Potion',
        effect: 'When you use the item to the left of this, Haste the item to the right of this for 2 seconds.',
      },
      {
        name: 'Junkyard Lance',
        size: 'Large',
        type: 'Weapon',
        castTime: 10.0,
        effect: 'Deal 100 Damage for each Small item you have (including Stash).',
      },
      {
        name: 'Hemlock',
        size: 'Small',
        type: 'Potion',
        castTime: 6.0,
        effect: 'Poison 3.',
      },
      {
        name: 'Ectoplasm',
        size: 'Small',
        type: 'Potion',
        castTime: 6.0,
        effect: "Poison 4. Heal equal to your opponent's Poison.",
      },
      {
        name: 'Venomander',
        size: 'Small',
        type: 'Friend',
        castTime: 8.0,
        effect: 'Poison 2.',
        additionalEffect: 'When you use the item to the left of this, gain +1 Regeneration for the fight.',
      }
    ]
  },
  {
    id: 'weapons-platform-11',
    name: 'Weapons Platform',
    level: 11,
    imageUrl: '/encounters/weapons-platform.png',
    skill: {
      name: 'Distributed Systems & Keen Eye',
      effect: 'When you use a large item, Haste 2 small items for 2 seconds & Your items have +9% Crit chance.',
    },
    loot: [
      {
        name: 'Cog',
        size: 'Small',
        type: 'Tool',
        castTime: 4.0,
        effect: 'Haste an adjacent item for 2 seconds.',
      },
      {
        name: 'Kinetic Cannon',
        size: 'Large',
        type: 'Weapon',
        castTime: 10.0,
        effect: 'Deal 130 Damage.',
        critChance: 9,
        additionalEffect: 'When you use a Small item, this gains +30 Damage for the fight.',
      },
      {
        name: 'Battery',
        size: 'Small',
        type: 'Tool',
        castTime: 4.0,
        effect: 'Charge the item to the left of this 3 seconds.',
        additionalEffect: 'Ammo: 4',
      },
      {
        name: 'Coolant',
        size: 'Small',
        type: 'Tool',
        castTime: 6.0,
        effect: 'Freeze 1 item for 3 seconds.',
        additionalEffect: 'Cleanse half your Burn.',
      },
      {
        name: 'First Aiden',
        size: 'Small',
        type: 'Friend',
        castTime: 4.0,
        effect: 'Haste 1 item for 2 seconds.',
        additionalEffect: 'Crit Chance: 9%, When you Haste, Heal +10.',
      },
      {
        name: 'Laser Pistol',
        size: 'Small',
        type: 'Weapon',
        castTime: 5.0,
        effect: 'Deal 69 Damage.',
        additionalEffect: 'Crit Chance: 9%.',
      },
      {
        name: 'Power Sander',
        size: 'Small',
        type: 'Tool',
        castTime: 4.0,
        effect: 'Adjacent Weapons gain +9 Damage for the fight, Adjacent Shield items gain +9 Shield for the fight.',
      },
      {
        name: 'Uzi',
        size: 'Small',
        type: 'Weapon',
        castTime: 2.0,
        effect: 'Deal 30 Damage.',
        critChance: 9,
        additionalEffect: 'Ammo: 8',
      }
    ]
  }
]

const LEVEL_12_ENCOUNTERS: Encounter[] = [
  {
    id: 'property-baron-12',
    name: 'Property Baron',
    level: 12,
    imageUrl: '/encounters/property-baron.png',
    skill: {
      name: 'Master Salesman',
      effect: 'Your items have double value during combat.',
    },
    loot: [
      {
        name: 'Skyscraper',
        size: 'Large',
        type: 'Property',
        castTime: 5.0,
        effect: 'Deal Damage equal to 3 times the value of your items.',
        critChance: 25,
        additionalEffect: 'This has double value in combat. If you have 4 or fewer items in play, this has +1 Multicast.',
      },
      {
        name: 'Subscraper',
        size: 'Large',
        type: 'Property',
        castTime: 4.0,
        effect: 'Heal equal to 4 times the value of your items.',
        additionalEffect: 'Crit Chance: 25%.',
      },
      {
        name: 'Billboard',
        size: 'Large',
        type: 'Property',
        effect: 'Your Properties have +25% Crit Chance. Your other items have +1 value.',
      },
      {
        name: 'Keychain',
        size: 'Small',
        castTime: 12.0,
        effect: 'Use a Property.',
      }
    ]
  },
  {
    id: 'radiant-corsair-12',
    name: 'Radiant Corsair',
    level: 12,
    imageUrl: '/encounters/radiant-corsair.png',
    skill: {
      name: 'Fiery Rebirth & Flamedancer',
      effect: 'The first time you would die each fight, Heal to full, Cleanse your Burn and Poison, and Burn yourself 30 & Your Burn items have +4% Crit Chance.',
    },
    loot: [
      {
        name: 'Grappling Hook',
        size: 'Small',
        type: 'Weapon',
        castTime: 7.0,
        effect: 'Deal 20 Damage. Slow 1 item for 4 seconds.',
      },
      {
        name: 'Anchor',
        size: 'Medium',
        type: 'Aquatic',
        castTime: 15.0,
        effect: "Deal Damage equal to 30% of your enemy's Max Health.",
        critChance: 25,
        additionalEffect: 'When you use a Medium item, this gains Haste for 3 seconds.',
      },
      {
        name: 'Spyglass',
        size: 'Medium',
        type: 'Tool',
        effect: 'Adjacent items have +25% Crit Chance.',
        additionalEffect: 'At the start of each fight, a random enemy item has its Cooldown increased by 3 seconds.',
      },
      {
        name: 'Fiery Katana',
        size: 'Medium',
        type: 'Weapon',
        castTime: 2.0,
        effect: 'Deal 24 Damage, Burn 3.',
        critChance: 29,
      },
      {
        name: 'Lighthouse',
        size: 'Large',
        type: 'Property',
        effect: 'When you Slow, Burn 3.',
      }
    ]
  },
  {
    id: 'void-golem-12',
    name: 'Void Golem',
    level: 12,
    imageUrl: '/encounters/void-golem.png',
    skill: {
      name: 'Into the Void & Void Render',
      effect: "At the start of each fight, destroy an item on each player's board for the fight & When you destroy an item during combat, your Weapons gain 100 Damage and your Burn gain 10 Burn for this fight.",
    },
    loot: [
      {
        name: 'Singularity',
        size: 'Small',
        castTime: 9.0,
        effect: 'Destroy a small enemy item for the fight.',
      },
      {
        name: 'Void Ray',
        size: 'Medium',
        effect: 'Burn 24. Multicast: 2',
        additionalEffect: 'When you Shield, this gains 1 Burn for the fight.',
      },
      {
        name: 'Caltrops',
        size: 'Medium',
        type: 'Weapon',
        effect: 'When your enemy uses an item, deal 205 Damage.',
      },
      {
        name: 'Spices',
        size: 'Small',
        effect: "Your Weapons gain Damage equal to your weakest weapon's Damage for the fight.",
        additionalEffect: 'Ammo: 1',
      }
    ]
  },
  {
    id: 'volkas-enforcer-12',
    name: 'Volkas Enforcer',
    level: 12,
    imageUrl: '/encounters/volkas-enforcer.png',
    skill: {
      name: 'Cryomastery & Reaching the Summit',
      effect: 'When you Freeze, your Shield items gain +3 Shield for the fight & When you Freeze, your items gain +2% Crit Chance for the fight.',
    },
    loot: [
      {
        name: 'Cryosphere',
        size: 'Medium',
        type: 'Tool',
        castTime: 10.0,
        effect: 'Freeze all items other than The Core for 2 seconds.',
      },
      {
        name: 'Cryosleeve',
        size: 'Medium',
        castTime: 3.0,
        effect: 'Freeze this for 2 seconds.',
        critChance: 2,
        additionalEffect: 'When ANY item is Frozen, Shield 48.',
      },
      {
        name: 'Stopwatch',
        size: 'Small',
        type: 'Tool',
        castTime: 10.0,
        effect: 'Freeze all items for 1 second.',
      },
      {
        name: 'Icebreaker',
        size: 'Medium',
        type: 'Weapon',
        castTime: 6.0,
        effect: 'Deal 80 Damage, Remove Freeze from your items.',
        critChance: 4,
        additionalEffect: 'When any item gains Freeze, Charge this +2 seconds, When this item gains Freeze, remove Freeze from it.',
      },
      {
        name: 'Ice Pick',
        size: 'Small',
        type: 'Weapon',
        castTime: 7.0,
        effect: 'Deal 60 Damage, Freeze 1 item for 3 seconds.',
        critChance: 4,
        additionalEffect: 'When you Freeze, this gains +20 Damage for the fight.',
      },
      {
        name: 'Frost Potion',
        size: 'Small',
        type: 'Potion',
        castTime: 5.0,
        effect: 'Freeze 2 items for 2 seconds.',
        additionalEffect: 'Ammo: 1',
      },
      {
        name: 'Icicle',
        size: 'Small',
        effect: 'At the start of each fight, Freeze 1 item for 6 seconds.',
      }
    ]
  }
]

const LEVEL_13_ENCOUNTERS: Encounter[] = [
  {
    id: 'death-knight-reaper-13',
    name: 'Death Knight Reaper',
    level: 13,
    imageUrl: '/encounters/death-knight-reaper.png',
    skill: {
      name: 'Multiple Skills',
      effect: 'Hypnotic Drain: When you use a Weapon, Freeze a smaller item for 2 seconds.\nDeadly Eye: Your Weapons have +10% Crit chance.\nDesperate Freeze: The first time you fall below half health each fight, Freeze an item for 9 seconds.',
    },
    loot: [
      {
        name: 'Sapphire',
        size: 'Small',
        type: 'Potion',
        castTime: 8.0,
        effect: 'Freeze 1 item for 4 seconds.',
        additionalEffect: "Increase your other items' Freeze by 1 second.",
      },
      {
        name: 'Shadowed Cloak',
        size: 'Medium',
        type: 'Friend',
        effect: 'When you use the item to the right of this, give it Haste for 3 seconds and +7 Damage for the fight.',
      },
      {
        name: 'Scythe',
        size: 'Medium',
        type: 'Weapon',
        castTime: 10.0,
        effect: "Deal Damage equal to a third of your enemy's max health.",
        critChance: 10,
        additionalEffect: 'Lifesteal.',
      },
      {
        name: 'Mortal Coil',
        size: 'Medium',
        type: 'Weapon',
        castTime: 8.0,
        effect: 'Deal 120 Damage.',
        critChance: 10,
        additionalEffect: 'The Weapon to the left of this has lifesteal.',
      },
      {
        name: 'Runic Great Axe',
        size: 'Large',
        type: 'Weapon',
        castTime: 10.0,
        effect: 'Deal 100 Damage. Your Weapons with lifesteal gain +100 Damage for the fight.',
        critChance: 10,
        additionalEffect: 'Lifesteal.',
      }
    ]
  },
  {
    id: 'veteran-octopus-13',
    name: 'Veteran Octopus',
    level: 13,
    imageUrl: '/encounters/veteran-octopus.png',
    skill: {
      name: 'Multiple Skills',
      effect: 'Hyper Focus: If you only have one Medium item. its Cooldown is reduced by 30%.\nStandard Ordinance: Your Medium Weapons deal + 60 damage.\nArms Race: Your items have +1% Crit Chance for each Weapon you have.',
    },
    loot: [
      {
        name: 'Tiny Cutlass',
        size: 'Small',
        type: 'Weapon',
        castTime: 6.0,
        effect: 'Deal 30 Damage',
        critChance: 9,
        additionalEffect: 'This deals double Crit Damage.',
        quantity: 8
      },
      {
        name: 'Octopus',
        size: 'Medium',
        type: 'Aquatic',
        effect: 'Deal 68 Damage, Multicast 8.',
        critChance: 9
      }
    ]
  }
]

const LEVEL_15_ENCOUNTERS: Encounter[] = [
  {
    id: 'awakened-district-15',
    name: 'Awakened District',
    level: 15,
    imageUrl: '/encounters/awakened-district.png',
    skill: {
      name: 'Multiple Skills',
      effect: 'Prosperity: Your Shield items have +Shield equal to the value of your Items.\nTrickle Down Economics: When you use a large item, Haste an item for 4 seconds.\nToughness: Your Shield items have +20 Shield.',
    },
    loot: [
      {
        name: 'Landscaper',
        size: 'Large',
        type: 'Property',
        effect: "When you use an item, Shield equal to this item's value. At the start of each hour, this gains +1 value.",
      },
      {
        name: 'Soul of the District',
        size: 'Medium',
        type: 'Weapon',
        castTime: 12.0,
        effect: 'Shield equal to your current Health. Deal Damage equal to your Shield.',
      },
      {
        name: 'Spacescraper',
        size: 'Large',
        type: 'Property',
        castTime: 3.2,
        effect: 'Shield equal to 3 times the value of your items.',
        additionalEffect: 'This has triple value in combat.',
      },
      {
        name: 'Balcony',
        size: 'Medium',
        type: 'Property',
        effect: 'The Property to the left of this has double value and has its Cooldown reduced by 20%.',
      }
    ]
  },
  {
    id: 'lord-arken-15',
    name: 'Lord Arken',
    level: 15,
    imageUrl: '/encounters/lord-arken.png',
    skill: {
      name: 'Multiple Skills',
      effect: 'Unwavering: When you use an item, Shield 40.\nHeavy Weaponry: Your Large Weapons deal + 120 Damage.\nStandard Ordinance: Your Medium Weapons deal + 60 Damage.',
    },
    loot: [
      {
        name: 'Thrusters',
        size: 'Small',
        castTime: 6.0,
        effect: 'Burn both players 4 seconds.',
        additionalEffect: 'Adjacent items have their cooldowns reduced by 12%.',
        quantity: 2
      },
      {
        name: 'Gatling Gun',
        size: 'Medium',
        type: 'Weapon',
        castTime: 2.8,
        effect: "Deal 80 Damage. Reduce this item's Cooldown by 20% for the fight.",
        quantity: 2
      },
      {
        name: 'The Eclipse',
        size: 'Large',
        type: 'Weapon',
        castTime: 15.0,
        effect: 'Use all your other items.',
        additionalEffect: 'When you use an item, deal 170 Damage.',
      },
      {
        name: 'Battery',
        size: 'Small',
        type: 'Tool',
        castTime: 4.0,
        effect: 'Charge the item to the left of this 4 seconds.',
        additionalEffect: 'Ammo: 3',
      }
    ]
  },
  {
    id: 'void-colossus-15',
    name: 'Void Colossus',
    level: 15,
    imageUrl: '/encounters/void-colossus.png',
    skill: {
      name: 'Void Energy & Void Rage',
      effect: 'When you Burn, your Shield items gain 3 Shield the fight & When you Burn, Haste an item for 1 seconds.',
    },
    loot: [
      {
        name: 'Ruby',
        size: 'Small',
        castTime: 10.0,
        effect: 'Burn 6',
        additionalEffect: "Increase your other items' Burn by 2.",
      },
      {
        name: 'Void Ray',
        size: 'Medium',
        castTime: 6.0,
        effect: 'Burn 6, Multicast 2.',
        additionalEffect: 'When you shield, this gains 1 Burn for the fight.',
      },
      {
        name: 'Eye of the Colossus',
        size: 'Large',
        type: 'Tool',
        castTime: 10.0,
        effect: 'Destroy an enemy item for the fight.',
        additionalEffect: 'When you use an adjacent item, Charge this 1 second.',
      },
      {
        name: 'Void Shield',
        size: 'Medium',
        castTime: 7.0,
        effect: "Gain Shield equal to your enemy's Burn.",
        additionalEffect: 'When your enemy uses an item, Burn 3',
      }
    ]
  }
]

const ALL_ENCOUNTERS = [
  ...LEVEL_1_ENCOUNTERS,
  ...LEVEL_2_ENCOUNTERS,
  ...LEVEL_3_ENCOUNTERS,
  ...LEVEL_4_ENCOUNTERS,
  ...LEVEL_5_ENCOUNTERS,
  ...LEVEL_6_ENCOUNTERS,
  ...LEVEL_7_ENCOUNTERS,
  ...LEVEL_8_ENCOUNTERS,
  ...LEVEL_9_ENCOUNTERS,
  ...LEVEL_10_ENCOUNTERS,
  ...LEVEL_11_ENCOUNTERS,
  ...LEVEL_12_ENCOUNTERS,
  ...LEVEL_13_ENCOUNTERS,
  ...LEVEL_15_ENCOUNTERS,
]

export default function EncountersPage() {
  const [selectedLevel, setSelectedLevel] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredEncounters = ALL_ENCOUNTERS.filter(encounter => {
    const matchesLevel = selectedLevel === 0 || encounter.level === selectedLevel
    const matchesSearch = encounter.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesLevel && matchesSearch
  })
  
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">PvE Encounters</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search encounters by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg 
              text-gray-100 placeholder-gray-500
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Level Selection */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedLevel(0)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors
              ${selectedLevel === 0 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            All Levels
          </button>
          {Array.from({ length: 15 }, (_, i) => i + 1).map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors
                ${selectedLevel === level 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Level {level}
            </button>
          ))}
        </div>

        {/* No Results Message */}
        {filteredEncounters.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No encounters found matching "{searchQuery}"
          </div>
        )}

        {/* Encounters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEncounters.map(encounter => (
            <div 
              key={encounter.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
            >
              {/* Encounter Header */}
              <div className="p-4 bg-gray-700">
                <h2 className="text-xl font-bold text-white">{encounter.name}</h2>
                <p className="text-gray-400">Level {encounter.level}</p>
              </div>

              {/* Skill (if any) */}
              {encounter.skill && (
                <div className="p-4 border-t border-gray-700">
                  <h3 className="font-semibold text-blue-400 mb-2">
                    {encounter.skill.name}
                  </h3>
                  <p className="text-gray-300">{encounter.skill.effect}</p>
                </div>
              )}

              {/* Loot Table */}
              <div className="p-4 border-t border-gray-700">
                <h3 className="font-semibold text-yellow-400 mb-3">Loot Table</h3>
                <div className="space-y-4">
                  {encounter.loot.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-gray-700 rounded-lg p-3 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-white">
                          {item.name}
                          {item.quantity && ` (${item.quantity}x)`}
                        </h4>
                        <span className="text-sm text-gray-400">{item.size}</span>
                      </div>
                      
                      {item.type && (
                        <p className="text-sm text-gray-400">Type: {item.type}</p>
                      )}
                      
                      {item.castTime && (
                        <p className="text-sm text-gray-400">
                          Cast Time: {item.castTime}s
                        </p>
                      )}
                      
                      <p className="text-sm text-gray-300">{item.effect}</p>
                      
                      {item.additionalEffect && (
                        <p className="text-sm text-blue-400">
                          {item.additionalEffect}
                        </p>
                      )}
                      
                      {item.critChance && (
                        <p className="text-sm text-yellow-400">
                          Crit Chance: {item.critChance}%
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 