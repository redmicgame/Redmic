import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useGame } from '../context/GameContext';
import type { Release, Song, GameDate } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import PlusIcon from './icons/PlusIcon';
import DotsHorizontalIcon from './icons/DotsHorizontalIcon';
import TrianglePlayIcon from './icons/TrianglePlayIcon';
import ArrowUpTrayIcon from './icons/ArrowUpTrayIcon';
import VolumeUpIcon from './icons/VolumeUpIcon';
import VolumeOffIcon from './icons/VolumeOffIcon';

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="text-center">
        <p className="text-5xl font-bold">{String(value).padStart(2, '0')}</p>
        <p className="text-xs uppercase tracking-widest">{label}</p>
    </div>
);

const gameDateToFutureDate = (gameDate: GameDate, currentRealDate: Date, currentGameDate: GameDate): Date => {
    const weeksInFuture = (gameDate.year * 52 + gameDate.week) - (currentGameDate.year * 52 + currentGameDate.week);
    const futureDate = new Date(currentRealDate);
    futureDate.setDate(futureDate.getDate() + weeksInFuture * 7);
    return futureDate;
};

const SpotifyAlbumCountdownView: React.FC = () => {
    const { gameState, dispatch, activeArtist, activeArtistData } = useGame();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const { selectedReleaseId, date: gameDate } = gameState;

    const { labelSubmissions, songs } = activeArtistData!;
    const submission = useMemo(() => labelSubmissions.find(sub => sub.release.id === selectedReleaseId), [labelSubmissions, selectedReleaseId]);
    const release = submission?.release;
    const releaseSongs = useMemo(() => {
        if (!release) return [];
        return release.songIds.map(id => songs.find(s => s.id === id)).filter(Boolean) as Song[];
    }, [release, songs]);

    useEffect(() => {
        if (!submission?.projectReleaseDate) return;

        const targetDate = gameDateToFutureDate(submission.projectReleaseDate, new Date(), gameDate);

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [submission, gameDate]);

    if (!submission || !release || !activeArtist) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <p>Upcoming release not found.</p>
                <button onClick={() => dispatch({ type: 'CHANGE_VIEW', payload: 'spotify' })} className="absolute top-4 left-4">Back</button>
            </div>
        );
    }
    
    const handleVideoToggle = () => {
        const video = videoRef.current;
        if (!video) return;
        if (isVideoPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsVideoPlaying(!isVideoPlaying);
    };

    const handleMuteToggle = () => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !isMuted;
        setIsMuted(!isMuted);
    }

    return (
        <div className="relative h-screen w-full bg-black text-white overflow-hidden">
            {release.countdownVideoUrl ? (
                <video ref={videoRef} src={release.countdownVideoUrl} muted loop playsInline className={`absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`} />
            ) : null}
            <img src={release.coverArt} alt={release.title} className={`absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

            <div className="relative z-10 h-full flex flex-col p-4">
                <header className="flex justify-between items-center">
                    <button onClick={() => dispatch({ type: 'CHANGE_VIEW', payload: 'spotify' })} className="p-2 -m-2">
                        <ChevronLeftIcon className="w-7 h-7" />
                    </button>
                    {isVideoPlaying && (
                         <button onClick={handleMuteToggle} className="p-2 -m-2">
                            {isMuted ? <VolumeOffIcon className="w-7 h-7" /> : <VolumeUpIcon className="w-7 h-7" />}
                         </button>
                    )}
                </header>

                <main className="flex-grow flex flex-col justify-end space-y-4">
                     <button onClick={handleVideoToggle} className="w-24 h-24 rounded-md shadow-2xl flex-shrink-0">
                         <img src={release.coverArt} alt={release.title} className="w-full h-full object-cover rounded-md" />
                     </button>
                    <div className="flex items-center gap-4 text-white/80">
                        <CountdownUnit value={timeLeft.days} label="Days" />
                        <CountdownUnit value={timeLeft.hours} label="Hours" />
                        <CountdownUnit value={timeLeft.minutes} label="Minutes" />
                        <CountdownUnit value={timeLeft.seconds} label="Seconds" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">{release.title}</h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <img src={activeArtist.image} alt={activeArtist.name} className="w-6 h-6 rounded-full object-cover"/>
                            <span>{activeArtist.name}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">{release.type} • Releases on October 3, 2025</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-zinc-400">
                            <ArrowUpTrayIcon className="w-6 h-6" />
                            <DotsHorizontalIcon className="w-6 h-6" />
                        </div>
                        <button className="flex items-center gap-2 bg-green-500 text-black font-bold px-4 py-2 rounded-full text-sm">
                            <PlusIcon className="w-5 h-5" />
                            Pre-save
                        </button>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                        <h2 className="font-semibold mb-2">Tracklist preview</h2>
                        <div className="space-y-3">
                            {releaseSongs.map((song, index) => {
                                const isPreReleased = song.isReleased;
                                return (
                                <div key={song.id} className={`flex items-center gap-3 ${!isPreReleased ? 'opacity-50' : ''}`}>
                                    <div className="w-6 text-center text-zinc-400">{index + 1}</div>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-white">{song.title}</p>
                                        <p className="text-xs text-zinc-400">{activeArtist.name}</p>
                                    </div>
                                    {isPreReleased && <TrianglePlayIcon className="w-6 h-6 text-green-400" />}
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SpotifyAlbumCountdownView;
