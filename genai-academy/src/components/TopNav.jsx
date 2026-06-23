import { Link } from "react-router-dom";

export default function TopNav({ currentScreen, quizMode = false }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8 backdrop-blur-[10px] bg-white/80 shadow-[0_12px_40px_0_rgba(44,52,55,0.06)]">
      {/* Logo */}
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight bg-gradient-to-br from-brand-800 to-brand-300 bg-clip-text text-transparent"
        >
          GenAI Academy
        </Link>

        {!quizMode && (
          <nav className="flex gap-6">
            <Link
              to="/"
              className={`text-base tracking-tight transition-colors text-brand-800 font-semibold border-b-2 border-brand-800 pb-0.5`}
            >
              Explore
            </Link>
            <Link
              to="/about"
              className="text-base tracking-tight transition-colors text-slate-500 hover:text-ink-dark font-normal"
            >
              About
            </Link>
          </nav>
        )}
      </div>

      {/* Right actions */}
      {quizMode ? (
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-ink-mid hover:text-ink-dark"
          >
            <span className="text-lg leading-none">✕</span>
            Exit Quiz
          </Link>
          <div className="w-px h-6 bg-slate-200" />
          <div className="flex items-center gap-3">
            <button className="w-5 h-5 text-ink-mid hover:text-ink-dark">⚙</button>
            <button className="w-5 h-5 text-ink-mid hover:text-ink-dark">○</button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button className="w-5 h-5 text-ink-mid hover:text-ink-dark">⚙</button>
          <button className="w-5 h-5 text-ink-mid hover:text-ink-dark">○</button>
        </div>
      )}
    </header>
  );
}
