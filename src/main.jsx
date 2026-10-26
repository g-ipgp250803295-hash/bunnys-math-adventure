import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Volume2, VolumeX, Play, LockKeyhole, BookOpen, Star, Trophy,
  Footprints, Sparkles, Home, ArrowLeft, ArrowRight, RotateCcw,
  CheckCircle2, XCircle, Music2, Video, Heart, PartyPopper
} from "lucide-react";
import "./style.css";

const STATIONS = [
  { id: "learn", name: "Learn", emoji: "📚", color: "mint", short: "Discover the rules" },
  { id: "mission1", name: "Mission 1", emoji: "🍎", color: "peach", short: "Easy explorer" },
  { id: "mission2", name: "Mission 2", emoji: "🌈", color: "lilac", short: "Think it through" },
  { id: "mission3", name: "Mission 3", emoji: "🚀", color: "blue", short: "Maths master" },
  { id: "reflection", name: "Reflection", emoji: "💭", color: "yellow", short: "Think about learning" },
  { id: "success", name: "Success", emoji: "🏆", color: "pink", short: "Celebrate your win" }
];

const MISSIONS = {
  mission1: {
    title: "Mission 1: Easy Explorer", level: "LOW LEVEL", instruction: "Read each expression carefully. Remember to do multiplication and division before addition and subtraction. Answer all 5 questions correctly to unlock the next station.",
    questions: [
      { q: "3 + 2 × 4 = ?", options: ["20", "11", "14", "9"], answer: "11", explain: "Multiply first: 2 × 4 = 8. Then 3 + 8 = 11." },
      { q: "18 − 6 ÷ 2 = ?", options: ["6", "15", "12", "9"], answer: "15", explain: "Divide first: 6 ÷ 2 = 3. Then 18 − 3 = 15." },
      { q: "5 × 3 + 2 = ?", options: ["25", "17", "20", "13"], answer: "17", explain: "Multiply first: 5 × 3 = 15. Then 15 + 2 = 17." },
      { q: "20 ÷ 4 + 6 = ?", options: ["11", "5", "10", "14"], answer: "11", explain: "Divide first: 20 ÷ 4 = 5. Then 5 + 6 = 11." },
      { q: "14 + 12 ÷ 3 = ?", options: ["26", "18", "10", "8"], answer: "18", explain: "Divide first: 12 ÷ 3 = 4. Then 14 + 4 = 18." }
    ]
  },
  mission2: {
    title: "Mission 2: Rainbow Trail", level: "MEDIUM LEVEL", instruction: "Choose the correct answer for each challenge. Some questions include brackets or more than one operation. Work through the brackets first, then follow the operation rules. Get all 5 right to continue.",
    questions: [
      { q: "(6 + 2) × 3 = ?", options: ["12", "24", "11", "18"], answer: "24", explain: "Brackets first: 6 + 2 = 8. Then 8 × 3 = 24." },
      { q: "24 ÷ (2 × 3) = ?", options: ["36", "4", "12", "8"], answer: "4", explain: "Brackets first: 2 × 3 = 6. Then 24 ÷ 6 = 4." },
      { q: "30 − 4 × 5 + 2 = ?", options: ["132", "12", "22", "8"], answer: "12", explain: "Multiply first: 4 × 5 = 20. Then 30 − 20 + 2 = 12." },
      { q: "36 ÷ 6 × 2 = ?", options: ["3", "12", "18", "6"], answer: "12", explain: "Division and multiplication have equal priority, so work left to right: 36 ÷ 6 = 6, then 6 × 2 = 12." },
      { q: "7 + 3 × (10 − 6) = ?", options: ["40", "19", "28", "31"], answer: "19", explain: "Brackets: 10 − 6 = 4. Multiply: 3 × 4 = 12. Add: 7 + 12 = 19." }
    ]
  },
  mission3: {
    title: "Mission 3: Rocket Challenge", level: "HIGH LEVEL", instruction: "This is your big challenge! Show careful reasoning and remember that multiplication and division are done from left to right when they appear together. Solve all 5 challenges correctly to earn your gold medal.",
    questions: [
      { q: "48 ÷ (3 × 4) + 7 = ?", options: ["11", "17", "4", "15"], answer: "11", explain: "Brackets: 3 × 4 = 12. Divide: 48 ÷ 12 = 4. Add: 4 + 7 = 11." },
      { q: "50 − 18 ÷ 3 × 2 = ?", options: ["38", "22", "44", "32"], answer: "38", explain: "Work left to right for division and multiplication: 18 ÷ 3 = 6, 6 × 2 = 12. Then 50 − 12 = 38." },
      { q: "Which expression equals 25?", options: ["5 + 4 × 5", "(5 + 4) × 5", "40 ÷ 2 + 10", "30 − 2 × 4"], answer: "5 + 4 × 5", explain: "Multiply first: 4 × 5 = 20. Then 5 + 20 = 25." },
      { q: "A box has 4 bags with 6 marbles in each. Mia adds 8 more marbles. Which calculation gives the total?", options: ["4 + 6 × 8", "4 × (6 + 8)", "4 × 6 + 8", "8 − 4 × 6"], answer: "4 × 6 + 8", explain: "Four bags of six marbles gives 4 × 6 = 24. Add 8 more: 24 + 8 = 32." },
      { q: "72 ÷ 8 + 3 × 4 − 5 = ?", options: ["16", "28", "10", "22"], answer: "16", explain: "Do division and multiplication first: 72 ÷ 8 = 9 and 3 × 4 = 12. Then work left to right: 9 + 12 − 5 = 16." }
    ]
  }
};

const NOTES = [
  { title: "1. What are combined operations?", body: "A combined operation is a number sentence that has two or more operations, such as addition (+), subtraction (−), multiplication (×) or division (÷). Example: 4 + 3 × 2." },
  { title: "2. Remember the order!", body: "Use this order: (1) Brackets first. (2) Multiplication and division, working from left to right. (3) Addition and subtraction, working from left to right." },
  { title: "3. Brackets come first", body: "Always calculate inside brackets before doing the other operations. Example: (5 + 3) × 2 = 8 × 2 = 16. Without brackets, 5 + 3 × 2 = 5 + 6 = 11." },
  { title: "4. Multiplication and division", body: "Multiplication and division have the same priority. If both appear, calculate from left to right. Example: 24 ÷ 6 × 2 = 4 × 2 = 8. Do not always multiply first!" },
  { title: "5. Addition and subtraction", body: "Addition and subtraction have the same priority. If both appear, calculate from left to right. Example: 15 − 4 + 2 = 11 + 2 = 13." },
  { title: "6. A step-by-step example", body: "Example: 6 + 2 × (9 − 5). Step 1: brackets, 9 − 5 = 4. Step 2: multiplication, 2 × 4 = 8. Step 3: addition, 6 + 8 = 14." },
  { title: "7. Word problems", body: "Read the story, identify what is happening, choose the operations, and write one number sentence. Example: 3 packets contain 5 stickers each, and 4 extra stickers are added. Total = 3 × 5 + 4 = 19 stickers." },
  { title: "8. Common mistakes to avoid", body: "Do not simply calculate from left to right for every operation. Do not forget brackets. Do not give multiplication automatic priority over division, or addition priority over subtraction. Multiplication/division share a level; addition/subtraction share a level." },
  { title: "9. Check your answer", body: "Estimate whether your answer makes sense, repeat each step, and check that you have followed the order of operations. Keep your working neat and show one step at a time." }
];

const STORAGE_KEY = "bunny-math-adventure-v1";
function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved || { unlocked: 0, completed: [], reflections: [], sound: true };
  } catch { return { unlocked: 0, completed: [], reflections: [], sound: true }; }
}
function speak(text) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1.15;
    window.speechSynthesis.speak(utterance);
  }
}
function beep(kind = "good") {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const notes = kind === "good" ? [523, 659, 784] : kind === "win" ? [523, 659, 784, 1047] : [220, 185];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq; osc.type = "sine";
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.13, ctx.currentTime + i * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.12 + 0.16);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.18);
    });
    setTimeout(() => ctx.close(), 1200);
  } catch {}
}

function App() {
  const [progress, setProgress] = useState(readProgress);
  const [page, setPage] = useState("welcome");
  const [modal, setModal] = useState(null);
  const [noteIndex, setNoteIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [reflectionDraft, setReflectionDraft] = useState(["", "", ""]);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }, [progress]);
  const isComplete = id => progress.completed.includes(id);
  const canEnter = index => index <= progress.unlocked;
  const currentMission = MISSIONS[page];
  const activeQuestion = currentMission?.questions[qIndex];
  const answeredCorrectly = Object.keys(answers).length;

  function goHome() { setPage("map"); setModal(null); setFeedback(null); }
  function startAdventure() { setPage("map"); }
  function enterStation(station, index) {
    if (!canEnter(index)) {
      setModal({ title: "Station Locked! 🔒", text: "Finish the previous station first. Bunny believes in you!", kind: "locked" });
      beep("bad");
      return;
    }
    setPage(station.id);
    setModal(null);
    setFeedback(null);
    setAnswers({});
    setQIndex(0);
    if (station.id === "learn") setNoteIndex(0);
    if (station.id.startsWith("mission")) setModal({ title: "Mission Briefing! ✨", text: MISSIONS[station.id].instruction, kind: "briefing" });
    if (station.id === "reflection") setReflectionDraft(["", "", ""]);
    if (station.id === "success") { beep("win"); }
  }
  function completeStation(id) {
    setProgress(old => ({
      ...old,
      completed: old.completed.includes(id) ? old.completed : [...old.completed, id],
      unlocked: Math.max(old.unlocked, STATIONS.findIndex(s => s.id === id) + 1)
    }));
    beep("win");
    setModal({ title: id === "mission3" ? "GOLD MEDAL UNLOCKED! 🥇" : "Station Complete! 🎉", text: id === "mission3" ? "Amazing work, Maths Master! You have conquered all three missions." : "Fantastic effort! Bunny is ready for the next part of the adventure.", kind: "complete" });
  }
  function chooseAnswer(option) {
    if (feedback) return;
    const correct = option === activeQuestion.answer;
    setFeedback({ correct, option, explain: activeQuestion.explain });
    if (correct) {
      beep("good");
      setAnswers(old => ({ ...old, [qIndex]: option }));
    } else beep("bad");
  }
  function nextQuestion() {
    if (qIndex < currentMission.questions.length - 1) {
      setQIndex(qIndex + 1);
      setFeedback(null);
    } else {
      if (Object.keys(answers).length === currentMission.questions.length) completeStation(page);
      else {
        setModal({ title: "Almost there! 🌟", text: "You need to answer every question correctly. Try the questions you missed again!", kind: "retry" });
        setQIndex(0); setAnswers({}); setFeedback(null);
      }
    }
  }
  function retryMission() { setModal(null); setQIndex(0); setAnswers({}); setFeedback(null); }
  function saveReflections() {
    if (reflectionDraft.some(a => !a.trim())) {
      setModal({ title: "One More Step 💭", text: "Please answer all three reflection questions before you continue.", kind: "retry" });
      return;
    }
    setProgress(old => ({ ...old, reflections: reflectionDraft }));
    completeStation("reflection");
  }
  function resetGame() {
    if (window.confirm("Reset all adventure progress and start again?")) {
      localStorage.removeItem(STORAGE_KEY);
      setProgress({ unlocked: 0, completed: [], reflections: [], sound: true });
      setPage("welcome"); setModal(null); setAnswers({}); setQIndex(0);
    }
  }

  const progressPercent = Math.round((progress.completed.length / STATIONS.length) * 100);

  return <div className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={() => setPage("welcome")} aria-label="Go to welcome">
        <span className="brand-bunny">🐰</span><span>BUNNY'S <b>MATH ADVENTURE</b></span>
      </button>
      <div className="top-actions">
        <span className="mini-progress"><Star size={16} fill="#ffca55" color="#ffca55" /> {progress.completed.length}/6 stations</span>
        <button className="icon-button" title="Read welcome instructions aloud" onClick={() => speak("Welcome to Bunny's Math Adventure! Learn the rules, complete three missions, reflect on your learning, and earn a gold medal.")}><Volume2 size={19}/></button>
        <button className="icon-button" title="Reset game" onClick={resetGame}><RotateCcw size={18}/></button>
      </div>
    </header>

    {page === "welcome" && <main className="welcome page-enter">
      <div className="welcome-copy">
        <span className="eyebrow"><Sparkles size={15}/> A magical maths journey</span>
        <h1>Ready, set,<br/><span>maths adventure!</span></h1>
        <p className="lead">Help Bunny travel through the enchanted forest, master combined operations, and collect a shiny gold medal!</p>
        <div className="welcome-tags"><span>🎯 Year 5</span><span>🧠 Learn & practise</span><span>🏆 Earn rewards</span></div>
        <button className="primary-button big" onClick={startAdventure}>Start Adventure <ArrowRight size={20}/></button>
        <button className="text-button" onClick={() => setModal({title:"How to Play 🎮",text:"Visit each station in order. Read the Learn notes, answer all five questions correctly in each mission, complete your reflection, and reach the Success station. Locked stations open only after the previous station is complete.",kind:"info"})}>How to play <span>↗</span></button>
      </div>
      <div className="hero-art">
        <div className="sun"></div><div className="cloud cloud-one"></div><div className="cloud cloud-two"></div>
        <div className="rainbow"></div><div className="hill hill-back"></div><div className="hill hill-front"></div>
        <div className="hero-bunny">🐰</div><div className="floating star-a">✦</div><div className="floating star-b">✧</div><div className="floating star-c">★</div>
        <div className="hero-sign">LET'S<br/>LEARN!</div>
      </div>
      <div className="welcome-bottom"><span>✨ Every great mathematician starts with one step.</span><span>Made for curious minds • Learn at your own pace</span></div>
    </main>}

    {page === "map" && <main className="map-page page-enter">
      <div className="section-heading">
        <span className="eyebrow"><Footprints size={15}/> YOUR ADVENTURE MAP</span>
        <h1>Follow the bunny trail!</h1>
        <p>Complete each station to unlock the next one. You can do it!</p>
      </div>
      <div className="map-progress"><div><span>Adventure progress</span><b>{progressPercent}%</b></div><div className="progress-track"><span style={{width:`${progressPercent}%`}}/></div></div>
      <div className="trail-scene">
        <svg className="trail-line" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 80 310 C 130 310, 130 100, 245 100 S 340 300, 410 300 S 510 100, 590 100 S 680 300, 755 300 S 855 100, 930 100" fill="none" stroke="#dfcba4" strokeWidth="17" strokeLinecap="round" strokeDasharray="2 1"/>
          <path d="M 80 310 C 130 310, 130 100, 245 100 S 340 300, 410 300 S 510 100, 590 100 S 680 300, 755 300 S 855 100, 930 100" fill="none" stroke="#fff9e9" strokeWidth="7" strokeLinecap="round" strokeDasharray="2 1"/>
        </svg>
        {STATIONS.map((station, i) => {
          const positions = [
            {left:"7%",top:"62%"},{left:"21%",top:"14%"},{left:"38%",top:"59%"},
            {left:"55%",top:"14%"},{left:"73%",top:"59%"},{left:"89%",top:"14%"}
          ];
          const locked = !canEnter(i);
          return <button key={station.id} className={`station-node ${station.color} ${locked?"locked":""} ${isComplete(station.id)?"completed":""}`} style={positions[i]} onClick={() => enterStation(station,i)}>
            <span className="node-icon">{locked ? <LockKeyhole size={26}/> : isComplete(station.id) ? <CheckCircle2 size={27}/> : station.emoji}</span>
            <b>{station.name}</b><small>{isComplete(station.id)?"Completed ✓":locked?"Locked":station.short}</small>
          </button>
        })}
        <div className="map-bunny" title="Bunny is cheering you on!">🐰<span>Hop hop!</span></div>
        <span className="map-flower flower1">🌼</span><span className="map-flower flower2">🌷</span><span className="map-flower flower3">🍄</span><span className="map-flower flower4">🌻</span>
      </div>
      <div className="map-footer"><div className="tip-bubble">💡 <span><b>Bunny's tip:</b> Take your time and remember the order of operations!</span></div><button className="secondary-button" onClick={() => setPage("welcome")}><Home size={17}/> Welcome</button></div>
    </main>}

    {page === "learn" && <main className="content-page page-enter">
      <div className="content-header"><div><span className="eyebrow">STATION 1 • LEARN</span><h1>Let's become operation experts! 📚</h1><p>Explore the notes, then try the quick check.</p></div><div className="mascot-small">🐰</div></div>
      <div className="learn-layout">
        <aside className="notes-nav"><h3>Learning guide</h3>{NOTES.map((n,i)=><button key={n.title} className={noteIndex===i?"selected":""} onClick={()=>setNoteIndex(i)}><span>{String(i+1).padStart(2,"0")}</span>{n.title.replace(/^\d+\.\s/,"")}</button>)}
          <button className="listen-button" onClick={()=>speak(NOTES.map(n=>n.title+". "+n.body).join(" "))}><Volume2 size={17}/> Listen to all notes</button>
        </aside>
        <section className="note-card">
          <div className="note-topline"><span>NOTE {noteIndex+1} OF {NOTES.length}</span><button className="icon-button" title="Read this note aloud" onClick={()=>speak(NOTES[noteIndex].title+". "+NOTES[noteIndex].body)}><Volume2 size={18}/></button></div>
          <h2>{NOTES[noteIndex].title}</h2><p className="note-body">{NOTES[noteIndex].body}</p>
          {noteIndex===1 && <div className="order-cards"><div><b>1</b><span>BRACKETS</span><small>( )</small></div><div><b>2</b><span>MULTIPLY / DIVIDE</span><small>× ÷</small></div><div><b>3</b><span>ADD / SUBTRACT</span><small>+ −</small></div></div>}
          <div className="example-box"><span>🌟 REMEMBER</span><p>Brackets → Multiplication/Division (left to right) → Addition/Subtraction (left to right)</p></div>
          <div className="note-controls"><button className="secondary-button" disabled={noteIndex===0} onClick={()=>setNoteIndex(i=>i-1)}><ArrowLeft size={17}/> Previous</button><span>{noteIndex+1} / {NOTES.length}</span><button className="primary-button" onClick={()=>noteIndex<NOTES.length-1?setNoteIndex(i=>i+1):setVideoOpen(v=>!v)}>{noteIndex<NOTES.length-1?"Next note":"Video & finish"} <ArrowRight size={17}/></button></div>
          {videoOpen && <div className="video-card"><h3><Video size={18}/> Watch and learn</h3><p>Watch a short lesson on the order of operations. This video opens from YouTube.</p><a className="primary-button" href="https://www.youtube.com/results?search_query=order+of+operations+for+kids+year+5" target="_blank" rel="noreferrer">Find a learning video <ArrowRight size={16}/></a><p className="video-note">When you finish the notes, press the button below to unlock Mission 1.</p><button className="primary-button" onClick={()=>completeStation("learn")}>I've finished learning! <CheckCircle2 size={17}/></button></div>}
        </section>
      </div>
      <div className="bottom-nav"><button className="secondary-button" onClick={goHome}><Home size={17}/> Adventure map</button><span>Read each note before moving on!</span></div>
    </main>}

    {currentMission && <main className="content-page mission-page page-enter">
      <div className="mission-banner"><div><span className="eyebrow">{page==="mission1"?"STATION 2":page==="mission2"?"STATION 3":"STATION 4"} • {currentMission.level}</span><h1>{currentMission.title}</h1><p>Five questions stand between you and the next station!</p></div><div className="mission-mascot">{page==="mission1"?"🍎":page==="mission2"?"🌈":"🚀"}</div></div>
      <div className="quiz-wrap">
        <div className="quiz-meta"><span>QUESTION {qIndex+1} <i>OF 5</i></span><span className="score-pill">⭐ {Object.keys(answers).length} correct</span></div>
        <div className="quiz-track"><span style={{width:`${(qIndex/5)*100}%`}}/></div>
        <div className="question-card"><div className="question-number">{String(qIndex+1).padStart(2,"0")}</div><h2>{activeQuestion.q}</h2><p>Choose one answer below.</p>
          <div className="answer-grid">{activeQuestion.options.map((option,i)=><button key={option} disabled={!!feedback} className={`answer-option ${feedback?.option===option?(feedback.correct?"correct":"incorrect"):""} ${feedback?.correct&&option===activeQuestion.answer?"correct":""}`} onClick={()=>chooseAnswer(option)}><span>{String.fromCharCode(65+i)}</span>{option}{feedback?.option===option?(feedback.correct?<CheckCircle2 size={19}/>:<XCircle size={19}/>):null}</button>)}</div>
          {feedback && <div className={`feedback ${feedback.correct?"good":"bad"}`}><b>{feedback.correct?"Brilliant! That's correct! 🎉":"Not quite — try again! 💪"}</b><p>{feedback.explain}</p>{feedback.correct?<button className="primary-button" onClick={nextQuestion}>{qIndex===4?"Finish mission":"Next question"} <ArrowRight size={17}/></button>:<button className="secondary-button" onClick={()=>setFeedback(null)}>Try again <RotateCcw size={16}/></button>}</div>}
        </div>
        <div className="quiz-footer"><button className="text-button" onClick={goHome}><Home size={16}/> Back to map</button><span>🌱 Mistakes help your brain grow!</span></div>
      </div>
    </main>}

    {page === "reflection" && <main className="content-page page-enter">
      <div className="content-header"><div><span className="eyebrow">STATION 5 • REFLECTION</span><h1>Pause and reflect! 💭</h1><p>Think about your learning journey and tell Bunny what you discovered.</p></div><div className="mascot-small">💡</div></div>
      <div className="reflection-card">
        {[
          "1. What is one important rule you learned about combined operations?",
          "2. Which activity or question did you find most interesting? Why?",
          "3. What will you do next time if a combined-operation question feels difficult?"
        ].map((q,i)=><label className="reflection-question" key={q}><span>{q}</span><textarea value={reflectionDraft[i]} onChange={e=>setReflectionDraft(old=>old.map((v,j)=>i===j?e.target.value:v))} placeholder={["I learned that...","I enjoyed... because...","Next time, I will..."][i]} rows="3"/></label>)}
        <div className="reflection-actions"><button className="secondary-button" onClick={goHome}><Home size={17}/> Adventure map</button><button className="primary-button" onClick={saveReflections}>Submit reflection <ArrowRight size={17}/></button></div>
      </div>
    </main>}

    {page === "success" && <main className="success-page page-enter">
      <div className="confetti confetti1">✦</div><div className="confetti confetti2">✧</div><div className="confetti confetti3">★</div>
      <div className="success-medal">🥇</div><span className="eyebrow"><PartyPopper size={16}/> FINAL STATION • SUCCESS</span>
      <h1>YOU DID IT, MATHS STAR!</h1><p className="success-lead">Bunny is so proud of you. You explored, practised, solved tricky problems, and reflected on your learning!</p>
      <div className="medal-card"><Trophy size={30}/><div><b>GOLD MEDAL AWARDED</b><span>Order of Operations Champion</span></div><Sparkles size={25}/></div>
      <div className="success-stats"><div><b>15</b><span>Mission questions</span></div><div><b>6/6</b><span>Stations completed</span></div><div><b>∞</b><span>Reasons to be proud</span></div></div>
      <button className="primary-button big" onClick={()=>setModal({title:"Congratulations! 🎉",text:"You are an Order of Operations Champion! Keep practising, stay curious, and remember: great mathematicians take one step at a time.",kind:"complete"})}>Celebrate again <Sparkles size={19}/></button>
      <button className="text-button" onClick={goHome}><Home size={16}/> Return to adventure map</button>
    </main>}

    {modal && <div className="modal-backdrop" role="presentation" onClick={()=>setModal(null)}><section className={`modal-card ${modal.kind||""}`} role="dialog" aria-modal="true" aria-label={modal.title} onClick={e=>e.stopPropagation()}>
      <div className="modal-emoji">{modal.kind==="complete"?"🎉":modal.kind==="locked"?"🔒":modal.kind==="briefing"?"📜":"🐰"}</div><button className="modal-close" onClick={()=>setModal(null)} aria-label="Close">×</button><h2>{modal.title}</h2><p>{modal.text}</p>
      <button className="primary-button" onClick={()=>{const kind=modal.kind;setModal(null);if(kind==="complete")goHome();}}>{modal.kind==="briefing"?"Let's go!":modal.kind==="complete"?"Back to the map":"Got it!"} <ArrowRight size={17}/></button>
    </section></div>}
    <footer className="site-footer"><span>🐰 Bunny's Math Adventure</span><span>Learn • Practise • Reflect • Shine</span></footer>
  </div>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);


