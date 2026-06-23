import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";
import { modules } from "../data/curriculum.js";
import { getModuleQuestions } from "../data/lessonLoader.js";

const samplingImg = "https://www.figma.com/api/mcp/asset/b9f73b4f-1195-479f-b78f-542c63f7cf8d";

export default function QuizPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  // Scroll to top when quiz loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [moduleId]);

  const mod = modules.find((m) => m.id === parseInt(moduleId)) || modules[0];
  const questions = mod.folder ? getModuleQuestions(mod.folder) : [];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState([]); // array of { questionId, correct }
  const [done, setDone] = useState(false);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;
  const letters = ["A", "B", "C", "D"];

  const handleSelect = (idx) => {
    if (!revealed) setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    if (!revealed) {
      setRevealed(true);
      setAnswers((prev) => [...prev, { questionId: q.id, correct: selected === q.correct }]);
    } else {
      // advance
      if (current < questions.length - 1) {
        setCurrent((c) => c + 1);
        setSelected(null);
        setRevealed(false);
      } else {
        setDone(true);
      }
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const score = answers.filter((a) => a.correct).length;

  // Handle case when no quiz questions are available
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center font-sans px-6">
        <div className="max-w-lg w-full text-center">
          <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl bg-slate-100">
            📋
          </div>
          <h2 className="text-3xl font-extrabold text-ink-dark tracking-tight mb-2">
            No quiz available
          </h2>
          <p className="text-ink-mid text-lg mb-8">
            This module doesn't have any quiz questions yet.
          </p>
          <Link
            to={`/module/${mod.id}`}
            className="px-8 py-4 rounded-xl text-white font-bold bg-brand-600 hover:bg-brand-700 transition-colors"
          >
            Back to Module
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return <ScoreSummary score={score} total={questions.length} moduleId={mod.id} />;
  }

  return (
    <div className="min-h-screen bg-surface font-sans">
      <TopNav currentScreen="quiz" quizMode />

      <main className="pt-16 flex flex-col items-center px-6">
        <div className="w-full max-w-3xl">

          {/* Progress header */}
          <div className="pt-12 pb-12">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-xs font-bold text-brand-600/70 tracking-widest uppercase mb-1">
                  MODULE 1: FUNDAMENTALS
                </p>
                <h2 className="text-2xl font-extrabold text-ink-dark tracking-tight">
                  Neural Architectures
                </h2>
              </div>
              <p className="text-sm font-bold text-ink-dark">
                Question {current + 1} of {questions.length}
              </p>
            </div>
            <div className="h-1.5 rounded-full bg-brand-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-12 gap-8">

            {/* Question + answers */}
            <div className="col-span-8 flex flex-col gap-8">

              {/* Question card */}
              <div className="bg-white border border-slate-200/15 rounded-xl p-8 shadow-sm">
                <h3 className="text-3xl font-extrabold text-ink-dark tracking-tight leading-tight mb-4">
                  {q.question}
                </h3>
                <p className="text-base text-ink-mid leading-relaxed">
                  Consider the probability distribution of the next token in a sequence.
                  How does this hyperparameter influence the selection process?
                </p>
              </div>

              {/* Answer options */}
              <div className="flex flex-col gap-4">
                {q.options.map((opt, idx) => {
                  const isSelected = selected === idx;
                  const isCorrect = idx === q.correct;
                  let style = "bg-white border border-slate-200/15 hover:border-brand-600/30 hover:shadow-sm";

                  if (revealed) {
                    if (isCorrect) style = "bg-white border-2 border-emerald-400 shadow-[0_4px_12px_0_rgba(16,185,129,0.12)]";
                    else if (isSelected && !isCorrect) style = "bg-white border-2 border-red-400 opacity-70";
                    else style = "bg-white border border-slate-200/15 opacity-50";
                  } else if (isSelected) {
                    style = "bg-white border-2 border-brand-600 shadow-[0_8px_30px_0_rgba(81,72,216,0.08)]";
                  }

                  const letterBg = revealed && isCorrect
                    ? "bg-emerald-500 text-white"
                    : revealed && isSelected && !isCorrect
                    ? "bg-red-500 text-white"
                    : isSelected
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-ink-mid";

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={revealed}
                      className={`w-full flex items-center justify-between p-6 rounded-xl transition-all text-left ${style}`}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${letterBg}`}>
                          {letters[idx]}
                        </div>
                        <span className={`text-lg font-medium text-ink-dark ${isSelected && !revealed ? "font-bold" : ""}`}>
                          {opt}
                        </span>
                      </div>
                      {revealed && isCorrect && (
                        <span className="text-emerald-500 text-xl">✓</span>
                      )}
                      {revealed && isSelected && !isCorrect && (
                        <span className="text-red-500 text-xl">✕</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (revealed) */}
              {revealed && (
                <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 animate-fade-in">
                  <p className="text-xs font-bold text-brand-700 tracking-widest uppercase mb-2">EXPLANATION</p>
                  <p className="text-sm text-ink-mid leading-relaxed">{q.explanation}</p>
                </div>
              )}

              {/* Footer actions */}
              <div className="flex items-center justify-between pt-8">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-8 py-4 text-brand-600 font-bold text-sm hover:opacity-80 transition-opacity"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={selected === null}
                  className="px-10 py-4 rounded-xl text-white font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shadow-[0_10px_30px_0_rgba(81,72,216,0.2)]"
                  style={{ background: "linear-gradient(165deg, #5148d8 0%, #6f68f7 100%)" }}
                >
                  {revealed ? (current < questions.length - 1 ? "Next Question →" : "See Results") : "Confirm Answer"}
                </button>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="col-span-4 flex flex-col gap-6">
              {/* Mentor tip */}
              <div className="bg-slate-100 rounded-2xl p-8 overflow-hidden relative">
                <div className="absolute w-20 h-20 right-[-1rem] top-[-1rem] opacity-30 text-4xl text-slate-400">⚙</div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-brand-600 text-sm">💡</span>
                  <span className="text-xs font-bold text-brand-600 tracking-widest uppercase">MENTOR TIP</span>
                </div>
                <h4 className="text-lg font-bold text-ink-dark mb-3">The Softmax Effect</h4>
                <p className="text-sm text-ink-mid leading-relaxed mb-6">
                  Think of temperature as a "smoothing" function for the softmax output. A lower
                  temperature sharpens the peak of the probability distribution.
                </p>
                <div className="border-t border-slate-200/50 pt-6">
                  <div className="h-32 rounded-lg overflow-hidden mb-3">
                    <img src={samplingImg} alt="Sampling visualization" className="w-full h-full object-cover grayscale" />
                  </div>
                  <p className="text-xs italic text-ink-mid">Ref: Sampling Strategy (Section 2.4)</p>
                </div>
              </div>

              {/* Global progress */}
              <div className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-ink-mid tracking-widest uppercase">GLOBAL PROGRESS</span>
                  <span className="text-xs font-bold text-brand-600">82%</span>
                </div>
                <div className="h-1 rounded-full bg-slate-200">
                  <div className="h-full w-[82%] rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full max-w-3xl border-t border-slate-200/50 mt-12 py-12 flex items-center justify-between text-sm text-ink-mid">
          <div className="flex gap-12">
            {["Documentation", "Glossary", "Support"].map((l) => (
              <button key={l} className="hover:text-ink-dark transition-colors">{l}</button>
            ))}
          </div>
          <span className="text-xs text-ink-mid/60">© 2024 GenAI Academy. All rights reserved.</span>
        </div>
      </main>
    </div>
  );
}

function ScoreSummary({ score, total, moduleId }) {
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 80;

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center font-sans px-6">
      <div className="max-w-lg w-full text-center">
        <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl ${passed ? "bg-emerald-100" : "bg-amber-100"}`}>
          {passed ? "🎉" : "📚"}
        </div>
        <h2 className="text-4xl font-extrabold text-ink-dark tracking-tight mb-2">
          {passed ? "You passed!" : "Keep practising"}
        </h2>
        <p className="text-ink-mid text-lg mb-8">
          You scored {score}/{total} ({pct}%)
          {passed ? " The 'Foundations' badge is yours!" : " Try reviewing the lessons and retaking."}
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to={`/module/${moduleId + 1}`}
            className="px-8 py-4 rounded-xl text-white font-bold bg-brand-600 hover:bg-brand-700 transition-colors"
          >
            {passed ? "Continue to Module 2 →" : "Back to Module"}
          </Link>
          <Link
            to="/"
            className="px-8 py-4 rounded-xl font-bold border border-slate-200 text-ink-mid hover:border-ink-mid transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
