
import React from 'react';
import { useGame } from '../context/GameContext';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import { Song, Release } from '../types';

const HistoryItem: React.FC<{ item: Song | Release; stats: any }> = ({ item, stats }) => (
    <div className="bg-zinc-800 p-3 rounded-lg flex items-center gap-4">
        <img src={'coverArt' in item ? item.coverArt : ''} alt={item.title} className="w-16 h-16 rounded-md object-cover"/>
        <div className="flex-grow">
            <p className="font-bold text-lg">{item.title}</p>
            <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                <div>
                    <p className="text-xs text-zinc-400">PEAK</p>
                    <p className="font-bold text-xl">#{stats.peak}</p>
                </div>
                <div>
                    <p className="text-xs text-zinc-400">WEEKS ON CHART</p>
                    <p className="font-bold text-xl">{stats.weeksOnChart}</p>
                </div>
                <div>
                    <p className="text-xs text-zinc-400">WEEKS AT #1</p>
                    <p className="font-bold text-xl">{stats.weeksAtNo1 || 0}</p>
                </div>
            </div>
        </div>
    </div>
);

const ChartHistoryView: React.FC = () => {
    const { gameState, dispatch, activeArtistData } = useGame();
    const { chartHistory, albumChartHistory } = gameState;

    if (!activeArtistData) {
        return <div className="p-4">Loading history...</div>;
    }

    const { songs, releases } = activeArtistData;

    const chartedSongs = songs
        .filter(s => chartHistory[s.id])
        .map(s => ({ song: s, stats: chartHistory[s.id] }))
        .sort((a, b) => a.stats.peak - b.stats.peak);

    const chartedAlbums = releases
        .filter(r => (r.type === 'Album' || r.type === 'EP') && albumChartHistory[r.id])
        .map(r => ({ album: r, stats: albumChartHistory[r.id] }))
        .sort((a, b) => a.stats.peak - b.stats.peak);

    return (
        <div className="h-screen w-full bg-zinc-900 overflow-y-auto">
            <header className="p-4 flex items-center gap-4 sticky top-0 bg-zinc-900/80 backdrop-blur-sm z-10 border-b border-zinc-700/50">
                <button onClick={() => dispatch({ type: 'CHANGE_VIEW', payload: 'game' })} className="p-2 rounded-full hover:bg-white/10">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">Chart History</h1>
            </header>
            <main className="p-4 space-y-6">
                <div>
                    <h2 className="text-xl font-bold mb-4">Songs</h2>
                    <div className="space-y-3">
                        {chartedSongs.length > 0 ? chartedSongs.map(({ song, stats }) => (
                            <HistoryItem key={song.id} item={song} stats={stats} />
                        )) : <p className="text-zinc-500 text-sm bg-zinc-800 p-4 rounded-lg text-center">No song chart history yet.</p>}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-4">Albums & EPs</h2>
                     <div className="space-y-3">
                        {chartedAlbums.length > 0 ? chartedAlbums.map(({ album, stats }) => (
                            <HistoryItem key={album.id} item={album} stats={stats} />
                        )) : <p className="text-zinc-500 text-sm bg-zinc-800 p-4 rounded-lg text-center">No album/EP chart history yet.</p>}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChartHistoryView;
