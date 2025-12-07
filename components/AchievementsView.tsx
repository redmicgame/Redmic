
import React, { useState } from 'react';
import { useGame, formatNumber } from '../context/GameContext';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import { Song, Release, Video } from '../types';
import TrashIcon from './icons/TrashIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

const AchievementCard: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-zinc-800 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="space-y-3">{children}</div>
    </div>
);

const ItemRow: React.FC<{ item: Song | Release | Video; value: number; rank: number }> = ({ item, value, rank }) => (
    <div className="flex items-center gap-3">
        <div className="text-lg font-bold w-6 text-center text-zinc-400">{rank}</div>
        <img src={'coverArt' in item ? item.coverArt : item.thumbnail} alt={item.title} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
        <div className="flex-grow">
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-zinc-400 font-mono">{formatNumber(value)}</p>
        </div>
    </div>
);

const ExpandableList: React.FC<{ 
    items: Array<Song | Release | Video>; 
    getValue: (item: any) => number;
    emptyMessage: string;
}> = ({ items, getValue, emptyMessage }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    if (items.length === 0) {
        return <p className="text-zinc-500 text-sm">{emptyMessage}</p>;
    }

    const displayedItems = isExpanded ? items.slice(0, 10) : items.slice(0, 3);

    return (
        <>
            <div className="space-y-3">
                {displayedItems.map((item, i) => (
                    <ItemRow key={item.id} item={item} value={getValue(item)} rank={i + 1} />
                ))}
            </div>
            {items.length > 3 && (
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full py-2 text-sm text-zinc-400 hover:text-white flex items-center justify-center gap-1 mt-2 border-t border-zinc-700/50"
                >
                    {isExpanded ? 'Show Less' : 'Show Top 10'}
                    <ChevronDownIcon className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
            )}
        </>
    );
};


const AchievementsView: React.FC = () => {
    const { gameState, dispatch, activeArtistData } = useGame();

    if (!activeArtistData) {
        return <div className="p-4">Loading achievements...</div>;
    }

    const { songs, releases, videos, firstChartEntry } = activeArtistData;

    const topSongsFirstWeek = songs
        .filter(s => typeof s.firstWeekStreams === 'number')
        .sort((a, b) => (b.firstWeekStreams ?? 0) - (a.firstWeekStreams ?? 0));

    const topAlbumsFirstWeek = releases
        .filter(r => (r.type === 'Album' || r.type === 'EP') && typeof r.firstWeekStreams === 'number')
        .sort((a, b) => (b.firstWeekStreams ?? 0) - (a.firstWeekStreams ?? 0));

    const mostStreamedNonSingle = songs
        .filter(s => s.isReleased && !s.isPreReleaseSingle && releases.some(r => r.id === s.releaseId && r.type !== 'Single'))
        .sort((a, b) => b.streams - a.streams)[0];
        
    const topVideosFirstWeek = videos
        .filter(v => typeof v.firstWeekViews === 'number')
        .sort((a, b) => (b.firstWeekViews ?? 0) - (a.firstWeekViews ?? 0));

    const topFraudulentSongs = songs
        .filter(s => (s.removedStreams ?? 0) > 0)
        .sort((a, b) => (b.removedStreams ?? 0) - (a.removedStreams ?? 0));


    return (
        <div className="h-screen w-full bg-zinc-900 overflow-y-auto">
            <header className="p-4 flex items-center gap-4 sticky top-0 bg-zinc-900/80 backdrop-blur-sm z-10 border-b border-zinc-700/50">
                <button onClick={() => dispatch({type: 'CHANGE_VIEW', payload: 'game'})} className="p-2 rounded-full hover:bg-white/10">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">Achievements</h1>
            </header>
            <main className="p-4 space-y-6">
                <AchievementCard title="Top First Week Song Streams">
                    <ExpandableList 
                        items={topSongsFirstWeek} 
                        getValue={(item) => item.firstWeekStreams} 
                        emptyMessage="No songs with first week data yet." 
                    />
                </AchievementCard>

                <AchievementCard title="Top First Week Album/EP Streams">
                    <ExpandableList 
                        items={topAlbumsFirstWeek} 
                        getValue={(item) => item.firstWeekStreams} 
                        emptyMessage="No projects with first week data yet." 
                    />
                </AchievementCard>
                
                <AchievementCard title="Top First Week Music Video Views">
                    <ExpandableList 
                        items={topVideosFirstWeek} 
                        getValue={(item) => item.firstWeekViews} 
                        emptyMessage="No videos with first week data yet." 
                    />
                </AchievementCard>

                <AchievementCard title="Most Fraudulent Songs" icon={<TrashIcon className="w-6 h-6 text-red-500" />}>
                    <ExpandableList 
                        items={topFraudulentSongs} 
                        getValue={(item) => item.removedStreams} 
                        emptyMessage="No songs have had artificial streams removed yet." 
                    />
                </AchievementCard>

                <AchievementCard title="Most Streamed Non-Single">
                    {mostStreamedNonSingle ? (
                         <div className="flex items-center gap-3">
                            <img src={mostStreamedNonSingle.coverArt} alt={mostStreamedNonSingle.title} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-lg">{mostStreamedNonSingle.title}</p>
                                <p className="text-zinc-400 font-mono">{formatNumber(mostStreamedNonSingle.streams)} total streams</p>
                            </div>
                        </div>
                    ) : <p className="text-zinc-500 text-sm">No non-single tracks have been streamed yet.</p>}
                </AchievementCard>
                
                <AchievementCard title="First Billboard Hot 100 Entry">
                    {firstChartEntry ? (
                         <div className="flex items-center gap-3">
                            <div className="w-16 h-16 bg-red-600 rounded-md flex flex-col items-center justify-center text-white">
                                <p className="text-xs">DEBUT</p>
                                <p className="text-3xl font-bold">#{firstChartEntry.rank}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-lg">{firstChartEntry.songTitle}</p>
                                <p className="text-zinc-400 text-sm">Week {firstChartEntry.date.week}, {firstChartEntry.date.year}</p>
                            </div>
                        </div>
                    ) : <p className="text-zinc-500 text-sm">You haven't charted on the Hot 100 yet.</p>}
                </AchievementCard>
            </main>
        </div>
    );
};

export default AchievementsView;
