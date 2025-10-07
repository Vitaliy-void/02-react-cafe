// import { useState } from 'react'
// import CafeInfo from './components/CafeInfo/CafeInfo'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       { <CafeInfo /> }
      
//     </>
//   )
// }

// export default App


import { useState, useMemo, useCallback } from 'react';
import css from './App.module.css'; // створи порожній або скопіюй з репо стилів (клас .app)
import CafeInfo from './components/CafeInfo/CafeInfo';
import VoteOptions from './components/VoteOptions/VoteOptions';
import VoteStats from './components/VoteStats/VoteStats';
import Notification from './components/Notification/Notification';
import type { Votes, VoteType } from './types/votes';

export default function App() {
  const [votes, setVotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });

  const handleVote = useCallback((type: VoteType) => {
    setVotes(prev => ({ ...prev, [type]: prev[type] + 1 }));
  }, []);

  const resetVotes = useCallback(() => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  }, []);

  const totalVotes = useMemo(() => votes.good + votes.neutral + votes.bad, [votes]);

  const positiveRate = useMemo(() => {
    return totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0;
  }, [votes.good, totalVotes]);

  return (
    <div className={css.app}>
      <CafeInfo />

      <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes > 0} />

      {totalVotes > 0 ? (
        <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />
      ) : (
        <Notification />
      )}
    </div>
  );
}