# 🔧 Technical Documentation - Gamification System

## Architecture Overview

The gamification system is built entirely on the frontend using:
- **Vanilla JavaScript** for state management
- **HTML5 localStorage** for data persistence
- **CSS3** for animations and styling
- **No backend required** - fully client-side

---

## State Management

### Game State Object
```javascript
const gameState = {
    visited: new Set(),      // Section IDs visited
    achievements: new Set(), // Badge IDs unlocked
    quizHighScore: 0,        // Highest quiz score (0-5)
    totalSections: 6         // Total sections in app
};
```

### localStorage Structure
**Key**: `janMatState`  
**Value**: JSON stringified object
```json
{
  "visited": ["overview", "timeline", "scenario"],
  "achievements": ["started", "explorer"],
  "quizHighScore": 4
}
```

---

## Core Functions

### 1. **initStorage()**
Loads saved state from localStorage on app start
```javascript
function initStorage() {
    const saved = localStorage.getItem('janMatState');
    if (saved) {
        const data = JSON.parse(saved);
        data.visited.forEach(v => gameState.visited.add(v));
        data.achievements.forEach(a => gameState.achievements.add(a));
        gameState.quizHighScore = data.quizHighScore || 0;
    }
    updateProgressUI();
}
```

### 2. **saveStorage()**
Persists current state to localStorage
```javascript
function saveStorage() {
    const data = {
        visited: Array.from(gameState.visited),
        achievements: Array.from(gameState.achievements),
        quizHighScore: gameState.quizHighScore
    };
    localStorage.setItem('janMatState', JSON.stringify(data));
}
```

### 3. **updateProgressUI()**
Updates all progress displays on the UI
- Progress bar width
- Progress text
- Progress percentage
- Motivation message
- Badge visual states
- Completion checkmarks

```javascript
function updateProgressUI() {
    const count = gameState.visited.size;
    const percent = Math.round((count / gameState.totalSections) * 100);
    
    // Update progress bar
    progressFill.style.width = `${percent}%`;
    
    // Update text
    progressText.innerText = `Learning Progress: ${count}/${gameState.totalSections} Sections`;
    progressPercent.innerText = `${percent}%`;
    
    // Update cards
    gameState.visited.forEach(v => {
        const card = document.getElementById(`card-${v}`);
        if (card) card.classList.add('completed');
    });
    
    // Update motivation
    if (count === 0) motivationMsg.innerText = "Start a section to begin your journey!";
    else if (count < 3) motivationMsg.innerText = "Great start! Explore 3 sections to become an Explorer.";
    else if (count < 6) motivationMsg.innerText = "Almost there! Complete all sections to become an Expert.";
    else motivationMsg.innerText = "🎉 You are now an Election Expert!";
    
    checkAchievements(count);
    saveStorage();
}
```

### 4. **checkAchievements(count)**
Evaluates and unlocks achievements based on conditions

```javascript
function checkAchievements(count) {
    if (count >= 1) unlockBadge('started');       // Getting Started
    if (count >= 3) unlockBadge('explorer');      // Explorer
    if (count === 6) unlockBadge('expert');       // Election Learner
    if (gameState.quizHighScore >= 4) unlockBadge('quiz'); // Quiz Master (80%+)
}
```

### 5. **unlockBadge(id)**
Visual update when a badge is earned

```javascript
function unlockBadge(id) {
    const badge = document.getElementById(`badge-${id}`);
    if (badge) {
        badge.classList.add('earned');
        gameState.achievements.add(id);
    }
}
```

### 6. **openPage(view)**
Tracks section visits and updates progress

```javascript
function openPage(view) {
    currentActiveView = view;
    gameState.visited.add(view);  // Add to visited
    updateProgressUI();             // Update UI immediately
    
    // Animate page transition
    homeScreen.classList.remove('active');
    homeScreen.classList.add('hidden-left');
    setTimeout(() => {
        renderContent(view);
        pageScreen.classList.add('active');
    }, 400);
}
```

---

## Quiz System

### Quiz Data Structure
```javascript
quiz: {
    title: "Knowledge Quiz",
    desc: "Test your election mastery with 5 questions!",
    questions: [
        {
            q: "What is the minimum age to vote in India?",
            o: ["18 years", "21 years", "25 years"],
            a: 0,  // Index of correct answer
            topic: "Voter Eligibility"
        },
        // ... 4 more questions
    ]
}
```

### Quiz Flow Functions

#### startQuiz()
Initializes quiz state and shows first question
```javascript
function startQuiz() {
    viewTitle.innerText = APP_DATA.quiz.title;
    viewDesc.innerText = APP_DATA.quiz.desc;
    quizScore = 0;
    qIndex = 0;
    showQuestion();
}
```

#### showQuestion()
Renders current question with progress bar
- Shows "Question X/5"
- Displays topic category
- Shows progress bar (width = (qIndex / 5) * 100%)
- Renders A, B, C options with saffron badges

#### checkAnswer(idx)
Validates answer and advances to next question
```javascript
function checkAnswer(idx) {
    if (idx === APP_DATA.quiz.questions[qIndex].a) quizScore++;
    qIndex++;
    if (qIndex < 5) showQuestion();
    else finishQuiz();
}
```

#### finishQuiz()
Displays results with intelligent feedback based on percentage

**Score Tiers:**
- **100%** (5/5): ⭐⭐⭐ Perfect score
- **80%** (4/5): ⭐⭐ Excellent
- **60%** (3/5): ⭐ Good
- **40%** (2/5): 💡 Keep learning
- **0%** (0/5): 🚀 Getting started

**Feedback includes:**
- Personalized title
- Encouraging message
- 2-3 topic recommendations based on score tier
- "Try Again" and "Back Home" buttons

---

## CSS Classes & Animations

### Progress Bar
```css
.progress-bar-fill {
    background: linear-gradient(to right, var(--primary-saffron), var(--primary-green));
    transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Badges
```css
.badge {
    transition: var(--transition);
    color: rgba(255,255,255,0.1);
}

.badge.earned {
    background: rgba(255, 153, 51, 0.15);
    border-color: var(--primary-saffron);
    color: var(--primary-saffron);
    box-shadow: 0 0 15px rgba(255, 153, 51, 0.3);
    animation: pulse 0.6s ease-out;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}
```

### Completion Indicator
```css
.nav-card.completed::before {
    content: '\f058';  /* Font Awesome checkmark */
    font-family: 'Font Awesome 6 Free';
    color: var(--primary-green);
    position: absolute;
    top: 20px;
    right: 20px;
}
```

### Quiz Progress
```css
.quiz-progress-bar {
    height: 6px;
    background: rgba(255,255,255,0.05);
    border-radius: 3px;
    overflow: hidden;
}

.quiz-progress-fill {
    background: linear-gradient(to right, var(--primary-saffron), var(--primary-green));
    transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## Data Flow Diagram

```
User Opens App
    ↓
initStorage() → Load from localStorage
    ↓
updateProgressUI() → Display saved progress
    ↓
User Clicks Section
    ↓
openPage(view) → Add to visited set
    ↓
updateProgressUI() → Recalculate progress
    ↓
checkAchievements() → Check unlock conditions
    ↓
unlockBadge() → Visual update if earned
    ↓
saveStorage() → Persist to localStorage
```

---

## Extension Points

### Adding New Sections
1. Add section ID to navigation
2. Add card element with `id="card-{section}"`
3. Add section handler in `renderContent()`
4. System automatically tracks in `gameState.visited`

### Adding New Achievements
1. Update `checkAchievements()` with new condition
2. Add badge element with `id="badge-{id}"`
3. Create unlock trigger in appropriate function
4. CSS automatically styles `.earned` state

### Modifying Quiz
1. Add/remove questions in `APP_DATA.quiz.questions`
2. Update `checkAnswer()` logic if needed
3. Adjust `finishQuiz()` feedback tiers if scale changes
4. Update feedback messages for new score ranges

### Custom Feedback
Edit the feedback tiers in `finishQuiz()`:
```javascript
if (percentage === 100) {
    feedbackTitle = "🏆 Quiz Master!";
    feedbackMessage = "Perfect score message...";
    // ... custom feedback
}
```

---

## Performance Considerations

### localStorage Limits
- **Typical limit**: 5-10MB per domain
- **Current data**: ~200 bytes per user
- **Scalability**: Can handle thousands of users

### Memory Usage
- **Sets**: Efficient for membership testing
- **String parsing**: Only on init and save
- **DOM updates**: Batched in updateProgressUI()

### Optimization Tips
1. Use `Set` for faster lookups
2. Batch DOM updates when possible
3. Use CSS transitions instead of JS animations
4. Debounce frequent save operations if needed

---

## Browser Compatibility

### Required Features
- ES6 Set (all modern browsers)
- localStorage API (all modern browsers)
- CSS3 transitions and animations
- HTML5 Semantic elements

### Tested On
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallback Strategy
- localStorage not available: Data only persists in session
- Animations not supported: Graceful degradation with instant updates
- No Set support: Manually implement with arrays

---

## Testing Checklist

### Unit Tests
- [ ] `initStorage()` correctly loads data
- [ ] `saveStorage()` correctly persists data
- [ ] `updateProgressUI()` updates all elements
- [ ] `checkAchievements()` unlocks correct badges
- [ ] `finishQuiz()` calculates percentage correctly

### Integration Tests
- [ ] Opening section marks as visited
- [ ] 3+ sections unlock Explorer badge
- [ ] All 6 sections unlock Election Learner badge
- [ ] Quiz score 4+ unlocks Quiz Master badge
- [ ] Progress bar fills proportionally

### User Experience Tests
- [ ] Badges animate when unlocked
- [ ] Progress updates in real-time
- [ ] Quiz feedback matches score tier
- [ ] Page transitions are smooth
- [ ] Mobile layout is responsive

### Data Persistence Tests
- [ ] Progress persists after refresh
- [ ] Achievements persist after page close
- [ ] Quiz score persists across sessions
- [ ] Clear localStorage resets all data

---

## Debugging Guide

### Check Current State
```javascript
// In browser console
console.log(gameState);
console.log(JSON.parse(localStorage.getItem('janMatState')));
```

### Clear and Reset
```javascript
localStorage.removeItem('janMatState');
location.reload();
```

### Test Achievement Unlock
```javascript
gameState.visited.add('overview');
gameState.visited.add('timeline');
gameState.visited.add('role');
updateProgressUI();
```

### Test Quiz Scoring
```javascript
gameState.quizHighScore = 4;  // 80%
updateProgressUI();  // Should unlock Quiz Master
```

---

## Future Enhancement Ideas

1. **User Accounts** (requires backend)
   - Cloud progress sync
   - Progress across devices
   - Social leaderboards

2. **Advanced Gamification**
   - Daily challenges
   - Time-based streaks
   - Point system for different activities

3. **Content Expansion**
   - More quiz questions (randomized)
   - Difficulty levels
   - Topic-specific mini-quizzes

4. **Analytics**
   - Track user journey
   - Section completion rates
   - Common quiz mistake patterns

5. **Social Features**
   - Share achievements
   - Compare progress with others
   - Community challenges

---

## API Reference

### Public Functions
- `initStorage()` - Load saved progress
- `saveStorage()` - Save to localStorage
- `updateProgressUI()` - Refresh UI
- `openPage(view)` - Navigate to section
- `startQuiz()` - Begin quiz
- `checkAnswer(idx)` - Submit quiz answer
- `finishQuiz()` - Show results

### Internal Variables
- `gameState` - Current game state
- `quizScore` - Current quiz score
- `qIndex` - Current question index
- `currentActiveView` - Active section

---

**Version**: 2.0  
**Last Updated**: April 28, 2026  
**Maintainer**: Election App Team
