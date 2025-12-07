

import { ArtistData, GameState, XPost, XUser, XTrend, Song } from '../types';
import { formatNumber } from '../context/GameContext';

type PlayerSongWithChart = Song & { chartRank?: number };

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateFanUsername = (artistName: string): string => {
    const prefixes = ['stan', 'lover', 'fan', 'archive', 'daily', 'bestof'];
    const suffixes = ['updates', 'hq', 'source', 'forever', 'stanacc'];
    const cleanedName = artistName.replace(/\s/g, '');
    if (Math.random() > 0.5) {
        return `${pickRandom(prefixes)}${cleanedName}`;
    }
    return `${cleanedName}${pickRandom(suffixes)}`;
};

const generateHaterUsername = (): string => {
    const prefixes = ['user', 'anon', 'hater', 'critic', 'reality'];
    const suffixes = ['123', ' Speaks', 'Facts', 'XoXo', '001'];
    return `${pickRandom(prefixes)}${pickRandom(suffixes)}`;
};


export const generateWeeklyXContent = (
    artistData: ArtistData,
    gameState: GameState,
    artistName: string,
    playerSongs: PlayerSongWithChart[],
    leakedSong: Song | null
): { newPosts: XPost[], newUsers: XUser[], newTrends: XTrend[] } => {
    const newPosts: XPost[] = [];
    const newUsers: XUser[] = [];
    const newTrends: XTrend[] = [];
    const { date } = gameState;
    const { artistImages, artistVideoThumbnails, releases, streamsRemovedThisWeek, paparazziPhotos } = artistData;

    // --- LEAK POSTS ---
    if (leakedSong) {
        // PopBase Post
        newPosts.push({
            id: crypto.randomUUID(),
            authorId: 'popbase',
            content: `${artistName}'s unreleased song "${leakedSong.title}" has reportedly leaked online.`,
            image: leakedSong.coverArt,
            likes: Math.floor(Math.random() * 20000) + 10000,
            retweets: Math.floor(Math.random() * 5000) + 2000,
            views: Math.floor(Math.random() * 400000) + 100000,
            date
        });

        // TMZ post for leak
        const tmzAccount = artistData.xUsers.find(u => u.id === 'tmz');
        const playerUser = artistData.xUsers.find(u => u.isPlayer);
        if (tmzAccount && playerUser) {
            newPosts.push({
                id: crypto.randomUUID(),
                authorId: tmzAccount.id,
                content: `LEAKED: ${artistName}'s highly anticipated track "${leakedSong.title}" has surfaced online ahead of its official release.`,
                image: playerUser.avatar,
                likes: Math.floor(Math.random() * 4000) + 800, 
                retweets: Math.floor(Math.random() * 1500) + 200, 
                views: Math.floor(Math.random() * 300000) + 50000, 
                date
            });
        }


        // Supportive Fan Post
        const fanAccount = artistData.xUsers.find(u => u.id.startsWith('addiction_fan'));
        if (fanAccount) {
            newPosts.push({
                id: crypto.randomUUID(),
                authorId: fanAccount.id,
                content: `i'm seeing "${leakedSong.title}" leak links everywhere but i'm NOT listening!! we have to support ${artistName} and wait for the official release!! don't give the hackers what they want! #Support${artistName.replace(/\s/g, '')}`,
                image: undefined,
                likes: Math.floor(Math.random() * 15000) + 8000,
                retweets: Math.floor(Math.random() * 4000) + 1500,
                views: Math.floor(Math.random() * 250000) + 70000,
                date
            });
        }
        
        // Listening Fan Post
        const fanUser = artistData.xUsers.find(u => u.id === 'fan1'); // a generic fan from the initial setup
        if (fanUser) {
             newPosts.push({
                id: crypto.randomUUID(),
                authorId: fanUser.id,
                content: `omg i'm sorry i couldn't resist i listened to the ${leakedSong.title} leak and it's a MASTERPIECE... ${artistName} is about to save music again`,
                image: undefined,
                likes: Math.floor(Math.random() * 5000) + 1000,
                retweets: Math.floor(Math.random() * 800) + 200,
                views: Math.floor(Math.random() * 50000) + 10000,
                date
            });
        }

        // Hater Post
        const haterUsername = generateHaterUsername();
        const haterId = `hater_${haterUsername}`;
        newUsers.push({ id: haterId, name: haterUsername, username: haterUsername, avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMiIgZmlsbD0iI2QzMjYyNiIvPjwvc3ZnPg==', isVerified: false, followersCount: 0, followingCount: 0, bio: '' });
        newPosts.push({
            id: crypto.randomUUID(),
            authorId: haterId,
            content: `not ${artistName}'s song "${leakedSong.title}" leaking already 💀 their team is in shambles. can't even protect a song that's gonna flop anyway.`,
            image: undefined,
            likes: Math.floor(Math.random() * 800) + 100,
            retweets: Math.floor(Math.random() * 100) + 10,
            views: Math.floor(Math.random() * 15000) + 3000,
            date
        });
    }


    const releasedSongs = playerSongs.filter(s => s.isReleased);
    const topSong = [...releasedSongs].sort((a,b) => b.lastWeekStreams - a.lastWeekStreams)[0];

    // PopBase Post for stream removal
    if (streamsRemovedThisWeek && streamsRemovedThisWeek > 0) {
        newPosts.push({
            id: crypto.randomUUID(),
            authorId: 'popbase',
            content: `Spotify has reportedly removed approximately ${formatNumber(streamsRemovedThisWeek)} artificial streams from ${artistName}'s catalog following a routine review.`,
            image: undefined,
            likes: Math.floor(Math.random() * 8000) + 3000,
            retweets: Math.floor(Math.random() * 2000) + 500,
            views: Math.floor(Math.random() * 150000) + 40000,
            date
        });
        delete artistData.streamsRemovedThisWeek;
    }

    // (artist name) Stats post
    const statsAccount = artistData.xUsers.find(u => u.username === `${artistName.replace(/\s/g, '').toLowerCase()}stats`);

    if (statsAccount && releasedSongs.length > 0 && Math.random() < 0.8) { // 80% chance each week to post
        const topSongsForPost = [...releasedSongs]
            .sort((a, b) => b.lastWeekStreams - a.lastWeekStreams)
            .slice(0, 10);

        let postContent = `${artistName}'s most streamed songs on Spotify this week:\n\n`;

        topSongsForPost.forEach((song) => {
            let changeDisplay = '';
            if (song.prevWeekStreams > 0) {
                const change = ((song.lastWeekStreams - song.prevWeekStreams) / song.prevWeekStreams) * 100;
                changeDisplay = ` (+${change.toFixed(2)}%)`;
            }
            
            postContent += `"${song.title}" — ${formatNumber(song.lastWeekStreams)}${changeDisplay}\n`;
        });
        
        let image: string | undefined = undefined;
        if (artistImages.length > 0 && Math.random() > 0.3) {
            image = pickRandom(artistImages);
        }

        newPosts.push({
            id: crypto.randomUUID(),
            authorId: statsAccount.id,
            content: postContent.trim(),
            image: image,
            likes: Math.floor(Math.random() * 20000) + 5000,
            retweets: Math.floor(Math.random() * 5000) + 1000,
            views: Math.floor(Math.random() * 300000) + 80000,
            date
        });
    }

    // Check for Debut Release this week
    const debutRelease = releases.find(r => 
        r.releaseDate.week === date.week && 
        r.releaseDate.year === date.year && 
        releases.filter(rel => rel.artistId === r.artistId).length === 1 // It's a debut if it's the first release for this artist
    );

    if (debutRelease) {
        newPosts.push({
            id: crypto.randomUUID(), authorId: 'popbase',
            content: `${artistName} has officially released their debut ${debutRelease.type.toLowerCase()} "${debutRelease.title}".`,
            image: debutRelease.coverArt,
            likes: Math.floor(Math.random() * 30000) + 10000, 
            retweets: Math.floor(Math.random() * 8000) + 3000, 
            views: Math.floor(Math.random() * 500000) + 150000, 
            date
        });
    }

    // Weekly stream gain post for top song (if not debut week)
    if (topSong && !debutRelease && topSong.lastWeekStreams > 1_000_000) {
         if (Math.random() > 0.4) { // 60% chance of this post
            newPosts.push({
                id: crypto.randomUUID(), authorId: 'chartdata',
                content: `${artistName}'s "${topSong.title}" earned ${formatNumber(topSong.lastWeekStreams)} streams in the US this week.`,
                likes: Math.floor(Math.random() * 12000) + 4000, 
                retweets: Math.floor(Math.random() * 3000) + 800, 
                views: Math.floor(Math.random() * 180000) + 40000, 
                date
            });
         }
    }
    
    // TMZ Post Logic
    const tmzAccount = artistData.xUsers.find(u => u.id === 'tmz');
    if (tmzAccount && paparazziPhotos.length > 0 && Math.random() < 0.5) { // 50% chance
        const photo = pickRandom(paparazziPhotos);
        let content = '';
        switch(photo.category) {
            case 'Scandal':
                content = `EXCLUSIVE: ${artistName} seen in a heated argument in downtown LA. Is there trouble in paradise?`;
                break;
            case 'Fashion':
                content = `${artistName} turns heads with a stunning new look while out shopping today.`;
                break;
            case 'Candid':
                content = `${artistName} enjoys some downtime, spotted grabbing coffee this morning.`;
                break;
            case 'Spotted':
            default:
                content = `${artistName} was spotted out and about in New York City earlier today.`;
                break;
        }
        
        newPosts.push({
            id: crypto.randomUUID(), authorId: tmzAccount.id, content: content, image: photo.image,
            likes: Math.floor(Math.random() * 4000) + 800, 
            retweets: Math.floor(Math.random() * 1500) + 200, 
            views: Math.floor(Math.random() * 3000000) + 500000, 
            date
        });
    }

    // --- FAN WAR LOGIC ---
    if (artistData.fanWarStatus) {
        const { targetArtistName } = artistData.fanWarStatus;
        
        const rivalTopSong = gameState.npcs.find(s => s.artist === targetArtistName);
        const playerTopSong = playerSongs.sort((a, b) => (b.lastWeekStreams ?? 0) - (a.lastWeekStreams ?? 0))[0];

        const playerFanAccount = artistData.xUsers.find(u => u.id.startsWith('addiction_fan'));

        if (playerFanAccount && playerTopSong && rivalTopSong) {
            const dissTemplates = [
                `ur fav ${targetArtistName} could never pull the numbers ${artistName} is doing with "${playerTopSong.title}". just facts.`,
                `heard that new ${rivalTopSong.title} song... it's giving background music at a department store. meanwhile "${playerTopSong.title}" is a cultural reset.`,
                `Not floppy ${targetArtistName} struggling to stay in the top 20 while ${artistName} is just getting started. Tanked.`,
                `"${targetArtistName}" fans are so quiet right now... wonder why 🤔 couldn't be because their fave's new single debuted at #47 and is already gone`,
            ];
            newPosts.push({
                id: crypto.randomUUID(),
                authorId: playerFanAccount.id,
                content: pickRandom(dissTemplates),
                likes: Math.floor(Math.random() * 12000) + 4000, 
                retweets: Math.floor(Math.random() * 2500) + 800, 
                views: Math.floor(Math.random() * 150000) + 50000, 
                date
            });

            // Rival fan retaliation
            const rivalFanUsername = generateFanUsername(targetArtistName);
            const rivalFanId = `fanwar_rival_${rivalFanUsername}`;
            let rivalFanUser = artistData.xUsers.find(u => u.username === rivalFanUsername);
            if (!rivalFanUser) {
                 rivalFanUser = {
                    id: rivalFanId, 
                    name: `${targetArtistName} fan`, 
                    username: rivalFanUsername, 
                    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMiIgZmlsbD0iIzM2NjJlYiIvPjwvc3ZnPg==',
                    isVerified: false, bio: `stan account for ${targetArtistName}`,
                    followersCount: Math.floor(Math.random() * 20000) + 500,
                    followingCount: Math.floor(Math.random() * 500) + 50
                 };
                 newUsers.push(rivalFanUser);
            }
           
            const retaliationTemplates = [
                `at least ${targetArtistName} has a grammy... when will ${artistName}?`,
                `${artistName}'s fans are the most annoying fandom I swear. insecure because their fave is a local artist.`,
                `"cultural reset"?? ${artistName}'s song sounds like every other song on the radio. ${targetArtistName} is an innovator.`,
                `all i hear is crickets from ${artistName}'s song on the charts. it TANKED.`,
            ];
            newPosts.push({
                id: crypto.randomUUID(),
                authorId: rivalFanUser.id,
                content: pickRandom(retaliationTemplates),
                likes: Math.floor(Math.random() * 9000) + 2000, 
                retweets: Math.floor(Math.random() * 1500) + 400, 
                views: Math.floor(Math.random() * 100000) + 30000, 
                date
            });

            newTrends.push({
                id: crypto.randomUUID(),
                category: 'Music · Trending',
                title: `${artistName.replace(/\s/g, '')} vs ${targetArtistName.replace(/\s/g, '')}`,
                postCount: Math.floor(Math.random() * 40000) + 15000
            });
        }
    }

    // --- PUSH CAMPAIGN LOGIC ---
    const playerUser = artistData.xUsers.find(u => u.isPlayer);
    const recentPushPost = playerUser ? artistData.xPosts.find(p => p.authorId === playerUser.id && p.content.toLowerCase().startsWith('push ')) : undefined;
    
    if (recentPushPost) {
        const postAge = (date.year * 52 + date.week) - (recentPushPost.date.year * 52 + recentPushPost.date.week);
        if (postAge <= 1) { // Check if post is from this week or last week
            const chartFanAccount = artistData.xUsers.find(u => u.username.endsWith('charts'));
            if (chartFanAccount) {
                 const playerFandomName = (gameState.soloArtist?.fandomName || gameState.group?.fandomName || `${artistName} Fans`);
                 newPosts.push({
                     id: crypto.randomUUID(), authorId: chartFanAccount.id,
                     content: `${playerFandomName.toUpperCase()}!! ${artistName} said it! ${recentPushPost.content.toUpperCase()}!!! LET'S GO!`,
                     likes: Math.floor(Math.random() * 15000) + 5000,
                     retweets: Math.floor(Math.random() * 4000) + 1500,
                     views: Math.floor(Math.random() * 200000) + 70000,
                     date
                 });
            }
        }
    }


    // 1. Generate Posts
    const postCount = Math.floor(Math.random() * 4) + 2; // 2-5 new posts per week
    for (let i = 0; i < postCount; i++) {
        const postType = Math.random();

        // 60% chance for a fan post, 40% for a hater
        if (postType < 0.6 && topSong) { // Fan Post
            const fanUsername = generateFanUsername(artistName);
            const fanId = `fan_${fanUsername}`;
            
            const fanAvatar = artistImages.length > 0 
                ? pickRandom(artistImages) 
                : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMiIgZmlsbD0iI2FlYWVhZSIvPjxwYXRoIGQ9Ik0zMiA0Ni4zMDRjLTUuNjcgMC0xMC44MDQtMi4zMjItMTQuNDA0LTYuMTYyLTMuNjA0LTMuODQtNS41OTYtOC45OTYtNS41OTYtMTQuMzk2aDYuODE2Yy4wMDQgNC4yNDQgMS41NjQgOC4yMzIgNC40MDQgMTEuMjc2IDIuODQgMy4wNDQgNi42ODQgNC42NzggMTAuOTMyIDQuNjc4djYuMTYyem0tMTUuNS0xMS41djBoLjAwNHptLjc1Ni0xNC40MDhjLjg0NC0zLjA0OCAzLjEyOC01LjQ4IDUuOTcyLTguMTY0IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTMyIDQ2LjMwNGM1LjY3IDAgMTAuODA0LTIuMzIyIDE0LjQwNC02LjE2MiAzLjYwNC0zLjggNTEuNTk2LTguOTk2IDUuNTk2LTE0LjM5NmgtNi44MTZjLS4wMDQgNC4yNDQtMS41NjQgOC4yMzItNC40MDQgMTEuMjc2LTIuODQgMy4wNDQtNi42ODQgNC42NzgtMTAuOTMyIDQuNjc4djYuMTYyem0xNS41LTExLjV2MGgtLjAwNHptLS43NTYtMTQuNDA4YzAtNC4zMjQtMy4wNC03LjQ4OC03LjI0OC03LjQ4OHM3LjI0OC0uNDggNy4yNDggNy40ODgiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJfid2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==';
            
            newUsers.push({ 
                id: fanId, 
                name: fanUsername, 
                username: fanUsername, 
                avatar: fanAvatar, 
                isVerified: false,
                bio: `stan account for the one and only ${artistName}`,
                followersCount: Math.floor(Math.random() * 5000) + 100,
                followingCount: Math.floor(Math.random() * 500) + 50
            });
            
            const fanTemplates = [
                `STREAMING ${topSong.title.toUpperCase()} ALL DAY!! Let's get it to #1.`,
                `${artistName} is the best artist of our generation and I'm tired of pretending they're not.`,
                `I can't get "${topSong.title}" out of my head! 😭❤️`,
                `obsessed with ${artistName}'s new era. the visuals, the music... everything is perfect.`,
                `Listening to ${topSong.title} on repeat! What a masterpiece.`,
                `Anyone else think ${artistName} deserves a Grammy for this? Just me? okay.`,
            ];
            let image: string | undefined = undefined;
            if (artistImages.length > 0 && Math.random() > 0.5) {
                image = pickRandom(artistImages);
            }
            newPosts.push({
                id: crypto.randomUUID(), authorId: fanId, content: pickRandom(fanTemplates), image,
                likes: Math.floor(Math.random() * 2000), retweets: Math.floor(Math.random() * 500), views: Math.floor(Math.random() * 15000), date
            });

        } else if (postType >= 0.6 && topSong) { // Hater Post
            const haterUsername = generateHaterUsername();
            const haterId = `hater_${haterUsername}`;
            newUsers.push({ id: haterId, name: haterUsername, username: haterUsername, avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMiIgZmlsbD0iI2QzMjYyNiIvPjwvc3ZnPg==', isVerified: false, followersCount: 0, followingCount: 0, bio: '' });
            
            const haterTemplates = [
                `${artistName} fell off so hard. the new music is not it.`,
                `Is anyone actually listening to "${topSong.title}"? 😬`,
                `Another generic song from ${artistName}. Shocker.`,
                `The hype around ${artistName} is manufactured. #industryplant`,
                `they really think they're an artist huh`,
            ];
            newPosts.push({
                id: crypto.randomUUID(), authorId: haterId, content: pickRandom(haterTemplates),
                likes: Math.floor(Math.random() * 500), retweets: Math.floor(Math.random() * 50), views: Math.floor(Math.random() * 8000), date
            });
        }
    }

    // Addiction Account Post
    const allMedia = [...artistImages, ...artistVideoThumbnails];
    const addictionAccount = artistData.xUsers.find(u => u.id.startsWith('addiction_fan'));

    if (addictionAccount && allMedia.length > 0 && Math.random() < 0.75) { // 75% chance each week
        const templates = [
            `thinking about this ${artistName}`,
            `obsessed.`,
            `${artistName}`,
            `this moment.`,
            `can't stop watching this`
        ];
        newPosts.push({
            id: crypto.randomUUID(),
            authorId: addictionAccount.id,
            content: pickRandom(templates),
            image: pickRandom(allMedia),
            likes: Math.floor(Math.random() * 150000) + 50000, // 50k - 200k
            retweets: Math.floor(Math.random() * 15000) + 5000, // 5k - 20k
            views: Math.floor(Math.random() * 1500000) + 500000, // 500k - 2M
            date
        });
    }
    
    // 2. Chart Post if applicable
    const chartedSong = playerSongs.find(s => s.chartRank && s.chartRank <= 100);
    if (chartedSong && chartedSong.chartRank) {
        newPosts.push({
            id: crypto.randomUUID(), authorId: 'chartdata',
            content: `${artistName}'s "${chartedSong.title}" debuts at #${chartedSong.chartRank} on this week's Billboard Hot 100.`,
            likes: Math.floor(Math.random() * 15000) + 5000, retweets: Math.floor(Math.random() * 4000) + 1000, views: Math.floor(Math.random() * 200000) + 50000, date
        });
    }

     // 3. PopBase post if song is doing well (and not a debut, to avoid duplicate posts)
    if (topSong && !debutRelease && topSong.lastWeekStreams > 5_000_000) {
        if (Math.random() > 0.5) { // 50% chance
            newPosts.push({
                id: crypto.randomUUID(), authorId: 'popbase',
                content: `${artistName}'s new single "${topSong.title}" is gaining major traction, racking up over ${formatNumber(topSong.lastWeekStreams)} streams this week alone.`,
                image: topSong.coverArt,
                likes: Math.floor(Math.random() * 25000) + 8000, retweets: Math.floor(Math.random() * 7000) + 2000, views: Math.floor(Math.random() * 400000) + 100000, date
            });
        }
    }

    // 4. Generate Trends
    const potentialTrends = [{ category: 'Trending in United States', title: artistName, postCount: Math.floor(Math.random() * 50000) + 10000 }];
    if (leakedSong) {
        potentialTrends.unshift({
            category: 'Music · Trending',
            title: `${leakedSong.title} Leak`,
            postCount: Math.floor(Math.random() * 100000) + 45000,
        });
    }
    if (topSong) {
        potentialTrends.push({ category: 'Music · Trending', title: `#${topSong.title.replace(/\s/g, '')}`, postCount: Math.floor(Math.random() * 80000) + 20000 });
    }
    const latestRelease = artistData.releases.sort((a,b) => (b.releaseDate.year * 52 + b.releaseDate.week) - (a.releaseDate.year * 52 + a.releaseDate.week))[0];
    if(latestRelease && latestRelease.review && latestRelease.review.score < 5) {
        potentialTrends.push({ category: 'Music · Trending', title: `${artistName}Flop`, postCount: Math.floor(Math.random() * 20000) + 5000 });
    }
    // Simple placeholder trends
    const placeholders = [
        { category: 'Entertainment · Trending', title: 'New Movie Trailer', postCount: 250000 },
        { category: 'Gaming · Trending', title: 'Game Awards', postCount: 1200000 },
        { category: 'Politics · Trending', title: 'World Leader Summit', postCount: 340000 },
    ];
    
    // Shuffle and pick
    const shuffledTrends = [...potentialTrends, ...placeholders].sort(() => 0.5 - Math.random());
    for(let i = 0; i < 5 && i < shuffledTrends.length; i++) {
        // Avoid duplicate trends
        if (!newTrends.some(t => t.title === shuffledTrends[i].title)) {
            newTrends.push({ id: crypto.randomUUID(), ...shuffledTrends[i] });
        }
    }

    // 5. Generate Posts from Chart Fan Account
    const playerUsername = artistData.xUsers.find(u => u.isPlayer)?.username || artistName.replace(/\s/g, '').toLowerCase();
    const chartFanAccount = artistData.xUsers.find(u => u.username.endsWith('charts'));

    if (chartFanAccount) {
        // Monthly Listeners Post
        const shouldPostListeners = (date.week % 4 === 1 && Math.random() < 0.75) || Math.random() < 0.25;
        if (artistData.monthlyListeners > 1000 && shouldPostListeners) {
            const change = Math.floor(artistData.monthlyListeners * (Math.random() * 0.03 + 0.005));
            const postContent = `Spotify Update — Monthly Listeners:\n\n• @${playerUsername} — ${formatNumber(artistData.monthlyListeners)} (+${formatNumber(change)})`;
            const image = artistImages.length > 0 ? pickRandom(artistImages) : (artistVideoThumbnails.length > 0 ? pickRandom(artistVideoThumbnails) : undefined);
            
            newPosts.push({
                id: crypto.randomUUID(), authorId: chartFanAccount.id, content: postContent, image,
                likes: Math.floor(Math.random() * 5000) + 1000, retweets: Math.floor(Math.random() * 1000) + 200, views: Math.floor(Math.random() * 80000) + 20000, date
            });
        }

        // Milestone Post
        if (Math.random() < 0.4) {
            const milestones = [1e8, 2e8, 3e8, 4e8, 5e8, 6e8, 7e8, 8e8, 9e8, 1e9, 1.5e9, 2e9];
            const songsNearMilestone: Song[] = [];
            for (const song of releasedSongs) {
                const nextMilestone = milestones.find(m => m > song.streams);
                if (nextMilestone && (song.streams / nextMilestone) > 0.95 && (song.streams / nextMilestone) < 1.0) {
                    songsNearMilestone.push(song);
                }
            }

            if (songsNearMilestone.length > 0) {
                let postContent = `${artistName}'s next songs to reach a milestone on Spotify:\n\n`;
                songsNearMilestone
                    .sort((a, b) => b.streams - a.streams)
                    .slice(0, 4)
                    .forEach(song => {
                        postContent += `${song.title}: ${formatNumber(song.streams)} streams\n`;
                    });
                postContent += `\n🚀 Keep streaming to these songs on Spotify.`;
                const image = artistImages.length > 0 ? pickRandom(artistImages) : undefined;

                newPosts.push({
                    id: crypto.randomUUID(), authorId: chartFanAccount.id, content: postContent.trim(), image,
                    likes: Math.floor(Math.random() * 3000) + 500, retweets: Math.floor(Math.random() * 800) + 100, views: Math.floor(Math.random() * 60000) + 10000, date
                });
            }
        }

        // Upcoming Release Post
        const scheduledSubmissions = artistData.labelSubmissions.filter(s => s.status === 'scheduled');
        if (scheduledSubmissions.length > 0) {
            const upcomingReleases: { name: string, cover: string, weeks: number, type: string }[] = [];
            const toTotalWeeks = (d: GameState['date']) => d.year * 52 + d.week;
            const nowTotalWeeks = toTotalWeeks(date);
            
            scheduledSubmissions.forEach(sub => {
                if (sub.projectReleaseDate) {
                    const weeksUntil = toTotalWeeks(sub.projectReleaseDate) - nowTotalWeeks;
                    if (weeksUntil > 0 && weeksUntil <= 4) {
                        upcomingReleases.push({ name: sub.release.title, cover: sub.release.coverArt, weeks: weeksUntil, type: sub.release.type });
                    }
                }
                sub.singlesToRelease?.forEach(single => {
                    const weeksUntil = toTotalWeeks(single.releaseDate) - nowTotalWeeks;
                    const song = playerSongs.find(s => s.id === single.songId);
                    if (weeksUntil > 0 && weeksUntil <= 4 && song) {
                        upcomingReleases.push({ name: song.title, cover: song.coverArt, weeks: weeksUntil, type: 'Single' });
                    }
                });
            });

            if (upcomingReleases.length > 0) {
                const soonest = upcomingReleases.sort((a, b) => a.weeks - b.weeks)[0];
                const daysUntil = soonest.weeks * 7 - Math.floor(Math.random() * 4);
                const postContent = `.@${playerUsername}’s “${soonest.name}” will be released in ${daysUntil} days.`;
                
                newPosts.push({
                    id: crypto.randomUUID(), authorId: chartFanAccount.id, content: postContent, image: soonest.cover,
                    likes: Math.floor(Math.random() * 40000) + 15000, retweets: Math.floor(Math.random() * 10000) + 4000, views: Math.floor(Math.random() * 800000) + 300000, date
                });
            }
        }
    }

    return { newPosts, newUsers, newTrends };
};
