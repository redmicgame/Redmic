import React from 'react';
import { useGame } from '../context/GameContext';
import ChevronRightIcon from './icons/ChevronRightIcon';
import SpotifyIcon from './icons/SpotifyIcon';

const ChartItemPreview: React.FC<{
    rank: number;
    coverArt: string;
    title: string;
    artist: string;
}> = ({ rank, coverArt, title, artist }) => (
    <div className="flex items-center gap-4">
        <div className="text-2xl font-bold w-8 text-center text-zinc-400">{rank}</div>
        <img src={coverArt} alt={title} className="w-14 h-14 rounded-md object-cover"/>
        <div className="flex-grow">
            <p className="font-bold">{title}</p>
            <p className="text-sm text-zinc-400">{artist}</p>
        </div>
    </div>
);

const ChartsTab: React.FC = () => {
    const { gameState, dispatch } = useGame();
    const { billboardHot100, spotifyGlobal50, billboardTopAlbums } = gameState;

    const billboardTop3 = billboardHot100.slice(0, 3);
    const spotifyTop3 = spotifyGlobal50.slice(0, 3);
    const billboardAlbumsTop3 = billboardTopAlbums.slice(0, 3);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-500">Charts</h2>
            <div className="bg-zinc-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Billboard Hot 100</h3>
                    <button onClick={() => dispatch({ type: 'CHANGE_VIEW', payload: 'billboard' })} className="text-sm text-red-400 flex items-center gap-1">
                        View Chart <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
                {billboardTop3.length > 0 ? (
                    <div className="space-y-4">
                        {billboardTop3.map(song => (
                            <ChartItemPreview key={song.uniqueId} rank={song.rank} coverArt={song.coverArt} title={song.title} artist={song.artist} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-zinc-400">The chart is empty.</p>
                        <p className="text-zinc-500 text-sm">Release music and wait a week for the chart to update.</p>
                    </div>
                )}
            </div>

            <div className="bg-zinc-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Billboard Top 50 Albums</h3>
                    <button onClick={() => dispatch({ type: 'CHANGE_VIEW', payload: 'billboardAlbums' })} className="text-sm text-red-400 flex items-center gap-1">
                        View Chart <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
                {billboardAlbumsTop3.length > 0 ? (
                    <div className="space-y-4">
                        {billboardAlbumsTop3.map(album => (
                            <ChartItemPreview key={album.uniqueId} rank={album.rank} coverArt={album.coverArt} title={album.title} artist={album.artist} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-zinc-400">The chart is empty.</p>
                        <p className="text-zinc-500 text-sm">Release an EP or Album and wait a week for the chart to update.</p>
                    </div>
                )}
            </div>
            
             <div className="bg-zinc-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <SpotifyIcon className="w-6 h-6"/>
                        <h3 className="font-bold text-lg">Global Top 50</h3>
                    </div>
                    <button onClick={() => dispatch({ type: 'CHANGE_VIEW', payload: 'spotifyChart' })} className="text-sm text-red-400 flex items-center gap-1">
                        View Chart <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
                {spotifyTop3.length > 0 ? (
                    <div className="space-y-4">
                        {spotifyTop3.map(song => (
                            <ChartItemPreview key={song.uniqueId} rank={song.rank} coverArt={song.coverArt} title={song.title} artist={song.artist} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-zinc-400">The chart is empty.</p>
                         <p className="text-zinc-500 text-sm">Release music and wait a week for the chart to update.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChartsTab;