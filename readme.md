# ⬡ HABITCORE — Ultimate Edition

> *A gamified habit tracker built like a video game. Because discipline shouldn't be boring.*

![HabitCore Banner](https://img.shields.io/badge/HABITCORE-Ultimate%20Edition-00ff9d?style=for-the-badge&labelColor=0f1115&color=00ff9d)
![HTML](https://img.shields.io/badge/HTML-Single%20File-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-Vanilla-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JS-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![AI Assisted](https://img.shields.io/badge/AI%20Assisted-Claude%20(Anthropic)-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🎮 What Is This?

**HabitCore** is a fully gamified habit tracker that runs entirely in a single `index.html` file — no build tools, no npm, no frameworks. Just raw HTML, CSS, and JavaScript.

It treats your daily habits like an RPG. You gain XP. You level up skills. You fight a boss monster. You earn credits and spend them in a reward shop. Every habit you complete is a real action with real consequences in the game world.

Three complete UI themes were shipped:
- **Zen Minimalist** — soft shadows, sage green, breathable whitespace
- **Neo-Brutalist** — thick black borders, hard shadows, cream paper + dot grid
- **Cyberpunk** — neon glows, scanlines, CRT aesthetic, full dark mode

---

## ✨ Features

### 🧠 Gamification Engine
- **RPG Skill Tree** — Three category nodes (Finance, Knowledge, Strength) each with their own XP bar and level progression. XP cap scales by `×1.5` per level.
- **Boss Battle** — A global "Glitch Monster" with a persistent HP bar. Every completed habit deals 50 damage. Defeat it for +100 Credits and face a harder boss.
- **5-Boss Progression** — `ENTITY_ERROR.exe` → `NULL_DAEMON.sys` → `SEGFAULT_TITAN.bin` → `KERNEL_WRAITH.dll` → `VOID_LEVIATHAN.core`
- **Streaks** — Tracks consecutive daily completions per habit, with fire emoji badges.
- **Level Up Modal** — Full-screen glitch animation overlay on skill level-up with particle burst.

### 💰 Economy & Shop
- Earn **10 Credits** per habit completion + **100 Credits** per boss kill
- **Reward Shop** — 6 purchasable real-life rewards (Cheat Meal, Movie Night, Gaming Session, etc.)
- Floating Action Button (FAB) shop launcher with animated glow pulse

### 📊 Candlestick XP Chart
- **7-day PnL view** built in pure CSS — zero canvas, zero libraries
- Candlestick bodies + wicks showing daily XP open/close
- Bullish (green) and bearish (red) candles using OHLC logic
- Y-axis labels, gridlines, day labels, and chart legend

### ⚗️ Web Audio Synthesizer
- **Zero audio files** — all sound generated via `Web Audio API`
- 8 distinct sound effects: chime, power-up, boss hit, boss death, alarm, click, buy, error
- Context created lazily on first user interaction (autoplay policy compliant)

### 🎆 Canvas Particle System
- Confetti blast on habit completion, boss death, and level-up
- Theme-aware color palettes per particle burst
- Diamond and square particle shapes with gravity, spin, and alpha decay

### 🔔 Reminder System
- `<input type="time">` alarm picker
- Browser `Notification API` with permission request flow
- `setInterval` ticker checks alarm every 8 seconds
- Audio fallback if notifications are blocked

### 💾 Data Persistence
- Full state serialized to `localStorage`
- **Smart daily reset**: Completed Tasks are deleted on next day; incomplete Tasks carry over; Habits always reset and stay
- **Midnight scheduler** via `setTimeout` to next `00:00:00`
- Activity log (timestamped, color-coded, last 60 entries)
- Full data nuke button with confirm dialog

### 🎨 Multi-Theme Engine
- Anti-flicker inline script in `<head>` applies saved theme before first paint
- Full CSS custom property token system (`--bg`, `--accent`, `--glow`, etc.)
- Theme persisted to `localStorage` independently of main state

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | Vanilla HTML5 |
| Styling | Vanilla CSS3 (custom properties, animations, grid, flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Audio | Web Audio API |
| Graphics | HTML5 Canvas API (particles only) |
| Storage | localStorage |
| Notifications | Notifications API |
| Fonts | Google Fonts (CDN) |
| Build Tools | None |
| Dependencies | None |

---

## 📦 Assets & Disclosures

### Fonts (via Google Fonts CDN)
| Font | Weights | Used For |
|---|---|---|
| `Orbitron` | 400, 600, 700, 900 | Display headers, UI labels (Cyberpunk theme) |
| `Space Mono` | 400, 700 | Numbers, XP values, timestamps |
| `Rajdhani` | 400, 500, 600, 700 | Body text (Cyberpunk theme) |
| `Public Sans` | 400, 700, 900 | Headers (Neo-Brutalist theme) |
| `Inter` | 300, 400, 500, 600 | All UI (Zen Minimalist theme) |

### External Resources
- **Google Fonts** — `fonts.googleapis.com` / `fonts.gstatic.com` — font delivery only
- No external JavaScript libraries
- No external CSS frameworks
- No images, icons, or sprite sheets — all visuals are CSS + emoji

### Browser APIs Used
- `localStorage` — state persistence
- `Web Audio API` (`AudioContext`, `OscillatorNode`, `GainNode`) — sound synthesis
- `Canvas 2D API` — particle system
- `Notifications API` — habit reminders
- `requestAnimationFrame` — particle render loop

---

## 🤖 AI Development Disclosure

This project was built with **AI-assisted development** using **Claude (Anthropic)** via [claude.ai](https://claude.ai).

The development workflow was iterative prompt engineering — each feature, theme, and UI system was designed through a conversation-driven process where the developer provided detailed specifications and the AI generated, refined, and merged the code across multiple sessions.

**What the AI did:**
- Generated HTML/CSS/JS from detailed written specifications
- Translated feature concepts into working implementations
- Merged and refactored code across multiple design systems
- Validated feature preservation during UI redesigns

**What the developer did:**
- Designed all feature specifications from scratch
- Wrote every prompt and design brief
- Made all architectural and aesthetic decisions
- Directed three complete UI redesigns (Cyberpunk → Zen → Brutalist)
- Validated output, identified gaps, and iterated

This is an honest representation of modern AI-assisted development: the human is the architect, the AI is the implementation partner.

---

## 📓 Vibe Log

*A chronological account of how this project came to life.*

---

**Day 1 — The Concept**
Started with a simple question: why are habit trackers so boring? Every app is just a checklist with a streak counter. The idea was to make something that feels like playing a game — XP, boss fights, a skill tree, the works. Wrote the first feature spec as a single long prompt.

**Day 1 (later) — First Build**
The Cyberpunk / dark neon aesthetic came first. Orbitron font, scanlines, neon green glows. The gamification engine was the foundation: skills, XP, leveling, boss HP. Built the candlestick chart out of pure CSS — no canvas, just absolute positioning. That was a good puzzle.

**Day 2 — Going Deeper**
Added the Web Audio synthesizer. Every sound in the app is generated mathematically — oscillators, gain envelopes, no audio files at all. Eight distinct sounds. The particle system came next: canvas confetti that blasts when you beat a boss or hit a level up. The shop and economy system tied the credits loop together.

**Day 2 (later) — The Habit/Task Split**
Realized habits and one-time tasks needed different behavior on daily reset. Tasks that are completed should disappear the next morning. Uncompleted tasks should carry over. Habits always persist. Built a smart reset system around this.

**Day 3 — Zen Redesign**
Stripped the cyberpunk aesthetic and rebuilt entirely in a Zen Minimalist direction. Soft shadows (no hard borders), sage green accent, Inter font, warm off-white background. All the same JS wired to a completely different CSS design system. Proved that separating concerns properly means you can retheme without touching logic.

**Day 3 (later) — Neo-Brutalist Redesign**
Did it again, this time going the opposite direction: loud, confident, comic-book aesthetic. Thick 3px solid black borders. `5px 5px 0px #000` hard drop shadows. Cream paper background with a 20px dot grid. Public Sans 900 weight for headers. The "press" effect on buttons — `translate(3px, 3px)` + shadow collapses — makes the whole UI feel tactile.

**Day 4 — Polish & README**
Validation passes on all three themes. 40+ automated checks across design system tokens and feature preservation. Writing this README.

---

**Total sessions:** 4 days  
**Themes shipped:** 3 (Cyberpunk, Zen Minimalist, Neo-Brutalist)  
**Lines of code:** ~2,000–2,500 per theme variant  
**Audio files used:** 0  
**External JS libraries:** 0  
**Regrets:** None. This slaps.

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/habitcore-ue.git

# Open in browser — that's it
open index.html
```

Or just **drag the file into any browser tab.** No server required.

---

## 📁 Project Structure

```
habitcore-ue/
│
├── index.html          # The entire application (HTML + CSS + JS)
└── README.md           # This file
```

Single file. Self-contained. Deployable anywhere.

---

## 🌐 Deployment

Because it's a single HTML file with no server-side dependencies, it deploys anywhere:

| Platform | Method |
|---|---|
| **GitHub Pages** | Push to repo, enable Pages on `main` branch |
| **Netlify** | Drag-and-drop the file into the Netlify dashboard |
| **Vercel** | `vercel --prod` in the project directory |
| **Local** | Double-click `index.html` |

---

## 📜 License

MIT — do whatever you want with it.

---

<div align="center">

**Built with obsessive attention to detail.**  
**Powered by discipline, caffeine, and iterative prompting.**

⬡ HABITCORE — *The habit tracker that hits back.*

</div>
