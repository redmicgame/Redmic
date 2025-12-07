

import React, { useState } from 'react';
import { useGame, formatNumber } from '../context/GameContext';
import { LABELS, CUSTOM_LABEL_TIERS } from '../constants';
import type { Contract, Label, CustomLabel, LabelSubmission } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

const LabelCard: React.FC<{ label: Label, onSign: (labelId: Label['id']) => void, canSign: boolean }> = ({ label, onSign, canSign }) => (
    <div className={`bg-zinc-800 p-4 rounded-lg flex flex-col items-center text-center transition-opacity ${!canSign ? 'opacity-50' : ''}`}>
        <img src={label.logo} alt={label.name} className="w-20 h-20 rounded-full object-cover mb-3" />
        <h3 className="text-lg font-bold">{label.name}</h3>
        <p className="text-sm font-semibold" style={{ color: label.tier === 'Top' ? '#f59e0b' : '#a1a1aa' }}>{label.tier} Tier</p>
        <div className="mt-3 text-xs text-zinc-400 space-y-1">
            <p>Promotion: <span className="font-bold text-white">{label.promotionMultiplier}x</span></p>
            <p>Creative Control: <span className="font-bold text-white">{100 - label.creativeControl}% Freedom</span></p>
            <p>Requires: <span className="font-bold text-white">{formatNumber(label.streamRequirement)} streams</span></p>
        </div>
        <button 
            onClick={() => onSign(label.id)}
            disabled={!canSign}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-colors text-sm disabled:bg-zinc-600 disabled:cursor-not-allowed"
        >
            {canSign ? 'View Offer' : 'Locked'}
        </button>
    </div>
);

const SubmissionStatusBadge: React.FC<{ status: LabelSubmission['status'] }> = ({ status }) => {
    switch (status) {
        case 'pending':
            return <span className="text-xs font-bold text-yellow-400 bg-yellow-900/50 px-2 py-1 rounded-full">Pending</span>;
        case 'awaiting_player_input':
            return <span className="text-xs font-bold text-blue-400 bg-blue-900/50 px-2 py-1 rounded-full">Action Required</span>;
        case 'scheduled':
            return <span className="text-xs font-bold text-purple-400 bg-purple-900/50 px-2 py-1 rounded-full">Scheduled</span>;
        case 'rejected':
            return <span className="text-xs font-bold text-red-400 bg-red-900/50 px-2 py-1 rounded-full">Rejected</span>;
    }
}

const SubmissionItem: React.FC<{ submission: LabelSubmission }> = ({ submission }) => {
    const { dispatch } = useGame();

    const handlePlanRelease = () => {
        dispatch({ type: 'GO_TO_LABEL_PLAN', payload: { submissionId: submission.id } });
    };

    return (
        <div className="bg-zinc-800 p-3 rounded-lg flex items-center gap-4">
            <img src={submission.release.coverArt} alt={submission.release.title} className="w-16 h-16 rounded-md object-cover"/>
            <div className="flex-grow">
                <p className="font-bold">{submission.release.title}</p>
                <p className="text-sm text-zinc-400">{submission.release.type}</p>
                {submission.status === 'scheduled' && submission.projectReleaseDate && (
                    <p className="text-xs text-green-300">Releasing W{submission.projectReleaseDate.week}, {submission.projectReleaseDate.year}</p>
                )}
            </div>
            <div className="flex flex-col items-end gap-2">
                <SubmissionStatusBadge status={submission.status} />
                {submission.status === 'awaiting_player_input' && (
                    <button onClick={handlePlanRelease} className="text-sm bg-blue-500 text-white font-semibold px-3 py-1 rounded-md hover:bg-blue-600">
                        Plan Release
                    </button>
                )}
            </div>
        </div>
    );
};


const SignedView: React.FC<{ contract: Contract }> = ({ contract }) => {
    const { gameState, dispatch, activeArtistData } = useGame();
    const { date } = gameState;
    const { labelSubmissions, contractHistory } = activeArtistData!;

    const allCustomLabels = Object.values(gameState.artistsData).flatMap(data => data.customLabels);

    const label = contract.isCustom 
        ? allCustomLabels.find(l => l.id === contract.labelId)
        : LABELS.find(l => l.id === contract.labelId);

    if (!label) return <p>Error: Label not found.</p>;

    if (contract.isCustom) {
        const customLabel = label as CustomLabel;
        const deal = LABELS.find(l => l.id === customLabel.dealWithMajorId);
        return (
            <div className="space-y-6">
                <div className="bg-zinc-800 rounded-lg p-6 flex flex-col items-center">
                    <img src={customLabel.logo} alt={customLabel.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                    <h3 className="text-2xl font-bold">{customLabel.name}</h3>
                    <p className="text-zinc-400 mt-1">You are signed to your own label.</p>
                    {deal && (
                        <p className="text-sm text-blue-300 mt-2">Distribution deal with {deal.name}</p>
                    )}
                    <div className="w-full mt-6 text-center text-sm">
                        <p className="text-zinc-300">As the owner, you have full creative control. Submissions are auto-approved.</p>
                        {deal ? (
                             <p className="text-zinc-400 mt-2">Your releases must meet the quality standards of {deal.name}.</p>
                        ) : (
                            <p className="text-zinc-400 mt-2">You can seek a major label distribution deal to improve your promotional power.</p>
                        )}
                    </div>
                </div>
                 <button onClick={() => dispatch({type: 'END_CONTRACT'})} className="w-full text-center text-sm text-zinc-500 hover:text-red-500">
                    Go Independent
                </button>
            </div>
        )
    }

    const majorLabel = label as Label;
    const weeksPassed = (date.year * 52 + date.week) - (contract.startDate.year * 52 + contract.startDate.week);
    const weeksRemaining = contract.durationWeeks! - weeksPassed;
    const yearsRemaining = (weeksRemaining / 52).toFixed(1);

    const progressPercentage = (contract.albumsReleased / contract.albumQuota!) * 100;

    return (
        <div className="space-y-6">
            <div className="bg-zinc-800 rounded-lg p-6 flex flex-col items-center">
                <img src={majorLabel.logo} alt={majorLabel.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                <h3 className="text-2xl font-bold">{majorLabel.name}</h3>
                <p className="text-zinc-400">{majorLabel.tier} Tier Label</p>

                <div className="w-full mt-6 space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold text-zinc-300">Time Remaining</span>
                            <span className="text-zinc-400">{weeksRemaining} weeks (~{yearsRemaining} years)</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2.5">
                            <div className="bg-red-600 h-2.5 rounded-full" style={{width: `${(weeksRemaining / contract.durationWeeks!) * 100}%`}}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold text-zinc-300">Album Quota</span>
                            <span className="text-zinc-400">{contract.albumsReleased} / {contract.albumQuota} Albums</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{width: `${progressPercentage}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>
            {labelSubmissions.length > 0 && (
                 <div className="space-y-4">
                    <h2 className="text-xl font-bold">Label Submissions</h2>
                    <div className="space-y-3">
                        {labelSubmissions.map(sub => <SubmissionItem key={sub.id} submission={sub} />)}
                    </div>
                </div>
            )}
            {contractHistory.length > 0 && (
                <div className="space-y-4 mt-6">
                    <h2 className="text-xl font-bold">Past Contracts</h2>
                    <div className="space-y-3">
                        {contractHistory.map(pastContract => {
                            const pastLabel = pastContract.isCustom 
                                ? allCustomLabels.find(l => l.id === pastContract.labelId) 
                                : LABELS.find(l => l.id === pastContract.labelId);
                            if (!pastLabel) return null;

                            const hasLabelChannel = !pastContract.isCustom && (pastLabel as Label).youtubeChannel;

                            const durationWeeks = pastContract.durationWeeks || 0;
                            const endWeekRaw = pastContract.startDate.week + durationWeeks;
                            const endDate = {
                                week: (endWeekRaw - 1) % 52 + 1,
                                year: pastContract.startDate.year + Math.floor((endWeekRaw - 1) / 52)
                            };

                            return (
                                <div key={pastLabel.id} className="bg-zinc-800 p-3 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <img src={pastLabel.logo} alt={pastLabel.name} className="w-12 h-12 rounded-full object-cover"/>
                                        <div className="flex-grow">
                                            <p className="font-bold">{pastLabel.name}</p>
                                            <p className="text-sm text-zinc-400">Ended: W{endDate.week}, {endDate.year}</p>
                                        </div>
                                        {hasLabelChannel && (
                                            <button
                                                onClick={() => dispatch({ type: 'VIEW_PAST_LABEL_CHANNEL', payload: pastLabel.id })}
                                                className="bg-blue-600/20 text-blue-300 font-bold px-3 py-1.5 rounded-md text-sm hover:bg-blue-600/40"
                                            >
                                                View Channel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const UnsignedView: React.FC = () => {
    const { gameState, dispatch, activeArtist, activeArtistData } = useGame();
    const [offerModalLabel, setOfferModalLabel] = useState<Label | null>(null);

    if (!activeArtistData || !activeArtist) return null;
    const careerStreams = activeArtistData.songs.reduce((sum, song) => sum + song.streams, 0);

    const handleSign = (labelId: Label['id']) => {
        const newContract: Contract = {
            labelId,
            artistId: activeArtist!.id,
            startDate: gameState.date,
            durationWeeks: 104, // 2 years
            albumQuota: 2,
            albumsReleased: 0
        };
        dispatch({ type: 'SIGN_CONTRACT', payload: { contract: newContract }});
        setOfferModalLabel(null);
    };
    
    return (
        <>
            {offerModalLabel && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-zinc-800 rounded-2xl shadow-lg p-6 border border-red-500/50 text-center">
                        <img src={offerModalLabel.logo} alt={offerModalLabel.name} className="w-20 h-20 rounded-full mx-auto mb-4"/>
                        <h2 className="text-2xl font-bold">Contract Offer</h2>
                        <p className="text-lg font-semibold text-zinc-300">{offerModalLabel.name}</p>
                        <div className="my-6 text-left bg-zinc-700/50 p-4 rounded-lg space-y-2">
                            <p><span className="font-semibold text-zinc-400">Duration:</span> 2 Years (104 Weeks)</p>
                            <p><span className="font-semibold text-zinc-400">Album Quota:</span> 2 Albums</p>
                            <p><span className="font-semibold text-zinc-400">Promotion Tier:</span> {offerModalLabel.tier}</p>
                        </div>
                        <p className="text-xs text-zinc-400 mb-6">
                            By signing, you agree to submit all your music to {offerModalLabel.name} for approval before release.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => setOfferModalLabel(null)} className="w-full h-12 bg-zinc-600 hover:bg-zinc-700 font-bold rounded-lg">Decline</button>
                            <button onClick={() => handleSign(offerModalLabel.id)} className="w-full h-12 bg-red-600 hover:bg-red-700 font-bold rounded-lg">Sign Contract</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="space-y-6">
                <div className="text-center">
                    <p className="text-zinc-400 mt-1">Sign with a major label or create your own.</p>
                     <button 
                        onClick={() => dispatch({ type: 'CHANGE_VIEW', payload: 'createLabel' })}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors text-base"
                    >
                        Create Your Own Label
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {LABELS.map(label => {
                        const canSign = careerStreams >= label.streamRequirement;
                        return (
                            <LabelCard 
                                key={label.id} 
                                label={label} 
                                onSign={() => setOfferModalLabel(label)} 
                                canSign={canSign}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};


const LabelsView: React.FC = () => {
    const { dispatch, activeArtistData } = useGame();
    if (!activeArtistData) return null;

    const { contract } = activeArtistData;

    return (
        <div className="h-screen w-full bg-zinc-900 overflow-y-auto">
            <header className="p-4 flex items-center gap-4 sticky top-0 bg-zinc-900/80 backdrop-blur-sm z-10 border-b border-zinc-700/50">
                <button onClick={() => dispatch({type: 'CHANGE_VIEW', payload: 'game'})} className="p-2 rounded-full hover:bg-white/10">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">{contract ? 'Current Contract' : 'Record Labels'}</h1>
            </header>
            <main className="p-4">
                {contract ? <SignedView contract={contract} /> : <UnsignedView />}
            </main>
        </div>
    );
};

export default LabelsView;