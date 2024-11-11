const itemToImageMapping: Record<string, string> = {
    "Magnifying Glass": "/items/CF_S_NEU_MagnifyingGlass_D.jpeg",
    "Subscraper": "/items/CF_L_PYG_Subscraper_D.jpeg",
    "Fishing Net": "/items/CF_M_VAN_FishingNet_D.jpeg",
    "Bag of Jewels": "/items/CF_S_NTR_BagofJewels.jpeg",
    "Luxury Kiuas": "/items/CF_M_PYG_LuxuryKiuas_D.jpeg",
    "Spare Change": "/items/CF_S_PYG_SpareChange_D.jpeg",
    "Ulu Knife": "/items/CF_S_JUL_UluKnife_D.jpeg",
    "Salamander Pup": "/items/CF_M_NEU_KirgSalamanderPup_D.jpeg",
    "Grater": "/items/CF_S_JUL_Grater_D.jpeg",
    "Hot Sauce": "/items/CF_S_JUL_HotSauce_D.jpeg",
    "Rowboat": "/items/CF_M_VAN_Rowboat_D.jpeg",
    "Electric Eels": "/items/CF_L_VAN_ElectricEels_D.jpeg",
    "Anchor": "/items/CF_M_STE_SkyAnchor_D.jpeg",
    "Grill": "/items/CF_L_JUL_Grill_D.jpeg",
    "Remote Control": "/items/CF_S_DOO_RemoteControl_D.jpeg",
    "Star Chart": "/items/CF_M_VAN_StarChart_D.jpeg",
    "Stew": "/items/CF_M_JUL_Stew_D.jpeg",
    "GPU": "/items/CF_S_DOO_GPU_D.jpeg",
    "Colossal Popsicle": "/items/CF_L_NEU_ColossalPopsicle_D.jpeg",
    "Fork Lift": "/items/CF_L_DOO_ForkLift_D.jpeg",
    "Eagle Talisman": "/items/CF_S_NTR_EagleTalisman.jpeg",
    "Atlatl": "/items/CF_M_PYG_Atlatl_D.jpeg",
    "Laser Pistol": "/items/CF_S_DOO_LaserPistol_D.jpeg",
    "Red Lantern": "/items/CF_S_STE_RedLantern_D.jpeg",
    "Lighter": "/items/CF_S_VAN_Lighter_D.jpeg",
    "Mirror": "/items/CF_M_MAK_Mirror_D.jpeg",
    "Sandbags": "/items/CF_M_STE_Sandbags_D.jpeg",
    "Palanquin": "/items/CF_L_MAK_Palanquin_D.jpeg",
    "Cosmic Amulet": "/items/CF_S_ADV_CosmicAmulet1.jpeg",
    "Harpoon": "/items/CF_M_VAN_Harpoon_D.jpeg",
    "Primordial Depth Charge": "/items/CF_M_VAN_PrimordialDepthCharge_D.jpeg",
    "Cooling Fan": "/items/CF_S_DOO_CoolingFan_D.jpeg",
    "Robe": "/items/CF_M_PYG_Robe_D.jpeg",
    "Scales": "/items/CF_M_MAK_Scales_D.jpeg",
    "Tesla Coil": "/items/CF_M_DOO_TeslaCoil_D.jpeg",
    "Pearl": "/items/CF_S_VAN_Pearl_D.jpeg",
    "Magician": "/items/CF_M_ADV_MagiciansTopHat_D.jpeg",
    "Thurible": "/items/CF_S_MAK_Thurible_D.jpeg",
    "Plasma Grenade": "/items/CF_S_DOO_PlasmaGrenade_D.jpeg",
    "Observatory": "/items/CF_L_STE_Observatory_D.jpeg",
    "Cutlass": "/items/CF_M_VAN_Cutlass_D.jpeg",
    "Crystal Bonsai": "/items/CF_S_PYG_CrystalBonsai_D.jpeg",
    "Chocolate Bar": "/items/CF_S_PYG_ChocolateBar_D.jpeg",
    "Multitool": "/items/CF_S_STE_Multitool_D.jpeg",
    "Fortune Cookie": "/items/CF_S_JUL_FortuneCookie_D.jpeg",
    "Propane Tank": "/items/CF_M_STE_PropaneTank_D.jpeg",
    "Parachute": "/items/CF_M_STE_Parachute_D.jpeg",
    "Lumboars": "/items/CF_M_PYG_Lumboars_D.jpeg",
    "Jetpack": "/items/CF_S_STE_Jetpack_D.jpeg",
    "Dock Lines": "/items/CF_M_VAN_DockLines_D.jpeg",
    "Refrigerator": "/items/CF_M_JUL_Refrigerator_D.jpeg",
    "Dog": "/items/CF_M_PYG_GoodDog_D.jpeg",
    "Dam": "/items/CF_L_VAN_Dam_D.jpeg",
    "Delivery Drone": "/items/CF_M_STE_DeliveryDrone_D.jpeg",
    "Keychain": "/items/CF_S_PYG_Keychain_D.jpeg",
    "Life Preserver": "/items/CF_M_VAN_LifePreserver_D.jpeg",
    "Binoculars": "/items/CF_S_STE_Binoculars_D.jpeg",
    "Amber": "/items/CF_S_MAK_Amber_D.jpeg",
    "Ice Weaselpede": "/items/CF_M_MAK_IceWeaselpede_D.jpeg",
    "Private Hot Springs": "/items/CF_L_PYG_PrivateHotSprings_D.jpeg",
    "Toolbox": "/items/CF_M_STE_Toolbox_D.jpeg",
    "Volcanic Vents": "/items/CF_M_VAN_VolcanicVents_D.jpeg",
    "Frostfinger": "/items/CF_M_MAK_Frostfinger_D.jpeg",
    "Pepper Spray": "/items/CF_S_PYG_PepperSpray_D.jpeg",
    "Kinetic Cannon": "/items/CF_L_DOO_KineticCannon_D.jpeg",
    "Candy Mail": "/items/CF_M_ADV_CandyMail_D.jpeg",
    "Haladie": "/items/CF_S_PYG_Haladie_D.jpeg",
    "Super Syrup": "/items/CF_M_ADV_SuperSyrup_D.jpeg",
    "Broken Shackles": "/items/CF_S_ADV_BrokenShackles_D.jpeg",
    "Dooley": "/items/CF_M_DOO_DooleysBed_D.jpeg",
    "Race Carl": "/items/CF_M_DOO_RaceCarl_D.jpeg",
    "Security Drone": "/items/CF_M_STE_SecurityDrone_D.jpeg",
    "Quill and Ink": "/items/CF_S_MAK_QuillandInk_D.jpeg",
    "Grindstone": "/items/CF_M_PYG_Grindstone_D.jpeg",
    "Hydraulic Squeezer": "/items/CF_M_STE_HydraulicSqueezer_D.jpeg",
    "Slumbering Primordial": "/items/CF_L_VAN_SlumberingPrimordial_D.jpeg",
    "Spiky Shield": "/items/CF_M_PYG_SpikyShield_D.jpeg",
    "Potion Distillery": "/items/CF_L_MAK_PotionDistillery_D.jpeg",
    "Chocolate Coin": "/items/CF_S_JUL_ChocolateCoin_D.jpeg",
    "Railgun": "/items/CF_L_DOO_Railgun_D.jpeg",
    "Armored Core": "/items/CF_M_DOO_ArmoredCore.jpeg",
    "Catalyst": "/items/CF_S_MAK_Catalyst_D.jpeg",
    "Proboscis": "/items/CF_S_ADV_Proboscis.jpeg",
    "Welding Helmet": "/items/CF_M_DOO_WeldingHelmet_D.jpeg",
    "Abacus": "/items/CF_S_PYG_Abacus_D.jpeg",
    "Fixer Upper": "/items/CF_L_PYG_FixerUpper_D.jpeg",
    "Money Tree": "/items/CF_L_PYG_MoneyTree_D.jpeg",
    "Fiber Optics": "/items/CF_S_DOO_FiberOptics_D.jpeg",
    "Regal Blade": "/items/CF_M_PYG_RegalBlade_D.jpeg",
    "Ice Cream Truck": "/items/CF_L_PYG_IceCreamTruck_D.jpeg",
    "Landscraper": "/items/CF_L_PYG_Landscraper_D.jpeg",
    "Crook": "/items/CF_M_PYG_Crook_D.jpeg",
    "Lion Cane": "/items/CF_M_PYG_LionCane_D.jpeg",
    "Oven": "/items/CF_L_JUL_Oven_D.jpeg",
    "VIP Pass": "/items/CF_S_PYG_VIPPass_D.jpeg",
    "ATM": "/items/CF_M_PYG_ATM_D.jpeg",
    "Vineyard": "/items/CF_L_PYG_Vineyard_D.jpeg",
    "Paper Airplane": "/items/CF_S_STE_PaperAirplane_D.jpeg",
    "Luxury Tents": "/items/CF_L_PYG_LuxuryTents_D.jpeg",
    "Myrrh": "/items/CF_S_MAK_Myrrh_D.jpeg",
    "Incendiary Rounds": "/items/CF_S_VAN_IncendiaryRounds_D.jpeg",
    "Honing Steel": "/items/CF_S_VAN_HoningSteel_D.jpeg",
    "Cold Room": "/items/CF_M_PIG_ColdRoom_D.jpeg",
    "Microwave": "/items/CF_M_JUL_Microwave_D.jpeg",
    "Welding Torch": "/items/CF_M_DOO_WeldingTorch_D.jpeg",
    "Scrap": "/items/CF_M_DOO_ScrapMetal_D.jpeg",
    "Hoverboard": "/items/CF_M_STE_Hoverboard_D.jpeg",
    "Gyro Gunsight": "/items/CF_M_STE_GyroGunsight_D.jpeg",
    "Pizza Cutter": "/items/CF_S_JUL_PizzaCutter_D.jpeg",
    "Arkens Ring": "/items/CF_S_ADV_ArkensRing.jpeg",
    "Toaster": "/items/CF_M_JUL_Toaster_D.jpeg",
    "Tea Set": "/items/CF_M_PYG_TeaSet_D.jpeg",
    "Scrap Metal": "/items/CF_M_DOO_ScrapMetal_D.jpeg",
    "Ice 9000": "/items/CF_M_DOO_Ice9000_D.jpeg",
    "Silk": "/items/CF_M_PYG_Silk_D.jpeg",
    "Vitality Potion": "/items/CF_S_MAK_VitalityPotion_D.jpeg",
    "Sword Cane": "/items/CF_M_MAK_SwordCane_D.jpeg",
    "Cannon": "/items/CF_L_DOO_KineticCannon_D.jpeg",
    "Isochoric Freezer": "/items/CF_S_DOO_IsochoricFreezer_D.jpeg",
    "Angry Balloon Bot": "/items/CF_M_DOO_AngryBalloonBot_D.jpeg",
    "Dive Weights": "/items/CF_S_VAN_DiveWeights_D.jpeg",
    "Wand": "/items/CF_S_ADV_Wand_D.jpeg",
    "Masterpiece": "/items/CF_M_PYG_Masterpiece_D.jpeg",
    "The Eclipse": "/items/CF_L_ADV_TheEclipse_D.jpeg",
    "Nightshade": "/items/CF_M_MAK_Nightshade_D.jpeg",
    "3D Printer": "/items/CF_L_DOO_3DPrinter_D.jpeg",
    "Tazidian Dagger": "/items/CF_S_MAK_TazidianDagger_D.jpeg",
    "Shadowed Cloak": "/items/CF_M_ADV_ShadowedCloak_D.jpeg",
    "Windmill": "/items/CF_L_PYG_Windmill_Baloons.jpeg",
    "Plague Glaive": "/items/CF_L_MAK_PlagueGlaive_D.jpeg",
    "Sirens": "/items/CF_M_STE_Sirens_D.jpeg",
    "Piranha": "/items/CF_S_VAN_Piranha_D1.jpeg",
    "Fang": "/items/CF_S_ADV_Fangs_D#47408.jpeg",
    "Boiling Flask": "/items/CF_M_MAK_BoilingFlask_D.jpeg",
    "Loupe": "/items/CF_S_PYG_Loupe_D.jpeg",
    "Antimatter Chamber": "/items/CF_L_DOO_AntimatterChamber_D.jpeg",
    "Floor Spike": "/items/CF_S_MAK_FloorSpike_D.jpeg",
    "Weakpoint Detector": "/items/CF_M_DOO_WeakpointDetector_D.jpeg",
    "Frost Potion": "/items/CF_S_MAK_FrostPotion_D.jpeg",
    "Mini Fridge": "/items/CF_M_JUL_MiniFridge_D.jpeg",
    "Cooking Mallet": "/items/CF_S_JUL_CookingMallet_D.jpeg",
    "Pasta Maker": "/items/CF_M_JUL_PastaMaker_D.jpeg",
    "Fire Hose": "/items/CF_M_STE_FireHose_D.jpeg",
    "Neural Toxin": "/items/CF_S_ADV_NeuralToxin_D.jpeg",
    "Carving Fork": "/items/CF_S_JUL_CarvingFork_D.jpeg",
    "Walter Cooler": "/items/CF_S_DOO_WalterCooler_D.jpeg",
    "Staff of the Moose": "/items/CF_L_MAK_StaffoftheMoose_D.jpeg",
    "Sorbet": "/items/CF_S_JUL_Sorbet_D.jpeg",
    "Secret Formula": "/items/CF_M_MAK_SecretFormula_D.jpeg",
    "Grenade": "/items/CF_S_DOO_PlasmaGrenade_D.jpeg",
    "Turtle Shell": "/items/CF_M_VAN_TurtleShell_D.jpeg",
    "Rocket Launcher": "/items/CF_M_DOO_RocketLauncher_D.jpeg",
    "Philosopher": "/items/CF_S_MAK_PhilosophersStone_D.jpeg",
    "Bird Cage": "/items/CF_M_STE_BirdCage_D.jpeg",
    "Pufferfish": "/items/CF_M_VAN_Pufferfish_D.jpeg",
    "Copper Ed": "/items/CF_S_DOO_CopperEd_D.jpeg",
    "Necronomicon": "/items/CF_M_ADV_Necronomicon_D.jpeg",
    "Frozen Bludgeon": "/items/CF_M_ADV_FrozenBludgeon_D.jpeg",
    "Captain": "/items/CF_L_VAN_CaptainsQuarters_D.jpeg",
    "Bomb Squad": "/items/CF_S_DOO_BombSquad_D.jpeg",
    "Ornithopter": "/items/CF_S_STE_Ornithopter_D.jpeg",
    "Meat Tenderizer": "/items/CF_S_JUL_MeatTenderizer_D.jpeg",
    "Duct Tape": "/items/CF_S_DOO_DuctTape_D.jpeg",
    "Jellyfish": "/items/CF_S_VAN_Jellyfish_D.jpeg",
    "Sextant": "/items/CF_M_VAN_Sextant_D.jpeg",
    "Precision Calipers": "/items/CF_S_STE_PrecisionCalipers_D.jpeg",
    "Emerald": "/items/CF_S_MAK_Emerald_D.jpeg",
    "Textiles": "/items/CF_M_PYG_Textiles_D.jpeg",
    "Laurel": "/items/CF_L_JUL_LaurelsFortress_D.jpeg",
    "Satchel": "/items/CF_M_MAK_Satchel_D.jpeg",
    "Portrait": "/items/CF_M_MAK_Portrait_D.jpeg",
    "Noxious Potion": "/items/CF_S_MAK_NoxiousPotion_D.jpeg",
    "Pepper": "/items/CF_S_JUL_PepperMill_D.jpeg",
    "Cannonade": "/items/CF_L_VAN_Cannonade_D.jpeg",
    "Diana-Saur": "/items/CF_L_DOO_DianaSaur_D.jpeg",
    "Sharkclaws": "/items/CF_M_VAN_Sharkclaws_D.jpeg",
    "Apropos Chapeau": "/items/CF_M_PYG_AproposChapeau_D.jpeg",
    "Fire Potion": "/items/CF_S_MAK_FirePotion_D.jpeg",
    "Weather Machine": "/items/CF_L_STE_WeatherMachine_D.jpeg",
    "Pelt": "/items/CF_S_ADV_Pelt_D.jpeg",
    "Bulky Package": "/items/CF_M_ADV_BulkyPackage_D.jpeg",
    "Old Sword": "/items/CF_S_NEU_OldSword_D.jpeg",
    "Wanted Poster": "/items/CF_M_VAN_WantedPoster_D.jpeg",
    "Cool LEDs": "/items/CF_S_DOO_CoolLEDs_D.jpeg",
    "Plasma Rifle": "/items/CF_M_DOO_PlasmaRifle_D.jpeg",
    "Port": "/items/CF_L_VAN_Port_D.jpeg",
    "Beta Ray": "/items/CF_S_DOO_BetaRay_D.jpeg",
    "Marshalling Lights": "/items/CF_S_STE_MarshallingLights_D.jpeg",
    "Curry": "/items/CF_S_JUL_Curry_D.jpeg",
    "Steam Hose": "/items/CF_M_STE_SteamHose_D.jpeg",
    "Fossilized Femur": "/items/CF_L_MAK_FossilizedFemur_D.jpeg",
    "Energy Potion": "/items/CF_S_MAK_EnergyPotion_D.jpeg",
    "Crow": "/items/CF_L_VAN_CrowsNest_D.jpeg",
    "Crane": "/items/CF_L_DOO_Crane_D.jpeg",
    "Lighthouse": "/items/CF_L_VAN_Lighthouse_D.jpeg",
    "Coconut": "/items/CF_S_VAN_Coconut_D.jpeg",
    "Piggy Bank": "/items/CF_S_PYG_PiggyBank_D.jpeg",
    "Javelin": "/items/CF_M_VAN_Javelin_D.jpeg",
    "Headphones": "/items/CF_S_STE_Headphones_D.jpeg",
    "Birthday Cake": "/items/CF_M_JUL_BirthdayCake_D.jpeg",
    "Atlas": "/items/CF_M_PYG_AtlasStone_D.jpeg",
    "Temporary Shelter": "/items/CF_L_NEU_TemporaryShelter_D.jpeg",
    "Coral": "/items/CF_M_VAN_CoralArmor_D.jpeg",
    "Tropical Island": "/items/CF_L_VAN_TropicalIsland_D.jpeg",
    "Steam Ladle": "/items/CF_S_PYG_SteamLadle_D.jpeg",
    "Barrel": "/items/CF_M_Van_Barrel_D.jpeg",
    "Ice Luge": "/items/CF_S_PYG_IceLuge_D.jpeg",
    "Pizza": "/items/CF_M_JUL_Pizza_D.jpeg",
    "Kite": "/items/CF_M_STE_Kite_D.jpeg",
    "Sushi Boat": "/items/CF_L_JUL_SushiBoat_D.jpeg",
    "Fruit Press": "/items/CF_M_JUL_FruitPress_D.jpeg",
    "Freefall Simulator": "/items/CF_M_STE_FreefallSimulator_D.jpeg",
    "Virus": "/items/CF_S_DOO_Virus_D.jpeg",
    "Runic Great Axe": "/items/CF_L_MAK_RunicGreatAxe_D.jpeg",
    "Silencer": "/items/CF_S_VAN_Silencer_D.jpeg",
    "Repeater": "/items/CF_M_VAN_Repeater_D.jpeg",
    "Angle Grinder Drone": "/items/CF_S_STE_AngleGrinderDrone_D.jpeg",
    "Hologram Projector": "/items/CF_S_DOO_HologramProjector_D.jpeg",
    "Serving Platter": "/items/CF_M_JUL_ServingPlatter_D.jpeg",
    "Icebreaker": "/items/CF_M_ADV_Icebreaker_D.jpeg",
    "Sunlight Spear": "/items/CF_M_MAK_SunlightSpear_D.jpeg",
    "Ambergris": "/items/CF_S_VAN_Ambergris_D.jpeg",
    "Red Button": "/items/CF_S_DOO_RedButton_D.jpeg",
    "Thrown Net": "/items/CF_M_MAK_ThrownNet_D.jpeg",
    "Shield Potion": "/items/CF_S_MAK_ShieldPotion_D.jpeg",
    "Airplane Glue": "/items/CF_S_STE_AirplaneGlue_D.jpeg",
    "Safe": "/items/CF_M_PYG_Safe_D.jpeg",
    "Gunpowder": "/items/CF_S_ADV_Gunpowder_D.jpeg",
    "Flamethrower": "/items/CF_M_DOO_Flamethrower_D.jpeg",
    "Strength Potion": "/items/CF_S_MAK_StrengthPotion_D.jpeg",
    "Pinwheel": "/items/CF_S_STE_Pinwheel_D.jpeg",
    "Gland": "/items/CF_S_ADV_Gland_D.jpeg",
    "Handaxe": "/items/CF_S_VAN_Handaxe_D.jpeg",
    "Brass Knuckles": "/items/CF_S_PYG_BrassKnuckles_D.jpeg",
    "Shipment": "/items/CF_L_PYG_Shipment_D.jpeg",
    "Oven Mitts": "/items/CF_M_JUL_OvenMitts_D.jpeg",
    "Crypto": "/items/CF_S_DOO_Crypto_D.jpeg",
    "Chris Army Knife": "/items/CF_S_DOO_ChrisArmyKnife_D.jpeg",
    "Spotlight": "/items/CF_M_STE_Spotlight_D.jpeg",
    "Battle Drone": "/items/CF_M_STE_BattleDrone_D.jpeg",
    "Shoe Blade": "/items/CF_S_VAN_ShoeBlade_D.jpeg",
    "Apron": "/items/CF_M_JUL_Apron_D.jpeg",
    "Pancakes": "/items/CF_S_JUL_Pancakes_D.jpeg",
    "Zoarcid": "/items/CF_S_VAN_Zoarcid_D.jpeg",
    "Balloon Engine": "/items/CF_M_STE_BalloonEngine_D.jpeg",
    "Beast of Burden": "/items/CF_L_PYG_BeastofBurden_D.jpeg",
    "Honeycomb": "/items/CF_S_JUL_Honeycomb_D.jpeg",
    "Knife Set": "/items/CF_M_JUL_KnifeSet_D.jpeg",
    "Hourglass": "/items/CF_S_MAK_Hourglass_D.jpeg",
    "Sky Anchor": "/items/CF_M_STE_SkyAnchor_D.jpeg",
    "Weather Glass": "/items/CF_M_VAN_WeatherGlass_D.jpeg",
    "Bushel": "/items/CF_M_PYG_Bushel_D.jpeg",
    "Assembly Line": "/items/CF_L_DOO_AssemblyLine_D.jpeg",
    "Dragonmelon": "/items/CF_M_JUL_Dragonmelon_D.jpeg",
    "Skyliner": "/items/CF_L_STE_Skyliner_D.jpeg",
    "Giant Lollipop": "/items/CF_L_JUL_GiantLollipop_D.jpeg",
    "Atlas Stone": "/items/CF_M_PYG_AtlasStone_D.jpeg",
    "Bread": "/items/CF_M_JUL_Bread_D.jpeg",
    "Cryosleeve": "/items/CF_M_ADV_Cryosleeve_D.jpeg",
    "Hammock": "/items/CF_M_PYG_Hammock_D.jpeg",
    "Briefcase": "/items/CF_M_PYG_Briefcase_D.jpeg",
    "Propeller": "/items/CF_M_STE_Propeller_D.jpeg",
    "Musket": "/items/CF_M_VAN_Musket_D.jpeg",
    "Radar Dome": "/items/CF_L_STE_RadarDome_D.jpeg",
    "Astrolabe": "/items/CF_M_VAN_Astrolabe_D.jpeg",
    "Venom": "/items/CF_S_MAK_Venomander_D.jpeg",
    "Monocle": "/items/CF_S_PYG_Monocle_D.jpeg",
    "Cornucopia": "/items/CF_M_JUL_Cornucopia_D.jpeg",
    "Caltrops": "/items/CF_M_PYG_Caltrops_D.jpeg",
    "Incense": "/items/CF_S_MAK_Incense_D.jpeg",
    "Soldering Gun": "/items/CF_S_DOO_SolderingGun_D.jpeg",
    "Flamberge": "/items/CF_L_NEU_Flamberge_D.jpeg",
    "Flycycle": "/items/CF_S_STE_Flycycle_D.jpeg",
    "Feather": "/items/CF_S_ADV_Feather.jpeg",
    "Hot Stones": "/items/CF_S_VAN_HotStones_D.jpeg",
    "Uwashiwali Bird": "/items/CF_S_PYG_UwashiwaliBird_D.jpeg",
    "Spacescraper": "/items/CF_L_PYG_Spacescraper_D.jpeg",
    "Improvised Bludgeon": "/items/CF_M_NEU_ImprovisedBludgeon_D.jpeg",
    "Giant Sub": "/items/CF_L_JUL_GiantSub_D.jpeg",
    "Wrecking Ball": "/items/CF_M_STE_WreckingBall_D.jpeg",
    "Yeti Crab": "/items/CF_S_VAN_YetiCrab_D.jpeg",
    "Gavel": "/items/CF_S_PYG_Gavel_D.jpeg",
    "Hot Springs": "/items/CF_L_NEU_HotSprings_D.jpeg",
    "Dragon": "/items/CF_M_JUL_Dragonmelon_D.jpeg",
    "Butter": "/items/CF_S_JUL_Butter_D.jpeg",
    "Show Globe": "/items/CF_M_MAK_ShowGlobe_D.jpeg",
    "Vanessa": "/items/CF_S_VAN_VanessasAmulet.jpeg",
    "Sharkray": "/items/CF_M_VAN_Sharkray_D1.jpeg",
    "Battery": "/items/CF_S_DOO_Battery_D.jpeg",
    "Model Ship": "/items/CF_M_PYG_ModelShip_D.jpeg",
    "Flagship": "/items/CF_L_VAN_Flagship_D.jpeg",
    "Lens": "/items/CF_S_DOO_Lens_D.jpeg",
    "Chum": "/items/CF_S_VAN_Chum_D.jpeg",
    "Submersible": "/items/CF_M_VAN_Submersible_D.jpeg",
    "Matchbox": "/items/CF_S_PYG_Matchbox_D.jpeg",
    "Bottled Explosion": "/items/CF_M_MAK_BottledExplosion_D.jpeg",
    "Infernal Greatsword": "/items/CF_L_ADV_InfernalGreatsword_D.jpeg",
    "Extract": "/items/CF_S_ADV_Extract_D.jpeg",
    "Boomerang": "/items/CF_M_PYG_Boomerang_D.jpeg",
    "Throwing Knives": "/items/CF_S_VAN_ThrowingKnives_D.jpeg",
    "Eggs": "/items/CF_S_JUL_Eggs_D.jpeg",
    "Motherboard": "/items/CF_M_DOO_Motherboard_D.jpeg",
    "Belt": "/items/CF_M_PYG_Belt_D.jpeg",
    "Power Sander": "/items/CF_S_DOO_PowerSander_D.jpeg",
    "Flail": "/items/CF_L_MAK_GoopFlail_D.jpeg",
    "Bolas": "/items/CF_S_VAN_Bolas_D.jpeg",
    "Phonograph": "/items/CF_M_PYG_Phonograph_D.jpeg",
    "Pantry": "/items/CF_L_JUL_Pantry_D.jpeg",
    "Oxygen Tank": "/items/CF_M_STE_OxygenTank_D.jpeg",
    "First Aiden": "/items/CF_S_DOO_FirstAiden_D.jpeg",
    "Vial Launcher": "/items/CF_M_MAK_VialLauncher_D.jpeg",
    "Pinata": "/items/CF_M_PYG_Pinata_D.jpeg",
    "Quicksilver": "/items/CF_S_MAK_Quicksilver_D.jpeg",
    "Lunch Box": "/items/CF_M_STE_LunchBox_D.jpeg",
    "Trail Mix": "/items/CF_S_JUL_AlienTrailMix_D.jpeg",
    "Waterwheel": "/items/CF_L_VAN_Waterwheel_D.jpeg",
    "Hatchet": "/items/CF_S_PYG_Hatchet_D.jpeg",
    "Powder Keg": "/items/CF_M_VAN_PowderKeg_D.jpeg",
    "Pesky Pete": "/items/CF_S_Van_PeskyPete_D.jpeg",
    "Teddy": "/items/CF_M_ADV_ViciousTeddyBear_D.jpeg",
    "Robotic Factory": "/items/CF_L_DOO_RoboticFactory_D.jpeg",
    "Bandages": "/items/CF_S_PYG_Bandages_D.jpeg",
    "Gamma Ray": "/items/CF_S_DOO_GammaRay_D.jpeg",
    "Rivet Gun": "/items/CF_S_STE_RivetGun_D.jpeg",
    "Lightbulb": "/items/CF_S_DOO_Lightbulb_D.jpeg",
    "Rainbow Potion": "/items/CF_S_MAK_RainbowPotion_D.jpeg",
    "Orbital Polisher": "/items/CF_S_STE_OrbitalPolisher_D.jpeg",
    "Cash Cannon": "/items/CF_M_PYG_CashCannon_D.jpeg",
    "Crusher Claw": "/items/CF_M_ADV_CrusherClaw1.jpeg",
    "Viper Cane": "/items/CF_M_MAK_ViperCane_D.jpeg",
    "Rocket Boots": "/items/CF_M_NEU_RocketBoots_D.jpeg",
    "Vending Machine": "/items/CF_M_PYG_VendingMachine_D.jpeg",
    "Kukri": "/items/CF_S_PYG_Kukri_D.jpeg",
    "Hammer": "/items/CF_M_DOO_NitrogenHammer_D.jpeg",
    "Black Rose": "/items/CF_S_MAK_BlackRose_D.jpeg",
    "Piggles": "/items/CF_S_PYG_PigglesBlue_D.jpeg",
    "Ruby": "/items/CF_S_MAK_Ruby_D.jpeg",
    "Pogo Stick": "/items/CF_M_STE_PogoStick_D.jpeg",
    "Bread Knife": "/items/CF_S_JUL_BreadKnife_D.jpeg",
    "Artificial Heart": "/items/CF_M_ADV_ArtificialHeart_D.jpeg",
    "Ignition Core": "/items/CF_M_DOO_IgnitionCore.jpeg",
    "Runic Double Bow": "/items/CF_M_MAK_RunicDoubleBow_D.jpeg",
    "Fire Bomb": "/items/CF_S_STE_FireBomb_D.jpeg",
    "Globe": "/items/CF_M_MAK_ShowGlobe_D.jpeg",
    "Vat of Acid": "/items/CF_L_MAK_VatofAcid_D.jpeg",
    "Cannonball": "/items/CF_S_VAN_Cannonball_D.jpeg",
    "Tea Siphon": "/items/CF_M_JUL_TeaSiphon_D.jpeg",
    "Junkyard Lance": "/items/CF_L_NEU_JunkyardLance_D.jpeg",
    "Grapeshot": "/items/CF_S_VAN_Grapeshot_D.jpeg",
    "Aviators": "/items/CF_S_STE_Aviators_D.jpeg",
    "Atomic Clock": "/items/CF_M_DOO_AtomicClock_D.jpeg",
    "Bill Dozer": "/items/CF_L_DOO_BillDozer_D.jpeg",
    "Aurora Dome": "/items/CF_M_PYG_AuroraDome_D.jpeg",
    "Aludel": "/items/CF_M_MAK_Aludel_D.jpeg",
    "Security Camera": "/items/CF_M_DOO_SecurityCamera_D.jpeg",
    "Bottled Tornado": "/items/CF_S_MAK_BottledTornado_D.jpeg",
    "Burrito": "/items/CF_M_JUL_AlienBurrito_D.jpeg",
    "Induction Aegis": "/items/CF_S_DOO_InductionAegis_D.jpeg",
    "Ni-Kola": "/items/CF_S_STE_NiKola_D.jpeg",
    "Miss Isles": "/items/CF_M_DOO_MissIsles_D.jpeg",
    "Sea Shell": "/items/CF_S_VAN_SeaShell_D.jpeg",
    "Tethers": "/items/CF_M_STE_Tethers_D.jpeg",
    "Pumpkin": "/items/CF_M_JUL_PurplePumpkin_D.jpeg",
    "Figurehead": "/items/CF_M_VAN_Figurehead_D.jpeg",
    "Succulents": "/items/CF_S_PYG_Succulents_D.jpeg",
    "Rocket Drone": "/items/CF_S_STE_RocketDrone_D.jpeg",
    "Citrus": "/items/CF_S_VAN_Citrus_D.jpeg",
    "Exoskeleton": "/items/CF_M_NEU_Exoskeleton_D.jpeg",
    "Pilot": "/items/CF_S_STE_PilotBadge_D.jpeg",
    "Double Whammy": "/items/CF_L_PYG_DoubleWhammy_D.jpeg",
    "Pasta": "/items/CF_M_JUL_PastaMaker_D.jpeg",
    "Athanor": "/items/CF_L_MAK_Athanor.jpeg",
    "Cookies": "/items/CF_S_JUL_Cookies_D.jpeg",
    "Jaballian Drum": "/items/CF_L_PYG_JaballianDrum_D.jpeg",
    "Blueberry Pie": "/items/CF_M_JUL_BlueberryPie_D.jpeg",
    "Leeches": "/items/CF_M_MAK_AlienLeeches_D.jpeg",
    "Concealed Dagger": "/items/CF_S_VAN_ConcealedDagger_D.jpeg",
    "Saffron": "/items/CF_S_JUL_Saffron_D.jpeg",
    "Venomander": "/items/CF_S_MAK_Venomander_D.jpeg",
    "Hang Glider": "/items/CF_L_STE_HangGlider_D.jpeg",
    "Genie Lamp": "/items/CF_S_MAK_GenieLamp_D.jpeg",
    "Fire Claw": "/items/CF_M_MAC_FireClaw_D.jpeg",
    "Earrings": "/items/CF_S_MAK_Earrings_D.jpeg",
    "Stelle": "/items/CF_L_STE_StellesAirship_D.jpeg",
    "Hammlet": "/items/CF_S_DOO_Hammlet_D.jpeg",
    "Hydraulic Press": "/items/CF_L_DOO_HydraulicPress_D.jpeg",
    "Eject Button": "/items/CF_S_STE_EjectButton_D.jpeg",
    "Trebuchet": "/items/CF_L_VAN_Trebuchet_D.jpeg",
    "Beehive": "/items/CF_M_PYG_Beehive.jpeg",
    "Singularity": "/items/CF_S_ADV_Singularity_D.jpeg",
    "Closed Sign": "/items/CF_M_PYG_ClosedSign_D.jpeg",
    "Flare Gun": "/items/CF_S_STE_FlareGun_D.jpeg",
    "Cake Batter": "/items/CF_M_JUL_CakeBatter_D.jpeg",
    "Apothecary": "/items/CF_L_MAK_Apothecary_D.jpeg",
    "Potion Potion": "/items/CF_M_MAK_PotionPotion_D.jpeg",
    "Sunderer": "/items/CF_S_ADV_Sunderer_D.jpeg",
    "Micro Dave": "/items/CF_M_DOO_MicroDave_D.jpeg",
    "Signet Ring": "/items/CF_S_PYG_SignetRing_D.jpeg",
    "Lifting Gloves": "/items/CF_S_NEU_LiftingGloves_D.jpeg",
    "Gearnola Bar": "/items/CF_S_DOO_GearnolaBar_D.jpeg",
    "Decanter": "/items/CF_S_JUL_Decanter_D.jpeg",
    "Stinger": "/items/CF_S_ADV_Stinger_D.jpeg",
    "Library": "/items/CF_L_MAK_Library_D.jpeg",
    "Poppy Field": "/items/CF_L_MAK_PoppyField_D.jpeg",
    "Smoke Detector": "/items/CF_S_STE_SmokeDetector_D.jpeg",
    "Corkscrew": "/items/CF_S_JUL_Corkscrew_D.jpeg",
    "Cosmic Plumage": "/items/CF_M_ADV_CosmicPlumage_D.jpeg",
    "Pulse Rifle": "/items/CF_M_DOO_PulseRifle_D.jpeg",
    "Bayonet": "/items/CF_S_PYG_TuskBayonets_D.jpeg",
    "Arbalest": "/items/CF_M_VAN_Arbalest_D.jpeg",
    "Marbles": "/items/CF_S_PYG_Marbles_D.jpeg",
    "Skyscraper": "/items/CF_L_PYG_Skyscraper_D.jpeg",
    "Coffee": "/items/CF_S_JUL_Coffee_D.jpeg",
    "Torpedo": "/items/CF_M_VAN_Torpedo_D.jpeg",
    "Cargo Shorts": "/items/CF_M_PYG_CargoShorts_D.jpeg",
    "Pet Rock": "/items/CF_S_VAN_PetRock.jpeg",
    "Hemlock": "/items/CF_S_MAK_Hemlock_D.jpeg",
    "Jitte": "/items/CF_S_VAN_Jitte_D.jpeg",
    "Laboratory": "/items/CF_L_MAK_Laboratory_D.jpeg",
    "Narwhal": "/items/CF_S_VAN_Narwhal_D.jpeg",
    "Stained Glass Window": "/items/CF_M_PYG_StainedGlassWindow_D.jpeg",
    "Knee Brace": "/items/CF_S_NEU_KneeBrace_D.jpeg",
    "Cash Register": "/items/CF_M_PYG_CashRegister_D.jpeg",
    "Rifle": "/items/CF_M_DOO_PlasmaRifle_D.jpeg",
    "Coolant": "/items/CF_S_DOO_Coolant_D.jpeg",
    "Scythe": "/items/CF_M_ADV_Scythe_D.jpeg",
    "Monitor Lizard": "/items/CF_M_DOO_MonitorLizard_D.jpeg",
    "Junkyard Repairbot": "/items/CF_M_NEU_JunkyardRepairbot_D.jpeg",
    "Butterfly Swords": "/items/CF_S_VAN_ButterflySwords_D.jpeg",
    "Dishwasher": "/items/CF_L_JUL_Dishwasher_D.jpeg",
    "Memory Card": "/items/CF_S_DOO_MemoryCard_D.jpeg",
    "Rice": "/items/CF_M_JUL_RiceCooker_D.jpeg",
    "Salt": "/items/CF_L_VAN_SaltydogSaloon_D.jpeg",
    "Ice Bomb": "/items/CF_S_STE_IceBomb_D.jpeg",
    "Oinkment": "/items/CF_S_PYG_Oinkment_D.jpeg",
    "Anemometer": "/items/CF_M_STE_Anemometer_D.jpeg",
    "Candles": "/items/CF_M_MAK_Candles_D.jpeg",
    "Double Barrel": "/items/CF_M_VAN_DoubleBarrel_D.jpeg",
    "Magma Core": "/items/CF_S_NEU_MagmaCore_D.jpeg",
    "Nitrogen Hammer": "/items/CF_M_DOO_NitrogenHammer_D.jpeg",
    "Oil Lantern": "/items/CF_M_MAK_OilLantern_D.jpeg",
    "Junkyard Catapult": "/items/CF_L_NEU_JunkyardCatapult_D.jpeg",
    "Alpha Ray": "/items/CF_S_DOO_AlphaRay_D.jpeg",
    "Coral Armor": "/items/CF_M_VAN_CoralArmor_D.jpeg",
    "Disguise": "/items/CF_M_VAN_Disguise_D.jpeg",
    "Barbed Wire": "/items/CF_S_DOO_BarbedWire_D.jpeg",
    "Capacitor": "/items/CF_S_DOO_Capacitor_D.jpeg",
    "Void Shield": "/items/CF_M_ADV_VoidShield.jpeg",
    "Omega Ray": "/items/CF_S_DOO_OmegaRay_D.jpeg",
    "Diving Helmet": "/items/CF_M_VAN_DivingHelmet_D.jpeg",
    "Pistol Sword": "/items/CF_M_VAN_PistolSword_D.jpeg",
    "Basilisk Fang": "/items/CF_S_MAK_BasiliskFang_D.jpeg",
    "Pyg": "/items/CF_L_PygsGym_D.jpeg",
    "Darts": "/items/CF_S_STE_Darts_D.jpeg",
    "Pawn Shop": "/items/CF_L_PYG_PawnShop_D.jpeg",
    "Squirrel Suit": "/items/CF_M_STE_SquirrelSuit_D.jpeg",
    "Beach Ball": "/items/CF_M_VAN_BeachBall_D.jpeg",
    "Hogwash": "/items/CF_L_PYG_Hogwash_D.jpeg",
    "Rice Cooker": "/items/CF_M_JUL_RiceCooker_D.jpeg",
    "Box Cutter": "/items/CF_S_STE_BoxCutter_D.jpeg",
    "Pylon": "/items/CF_L_DOO_Pylon_D.jpeg",
    "Altimeter": "/items/CF_S_STE_Altimeter_D.jpeg",
    "Cauldron": "/items/CF_M_MAK_Cauldron_D.jpeg",
    "Retort": "/items/CF_M_MAK_Retort_D.jpeg",
    "Nitro": "/items/CF_M_DOO_NitrogenHammer_D.jpeg",
    "Buster": "/items/CF_M_STE_Buster_D.jpeg",
    "Lightning Rod": "/items/CF_L_STE_LightningRod_D.jpeg",
    "Oxygen Mask": "/items/CF_M_STE_OxygenMask_D.jpeg",
    "Sifting Pan": "/items/CF_M_MAK_SiftingPan_D.jpeg",
    "Balloon Bot": "/items/CF_M_DOO_AngryBalloonBot_D.jpeg",
    "Skewer": "/items/CF_S_JUL_Skewer_D.jpeg",
    "Sleeping Potion": "/items/CF_S_MAK_SleepingPotion_D.jpeg",
    "Balcony": "/items/CF_M_PYG_Balcony_D.jpeg",
    "Busy Bee": "/items/CF_S_PYG_BusyBees_D.jpeg",
    "Turret": "/items/CF_M_STE_Turret_D.jpeg",
    "Makeshift Barricade": "/items/CF_M_NEU_MakeshiftBarricade_D.jpeg",
    "Uzi": "/items/CF_S_DOO_Uzi_D.jpeg",
    "Cheese Wheel": "/items/CF_M_JUL_CheeseWheel_D.jpeg",
    "Hangar": "/items/CF_L_STE_Hangar_D.jpeg",
    "Joystick": "/items/CF_S_STE_Joystick_D.jpeg",
    "Ice Swan": "/items/CF_M_JUL_IceSwan_D.jpeg",
    "Mantis Shrimp": "/items/CF_S_VAN_MantisShrimp_D1.jpeg",
    "Letter Opener": "/items/CF_S_MAK_LetterOpener_D.jpeg",
    "Sharpening Stone": "/items/CF_S_NTR_SharpeningStone.jpeg",
    "Bunker": "/items/CF_L_DOO_Bunker_D.jpeg",
    "Firecrackers": "/items/CF_S_STE_Firecrackers_D.jpeg",
    "Arc Blaster": "/items/CF_S_DOO_ArcBlaster_D.jpeg",
    "Submarine": "/items/CF_L_VAN_Submarine.jpeg",
    "Infinite Potion": "/items/CF_S_MAK_InfinitePotion_D.jpeg",
    "Spider Mace": "/items/CF_S_MAK_SpiderMace_D.jpeg",
    "Rewards Card": "/items/CF_S_PYG_RewardsCard_D.jpeg",
    "Ganjo": "/items/CF_M_PYG_Ganjo_D.jpeg",
    "Caracara": "/items/CF_M_STE_Caracara_D.jpeg",
    "Bottled Lightning": "/items/CF_S_MAK_BottledLightning_D.jpeg",
    "Stopwatch": "/items/CF_S_PYG_Stopwatch_D.jpeg",
    "Nanobots": "/items/CF_S_DOO_Nanobots_D.jpeg",
    "Chemsnail": "/items/CF_M_DOO_Chemsnail_D.jpeg",
    "Shipwreck": "/items/CF_L_VAN_Shipwreck_D.jpeg",
    "Smelling Salts": "/items/CF_S_MAK_SmellingSalts_D.jpeg",
    "Whale Steak": "/items/CF_M_JUL_SpaceWhaleSteak_D.jpeg",
    "Junkyard Club": "/items/CF_M_NEU_JunkyardClub_D.jpeg",
    "Grappling Hook": "/items/CF_S_VAN_GrapplingHook_D.jpeg",
    "Cookbook": "/items/CF_M_JUL_Cookbook_D.jpeg",
    "Black Ice": "/items/CF_M_MAK_BlackIce_D.jpeg",
    "Kitchen Scale": "/items/CF_M_JUL_KitchenScale_D.jpeg",
    "Mothmeal": "/items/CF_S_MAK_Mothmeal_D.jpeg",
    "Weaponized Core": "/items/CF_M_DOO_WeaponizedCore.jpeg",
    "Lemonade Stand": "/items/CF_L_PYG_LemonadeStand_D.jpeg",
    "Wallace": "/items/CF_S_DOO_Wallace_D.jpeg",
    "Giant Ice Club": "/items/CF_L_PYG_GiantIceClub_D.jpeg",
    "Claws": "/items/CF_S_NTR_Claws.jpeg",
    "Ramrod": "/items/CF_M_VAN_Ramrod_D.jpeg",
    "Spices": "/items/CF_S_PYG_Spices_D.jpeg",
    "Refractor": "/items/CF_M_MAK_Refractor_D.jpeg",
    "Shrinking Potion": "/items/CF_S_MAK_ShrinkingPotion_D.jpeg",
    "Katana": "/items/CF_M_VAN_Katana_D.jpeg",
    "Skillet": "/items/CF_M_JUL_Skillet_D.jpeg",
    "Frozen Fire": "/items/CF_L_MAK_FrozenFire_D.jpeg",
    "Cove": "/items/CF_L_VAN_Cove_D.jpeg",
    "Fort": "/items/CF_L_JUL_LaurelsFortress_D.jpeg",
    "Wrench": "/items/CF_S_STE_Wrench_D.jpeg",
    "Magic Carpet": "/items/CF_M_MAK_MagicCarpet_D.jpeg",
    "Chunk of Gold": "/items/CF_S_MAK_ChunkofGold_D.jpeg",
    "Air-Pressure Rifle": "/items/CF_M_STE_AirPressureRifle_D.jpeg",
    "Goggles": "/items/CF_S_STE_Goggles_D.jpeg",
    "Hot Box": "/items/CF_M_JUL_HotBox_D.jpeg",
    "Spice Rack": "/items/CF_M_JUL_SpiceRack_D.jpeg",
    "Cog": "/items/CF_S_DOO_Cog_D.jpeg",
    "Darkwater Anglerfish": "/items/CF_M_VAN_DarkwaterAnglerfish(1).jpeg",
    "Catfish": "/items/CF_S_VAN_Catfish_D.jpeg",
    "Vortex Cannon": "/items/CF_L_STE_VortexCannon_D.jpeg",
    "Upgrade Hammer": "/items/CF_S_NTR_UpgradeHammer.jpeg",
    "Spiked Buckler": "/items/CF_M_NEU_SpikedBuckler_D.jpeg",
    "Alembic": "/items/CF_M_MAK_Alembic_D.jpeg",
    "Jewelry": "/items/CF_S_PYG_Jewelry_D.jpeg",
    "Farmer": "/items/CF_L_JUL_FarmersMarket_D.jpeg",
    "Trained Spider": "/items/CF_S_NEU_TrainedSpider_D.jpeg",
    "Void Ray": "/items/CF_M_ADV_VoidRay_D.jpeg",
    "Insect Wing": "/items/CF_S_ADV_InsectWing_D.jpeg",
    "Companion Core": "/items/CF_M_DOO_CompanionCore.jpeg",
    "Pressure Heater": "/items/CF_M_STE_PressureHeater_D.jpeg",
    "Powder Flask": "/items/CF_S_VAN_PowderFlask_D.jpeg",
    "Pop Snappers": "/items/CF_S_VAN_PopSnappers_D.jpeg",
    "Truffles": "/items/CF_S_PYG_Truffles_D.jpeg",
    "Power Drill": "/items/CF_M_DOO_PowerDrill_D.jpeg",
    "Laser Security System": "/items/CF_S_PYG_LaserSecuritySystem_D.jpeg",
    "Durian": "/items/CF_M_JUL_Durian_D.jpeg",
    "Goop Flail": "/items/CF_L_MAK_GoopFlail_D.jpeg",
    "Cryosphere": "/items/CF_M_DOO_Cryosphere_D.jpeg",
    "Epicurean Chocolate": "/items/CF_M_ADV_EpicEpicureanChocolate_D.jpeg",
    "Billboard": "/items/CF_L_PYG_Billboard_D.jpeg",
    "Herb Shears": "/items/CF_S_JUL_HerbShears_D.jpeg",
    "Thrusters": "/items/CF_S_DOO_Thrusters_D.jpeg",
    "Spatula": "/items/CF_S_JUL_Spatula_D.jpeg",
    "Gumball Machine": "/items/CF_M_PYG_GumballMachine_D.jpeg",
    "Holsters": "/items/CF_S_VAN_Holsters_D.jpeg",
    "Fishing Rod": "/items/CF_M_VAN_FishingRod_D.jpeg",
    "Blunderbuss": "/items/CF_M_VAN_Blunderbuss_D.jpeg",
    "Tourist Chariot": "/items/CF_L_NEU_TouristChariot_D.jpeg",
    "Caviar": "/items/CF_S_JUL_Caviar_D.jpeg",
    "Gingerbread House": "/items/CF_L_JUL_GingerbreadHouse_D.jpeg",
    "Blast Doors": "/items/CF_M_DOO_BlastDoors_D.jpeg",
    "Chunk of Lead": "/items/CF_S_MAK_ChunkofLead_D.jpeg",
    "Private Runabout": "/items/CF_L_STE_PrivateRunabout_D.jpeg",
    "Chef Hat": "/items/CF_S_JUL_ChefHat_D.jpeg",
    "Blender": "/items/CF_M_JUL_Blender_D.jpeg",
    "Iceberg": "/items/CF_L_VAN_Iceberg_D.jpeg",
    "Windbreaker": "/items/CF_M_STE_Windbreaker_D.jpeg",
    "Whisk": "/items/CF_S_JUL_Whisk_D.jpeg",
    "Open Sign": "/items/CF_M_PYG_OpenSign_D.jpeg",
    "Critical Core": "/items/CF_M_DOO_CriticalCore.jpeg",
    "Cookie Cutters": "/items/CF_S_JUL_CookieCutters_D.jpeg",
    "Feast": "/items/CF_L_JUL_Feast_D.jpeg",
    "Egg Timer": "/items/CF_S_JUL_EggTimer_D.jpeg",
    "The Boulder": "/items/CF_L_Van_TheBoulder_D.jpeg",
    "Blowgun": "/items/CF_S_VAN_Blowgun_D.jpeg",
    "Foraged Mushrooms": "/items/CF_M_JUL_ForagedMushrooms_D.jpeg",
    "Yo-Yo": "/items/CF_S_PYG_YoYo_D.jpeg",
    "Ritual Dagger": "/items/CF_S_MAK_RitualDagger_D.jpeg",
    "Langxian": "/items/CF_M_VAN_Langxian_D.jpeg",
    "Gatling Gun": "/items/CF_M_STE_GatlingGun_D.jpeg",
    "Instant Noodles": "/items/CF_S_JUL_InstantNoodles_D.jpeg",
    "Harmadillo": "/items/CF_M_DOO_Harmadillo_D.jpeg",
    "Calcinator": "/items/CF_M_MAK_Calcinator_D.jpeg",
    "Tripwire": "/items/CF_M_VAN_Tripwire_D.jpeg",
    "Universal Sauce": "/items/CF_S_JUL_UniversalSauce_D.jpeg",
    "Thermal Lance": "/items/CF_M_DOO_ThermalLance_D.jpeg",
    "Grabinator": "/items/CF_M_STE_Grabinator_D.jpeg",
    "Revolver": "/items/CF_S_VAN_Revolver_D.jpeg",
    "Dragon Whelp": "/items/CF_S_STL_DragonWhelp_D.jpeg",
    "Sniper Rifle": "/items/CF_M_VAN_SniperRifle_D.jpeg",
    "Sauna": "/items/CF_M_PYG_Sauna_D.jpeg",
    "Cloche Hat": "/items/CF_M_STE_ClocheHat_D.jpeg",
    "Ice Cubes": "/items/CF_S_JUL_IceCubes_D.jpeg",
    "Rolling Pin": "/items/CF_M_JUL_RollingPin_D.jpeg",
    "Blueprints": "/items/CF_M_STE_Blueprints_D.jpeg",
    "Clamera": "/items/CF_S_VAN_Clamera_D.jpeg",
    "Food Truck": "/items/CF_L_JUL_FoodTruck_D.jpeg",
    "Shovel": "/items/CF_M_VAN_Shovel_D.jpeg",
    "Compass": "/items/CF_S_STE_MageneticCompass_D.jpeg",
    "Metronome": "/items/CF_S_DOO_Metronome_D.jpeg",
    "Weights": "/items/CF_M_PYG_Weights_D.jpeg",
    "Swash Buckle": "/items/CF_M_VAN_SwashBuckle_D.jpeg",
    "Death Caps": "/items/CF_M_MAK_DeathCaps_D.jpeg",
    "Jambalaya": "/items/CF_M_JUL_Jambalaya_D.jpeg",
    "Spyglass": "/items/CF_M_VAN_Spyglass_D.jpeg",
    "Pierre Conditioner": "/items/CF_M_DOO_PierreConditioner_D.jpeg",
    "Snow Globe": "/items/CF_M_PYG_SnowGlobe_D.jpeg",
    "Pendulum": "/items/CF_M_MAK_Pendulum_D.jpeg",
    "Infernal": "/items/CF_L_ADV_InfernalGreatsword_D.jpeg",
    "Viper": "/items/CF_M_MAK_ViperCane_D.jpeg"
};

export default itemToImageMapping; 