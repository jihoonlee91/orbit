import { useState } from 'react'
import './App.css'
import GamePlay from './GamePlay'
import { STAGE_COUNT } from './game/constants'
import type { StageResult } from './game/types'
import { recordScore } from './game/scoreHistory'
import type { ScoreEntry } from './game/scoreHistory'

type Screen = 'main' | 'play' | 'end'

function App() {
  const [screen, setScreen] = useState<Screen>('main')
  const [stageIndex, setStageIndex] = useState(0)
  const [finalScore, setFinalScore] = useState(0)
  const [result, setResult] = useState<StageResult>('gameover')
  const [rank, setRank] = useState(1)
  const [topScores, setTopScores] = useState<ScoreEntry[]>([])

  const startGame = () => {
    setStageIndex(0)
    setScreen('play')
  }

  const finish = (outcome: StageResult, score: number) => {
    setFinalScore(score)
    setResult(outcome)

    const { history, rank: newRank } = recordScore({
      score,
      stageReached: stageIndex + 1,
      result: outcome,
      playedAt: new Date().toISOString(),
    })
    setRank(newRank)
    setTopScores(history.slice(0, 5))

    setScreen('end')
  }

  const handleClear = (score: number) => {
    if (stageIndex + 1 < STAGE_COUNT) {
      setStageIndex(stageIndex + 1)
    } else {
      finish('clear', score)
    }
  }

  const handleGameOver = (score: number) => {
    finish('gameover', score)
  }

  if (screen === 'main') {
    return (
      <div className="screen">
        <h1>PANG</h1>
        <button type="button" className="screen-button" onClick={startGame}>
          시작하기
        </button>
      </div>
    )
  }

  if (screen === 'play') {
    return (
      <GamePlay
        stageIndex={stageIndex}
        onClear={handleClear}
        onGameOver={handleGameOver}
      />
    )
  }

  return (
    <div className="screen">
      <h1>{result === 'clear' ? '게임 클리어' : '게임 오버'}</h1>
      <p className="result-score">점수 {finalScore}</p>
      <p className="result-high-score">역대 {rank}위</p>
      <p className="result-detail">
        {result === 'clear'
          ? '전체 클리어'
          : `${stageIndex + 1}번째 스테이지에서 종료`}
      </p>
      <p className="result-detail">
        {new Date().toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
      {topScores.length > 0 && (
        <ol className="score-history">
          {topScores.map((entry, i) => (
            <li key={`${entry.playedAt}-${i}`}>
              {i + 1}위 · {entry.score}점 ·{' '}
              {entry.result === 'clear'
                ? '클리어'
                : `${entry.stageReached}스테이지`}
            </li>
          ))}
        </ol>
      )}
      <button type="button" className="screen-button" onClick={() => setScreen('main')}>
        메인으로
      </button>
    </div>
  )
}

export default App
