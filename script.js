import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const XP_PER_HABIT = 20;
const BASE_MAX_XP = 100;

function getMaxXP(level) {
  return Math.floor(BASE_MAX_XP * Math.pow(1.2, level - 1));
}

function LevelUpModal({ level, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="levelup-overlay" onClick={onClose}>
      <div className="levelup-modal">
        <div className="levelup-glitch" data-text="LEVEL UP">LEVEL UP</div>
        <div className="levelup-level">
          <span className="levelup-arrow">▲</span>
          <span className="levelup-number">LVL {level}</span>
        </div>
        <p className="levelup-sub">SYSTEM UPGRADE COMPLETE</p>
        <div className="levelup-bars">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="levelup-bar" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
        <button className="levelup-close" onClick={onClose}>CONTINUE ▶</button>
      </div>
    </div>
  );
}

function HabitCard({ habit, onComplete, onDelete }) {
  const [ripple, setRipple] = useState(false);

  const handleComplete = () => {
    if (habit.completedToday) return;
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
    onComplete(habit.id);
  };

  return (
    <div className={`habit-card ${habit.completedToday ? 'completed' : ''} ${ripple ? 'ripple' : ''}`}>
      <div className="habit-left">
        <div className={`habit-status-dot ${habit.completedToday ? 'active' : ''}`} />
        <div className="habit-info">
          <span className="habit-name">{habit.name}</span>
          <span className="habit-streak">
            {habit.streak > 0 && <span className="fire-icon">🔥</span>}
            <span className="streak-count">
              {habit.streak > 0 ? `${habit.streak} day streak` : 'Start your streak'}
            </span>
          </span>
        </div>
      </div>
      <div className="habit-actions">
        {!habit.completedToday && (
          <button className="btn-complete" onClick={handleComplete} title="Complete habit">
            <span className="btn-complete-inner">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </button>
        )}
        {habit.completedToday && (
          <div className="completed-badge">
            <span>+20 XP</span>
          </div>
        )}
        <button className="btn-delete" onClick={() => onDelete(habit.id)} title="Delete habit">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem('cyberhabits_habits');
    return stored ? JSON.parse(stored) : [];
  });

  const [userStats, setUserStats] = useState(() => {
    const stored = localStorage.getItem('cyberhabits_stats');
    return stored ? JSON.parse(stored) : { level: 1, xp: 0 };
  });

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef(null);

  const maxXP = getMaxXP(userStats.level);
  const xpPercent = Math.min((userStats.xp / maxXP) * 100, 100);

  useEffect(() => {
    localStorage.setItem('cyberhabits_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('cyberhabits_stats', JSON.stringify(userStats));
  }, [userStats]);

  // Reset daily completions at midnight
  useEffect(() => {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem('cyberhabits_last_reset');
    if (lastReset !== today) {
      setHabits(prev => prev.map(h => ({ ...h, completedToday: false })));
      localStorage.setItem('cyberhabits_last_reset', today);
    }
  }, []);

  const addHabit = () => {
    const name = newHabitName.trim();
    if (!name) return;
    const newHabit = {
      id: Date.now(),
      name,
      streak: 0,
      completedToday: false,
      lastCompleted: null,
    };
    setHabits(prev => [newHabit, ...prev]);
    setNewHabitName('');
    inputRef.current?.focus();
  };

  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const completeHabit = (id) => {
    const today = new Date().toDateString();
    let didLevelUp = false;

    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = h.lastCompleted === yesterday ? h.streak + 1 : 1;
      return { ...h, completedToday: true, streak: newStreak, lastCompleted: today };
    }));

    setUserStats(prev => {
      let newXP = prev.xp + XP_PER_HABIT;
      let newLevel = prev.level;
      let currentMax = getMaxXP(newLevel);

      while (newXP >= currentMax) {
        newXP -= currentMax;
        newLevel += 1;
        currentMax = getMaxXP(newLevel);
        didLevelUp = true;
      }

      if (didLevelUp) {
        setTimeout(() => setShowLevelUp(true), 200);
      }

      return { level: newLevel, xp: newXP };
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addHabit();
  };

  const completedCount = habits.filter(h => h.completedToday).length;

  return (
    <div className="app">
      {/* Scanline overlay */}
      <div className="scanlines" />
      {/* Background grid */}
      <div className="bg-grid" />

      {/* Sticky Header */}
      <header className="header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="brand-icon">⬡</span>
            <span className="brand-name">HABITCORE</span>
            <span className="brand-version">v2.0</span>
          </div>
          <div className="xp-section">
            <div className="level-badge">
              <span className="level-label">LVL</span>
              <span className="level-num">{userStats.level}</span>
            </div>
            <div className="xp-bar-container">
              <div className="xp-bar-track">
                <div
                  className="xp-bar-fill"
                  style={{ width: `${xpPercent}%` }}
                />
                <div
                  className="xp-bar-glow"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
              <div className="xp-label">
                <span>{userStats.xp}</span>
                <span className="xp-sep">/</span>
                <span>{maxXP} XP</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-chip">
            <span className="stat-val">{habits.length}</span>
            <span className="stat-lbl">HABITS</span>
          </div>
          <div className="stat-chip accent">
            <span className="stat-val">{completedCount}</span>
            <span className="stat-lbl">TODAY</span>
          </div>
          <div className="stat-chip">
            <span className="stat-val">
              {Math.max(...habits.map(h => h.streak), 0)}
            </span>
            <span className="stat-lbl">BEST STREAK</span>
          </div>
        </div>

        {/* Add Habit */}
        <div className={`add-habit-card ${inputFocused ? 'focused' : ''}`}>
          <div className="add-habit-label">NEW PROTOCOL</div>
          <div className="add-habit-row">
            <input
              ref={inputRef}
              className="habit-input"
              type="text"
              placeholder="e.g. Meditate 10 minutes..."
              value={newHabitName}
              onChange={e => setNewHabitName(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              maxLength={50}
            />
            <button className="btn-add" onClick={addHabit}>
              <span>DEPLOY</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Habits List */}
        <div className="habits-section">
          <div className="section-header">
            <span className="section-title">ACTIVE PROTOCOLS</span>
            <span className="section-count">{completedCount}/{habits.length}</span>
          </div>

          {habits.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">◈</div>
              <p className="empty-title">NO PROTOCOLS LOADED</p>
              <p className="empty-sub">Deploy your first habit to begin your journey</p>
            </div>
          )}

          <div className="habits-list">
            {habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onComplete={completeHabit}
                onDelete={deleteHabit}
              />
            ))}
          </div>
        </div>
      </main>

      {showLevelUp && (
        <LevelUpModal level={userStats.level} onClose={() => setShowLevelUp(false)} />
      )}
    </div>
  );
}
