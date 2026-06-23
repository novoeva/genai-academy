import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { modules } from "../data/curriculum.js";

const neuralBg = "https://www.figma.com/api/mcp/asset/9cd5a7f7-51fe-41d0-9472-38e10546244e";

export default function Dashboard() {
  const navigate = useNavigate();
  const inProgress = modules.find((m) => m.status === "in-progress") || modules[1];

  return (
    <div className="min-h-screen bg-surface font-sans">
      <TopNav currentScreen="dashboard" />
      <Sidebar activeModuleId={inProgress.id} />

      <main className="pl-72 pt-16 min-h-screen">
        <div className="px-8 py-12 max-w-[1280px]">

          {/* Hero + mastery row */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            {/* Hero card — spans 2/3 */}
            <div
              className="col-span-2 rounded-3xl overflow-hidden relative p-12 flex flex-col justify-center"
              style={{ background: "#0b0f10", minHeight: 428 }}
            >
              <img
                src={neuralBg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative z-10">
                <div
                  className="inline-flex items-center px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-400 mb-6"
                  style={{ background: "rgba(81,72,216,0.2)", backdropFilter: "blur(6px)" }}
                >
                  CURRENT PROGRESS
                </div>
                <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  {inProgress.title}
                </h1>
                <p className="text-slate-300 text-lg mb-8 max-w-md leading-relaxed">
                  {inProgress.description}
                </p>
                <button
                  onClick={() => navigate(`/lesson/${inProgress.lessons[0]?.id}`)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-base shadow-lg"
                  style={{ background: "#5148d8" }}
                >
                  Continue Module {inProgress.id} ▶
                </button>
              </div>
            </div>

            {/* Mastery card — 1/3 */}
            <div className="bg-white rounded-3xl border border-ink-dark/10 p-10 shadow-[0_12px_40px_0_rgba(44,52,55,0.06)] flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-ink-dark">Your Mastery</h3>
                <p className="text-sm text-ink-mid mt-1">Overall Course Completion</p>
              </div>
              <div className="py-8">
                <div className="flex items-end gap-3 mb-3">
                  <span className="text-[60px] font-extrabold text-brand-600 leading-none">18%</span>
                  <div className="text-sm font-medium text-ink-mid pb-2 leading-snug">
                    1/7<br />Modules
                  </div>
                </div>
                <div className="h-3 rounded-full bg-brand-200 overflow-hidden">
                  <div className="h-full w-[18%] rounded-full bg-brand-600" />
                </div>
              </div>
              <p className="text-xs text-ink-mid leading-relaxed">
                You're performing in the{" "}
                <span className="font-bold text-brand-600">top 12%</span> of students this week.
                Keep maintaining your streak!
              </p>
            </div>
          </div>

          {/* Modules section */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-ink-dark tracking-tight">Curriculum Modules</h2>
            <button className="text-sm font-bold text-brand-600 flex items-center gap-1 hover:opacity-80">
              View Full Path →
            </button>
          </div>

          {/* Asymmetric bento grid — active module spans 2 cols */}
          <div className="grid grid-cols-4 gap-6">
            {modules.map((mod) => {
              const isActive = mod.id === inProgress.id;
              return (
                <ModuleCard
                  key={mod.id}
                  mod={mod}
                  isActive={isActive}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

function ModuleCard({ mod, isActive }) {
  const navigate = useNavigate();
  const isLocked = mod.status === "locked" || (mod.status === "in-progress" && mod.progress === 0 && !isActive);
  const isDone   = mod.status === "complete";

  if (isActive) {
    return (
      <div
        onClick={() => navigate(`/lesson/${mod.lessons[0]?.id}`)}
        className="col-span-2 rounded-3xl overflow-hidden relative p-8 flex flex-col justify-between min-h-[320px] cursor-pointer"
        style={{ background: "#6f68f7" }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center text-xl">
              ⚡
            </div>
            <span className="text-xs font-bold text-black">{mod.progress}% IN PROGRESS</span>
          </div>
          <h4 className="text-2xl font-bold text-black mt-4 leading-tight">{mod.title}</h4>
          <p className="text-base text-black/70 max-w-sm leading-snug">{mod.description}</p>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <div className="h-2 rounded-full bg-black/10 overflow-hidden">
            <div className="h-full rounded-full bg-black" style={{ width: `${mod.progress}%` }} />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/lesson/${mod.lessons[0]?.id}`); }}
            className="self-start px-6 py-3 bg-black rounded-xl text-sm font-bold text-white"
          >
            Continue Lesson
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => !isLocked && navigate(`/module/${mod.id}`)}
      className={`bg-white rounded-3xl border border-ink-dark/10 p-8 flex flex-col justify-between min-h-[320px] shadow-sm transition-all ${
        isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
            isDone ? "bg-emerald-300" : "bg-slate-200"
          }`}>
            {isDone ? "✓" : "🔒"}
          </div>
          <span className={`text-xs font-bold ${isDone ? "text-emerald-700" : "text-slate-400"}`}>
            {isDone ? "100%" : "LOCKED"}
          </span>
        </div>
        <h4 className="text-xl font-bold text-ink-dark mt-4 leading-tight">{mod.title}</h4>
        <p className="text-sm text-ink-mid leading-snug">{mod.description}</p>
      </div>

      <div className="mt-4">
        {isDone && (
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-sm font-bold text-ink-mid hover:text-ink-dark"
          >
            Review Content ↻
          </button>
        )}
        {isLocked && mod.prerequisite && (
          <p className="text-xs font-medium text-slate-400">Prerequisite: {mod.prerequisite}</p>
        )}
      </div>
    </div>
  );
}
