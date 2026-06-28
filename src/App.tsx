import React, { useState, useEffect } from 'react';
import './App.css';

const reasons: string[] = [
  "За твою улыбку, которая освещает мой день",
  "За твои глаза, в которых я тону каждый раз",
  "За то, как ты смеешься над моими шутками",
  "За твою доброту и нежность",
  "За то, что ты есть в моей жизни",
  "За твои объятия, в которых я чувствую себя в безопасности",
  "За то, как ты заботишься обо мне",
  "За твой голос, который я люблю слышать каждое утро",
  "За то, что ты делаешь меня лучше",
  "За твое терпение ко мне",
  "За то, как ты светишься, когда радуешься",
  "За твой вкус в музыке и фильмах",
  "За то, что ты всегда поддерживаешь меня",
  "За твою страсть к жизни",
  "За то, как ты шепчешь мое имя",
  "За твои маленькие привычки, которые я обожаю",
  "За то, что ты всегда веришь в меня",
  "За твою удивительную энергетику",
  "За то, как ты смотришь на меня с любовью",
  "За твой ум и остроумие"
];

interface ReasonItem {
  id: number;
  text: string;
  isVisible: boolean;
}

const App: React.FC = () => {
  const [visibleReasons, setVisibleReasons] = useState<ReasonItem[]>([]);
  const [displayedCount, setDisplayedCount] = useState<number>(0);
  const [showHearts, setShowHearts] = useState<boolean>(false);
  const [totalReasons] = useState<number>(20);

  useEffect(() => {
    const initialReason = {
      id: Date.now(),
      text: reasons[0],
      isVisible: true,
    };
    setVisibleReasons([initialReason]);
    setDisplayedCount(1);
  }, []);

  const addReason = () => {
    if (displayedCount >= totalReasons) return;

    const nextIndex = displayedCount % reasons.length;
    const newReason = {
      id: Date.now(),
      text: reasons[nextIndex],
      isVisible: true,
    };

    setVisibleReasons(prev => [...prev, newReason]);
    setDisplayedCount(prev => prev + 1);
    setShowHearts(true);

    setTimeout(() => {
      setShowHearts(false);
    }, 1000);
  };

  const resetReasons = () => {
    const initialReason = {
      id: Date.now(),
      text: reasons[0],
      isVisible: true,
    };
    setVisibleReasons([initialReason]);
    setDisplayedCount(1);
  };

  const isAllReasonsShown = displayedCount >= totalReasons;

  return (
    <div className="app">
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="heart" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            fontSize: `${Math.random() * 20 + 10}px`,
            opacity: Math.random() * 0.5 + 0.2,
          }}>
            ❤️
          </div>
        ))}
      </div>

      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="title-emoji">💕</span>
            1000 причин почему я люблю тебя
            <span className="title-emoji">💕</span>
          </h1>
          <p className="subtitle">
            Карина, ты — моё счастье ❤️
          </p>
          <p className="counter">
            {displayedCount} из {totalReasons} причин
          </p>
        </header>

        <main className="reasons-container">
          {visibleReasons.map((reason, index) => (
            <div
              key={reason.id}
              className={`reason-card ${reason.isVisible ? 'fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="reason-number">#{index + 1}</span>
              <p className="reason-text">{reason.text}</p>
              <span className="reason-emoji">💖</span>
            </div>
          ))}

          {isAllReasonsShown && (
            <div className="final-message">
              <h2>И это только начало! 💕</h2>
              <p>Я люблю тебя больше, чем 1000 причин могут описать!</p>
              <div className="big-heart">❤️</div>
            </div>
          )}
        </main>

        <div className="button-container">
          {!isAllReasonsShown ? (
            <button className="add-button" onClick={addReason}>
              <span className="button-text">Показать ещё причину</span>
              <span className="button-emoji">✨</span>
            </button>
          ) : (
            <button className="reset-button" onClick={resetReasons}>
              <span className="button-text">Начать сначала</span>
              <span className="button-emoji">🔄</span>
            </button>
          )}
        </div>

        {showHearts && (
          <div className="hearts-burst">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="burst-heart"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 30}deg) translateX(60px)`,
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                ❤️
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;