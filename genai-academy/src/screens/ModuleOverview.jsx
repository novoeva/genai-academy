import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import TopNav from "../components/TopNav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { modules } from "../data/curriculum.js";

const neuralImg = "https://www.figma.com/api/mcp/asset/28b91b61-f8b2-4f13-a712-49701990ed0d";

export default function ModuleOverview() {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const mod = modules.find((m) => m.id === parseInt(moduleId)) || modules[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface font-sans">
      <TopNav currentScreen="module" />
      <Sidebar activeModuleId={mod.id} />

      <main className="pl-72 pt-16">
        <div className="px-24 py-12 max-w-4xl">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link
              to="/"
              className="text-ink-mid hover:text-ink-dark"
            >
              Curriculum
            </Link>
            <span className="text-slate-300">›</span>
            <span className="text-brand-600 font-medium">Module {mod.id}</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold text-ink-dark tracking-tight leading-tight mb-6">
            Module {mod.id}: {mod.title}
          </h1>

          {/* Intro box */}
          <div className="bg-slate-100 border-l-4 border-brand-600 pl-9 pr-8 py-8 rounded-xl mb-10">
            <p className="text-lg text-ink-mid leading-relaxed">
              {mod.summary || mod.description}
            </p>
          </div>

          {/* Curriculum breakdown */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-ink-dark tracking-tight">Curriculum Breakdown</h2>
              <p className="text-base text-ink-mid">{mod.curriculumSubtitle || mod.tagline}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs font-bold text-brand-600 tracking-widest uppercase">PROGRESS</span>
              <div className="w-32 h-1.5 rounded-full bg-brand-200">
                <div className="h-full w-full rounded-full bg-brand-600" />
              </div>
            </div>
          </div>

          {/* Lesson cards */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            {mod.lessons.map((lesson, i) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                index={i}
                wide={i === mod.lessons.length - 1 && mod.lessons.length % 2 !== 0}
                moduleId={mod.id}
                neuralImg={neuralImg}
              />
            ))}
          </div>

          {/* Quiz CTA */}
          <div
            className="rounded-2xl overflow-hidden relative p-12"
            style={{ background: "#0f172a" }}
          >
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-indigo-300 mb-4"
                style={{ background: "rgba(99,102,241,0.2)" }}>
                🔓 UNLOCKED
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-3">
                Module {mod.id} Knowledge Check
              </h3>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                Validate your understanding of LLM fundamentals. Successfully completing
                this quiz grants you the 'Foundations' badge and unlocks Module {mod.id + 1}.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/quiz/${mod.id}`)}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold bg-brand-600 hover:bg-brand-700 transition-colors"
                >
                  Start Knowledge Check 📋
                </button>
                <button className="px-8 py-4 rounded-xl text-white font-bold border border-white/10 backdrop-blur-sm hover:bg-white/5 transition-colors">
                  View Study Guide
                </button>
              </div>
            </div>
          </div>

          {/* Mentor insight */}
          {mod.mentorInsight && (
            <div className="mt-8 bg-brand-50 border border-brand-100 rounded-2xl p-6 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✦</span>
              </div>
              <div>
                <p className="text-xs font-bold text-brand-800 tracking-widest uppercase mb-1">MENTOR INSIGHT</p>
                <p className="text-sm italic text-ink-mid">"{mod.mentorInsight}"</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-slate-200/50 mt-12 pt-8 flex items-center justify-between text-sm text-ink-mid">
            <span>✓ Curated by the Ethereal Mentor Council</span>
            <div className="flex gap-8">
              <button className="hover:text-ink-dark">Privacy</button>
              <button className="hover:text-ink-dark">Ethical Guidelines</button>
              <button className="hover:text-ink-dark">v2.4.0</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function LessonCard({ lesson, index, wide, moduleId, neuralImg }) {
  const navigate = useNavigate();
  const label = `${moduleId}.${index + 1}`;

  if (wide) {
    return (
      <div
        className="col-span-2 bg-white rounded-xl shadow-[0_12px_40px_0_rgba(44,52,55,0.06)] p-8 flex gap-8 items-center cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => navigate(`/lesson/${lesson.id}`)}
      >
        <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
          <img src={neuralImg} alt="" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-xl font-bold text-ink-dark">
              {label} {lesson.title}
            </h4>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-300/30 px-3 py-1 rounded-full">DONE</span>
          </div>
          <button className="text-sm font-bold text-brand-600 hover:opacity-80 flex items-center gap-1">
            Review Lesson →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-xl shadow-[0_12px_40px_0_rgba(44,52,55,0.06)] p-8 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/lesson/${lesson.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center">
          <span className="text-brand-600 text-lg">⬡</span>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-300/30 px-3 py-1 rounded-full">DONE</span>
      </div>
      <h4 className="text-xl font-bold text-ink-dark mb-2">
        {label} {lesson.title}
      </h4>
      <button
        onClick={(e) => { e.stopPropagation(); navigate(`/lesson/${lesson.id}`); }}
        className="mt-4 text-sm font-bold text-brand-600 hover:opacity-80 flex items-center gap-1"
      >
        Review Lesson →
      </button>
    </div>
  );
}
