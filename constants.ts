

import { Label, Manager, SecurityTeam } from './types';
import { ArtistData } from './types';

export const INITIAL_MONEY = 100000;

export const GENRES = ['Pop', 'Hip Hop', 'R&B', 'Rock', 'Electronic', 'Indie', 'Country'];

export const STUDIOS = [
    { name: 'Bedroom Studio', cost: 500, qualityRange: [10, 50] },
    { name: 'Local Studio', cost: 2000, qualityRange: [30, 70] },
    { name: 'Pro Studio', cost: 8000, qualityRange: [50, 90] },
    { name: 'Legendary Studio', cost: 25000, qualityRange: [70, 100] },
];

export const REVIEW_COST = 1000;

export const REVIEWER_NAMES = [
    'Jianna Dominguez',
    'Marcus Finch',
    'Corinne Bailey',
    'Leo Valdez',
    'Simone Dubois',
    'Rich Juzwiak',
    'Elena Petrova',
    'Samir Gupta'
];

// YouTube Constants
export const VIDEO_COSTS = {
    'Visualizer': 5000,
    'Lyric Video': 15000,
    'Music Video': 50000,
    'Custom': 2500,
};

export const SUBSCRIBER_THRESHOLD_STORE = 500000;
export const SUBSCRIBER_THRESHOLD_VERIFIED = 1000000;
export const VIEWS_THRESHOLD_VERIFIED = 10000000;

// Merch Constants
export const MERCH_PRODUCT_LIMIT = 30;

// Economy Constants
export const STREAM_INCOME_MULTIPLIER = 0.004; // $0.004 per stream
export const VIEW_INCOME_MULTIPLIER = 0.001; // $0.001 per view
export const CATALOG_VALUE_MULTIPLIER = 0.5; // Catalog is worth $0.50 per total stream

export const TIER_LEVELS: { [key in Label['tier']]: number } = {
    'Low': 1,
    'Mid-Low': 2,
    // FIX: Corrected typo 'Mid-High' to 'Mid-high' to match the type definition in types.ts.
    'Mid-high': 3,
    'Top': 4,
};


// Promotion Constants
export const PROMOTION_PACKAGES = {
    song: [
        { name: 'Playlist Push', weeklyCost: 2500, boost: 1.5, description: 'Modest boost targeting curated playlists.', requiredTier: 'Low' as const },
        { name: 'Radio Campaign', weeklyCost: 12500, boost: 2.5, description: 'Significant boost via radio airplay.', requiredTier: 'Mid-Low' as const },
        // FIX: Corrected typo 'Mid-High' to 'Mid-high' to match the type definition in types.ts.
        { name: 'TikTok Trend', weeklyCost: 75000, boost: 4.0, description: 'Explosive viral potential, billed weekly.', requiredTier: 'Mid-high' as const },
        { name: 'Global Megahit Campaign', weeklyCost: 125000, boost: 10, description: 'Turn your song into a worldwide phenomenon.', requiredTier: 'Top' as const },
    ],
    video: [
        { name: 'Featured Placement', weeklyCost: 5000, boost: 2, description: 'Get your video featured on the homepage.' },
        { name: 'Ad Campaign', weeklyCost: 18750, boost: 3.5, description: 'Widespread ad campaign across the platform.' },
        { name: 'Viral Sensation', weeklyCost: 125000, boost: 10, description: 'Engineer a viral moment for your video.' },
        { name: 'Synergy Campaign', weeklyCost: 75000, boost: -1, description: "Match your song's weekly streams as views for this video." },
        { name: 'Global Premiere', weeklyCost: 250000, boost: 30, description: 'A massive global premiere event.' },
        { name: 'Cultural Reset', weeklyCost: 2500000, boost: 75, description: 'An event video that dominates the cultural conversation.' }
    ],
    resurgence: [
        { name: 'Nostalgia Campaign', weeklyCost: 31250, boost: 10, description: 'A massive push to make an old classic a hit again.' },
        { name: 'Legendary Revival', weeklyCost: 125000, boost: 30, description: 'Breathe new life into a classic, making it bigger than ever.' }
    ]
};

// Spotify Constants
export const PLAYLIST_PITCH_COST = 5000;
export const PLAYLIST_PITCH_SUCCESS_RATE = 0.5; // 50%
export const PLAYLIST_BOOST_MULTIPLIER = 1.2;
export const PLAYLIST_BOOST_WEEKS = 2;


// Chart Constants
export const NPC_ARTIST_NAMES = [
    'Taylor Swift', 'Ariana Grande', 'Billie Eilish', 'The Weeknd', 'Drake', 
    'Justin Bieber', 'Ed Sheeran', 'Beyoncé', 'Rihanna', 'Adele', 
    'Post Malone', 'Dua Lipa', 'Olivia Rodrigo', 'Harry Styles', 'Bad Bunny',
    'Kendrick Lamar', 'J. Cole', 'Travis Scott', 'Doja Cat', 'SZA',
    'Lana Del Rey', 'Frank Ocean', 'Tyler, the Creator', 'Lil Nas X', 'Cardi B',
    'Nicki Minaj', 'Megan Thee Stallion', 'Kanye West', 'Jay-Z', 'Eminem',
    'Lady Gaga', 'Bruno Mars', 'Miley Cyrus', 'Selena Gomez', 'Demi Lovato',
    'Shawn Mendes', 'Camila Cabello', 'Halsey', 'Lorde', 'Charli XCX',
    'Coldplay', 'Imagine Dragons', 'Maroon 5', 'OneRepublic', 'Arctic Monkeys',
    'The 1975', 'Tame Impala', 'Glass Animals', 'FINNEAS', 'Jack Harlow',
    'Sabrina Carpenter', 'Tate McRae', 'Chappell Roan', 'Ice Spice', '21 Savage',
    'Future', 'Metro Boomin', 'Morgan Wallen', 'Luke Combs', 'Zach Bryan',
    'Peso Pluma', 'Karol G', 'Shakira', 'Rauw Alejandro', 'Anitta'
];
export const NPC_SONG_ADJECTIVES = ['Golden', 'Ordinary', 'What I', 'Your', 'Midnight', 'Electric', 'Fading', 'Broken', 'Summer', 'Winter', 'Lost', 'Found', 'Starlight', 'City', 'Velvet', 'Crystal', 'Silent', 'Cosmic', 'Wild', 'Sweet', 'Bitter'];
export const NPC_SONG_NOUNS = ['Idol', 'Want', 'Dreams', 'Rain', 'Lights', 'Hearts', 'Echoes', 'Sky', 'Moon', 'Sun', 'Stars', 'Ocean', 'River', 'Memories', 'Secrets', 'Lies', 'Truth', 'Flames', 'Sparks', 'Ghosts'];
export const NPC_COVER_ART = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I2NjY2NjYztzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOTk5OTk5O3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZykiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI1NCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzAwMCI+YmlsbGJvYXJkPC90ZXh0Pgo8L3N2Zz4=';


// Record Label Constants
export const LABELS: Label[] = [
    { 
        id: 'umg', 
        name: 'UMG', 
        tier: 'Top',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMiIgZmlsbD0iIzE5MTkxOSIvPjxwYXRoIGQ9Ik0zMiA1Mi4yODhjLTExLjIxMyAwLTIwLjI4OC05LjA3NS0yMC4yODgtMjAuMjg4IDAtMTEuMjEzIDkuMDc1LTIwLjI4OCAyMC4yODgtMjAuMjg4IDExLjIxMyAwIDIwLjI4OCA5LjA3NSAyMC4yODggMjAuMjg4IDAgMTEuMjEzLTkuMDc1IDIwLjI4OC0yMC4yODggMjAuMjg4ek0zMiAxNS43ODhjLTYuNzUgMC0xMi4yMjUgNS40NzYtMTIuMjI1IDEyLjIyNCAwIDYuNzUgNS40NzUgMTIuMjI1IDEyLjIyNSAxMi4yIjc1IDYuNzQ4IDAgMTIuMjI0LTUuNDc1IDEyLjIyNC0xMi4yMjUgMC02Ljc0OC01LjQ3NC0xMi4yMjQtMTIuMjI0LTEyLjIyNHoiIGZpbGw9IndoaXRlIi8+PC9zdmc+', 
        promotionMultiplier: 2.0, 
        creativeControl: 80,
        minQuality: 68,
        streamRequirement: 1_000_000_000,
        youtubeChannel: {
            name: 'Universal Music Group',
            handle: '@universalmusicgroup',
            subscribers: 58_000_000,
            banner: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
        }
    },
    { 
        id: 'interscope', 
        name: 'Interscope Records', 
        tier: 'Mid-high',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMiIgZmlsbD0iYmxhY2siLz48cGF0aCBkPSJNMjggMjBIMzZWMjRIMjhWMjBaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0zMCAyNkgzNFY0NEgzMFYyNloiIGZpbGw9IndoaXRlIi8+PC9zdmc+', 
        promotionMultiplier: 1.7, 
        creativeControl: 70,
        minQuality: 60,
        streamRequirement: 750_000_000,
    },
    { 
        id: 'republic', 
        name: 'Republic Records', 
        // FIX: Corrected typo 'Mid-High' to 'Mid-high' to match the type definition in types.ts.
        tier: 'Mid-high',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIi8+PHBhdGggZD0iTTMyIDYuMzk4YzQuMjY0IDAgOC40NTYgMS40MyAxMS45NDQgNC4wNDVMOC4zNiAzMS4xMjhWMTAuNDQzQzE1MjIgNy44MyAyMy4yNTYgNi40IDMyIDYuNHpNMzIgNTcuNmMtNC4yNjQgMC04LjQ1Ni0xLjQzLTExLjk0NC00LjA0NUw1NS42NCAzMi44NzJ2MjAuNjg1Yy02LjgtMi42MTItMTQuODU2LTQuMDQzLTIzLjY0LTQuMDQzeiIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==', 
        promotionMultiplier: 1.5, 
        creativeControl: 60,
        minQuality: 50,
        streamRequirement: 500_000_000,
    },
    { 
        id: 'columbia', 
        name: 'Columbia Records', 
        tier: 'Mid-Low',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9ImJsYWNrIi8+PHBhdGggZD0iTTMyIDE2QzE2IDE2IDggMzIgOCAzMkM4IDMyIDE2IDQ4IDMyIDQ4QzQ4IDQ4IDU2IDMyIDU2IDMyQzU2IDMyIDQ4IDE2IDMyIDE2WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0Ii8+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iOCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=', 
        promotionMultiplier: 1.4, 
        creativeControl: 50,
        minQuality: 45,
        streamRequirement: 275_000_000,
        youtubeChannel: {
            name: 'Columbia Records',
            handle: '@columbiarecords',
            subscribers: 12_500_000,
            banner: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
        }
    },
    { 
        id: 'rca', 
        name: 'RCA Records', 
        tier: 'Mid-Low',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0zMiA1MC42NjdjLTEwLjMxIDAtMTguNjY3LTguMzU3LTE4LjY2Ny0xOC42NjdzOC4zNTctMTguNjY3IDE4LjY2Ny0xOC42NjcgMTguNjY3IDguMzU3IDE4LjY2NyAxOC42NjctOC4zNTcgMTguNjY3LTE4LjY2NyAxOC42Njd6IiBmaWxsPSIjRTQxRTI3Ii8+PHBhdGggZD0iTTMyIDE4LjY2N2MtMi43NTIgMC01LjM5IDEuMTU1LTYuNTM0IDMuMzQybC0uMDA4LjAxM2MtLjE0OS4yNTYtLjIyNi41NTYtLjIyNi44NjggMCAuNzY1LjYxOCAxLjM4MyAxLjM4MyAxLjM4My4zMTIgMCAuNjA3LS4xMDMuODU1LS4yNzggMS40NjgtMS4wMzQgMy4xODUtMS41OTQgNC44NzUtMS42MS4wNTQgMCAuMTA2LjAwMi4xNi4wMDJhMS4zNjggMS4zNjggMCAwMC44MTMtLjU0MyAxLjM4MiAxLjM4MiAwIDAwLjM2OC0xLjYyNWMtLjA1My0uMDk1LS4xMTYtLjE4My0uMTg4LS4yNjQtLjk4LTEuMzMtMi40Ny0yLjA3NC00LjA5NS0yLjA3NHptLTkuMDI2IDE0LjYyNWMxLjQ0OC4wMDQgMi44OTU-.27IDQuMjM1LS44MDJsLjEyNC0uMDQ4Yy4yMDctLjA3OC40My0uMTE4LjY1LS4xMTguNzc1IDAgMS40MDQuNjMgMS40MDQgMS40MDQgMCAuMjE4LS4wNTIuNDM1LS4xNDguNjM0bC0uMDIuMDQyYy0xLjgwNyAzLjA0Mi00LjQ4IDQuNzctNy4xNzQgNC43Ny0zLjQ0NyAwLTYuNTYtMi4zNDYtNy42NzMtNS44MDgtLjA1NC0uMTcxLS4wODQtLjM1LS4wODQtLjUzNCAwLS43NzUuNjMtMS40MDQgMS40MDQtMS40MDQuMjM1IDAgLjQ2LjA2LjY2LjE2OGwxLjQ5LjY3OGMxLjMyLjYgMi43NS45MzYgNC4yNDIuOTM2em0xOC45MDgtMi40MjJjLTEuMjgtLjg4OC0yLjczLTEuMzk0LTQuMjYtMS40MDgtMi4zOTgtLjAyLTIuNTU4LS4wMi00LjY2Ni4wMDItLjg3NS4wMDItMS42NzctLjMxMi0yLjQ5LS44NzUtMS44MTctMS4yNi0yLjQxNy0zLjM4My0xLjczNC01LjU4LjU1NC0xLjc3NiAyLjA1OC0zLjA2NyAzLjg1NC0zLjQ0OC4yMS0uMDQ0LjQzLS4wNjYuNjUtLjA2Ni43NzUgMCAxLjQwNC42MyAxLjQwNCAxLjQwNCAwIC4yOS0uMDkgLjU2OC0uMjQ4LjgwMmwtLjQzMi42NDhjLS40MTcuNjI0LS45OC45OTYtMS42MTguOTk2LS4zMSAwLS41OTgtLjA3OC0uODYyLS4yMzZsLS4xMy0uMDhjLS4xOC0uMTE1LS4yODMtLjMxMi0uMjgzLS41MiAwLS4zMTIuMTY0LS42LjQyNC0uNzY2bC4wNTctLjAzNWMuNTE0LS4zMiAxLjA3My0uNDggMS42Ni0uNDgucDEuNzM4Yy4zOTIgMCAuNzU3LjE1NSAxLjAyNC40MzZsLjAzNi4wMzRjLjI2LjI1LjM5Ny41OTIuMzk3Ljk1IDAgLjM2LS4xNDIuNzA4LS4zOTcuOTYybC0uMDc0LjA3Yy0uNTU0LjUzNC0xLjI4NC44My0yLjA1LjgzLS4wMiAwIDAgMCAwIDBsLTMuMTQ4LjAwMmMtLjMxMiAwLS42LS4xMi0uODI4LS4zMjgtLjIzLS4yMi0uMzYtLjUxLS4zNi0uODI2IDAtLjI4OC4xLS41NjIuMjgzLS43NzZsLjAxLS4wMTJjLjc3NS0uOTEyIDEuODQtMS40MTggMi45Ny0xLjQxOCAxLjI5IDAgMi40NjIuNTggMy4yMzggMS41MzZsLjA0Mi4wNTFjLjM4LjQ2LjU4MyAxLjA0LjU4MyAxLjY0IDAgLjYtLjIwMyAxLjE4LS41OSAxLjY0eiIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==',
        promotionMultiplier: 1.2, 
        creativeControl: 40,
        minQuality: 40,
        streamRequirement: 200_000_000,
    },
    { 
        id: 'atlantic', 
        name: 'Atlantic Records', 
        tier: 'Mid-Low',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMiIgZmlsbD0id2hpdGUiLz48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyOCIgZmlsbD0iYmxhY2siLz48cGF0aCBkPSJNMzIgMTZMNDQgNDhIMzlMMzUuNSAzOEgyOC41TDI1IDQ4SDIwTDMyIDE2Wk0zMCAzNEgzNEwzMiAyOEwzMCAzNFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+',
        promotionMultiplier: 1.15, 
        creativeControl: 30,
        minQuality: 30,
        streamRequirement: 50_000_000,
    },
    { 
        id: 'epic', 
        name: 'Epic Records', 
        tier: 'Low',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9ImJsYWNrIi8+PHBhdGggZD0iTTIwIDIwSDQ0VjI2SDIwVjIwWiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMjAgMzBIMzhWMzZIMjBWMzBaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0yMCA0MEg0NFY0NkgMjBWMDRaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==', 
        promotionMultiplier: 1.12, 
        creativeControl: 25,
        minQuality: 20,
        streamRequirement: 10_000_000,
        youtubeChannel: {
            name: 'Epic Records',
            handle: '@epicrecords',
            subscribers: 9_200_000,
            banner: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
        }
    },
    { 
        id: 'island', 
        name: 'Island Records', 
        tier: 'Low',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjQgMzJDMjguNjU0IDMyIDAgMzIgMCAzMiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMCAzMkM1IDMyIDMyIDU5IDMyIDU5IiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik02NCAzMkM1OSA0MSAzMiA1OSAzMiA1OSIgZmlsbD0iIzAwQjk5RiIvPjxwYXRoIGQ9Ik0wIDMyQzUgMjMgMzIgNSAzMiA1IiBmaWxsPSIjRkZBMDNDIi8+PHBhdGggZD0iTTY0IDMyQzU5IDIzIDMyIDUgMzIgNSIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMCAzMkMzLjUgMzIgMzIgMzIgMzIgMzIiIGZpbGw9IiMwMEI5OUYiLz48L3N2Zz4=',
        promotionMultiplier: 1.1, 
        creativeControl: 20,
        minQuality: 0,
        streamRequirement: 1_000_000,
        youtubeChannel: {
            name: 'Island Records',
            handle: '@islandrecords',
            subscribers: 5_100_000,
            banner: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
        }
    }
];

export const CUSTOM_LABEL_TIERS = {
    'Indie': { cost: 50000, promotionMultiplier: 1.1, requiredStreams: 0 },
    'Mid': { cost: 500000, promotionMultiplier: 1.35, requiredStreams: 100_000_000 },
    'High': { cost: 1000000, promotionMultiplier: 1.75, requiredStreams: 350_000_000 },
};

// Tour Constants
export const TOUR_TIER_REQUIREMENTS: { [key: string]: number } = {
    'Small Halls': 20,
    'Large Halls': 40,
    'Arenas': 60,
    'Stadiums': 80,
};

export const TOUR_TICKET_PRICE_SUGGESTIONS: { [key: string]: number } = {
    'Small Halls': 25,
    'Large Halls': 45,
    'Arenas': 75,
    'Stadiums': 120,
};

export const VENUES = {
    'Small Halls': [
        { name: 'The Roxy', city: 'Los Angeles', capacity: 500 },
        { name: 'The Bowery Ballroom', city: 'New York', capacity: 575 },
        { name: 'The Independent', city: 'San Francisco', capacity: 500 },
        { name: 'Lincoln Hall', city: 'Chicago', capacity: 500 },
        { name: 'The Masquerade', city: 'Atlanta', capacity: 1000 },
    ],
    'Large Halls': [
        { name: 'Hollywood Palladium', city: 'Los Angeles', capacity: 3700 },
        { name: 'Hammerstein Ballroom', city: 'New York', capacity: 3500 },
        { name: 'Aragon Ballroom', city: 'Chicago', capacity: 5000 },
        { name: 'The Anthem', city: 'Washington D.C.', capacity: 6000 },
        { name: 'Ryman Auditorium', city: 'Nashville', capacity: 2362 },
    ],
    'Arenas': [
        { name: 'Madison Square Garden', city: 'New York', capacity: 20000 },
        { name: 'The Forum', city: 'Los Angeles', capacity: 17500 },
        { name: 'United Center', city: 'Chicago', capacity: 23500 },
        { name: 'American Airlines Arena', city: 'Miami', capacity: 21000 },
        { name: 'The O2', city: 'London', capacity: 20000 },
    ],
    'Stadiums': [
        { name: 'SoFi Stadium', city: 'Los Angeles', capacity: 70000 },
        { name: 'MetLife Stadium', city: 'New York', capacity: 82500 },
        { name: 'Wembley Stadium', city: 'London', capacity: 90000 },
        { name: 'AT&T Stadium', city: 'Dallas', capacity: 80000 },
        { name: 'Mercedes-Benz Stadium', city: 'Atlanta', capacity: 71000 },
    ],
};

// Business Constants
export const MANAGERS: Manager[] = [
    { id: 'm1', name: 'Local Booker', yearlyCost: 150000, popularityBoost: 2, autoGigsPerWeek: 1, unlocksTier: 5 },
    { id: 'm2', name: 'Industry Veteran', yearlyCost: 500000, popularityBoost: 5, autoGigsPerWeek: 2, unlocksTier: 6 },
    { id: 'm3', name: 'Power Broker', yearlyCost: 2000000, popularityBoost: 10, autoGigsPerWeek: 3, unlocksTier: 7 },
];

export const SECURITY_TEAMS: SecurityTeam[] = [
    { id: 's1', name: 'Mall Cop Security', weeklyCost: 5000, leakProtection: 0.75 },
    { id: 's2', name: 'Ex-Cop Bodyguards', weeklyCost: 25000, leakProtection: 0.40 },
    { id: 's3', name: 'Elite Private Security', weeklyCost: 100000, leakProtection: 0.10 },
];

export const GIGS = [
    { name: 'Open Mic Night', description: 'Perform at a local coffee shop.', cashRange: [100, 500], hype: 2, isAvailable: (state: ArtistData) => true, requirements: 'None' },
    { name: 'Local Bar Show', description: 'A proper gig at a downtown bar.', cashRange: [500, 2000], hype: 5, isAvailable: (state: ArtistData) => state.songs.some(s => s.isReleased), requirements: 'Requires 1+ released song' },
    { name: 'Opening Act', description: 'Open for an established local band.', cashRange: [2000, 5000], hype: 10, isAvailable: (state: ArtistData) => state.songs.filter(s => s.isReleased).length >= 3 && state.monthlyListeners > 10000, requirements: '3+ released songs & 10K listeners' },
    { name: 'Headlining Small Venue', description: 'Your own show at a 200-cap venue.', cashRange: [5000, 15000], hype: 15, isAvailable: (state: ArtistData) => state.releases.some(r => r.type === 'EP' || r.type === 'Album') && state.monthlyListeners > 50000, requirements: 'EP/Album & 50K listeners' },
    { name: 'College Music Festival', description: 'Headline a university music fest.', cashRange: [20000, 50000], hype: 20, isAvailable: (state: ArtistData) => state.manager && MANAGERS.find(m => m.id === state.manager!.id)!.unlocksTier >= 5, requirements: 'Requires a Tier 1 Manager' },
    { name: 'Late Night Show Performance', description: 'Perform on a major late-night TV show.', cashRange: [50000, 100000], hype: 35, isAvailable: (state: ArtistData) => state.manager && MANAGERS.find(m => m.id === state.manager!.id)!.unlocksTier >= 6, requirements: 'Requires a Tier 2 Manager' },
    { name: 'Major Festival Slot', description: 'Perform at a world-renowned festival like Coachella.', cashRange: [150000, 400000], hype: 60, isAvailable: (state: ArtistData) => state.manager && MANAGERS.find(m => m.id === state.manager!.id)!.unlocksTier >= 7, requirements: 'Requires a Tier 3 Manager' },
];