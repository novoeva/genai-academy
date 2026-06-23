import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { modules } from "../data/curriculum.js";
import {
  ScanSearch,
  BrainCircuit,
  PenLine,
  Bot,
  ShieldCheck,
  Database,
  Network,
  Rocket,
} from "lucide-react";

const icons = {
  graduation: ScanSearch,
  brain:      BrainCircuit,
  code:       PenLine,
  layers:     Bot,
  shield:     ShieldCheck,
  database:   Database,
  network:    Network,
  rocket:     Rocket,
};

export default function Sidebar({ activeModuleId, activeLessonId }) {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(activeModuleId ?? null);

  function toggle(modId) {
    setExpandedId((prev) => (prev === modId ? null : modId));
  }

  return (
    <aside className="fixed top-16 left-0 w-72 h-[calc(100vh-4rem)] bg-sidebar border-r border-slate-200/15 flex flex-col justify-between py-8 px-4 overflow-y-auto">
      <div>
        <div className="px-4 mb-8">
          <p className="font-bold text-[18px] text-slate-900">AI Curriculum</p>
          <p className="text-xs font-medium text-ink-mid mt-0.5">Progress Tracking Active</p>
        </div>

        <nav className="flex flex-col gap-1">
          {modules.map((mod) => {
            const isActive = mod.id === activeModuleId;
            const isExpanded = mod.id === expandedId;
            const isLocked = mod.status === "locked";

            return (
              <div key={mod.id}>
                {/* Module row */}
                <button
                  onClick={() => {
                    if (!isLocked) {
                      toggle(mod.id);
                      navigate(`/module/${mod.id}`);
                    }
                  }}
                  disabled={isLocked}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all text-left ${
                    isActive
                      ? "bg-brand-50/50 border-l-4 border-brand-800 pl-3 font-bold text-brand-700"
                      : isLocked
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-slate-500 font-medium hover:text-ink-dark hover:bg-slate-100/50"
                  }`}
                >
                  {(() => { const Icon = icons[mod.icon]; return Icon ? <Icon size={16} className="shrink-0 text-brand-700" /> : <span className="shrink-0">◦</span>; })()}
                  <span className="flex-1 truncate">{mod.title}</span>
                  {isLocked ? (
                    <span className="text-xs shrink-0">🔒</span>
                  ) : (
                    <span className={`text-xs shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`}>›</span>
                  )}
                </button>

                {/* Lessons sub-list */}
                {isExpanded && !isLocked && mod.lessons?.length > 0 && (
                  <div className="ml-4 mt-0.5 mb-1 flex flex-col gap-0.5 border-l border-slate-200/50 pl-3">
                    {mod.lessons.map((lesson) => {
                      const lessonActive = lesson.id === activeLessonId;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => navigate(`/lesson/${lesson.id}`)}
                          className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-all ${
                            lessonActive
                              ? "bg-brand-50/50 font-semibold text-brand-700"
                              : "text-slate-500 hover:text-ink-dark hover:bg-slate-100/50"
                          }`}
                        >
                          {lesson.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom actions */}
      <div className="border-t border-slate-200/30 pt-4 flex flex-col gap-1">
        <Link
          to="/"
          className="w-full py-3 rounded-xl text-[16px] font-semibold text-white text-center"
          style={{ background: "linear-gradient(169deg, #4f46e5 0%, #6f68f7 100%)" }}
        >
          Resume Learning
        </Link>
        <button className="flex items-center gap-3 px-4 py-2 text-sm text-ink-mid hover:text-ink-dark mt-3">
          <span>?</span> Help Center
        </button>
        <button className="flex items-center gap-3 px-4 py-2 text-sm text-ink-mid hover:text-ink-dark">
          <span>↪</span> Log Out
        </button>
      </div>
    </aside>
  );
}
