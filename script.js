// UI References
const homeScreen = document.getElementById('home-screen');
const pageScreen = document.getElementById('page-screen');
const viewTitle = document.getElementById('view-title');
const viewDesc = document.getElementById('view-description');
const viewContent = document.getElementById('view-content');

const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const progressPercent = document.getElementById('progress-percent');

// Application State
const gameState = {
    visited: new Set(),
    achievements: new Set(),
    quizHighScore: 0,
    totalSections: 7
};

// --- DATA LAYER ---
const APP_DATA = {
    overview: {
        title: "Election Lifecycle",
        desc: "The 6-step blueprint of Indian general elections.",
        content: [
            "1. Announcement: Poll schedule release by ECI.",
            "2. Nomination: Candidate filing and papers.",
            "3. Scrutiny: Verification of eligibility.",
            "4. Campaign: Public outreach and rallies.",
            "5. Polling: Digital balloting via EVMs.",
            "6. Results: Tallying and declaration."
        ]
    },
    timeline: {
        title: "Operational Timeline",
        desc: "Key milestones in the standard election cycle.",
        steps: [
            { l: "Start", i: "Announcement & Model Code Begins" },
            { l: "Phase 1", i: "Candidate Nominations Open" },
            { l: "Phase 2", i: "Public Campaigning & Manifestos" },
            { l: "Phase 3", i: "Official Voting Days" },
            { l: "Final", i: "Counting & Results Certification" }
        ]
    },
    scenarios: [
        { 
            id: 'evm', 
            q: "What if the EVM fails?", 
            explanation: "EVMs are robust but can face hardware issues like low battery or button jams.",
            steps: ["Notify the Presiding Officer.", "Replacement unit requested.", "Votes remain encrypted."],
            action: "Wait for the replacement. Your previous vote is safe.",
            importance: "Ensures technical failures don't disenfranchise voters."
        },
        { 
            id: 'id', 
            q: "What if I don't have an ID?", 
            explanation: "While EPIC is preferred, the ECI allows 11 alternative photo identity documents.",
            steps: ["Check Electoral Roll.", "Present alternative ID (Aadhaar, PAN, etc.)", "Verify finger mark."],
            action: "Bring any government-issued photo ID as backup.",
            importance: "Prevents fraud while ensuring accessibility."
        },
        { 
            id: 'nota', 
            q: "What is the use of NOTA?", 
            explanation: "None Of The Above is a negative voting option.",
            steps: ["Press the bottom-most button.", "Register dissent officially.", "Counted but doesn't win."],
            action: "Use it if you find no candidate suitable.",
            importance: "Allows citizens to express dissatisfaction within the system."
        },
        { 
            id: 'no_vote', 
            q: "What happens if I don't vote?", 
            explanation: "Voting is a right, but staying away has consequences.",
            steps: ["Unheard voice in governance.", "Margin of victory stays small.", "Representation gaps."],
            action: "Plan your voting day in advance.",
            importance: "High turnout ensures a truly representative democracy."
        },
        { 
            id: 'twice', 
            q: "Can someone vote twice?", 
            explanation: "Double voting is a serious criminal offense.",
            steps: ["Indelible ink check.", "Signature verification.", "Digital roll auditing."],
            action: "Respect the one-person-one-vote principle.",
            importance: "Fairness is the core of democratic integrity."
        },
        { 
            id: 'list_missing', 
            q: "What if my name is not in the list?", 
            explanation: "The Electoral Roll is the final authority for voting rights.",
            steps: ["Contact BLO immediately.", "Check official ECI portal.", "File Form 6 for next time."],
            action: "Verify your name online 10 days before polling.",
            importance: "Correct records are the foundation of voting eligibility."
        },
        { 
            id: 'post_poll', 
            q: "What happens after voting ends?", 
            explanation: "The transition from voting to counting is highly secured.",
            steps: ["EVMs are sealed and signed.", "Strongroom storage under guard.", "Counting agents verified."],
            action: "Trust the multi-party observation process.",
            importance: "Security post-polling prevents tampering and ensures trust."
        }
    ],
    flashcards: [
        { q: "Universal Adult Suffrage", a: "The right of all adult citizens to vote regardless of background." },
        { q: "VVPAT", a: "Voter Verifiable Paper Audit Trail - verifies your electronic vote." },
        { q: "Constituency", a: "The specific area a representative is elected from." },
        { q: "Electoral Roll", a: "The official list of citizens entitled to vote in a district." },
        { q: "Model Code of Conduct", a: "Guidelines for political parties during elections." }
    ],
    quiz: [
        { q: "Minimum voting age in India?", o: ["18", "21", "25"], a: 0 },
        { q: "Who conducts Indian elections?", o: ["Parliament", "ECI", "Police"], a: 1 },
        { q: "What does EVM stand for?", o: ["Electronic Voice Machine", "Every Voter Matters", "Electronic Voting Machine"], a: 2 },
        { q: "Which ink prevents double voting?", o: ["Indelible", "Permanent", "Temporary"], a: 0 },
        { q: "How many days is the standard cycle?", o: ["30", "45", "60"], a: 1 },
        { q: "What color is a Lok Sabha ballot?", o: ["Green", "White", "Pink"], a: 1 },
        { q: "Who is the head of ECI?", o: ["CEC", "President", "PM"], a: 0 }
    ],
    faq: {
        evm: {
            title: "Electronic Voting Machine (EVM)",
            answer: "EVMs are the primary tools for modern Indian elections:",
            points: [
                "Digital counting: Instant and accurate tallying of votes.",
                "Security: Standalone machines, not connected to any network or internet.",
                "Reliability: Tamper-proof hardware with multiple levels of sealing.",
                "VVPAT: Provides a paper slip to verify your vote visually."
            ]
        },
        nota: {
            title: "None Of The Above (NOTA)",
            answer: "NOTA allows voters to express dissent officially:",
            points: [
                "Negative Voting: Allows you to reject all candidates in your constituency.",
                "Right to Dissent: Protects the secrecy of those who don't want to vote for anyone.",
                "Symbol: Represented by a crossed-out ballot paper icon.",
                "Impact: Even if NOTA gets the most votes, the runner-up candidate is declared winner."
            ]
        },
        voterid: {
            title: "Voter ID & Identity",
            answer: "To vote, you must be registered in the Electoral Roll:",
            points: [
                "EPIC Card: The primary photo identity document for voting.",
                "Alternatives: 12 other documents (Aadhaar, PAN, MNREGA card, etc.) are accepted.",
                "Verification: Your name MUST be on the electoral roll even if you have an ID.",
                "Registration: Use Form 6 to register as a new voter."
            ]
        },
        eci: {
            title: "Election Commission of India (ECI)",
            answer: "The ECI is the constitutional authority managing elections:",
            points: [
                "Independence: A permanent constitutional body independent of the government.",
                "Roles: Schedules polls, monitors code of conduct, and counts votes.",
                "Integrity: Ensures 'Free and Fair' elections across the country.",
                "Power: Can postpone elections or order re-polls in case of irregularities."
            ]
        },
        counting: {
            title: "Vote Counting Process",
            answer: "Counting is a transparent and systematic process:",
            points: [
                "Strong Rooms: EVMs are kept in double-locked, guarded rooms until counting day.",
                "Observation: Candidates and their agents observe the entire process.",
                "Rounds: Counting happens in multiple rounds with verification at each step.",
                "Declaration: Results are uploaded in real-time to the official ECI portal."
            ]
        }
    }
};

// --- CORE LOGIC ---

function init() {
    localStorage.removeItem('janMatState');
    updateUI();
}

function updateUI() {
    const count = gameState.visited.size;
    const percent = Math.round((count / gameState.totalSections) * 100);
    progressFill.style.width = `${percent}%`;
    progressText.innerText = `${count}/${gameState.totalSections} Sections`;
    progressPercent.innerText = `${percent}%`;

    gameState.visited.forEach(v => {
        document.getElementById(`card-${v}`)?.classList.add('completed');
    });

    if (count >= 1) unlockBadge('started', "🥇 First Step: Visited your first section.");
    if (count >= 4) unlockBadge('explorer', "🧠 Explorer: Explored 4 sections.");
    if (count === 7) unlockBadge('expert', "🏆 Expert: Completed all sections!");
    if (gameState.quizHighScore === 3) unlockBadge('quiz', "👑 Quiz Master: Got a perfect 3/3 score!");
}

function unlockBadge(id, msg) {
    const badge = document.getElementById(`badge-${id}`);
    if (badge) {
        badge.classList.add('earned');
        badge.onclick = () => alert(msg);
        gameState.achievements.add(id);
    }
}

function openPage(view) {
    viewContent.innerHTML = '<div class="thinking-overlay"><div class="spinner"></div><p>Synthesizing Data...</p></div>';
    homeScreen.classList.remove('active');
    setTimeout(() => {
        gameState.visited.add(view);
        updateUI();
        renderPage(view);
        pageScreen.classList.add('active');
    }, 600);
}

function goHome() {
    pageScreen.classList.remove('active');
    setTimeout(() => homeScreen.classList.add('active'), 400);
}

function renderPage(view) {
    viewContent.innerHTML = '';
    switch(view) {
        case 'overview': renderOverview(); break;
        case 'timeline': renderTimeline(); break;
        case 'scenario': renderScenarios(); break;
        case 'flashcards': renderFlashcards(); break;
        case 'role': renderRoleGuide(); break;
        case 'quiz': renderQuiz(); break;
        case 'faq': renderFAQ(); break;
    }
}

// --- ENHANCED MODULES ---

function renderScenarios() {
    viewTitle.innerText = "Scenario Simulator";
    viewDesc.innerText = "Interactive simulations for real-world polling issues.";
    viewContent.innerHTML = `
        <div style="display:grid; gap:0.8rem; margin-bottom:2rem;">
            ${APP_DATA.scenarios.map(s => `
                <button class="primary-btn" style="text-align:left; background:rgba(255,255,255,0.02); border:1px solid var(--glass-border);" onclick="runScenario('${s.id}')">
                    <i class="fas fa-play-circle" style="margin-right:10px; color:var(--primary);"></i> ${s.q}
                </button>
            `).join('')}
        </div>
        <div id="scenario-result-box" style="min-height:100px;">
            <div style="text-align:center; padding-top:2rem; color:var(--text-secondary);">
                <i class="fas fa-hand-pointer" style="font-size:2rem; margin-bottom:1rem; opacity:0.3;"></i>
                <p>Select a scenario to start the simulation.</p>
            </div>
        </div>
    `;
}

window.runScenario = (id) => {
    const box = document.getElementById('scenario-result-box');
    box.innerHTML = '<div class="thinking-overlay" style="height:150px;"><div class="spinner"></div><p>Thinking...</p></div>';
    
    setTimeout(() => {
        const s = APP_DATA.scenarios.find(item => item.id === id);
        box.innerHTML = `
            <div class="scenario-response-card">
                <h3 style="color:var(--primary); margin-bottom:1rem;">Scenario: ${s.q}</h3>
                <p style="margin-bottom:1.5rem; color:var(--text-secondary); line-height:1.6;">${s.explanation}</p>
                <div style="margin-bottom:1.5rem;">
                    <h4 style="font-size:0.9rem; text-transform:uppercase; color:var(--primary); margin-bottom:0.8rem;">Steps</h4>
                    <ul style="list-style:none;">
                        ${s.steps.map(step => `<li style="margin-bottom:0.5rem; padding-left:1.5rem; position:relative;"><i class="fas fa-arrow-right" style="position:absolute; left:0; top:4px; font-size:0.8rem; color:var(--primary);"></i> ${step}</li>`).join('')}
                    </ul>
                </div>
                <div style="padding:1rem; background:rgba(255,255,255,0.03); border-radius:12px; margin-bottom:1rem;">
                    <h4 style="font-size:0.9rem; color:var(--primary); margin-bottom:0.3rem;">What you should do</h4>
                    <p>${s.action}</p>
                </div>
                <div style="padding:1rem; background:rgba(19, 136, 8, 0.1); border-left:4px solid var(--success); border-radius:4px;">
                    <h4 style="font-size:0.9rem; color:var(--success); margin-bottom:0.3rem;">Why this matters</h4>
                    <p style="font-size:0.9rem;">${s.importance}</p>
                </div>
            </div>
        `;
    }, 800);
};

let currentCardIndex = 0;
function renderFlashcards() {
    viewTitle.innerText = "Flash Cards";
    viewDesc.innerText = "Interactive concept learning. Tap to flip.";
    currentCardIndex = 0;
    showFlashcard();
}

function showFlashcard() {
    const card = APP_DATA.flashcards[currentCardIndex];
    viewContent.innerHTML = `
        <div style="text-align:center;">
            <p style="color:var(--text-secondary); margin-bottom:1rem;">Card ${currentCardIndex + 1} of ${APP_DATA.flashcards.length}</p>
            <div class="flashcard-wrapper" onclick="this.querySelector('.flashcard-inner').classList.toggle('flipped')">
                <div class="flashcard-inner">
                    <div class="flashcard-side flashcard-front">
                        <h3>${card.q}</h3>
                        <p style="margin-top:2rem; font-size:0.8rem; color:var(--text-secondary); letter-spacing:1px;">CLICK TO FLIP</p>
                    </div>
                    <div class="flashcard-side flashcard-back">
                        <p>${card.a}</p>
                    </div>
                </div>
            </div>
            <div style="display:flex; justify-content:center; gap:1rem; margin-top:2rem;">
                <button class="primary-btn" onclick="nextCard(-1)" ${currentCardIndex === 0 ? 'disabled' : ''}>Previous</button>
                <button class="primary-btn" onclick="nextCard(1)" ${currentCardIndex === APP_DATA.flashcards.length - 1 ? 'disabled' : ''}>Next</button>
            </div>
        </div>
    `;
}
window.nextCard = (dir) => { currentCardIndex += dir; showFlashcard(); };

// --- QUIZ LEVEL SYSTEM ---

let quizScore = 0;
let quizIdx = 0;
let quizQuestions = [];

function renderQuiz() {
    viewTitle.innerText = "Knowledge Quiz";
    viewDesc.innerText = "Select your difficulty level to begin.";
    viewContent.innerHTML = `
        <div style="display:grid; gap:1rem; padding:2rem 0;">
            <button class="primary-btn" style="padding:1.5rem;" onclick="startQuiz('beginner')">
                <h4 style="margin-bottom:5px;">Beginner</h4>
                <p style="font-weight:400; opacity:0.7;">3 Questions • Foundation Basics</p>
            </button>
            <button class="primary-btn" style="padding:1.5rem; background:var(--accent);" onclick="startQuiz('medium')">
                <h4 style="margin-bottom:5px;">Medium</h4>
                <p style="font-weight:400; opacity:0.7;">5 Questions • Practical Knowledge</p>
            </button>
            <button class="primary-btn" style="padding:1.5rem; background:#400040;" onclick="startQuiz('advanced')">
                <h4 style="margin-bottom:5px;">Advanced</h4>
                <p style="font-weight:400; opacity:0.7;">7 Questions • Technical Mastery</p>
            </button>
        </div>
    `;
}

window.startQuiz = (level) => {
    const counts = { beginner: 3, medium: 5, advanced: 7 };
    const count = counts[level];
    quizQuestions = [...APP_DATA.quiz].sort(() => 0.5 - Math.random()).slice(0, count);
    quizScore = 0; quizIdx = 0;
    showQuizQ();
};

function showQuizQ() {
    const q = quizQuestions[quizIdx];
    viewContent.innerHTML = `
        <div class="scenario-response-card" style="animation: fadeIn 0.4s;">
            <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:1rem;">Question ${quizIdx + 1} of ${quizQuestions.length}</p>
            <h3 style="font-size:1.4rem; margin-bottom:2rem;">${q.q}</h3>
            <div style="display:grid; gap:1rem;">
                ${q.o.map((o, i) => `<button class="primary-btn" style="text-align:left; background:rgba(255,255,255,0.03); border:1px solid var(--glass-border);" onclick="answerQuiz(${i})">${o}</button>`).join('')}
            </div>
        </div>
    `;
}

window.answerQuiz = (idx) => {
    const correct = quizQuestions[quizIdx].a;
    if (idx === correct) {
        alert("✓ Correct Answer!"); quizScore++;
    } else {
        alert("✗ Incorrect. The correct answer was: " + quizQuestions[quizIdx].o[correct]);
    }
    quizIdx++;
    if (quizIdx < quizQuestions.length) showQuizQ();
    else finishQuiz();
};

function finishQuiz() {
    gameState.quizHighScore = Math.max(gameState.quizHighScore, quizScore);
    updateUI();
    viewContent.innerHTML = `
        <div style="text-align:center; padding:3rem 0;">
            <i class="fas fa-trophy" style="font-size:4rem; color:var(--primary); margin-bottom:1.5rem;"></i>
            <h2>Quiz Complete!</h2>
            <p style="font-size:1.5rem; margin:1rem 0;">Your Score: ${quizScore}/${quizQuestions.length}</p>
            <button class="primary-btn" onclick="renderQuiz()" style="margin-top:1.5rem;">Try Again</button>
        </div>
    `;
}

// --- OTHER MODULES ---

function renderOverview() {
    viewTitle.innerText = "Election Lifecycle";
    viewContent.innerHTML = `<ul>${APP_DATA.overview.content.map(c => `<li style="padding:1rem; border-left:4px solid var(--primary); background:rgba(255,255,255,0.02); margin-bottom:1rem;">${c}</li>`).join('')}</ul>`;
}

function renderTimeline() {
    viewTitle.innerText = "Operational Timeline";
    viewContent.innerHTML = APP_DATA.timeline.steps.map(s => `<div style="border-left:2px solid var(--glass-border); padding-left:1.5rem; margin-bottom:1.5rem; position:relative;"><div style="position:absolute; left:-6px; top:0; width:10px; height:10px; background:var(--primary); border-radius:50%;"></div><strong>${s.l}:</strong> ${s.i}</div>`).join('');
}

function renderRoleGuide() {
    viewTitle.innerText = "Role-Based Guide";
    viewContent.innerHTML = `<div style="display:flex; gap:1rem; margin-bottom:2rem;"><button class="primary-btn" onclick="setRole('voter')">Voter</button><button class="primary-btn" onclick="setRole('candidate')">Candidate</button></div><div id="role-box" style="padding:2rem; background:rgba(255,255,255,0.02); border-radius:15px; border:1px solid var(--glass-border);">Please select a role.</div>`;
}

window.setRole = (role) => {
    const box = document.getElementById('role-box');
    box.innerHTML = role === 'voter' ? "<strong>Voter Track:</strong> Register & Vote." : "<strong>Candidate Track:</strong> File & Campaign.";
};

function renderFAQ() {
    viewTitle.innerText = "Smart FAQ Assistant";
    viewContent.innerHTML = `
        <div class="chat-container">
            <div class="chat-history" id="chat-box">
                <div class="chat-bubble bot">
                    Hello! I'm your Election Assistant. How can I help you today? 
                    <br><br>
                    You can ask me about <strong>EVMs, NOTA, Voter ID, the Election Commission,</strong> or <strong>how votes are counted.</strong>
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" class="chat-input" placeholder="Ask an election question..." autocomplete="off">
                <button class="primary-btn" id="send-btn" onclick="sendChat()">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;

    const input = document.getElementById('chat-input');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChat();
    });
}

window.sendChat = async () => {
    const input = document.getElementById('chat-input');
    const box = document.getElementById('chat-box');
    const query = input.value.trim();

    if (!query) return;

    // Add User Message
    addMessage('user', query);
    input.value = '';

    // Show Thinking State
    const thinkingId = 'thinking-' + Date.now();
    const thinkingBubble = document.createElement('div');
    thinkingBubble.className = 'chat-bubble bot';
    thinkingBubble.id = thinkingId;
    thinkingBubble.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Thinking...';
    box.appendChild(thinkingBubble);
    box.scrollTop = box.scrollHeight;

    // Simulate Processing Delay
    setTimeout(() => {
        const thinkingElement = document.getElementById(thinkingId);
        if (thinkingElement) thinkingElement.remove();

        try {
            processQuery(query);
        } catch (err) {
            addMessage('bot', "Something went wrong. Please try again.");
        }
    }, 800);
};

function addMessage(sender, text) {
    const box = document.getElementById('chat-box');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    box.appendChild(bubble);
    box.scrollTop = box.scrollHeight;
}

function processQuery(query) {
    const q = query.toLowerCase();
    
    // 1. Election Relatedness Check (Intent Detection)
    const electionKeywords = ['vote', 'election', 'candidate', 'poll', 'evm', 'ballot', 'voter', 'nota', 'counting', 'result', 'constituency', 'eci', 'commission', 'party', 'government', 'id', 'epic', 'aadhaar', 'pan', 'register', 'list'];
    const isRelated = electionKeywords.some(key => q.includes(key));

    if (!isRelated) {
        addMessage('bot', "I can only help with election-related questions.");
        return;
    }

    // 2. Specific FAQ Matching
    if (q.includes('evm') || q.includes('electronic voting')) {
        respondWithFAQ('evm');
    } else if (q.includes('nota') || q.includes('none of the above')) {
        respondWithFAQ('nota');
    } else if (q.includes('id') || q.includes('epic') || q.includes('aadhaar') || q.includes('identity')) {
        respondWithFAQ('voterid');
    } else if (q.includes('commission') || q.includes('eci') || q.includes('who conducts')) {
        respondWithFAQ('eci');
    } else if (q.includes('count') || q.includes('tally') || q.includes('calculate')) {
        respondWithFAQ('counting');
    } 
    // 3. Fallback for General Election Questions
    else {
        addMessage('bot', `
            <p>That's an interesting question about elections! While I don't have a specific answer for that yet, here are some related topics you might want to explore:</p>
            <ul style="margin-top:0.5rem; list-style:none; padding-left:0;">
                <li style="margin-bottom:0.3rem;"><i class="fas fa-chevron-right" style="font-size:0.7rem; color:var(--primary);"></i> How <strong>EVMs</strong> ensure security</li>
                <li style="margin-bottom:0.3rem;"><i class="fas fa-chevron-right" style="font-size:0.7rem; color:var(--primary);"></i> The role of the <strong>ECI</strong></li>
                <li style="margin-bottom:0.3rem;"><i class="fas fa-chevron-right" style="font-size:0.7rem; color:var(--primary);"></i> Understanding <strong>NOTA</strong></li>
            </ul>
        `);
    }
}

function respondWithFAQ(key) {
    const data = APP_DATA.faq[key];
    const html = `
        <strong>${data.title}</strong>
        <p style="margin: 0.5rem 0;">${data.answer}</p>
        <ul style="padding-left:1.2rem;">
            ${data.points.map(p => `<li style="margin-bottom:0.3rem;">${p}</li>`).join('')}
        </ul>
    `;
    addMessage('bot', html);
}

init();
