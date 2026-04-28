# 🇮🇳 Jan-Mat India | Election Guide Pro v2.0

![Jan-Mat India Banner](assets/banner.png)

## 🎯 Project Overview
**Jan-Mat India** is a premium, interactive election education portal designed to empower citizens with comprehensive knowledge about the Indian democratic process. Built with a modern, gamified approach, it transforms complex electoral procedures into an engaging learning journey.

---

## 🎮 Gamification & Progress System

### 📊 Progress Tracking
Tracks which sections users have visited and displays their learning progress in real-time.
- **Tracked Sections**: Overview, Timeline, Scenarios, Role Guide, Quiz, and FAQ.
- **Visual Display**: Animated gradient progress bar with percentage and dynamic motivation messages.
- **Persistence**: All progress is saved in the browser's `localStorage` and persists across sessions.

### 🏆 Achievement System
Four unique badges to unlock:
1. 🌱 **Getting Started**: Unlocks after visiting your first section.
2. 🧭 **Explorer**: Earned after exploring 3 or more sections.
3. 🏅 **Election Learner**: Awarded upon visiting all 6 modules.
4. 👑 **Quiz Master**: The ultimate prize for scoring 80% (4/5) or higher on the Knowledge Quiz.

---

## 🧠 Smart FAQ Chatbot
![FAQ Chatbot Preview](assets/chatbot.png)

A fully functional, intelligent assistant for election queries:
- **Smart Filtering**: Detects general election intent and declines unrelated queries.
- **Rich Knowledge Base**: Detailed bulleted answers for **EVM, NOTA, Voter ID, ECI,** and **Counting Process**.
- **User-Friendly UX**: Features "Thinking..." states, auto-scroll, and message pop animations.

---

## 📝 Knowledge Quiz System
Test your mastery with a comprehensive 5-question assessment:
- **Topic Tags**: Shows categories like Voter Eligibility, Election Rules, etc.
- **Intelligent Feedback**: 5 tiers of feedback based on your score (100% to 0%).
- **Smart Recommendations**: Suggests specific sections to review based on your performance.

---

## 🚀 Quick Start Guide

### 📱 Getting Started
1. **Clone & Open**: Clone the repo and open `index.html` in any modern web browser.
2. **Dashboard**: Use the main hub to track progress and see your unlocked badges.
3. **Launch Scripts**:
   - `run_app.bat`: Quick Windows launcher.
   - `server.bat`: Starts a local development server.

### 💾 Data Storage
- **Method**: HTML5 `localStorage`.
- **Key**: `janMatState`.
- **Reset**: To start over, clear your browser data or delete the `janMatState` key in DevTools.

---

## 📁 Project Structure
```text
election/
├── 📄 index.html          # Main application structure
├── 🔧 script.js           # Core logic (Gamification, Quiz, Chatbot)
├── 🎨 style.css           # Premium styling & Animations
├── 🚀 run_app.bat         # Launcher script
├── 🖥️ server.bat          # Local server script
└── 📁 assets/             # Images, Icons, and Visuals
```

---

## 🔧 Technical Documentation

### Architecture
- **Tech Stack**: Vanilla JavaScript (ES6+), CSS3, HTML5.
- **Persistence**: No backend required; uses `localStorage` for all state management.
- **UI System**: Modern dark-mode aesthetic with Glassmorphism and CSS Animations.

### Core State Logic
```javascript
const gameState = {
    visited: new Set(),      // Sections visited
    achievements: new Set(), // Badges unlocked
    quizHighScore: 0,        // Best quiz score
    totalSections: 6         // Total sections available
};
```

### Key Functions
- `initStorage()`: Loads saved state from browser storage.
- `updateProgressUI()`: Updates all bars, percentages, and badges.
- `openPage(view)`: Tracks visits and triggers achievement checks.
- `sendChat()`: Handles FAQ input, intent detection, and bot responses.
- `finishQuiz()`: Calculates score and provides personalized feedback.

---

## 🔮 Roadmap
- [ ] **Leaderboards**: Social competition for learners.
- [ ] **Daily Challenges**: Encouraging consistent engagement.
- [ ] **Certification**: Digital certificates for completing all modules.
- [ ] **Voice Support**: Narration for all educational content.

---

## 👨‍💻 Built with ❤️ using [Google Antigravity AI](https://github.com/google/antigravity)

**Jan-Mat India** is more than just an app; it's a step toward a more informed and active democracy. **Happy Learning!** 🎓
