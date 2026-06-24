import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import TopNav from "../components/TopNav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { modules } from "../data/curriculum.js";
import { getLessonContent, getSimulationHtml } from "../data/lessonLoader.js";


function LessonSimulation({ html }) {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(400); // Start with a reasonable default

  useEffect(() => {
    const handleMessage = (event) => {
      // Accept resize messages from the simulation iframe
      if (event.data && event.data.type === "resize" && event.data.height) {
        setHeight(event.data.height);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="bg-[rgba(238,242,255,0.3)] border border-[#e5e7eb] rounded-2xl relative overflow-hidden">
      <div className="absolute right-4 top-4 z-10">
        <div className="bg-[#382ac0] rounded-full px-3 py-1">
          <span className="text-white text-[11px] font-bold tracking-[0.55px] uppercase">Interactive</span>
        </div>
      </div>
      <div className="bg-[#f6f7fb] rounded-2xl pt-10">
        <iframe
          ref={iframeRef}
          srcDoc={html}
          sandbox="allow-scripts allow-same-origin"
          style={{ width: "100%", height: `${height}px`, border: "none", display: "block", overflow: "hidden" }}
          scrolling="no"
          title="Interactive simulation"
        />
      </div>
    </div>
  );
}

// --- Inline markdown helpers ---

function InlineMarkdown({ text }) {
  const parts = [];
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[2]) parts.push(<strong key={match.index} className="font-bold text-ink-dark">{match[2]}</strong>);
    else if (match[3]) parts.push(<em key={match.index} className="italic">{match[3]}</em>);
    else if (match[4]) parts.push(<code key={match.index} className="font-mono bg-[rgba(111,104,247,0.2)] text-brand-600 px-1.5 py-0.5 rounded text-sm">{match[4]}</code>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function InlineMarkdownLight({ text }) {
  const parts = [];
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[2]) parts.push(<strong key={match.index} className="font-bold text-[#9cf5c8]">{match[2]}</strong>);
    else if (match[3]) parts.push(<em key={match.index}>{match[3]}</em>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

// --- Block components ---

function ConceptCards({ cards }) {
  const styles = [
    { bg: "#eef2ff", color: "#4f46e5", symbol: "⬡" },
    { bg: "#ecfdf5", color: "#059669", symbol: "⇌" },
    { bg: "#fffbeb", color: "#d97706", symbol: "≡" },
  ];
  return (
    <div className="grid grid-cols-3 gap-6">
      {cards.map((card, i) => {
        const s = styles[i % 3];
        return (
          <div key={i} className="bg-white border border-[rgba(172,179,183,0.15)] rounded-xl p-6 shadow-[0_12px_20px_0_rgba(44,52,55,0.06)] flex flex-col gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
              <span style={{ color: s.color, fontWeight: "bold", fontSize: "16px" }}>{s.symbol}</span>
            </div>
            <p className="font-bold text-[#191c1e] text-lg mt-2">{card.title}</p>
            <p className="text-[#464554] text-sm leading-[22.75px]">{card.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

function AnalogyBlock({ title, content }) {
  return (
    <div className="border-l-4 border-[#382ac0] bg-[#f5f4ff] rounded-r-2xl px-6 py-5 flex flex-col gap-2">
      <p className="text-sm font-bold text-[#382ac0]">{title}</p>
      <p className="italic text-[#464554] text-base leading-[26px]">{content}</p>
    </div>
  );
}

function ComparisonBlock({ pairs, leftLabel = "Too vague", rightLabel = "Specific" }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[rgba(172,179,183,0.15)] shadow-[0_12px_20px_0_rgba(44,52,55,0.06)]">
      <div className="grid grid-cols-2">
        <div className="flex items-center gap-2 px-6 py-3 bg-red-50 border-b border-red-100">
          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <span className="text-red-500 text-[10px] font-bold">✕</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-500">{leftLabel}</span>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 bg-emerald-50 border-b border-emerald-100 border-l border-white">
          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <span className="text-emerald-600 text-[10px] font-bold">✓</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">{rightLabel}</span>
        </div>
      </div>
      {pairs.map((pair, i) => (
        <div key={i} className={`grid grid-cols-2${i < pairs.length - 1 ? " border-b border-[#f0f0f0]" : ""}`}>
          <div className="px-6 py-5 bg-[#fff5f5] border-r border-[#fecaca]/50">
            <p className="text-sm text-[#7a3a3a] leading-[22px] italic">"{pair.vague}"</p>
          </div>
          <div className="px-6 py-5 bg-[#f0fdf4]">
            <p className="text-sm text-[#2d5a3d] leading-[22px]">"{pair.specific}"</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function KarelBlock({ title, body, prompt, footnote }) {
  // Parse labeled sections: **Label:** content
  const sectionPattern = /\*\*([^*]+):\*\*\s*([\s\S]*?)(?=\n\n\*\*[^*]+:\*\*|$)/g;
  const sections = [];
  let match;
  while ((match = sectionPattern.exec(body)) !== null) {
    sections.push({ label: match[1].trim(), text: match[2].trim() });
  }

  const storyConfig = {
    "Scene":            { bg: "#f8f9fa", border: "#e5e7eb", labelColor: "#777586" },
    "Karel says":       { bg: "#eef2ff", border: "#c7d2fe", labelColor: "#382ac0" },
    "Karel acts":       { bg: "#eef2ff", border: "#c7d2fe", labelColor: "#382ac0" },
    "But — this is the hallucination": { bg: "#fff7ed", border: "#fed7aa", labelColor: "#c2410c" },
    "But — this is the key risk":      { bg: "#fff7ed", border: "#fed7aa", labelColor: "#c2410c" },
    "Result":           { bg: "#fef2f2", border: "#fecaca", labelColor: "#dc2626" },
    "Why this matters": { bg: "#191c1e", border: "#191c1e", labelColor: "#9cf5c8" },
  };

  const isStory = sections.length >= 3;

  return (
    <div className="bg-[rgba(81,72,216,0.04)] border border-[rgba(56,42,192,0.15)] rounded-2xl p-6 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🤖</span>
        <div className="inline-flex items-center gap-2 bg-[#382ac0] rounded-full px-3 py-1">
          <span className="text-white text-[10px] font-bold tracking-[1px] uppercase">Karel in practice</span>
        </div>
      </div>

      {isStory ? (
        <div className="flex flex-col gap-3">
          {sections.map((s, i) => {
            const cfg = storyConfig[s.label] || { bg: "#f8f9fa", border: "#e5e7eb", labelColor: "#777586" };
            return (
              <div key={i} className="rounded-xl px-4 py-3 border" style={{ background: cfg.bg, borderColor: cfg.border }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.8px] mb-1" style={{ color: cfg.labelColor }}>{s.label}</p>
                <p className="text-sm leading-[22px]" style={{ color: cfg.bg === "#191c1e" ? "#e2e8f0" : "#191c1e" }}><InlineMarkdown text={s.text} /></p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-[#464554] text-base leading-6">{body}</p>
      )}

      {prompt && (
        <div className="mt-4 bg-white border border-[#382ac0]/20 rounded-xl px-5 py-4">
          <p className="font-mono text-[#777586] text-xs mb-1">PROMPT:</p>
          <p className="font-mono text-[#191c1e] text-sm leading-5">{prompt}</p>
        </div>
      )}
      {footnote && (
        <p className="text-[#464554] text-sm leading-6 mt-3"><InlineMarkdown text={footnote} /></p>
      )}
    </div>
  );
}

function NotGrid({ title, items }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <span className="text-red-500 text-xl">⊘</span>
        <h2 className="text-2xl font-bold text-[#191c1e]">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="bg-[#f2f4f6] rounded-xl px-4 h-[60px] flex items-center gap-3">
            <span className="text-red-500">⊘</span>
            <span className="text-[#191c1e] text-sm font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TakeawayBlock({ title, content }) {
  return (
    <div className="bg-[#382ac0] rounded-3xl p-10 relative overflow-hidden">
      <div className="absolute w-64 h-64 rounded-full bg-white opacity-[0.06] rounded-full bottom-[-40px] right-[-40px]" />
      <div className="relative flex flex-col gap-4 max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="text-[#9cf5c8] text-xl font-bold">✓</span>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <p className="text-white text-lg leading-[29.25px] opacity-90">
          <InlineMarkdownLight text={content} />
        </p>
      </div>
    </div>
  );
}

function DefinitionBlock({ term, content }) {
  return (
    <div className="bg-[rgba(238,242,255,0.5)] border border-[#c7d2fe] rounded-2xl px-7 py-6 flex gap-5">
      <div className="flex-shrink-0 mt-0.5">
        <div className="w-9 h-9 rounded-xl bg-[#4f46e5] flex items-center justify-center">
          <span className="text-white text-base font-bold select-none">≡</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-bold tracking-[1.2px] uppercase text-[#4f46e5]">Definition</span>
        <h3 className="text-[#191c1e] text-lg font-bold leading-snug">{term}</h3>
        <p className="text-[#464554] text-base leading-[27px]">
          <InlineMarkdown text={content} />
        </p>
      </div>
    </div>
  );
}

function LikelihoodFactors({ moreLikely, lessLikely }) {
  const moreItems = moreLikely || [];
  const lessItems = lessLikely || [];

  return (
    <div className="bg-white border border-[rgba(172,179,183,0.15)] rounded-2xl p-8 shadow-[0_12px_20px_0_rgba(44,52,55,0.06)]">
      <div className="grid grid-cols-2 gap-8">
        {/* More likely column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-3 border-b border-red-100">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <span className="text-red-500 text-lg">↑</span>
            </div>
            <span className="font-bold text-red-600">More likely</span>
          </div>
          <div className="flex flex-col gap-3">
            {moreItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-red-50/50 rounded-xl border border-red-100">
                <span className="text-red-400 mt-0.5">•</span>
                <span className="text-[#464554] text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Less likely column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-3 border-b border-emerald-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <span className="text-emerald-500 text-lg">↓</span>
            </div>
            <span className="font-bold text-emerald-600">Less likely</span>
          </div>
          <div className="flex flex-col gap-3">
            {lessItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span className="text-[#464554] text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpectrumBlock({ title, levels }) {
  const colors = [
    { bg: "#eef2ff", border: "#4f46e5", dot: "#382ac0" },
    { bg: "#e0f2fe", border: "#0284c7", dot: "#0369a1" },
    { bg: "#ecfdf5", border: "#10b981", dot: "#059669" },
    { bg: "#fffbeb", border: "#f59e0b", dot: "#d97706" },
    { bg: "#fef2f2", border: "#ef4444", dot: "#dc2626" },
  ];
  // Ensure levels is an array and filter out empty entries
  const validLevels = Array.isArray(levels) ? levels.filter(l => l && l.trim()) : [];
  if (validLevels.length === 0) return null;

  return (
    <div className="bg-white border border-[rgba(172,179,183,0.15)] rounded-2xl p-8 shadow-[0_12px_20px_0_rgba(44,52,55,0.06)]">
      <h2 className="text-xl font-bold text-[#191c1e] mb-6">{title}</h2>
      <div className="flex flex-col">
        {validLevels.map((level, i) => {
          const c = colors[i % colors.length];
          const isLast = i === validLevels.length - 1;
          return (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 flex-shrink-0"
                  style={{ background: c.dot }}
                />
                {!isLast && (
                  <div className="w-0.5 flex-1 bg-[#e5e7eb] min-h-[24px] mt-1" />
                )}
              </div>
              <div className="flex-1 pb-5 -mt-0.5">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: c.dot }}>
                    Level {i + 1}
                  </span>
                </div>
                <p className="text-[#464554] text-sm leading-relaxed">
                  <InlineMarkdown text={level} />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const outcomeIcons = ["📋", "🔁", "💬", "📅", "🧠", "🔗", "🚀"];

function LearningOutcomesBlock({ questions, quote }) {
  return (
    <div className="backdrop-blur-sm bg-[rgba(255,255,255,0.8)] border border-[rgba(172,179,183,0.15)] rounded-2xl p-8 shadow-[0_12px_40px_0_rgba(44,52,55,0.06)] flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {questions.map((q, i) => (
          <div key={i} className="bg-[rgba(255,255,255,0.4)] border border-[#f1f5f9] rounded-xl p-4 flex gap-4 items-start">
            <span className="text-base mt-0.5 shrink-0">{outcomeIcons[i % outcomeIcons.length]}</span>
            <p className="text-[#191c1e] text-base font-medium leading-6">{q}</p>
          </div>
        ))}
      </div>
      {quote && (
        <div className="border-t border-[#f1f5f9] pt-6">
          <p className="italic text-[#64748b] text-sm leading-5">{quote}</p>
        </div>
      )}
    </div>
  );
}

function FigureAside({ src, paragraphs }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start my-4">
      <div className="md:w-[46%] flex-shrink-0">
        <img
          src={src}
          alt=""
          className="w-full rounded-2xl border border-[#e5e7eb] shadow-sm"
        />
      </div>
      <div className="md:w-[54%] flex flex-col gap-3 pt-1">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-base text-[#464554] leading-[31.5px]">
            <InlineMarkdown text={p} />
          </p>
        ))}
      </div>
    </div>
  );
}

const SAFETY_ITEM_CONFIG = {
  "Scope validation":     { emoji: "🎯", bg: "#eef2ff", color: "#4f46e5" },
  "Parameter validation": { emoji: "⚙️", bg: "#ecfdf5", color: "#059669" },
  "Identity validation":  { emoji: "🔐", bg: "#fdf4ff", color: "#9333ea" },
  "Rate limiting":        { emoji: "⏱️", bg: "#fffbeb", color: "#d97706" },
  "Audit logging":        { emoji: "📋", bg: "#eff6ff", color: "#2563eb" },
};

function SafetyChecklist({ title, items }) {
  return (
    <div className="flex flex-col gap-3">
      {title && (
        <p className="text-base text-[#464554] leading-[27px]">{title}</p>
      )}
    <div className="bg-white border border-[rgba(172,179,183,0.15)] rounded-2xl overflow-hidden shadow-[0_12px_20px_0_rgba(44,52,55,0.06)]">
      <div className="divide-y divide-[#f8f9fa]">
        {items.map((item, i) => {
          const cfg = SAFETY_ITEM_CONFIG[item.label] || { emoji: "✓", bg: "#f1f5f9", color: "#64748b" };
          return (
            <div key={i} className="flex items-start gap-4 px-6 py-4 hover:bg-[#fafbff] transition-colors">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: cfg.bg }}>
                <span className="text-base leading-none">{cfg.emoji}</span>
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <span className="font-bold text-[#191c1e] text-sm">{item.label}</span>
                <span className="text-[#464554] text-sm leading-[22px]"> {item.desc}</span>
              </div>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border-2"
                style={{ background: cfg.bg, borderColor: cfg.color }}
              >
                <span className="text-[11px] font-bold" style={{ color: cfg.color }}>✓</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}

function WhatWeWontDoBlock({ paragraphs, analogy }) {
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-base text-[#464554] leading-[31.5px]">{p}</p>
      ))}
      {analogy && (
        <p className="italic text-[#64748b] text-base leading-[26px] mt-2">{analogy}</p>
      )}
    </div>
  );
}

// --- Plain markdown renderer ---

function MarkdownTable({ rows }) {
  // rows[0] is the header, rows[1] is the separator (skipped), rows[2+] are body
  const header = rows[0].split("|").map(c => c.trim()).filter(Boolean);
  const body = rows.slice(2).map(r => r.split("|").map(c => c.trim()).filter(Boolean));
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(44,52,55,0.08)]">
        <thead>
          <tr className="bg-[#eef2ff]">
            {header.map((h, i) => (
              <th key={i} className="text-left px-5 py-3 font-bold text-[#382ac0] text-sm tracking-wide border-b border-[#c7d2fe]">
                <InlineMarkdown text={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-[#f8f8ff]"}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-5 py-3 text-[#464554] leading-[26px] border-b border-[#f1f5f9]">
                  <InlineMarkdown text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PlainContent({ lines }) {
  const elements = [];
  let i = 0;
  let eIdx = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={eIdx++} className="text-[13px] font-bold uppercase tracking-[0.8px] text-[#4748d4] mt-4 mb-1">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={eIdx++} className="text-base font-bold text-[#191c1e] mt-3 mb-1">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={eIdx++} className="list-disc ml-6 mb-3 space-y-1">
          {items.map((item, j) => (
            <li key={j} className="text-base text-[rgba(44,52,55,0.9)] leading-[26px]">
              <InlineMarkdown text={item} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim().startsWith("|")) {
      const tableRows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableRows.push(lines[i].trim());
        i++;
      }
      if (tableRows.length >= 2) {
        elements.push(<MarkdownTable key={eIdx++} rows={tableRows} />);
      }
      continue;
    } else if (/^!\[.*?\]\(.*?\)$/.test(line.trim())) {
      const match = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const [, alt, src] = match;
        elements.push(
          <figure key={eIdx++} className="my-6">
            <img
              src={src}
              alt={alt}
              className="w-full rounded-2xl border border-[#e5e7eb] shadow-sm"
            />
            {alt && (
              <figcaption className="text-center text-sm text-[#9ca3af] mt-2 italic">
                {alt}
              </figcaption>
            )}
          </figure>
        );
      }
    } else if (line.trim()) {
      elements.push(
        <p key={eIdx++} className="text-base text-[#464554] leading-[27px] mb-1">
          <InlineMarkdown text={line} />
        </p>
      );
    }
    i++;
  }
  return <>{elements}</>;
}

function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-4 mt-4 mb-1">
      <div className="bg-[#eef2ff] border border-[#c7d2fe] rounded-full px-3 py-1 flex-shrink-0">
        <span className="text-[11px] font-bold tracking-[0.8px] uppercase text-[#382ac0]">{label}</span>
      </div>
      <div className="flex-1 h-px bg-[#e8eaf0]" />
    </div>
  );
}

function HowItWorksInline({ items }) {
  const colors = ["#382ac0", "#4748d4", "#006d4a"];
  return (
    <div className="bg-white border border-[rgba(172,179,183,0.15)] rounded-2xl p-6 shadow-[0_12px_20px_0_rgba(44,52,55,0.06)]">
      <div className="grid grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: colors[i % colors.length] }}
            >
              {i + 1}
            </div>
            <p className="text-sm font-bold text-[#191c1e]">{item.title}</p>
            <p className="text-xs text-[#464554] leading-[18px]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Block parser ---

function parseLessonBlocks(text) {
  const lines = text.trim().split("\n");
  const blocks = [];
  let takeaway = null;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith(":::")) {
      const header = line.slice(3).trim();
      const spaceIdx = header.indexOf(" ");
      const type = spaceIdx === -1 ? header : header.slice(0, spaceIdx);
      const title = spaceIdx === -1 ? "" : header.slice(spaceIdx + 1);
      const blockLines = [];
      i++;
      while (i < lines.length && lines[i] !== ":::") {
        blockLines.push(lines[i]);
        i++;
      }
      const blockText = blockLines.join("\n").trim();

      if (type === "concept-cards") {
        const cards = [];
        const sections = blockText.split(/\n(?=### )/).filter(Boolean);
        for (const section of sections) {
          const firstNewline = section.indexOf("\n");
          const cardTitle =
            firstNewline === -1
              ? section.replace(/^### /, "")
              : section.slice(0, firstNewline).replace(/^### /, "");
          const desc = firstNewline === -1 ? "" : section.slice(firstNewline + 1).trim();
          cards.push({ title: cardTitle.trim(), desc });
        }
        blocks.push({ type: "concept-cards", cards });
      } else if (type === "analogy") {
        blocks.push({ type: "analogy", title, content: blockText });
      } else if (type === "simulation") {
        blocks.push({ type: "simulation" });
      } else if (type === "not-grid") {
        const items = blockLines
          .filter((l) => l.startsWith("- "))
          .map((l) => l.slice(2).trim());
        blocks.push({ type: "not-grid", title, items });
      } else if (type === "karel") {
        const promptIdx = blockText.indexOf("\nPROMPT:");
        let body = blockText, prompt = "", footnote = "";
        if (promptIdx !== -1) {
          body = blockText.slice(0, promptIdx).trim();
          const afterPrompt = blockText.slice(promptIdx + 9).trim();
          const blankLine = afterPrompt.indexOf("\n\n");
          if (blankLine !== -1) {
            prompt = afterPrompt.slice(0, blankLine).trim();
            footnote = afterPrompt.slice(blankLine + 2).trim();
          } else {
            prompt = afterPrompt.trim();
          }
        }
        blocks.push({ type: "karel", title, body, prompt, footnote });
      } else if (type === "deep-dive") {
        // Parse nested blocks inside deep-dive
        const innerBlocks = [];
        const innerLines = blockLines;
        let j = 0;
        let textBuffer = [];
        const flushText = () => {
          if (textBuffer.length) {
            innerBlocks.push({ type: "text-chunk", lines: textBuffer });
            textBuffer = [];
          }
        };
        while (j < innerLines.length) {
          const innerLine = innerLines[j];
          if (innerLine.startsWith(":::")) {
            flushText();
            const innerHeader = innerLine.slice(3).trim();
            const innerSpaceIdx = innerHeader.indexOf(" ");
            const innerType = innerSpaceIdx === -1 ? innerHeader : innerHeader.slice(0, innerSpaceIdx);
            const innerBlockLines = [];
            j++;
            while (j < innerLines.length && innerLines[j] !== ":::") {
              innerBlockLines.push(innerLines[j]);
              j++;
            }
            if (innerType === "likelihood-factors") {
              const moreLikely = [], lessLikely = [];
              let currentSection = null;
              for (const l of innerBlockLines) {
                if (l.trim().toLowerCase().startsWith("### more likely")) currentSection = "more";
                else if (l.trim().toLowerCase().startsWith("### less likely")) currentSection = "less";
                else if (l.trim().startsWith("- ") && currentSection) {
                  const item = l.trim().slice(2).trim();
                  if (currentSection === "more") moreLikely.push(item);
                  else lessLikely.push(item);
                }
              }
              innerBlocks.push({ type: "likelihood-factors", moreLikely, lessLikely });
            }
          } else {
            textBuffer.push(innerLine);
          }
          j++;
        }
        flushText();
        blocks.push({ type: "deep-dive", title, innerBlocks });
      } else if (type === "takeaway") {
        takeaway = { title, content: blockText };
      } else if (type === "spectrum") {
        // Parse levels from lines starting with **Level X** or Level X
        const levels = [];
        for (const line of blockLines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("**Level ") || trimmed.startsWith("Level ")) {
            // Extract content after Level X — or Level X:
            const cleaned = trimmed
              .replace(/^\*\*Level \d+\s*[—\-:]?\s*\*?\*?\s*/, "")
              .replace(/^Level \d+\s*[—\-:]?\s*/, "")
              .trim();
            if (cleaned) levels.push(cleaned);
          }
        }
        blocks.push({ type: "spectrum", title, levels });
      } else if (type === "learning-outcomes") {
        const questions = [];
        let quote = "";
        let inQuote = false;
        for (const l of blockLines) {
          if (l.trim() === "---") { inQuote = true; continue; }
          if (inQuote) { quote += (quote ? " " : "") + l.trim(); }
          else if (l.startsWith("- ")) questions.push(l.slice(2).trim());
        }
        blocks.push({ type: "learning-outcomes", questions, quote });
      } else if (type === "what-we-wont-do") {
        const paragraphs = [];
        let analogy = "";
        let current = "";
        for (const l of blockLines) {
          if (l.startsWith("> ")) { analogy += (analogy ? " " : "") + l.slice(2).trim(); }
          else if (l.trim() === "") { if (current.trim()) { paragraphs.push(current.trim()); current = ""; } }
          else { current += (current ? " " : "") + l.trim(); }
        }
        if (current.trim()) paragraphs.push(current.trim());
        blocks.push({ type: "what-we-wont-do", paragraphs, analogy });
      } else if (type === "definition") {
        blocks.push({ type: "definition", term: title, content: blockText });
      } else if (type === "figure-aside") {
        // title holds the image src; body is newline-separated paragraphs
        const paragraphs = [];
        let current = "";
        for (const l of blockLines) {
          if (l.trim() === "") { if (current.trim()) { paragraphs.push(current.trim()); current = ""; } }
          else { current += (current ? " " : "") + l.trim(); }
        }
        if (current.trim()) paragraphs.push(current.trim());
        blocks.push({ type: "figure-aside", src: title, paragraphs });
      } else if (type === "likelihood-factors") {
        // Parse two-column layout: ### more likely / ### less likely sections
        const moreLikely = [];
        const lessLikely = [];
        let currentSection = null;
        for (const line of blockLines) {
          const trimmed = line.trim();
          if (trimmed.toLowerCase().startsWith("### more likely")) {
            currentSection = "more";
          } else if (trimmed.toLowerCase().startsWith("### less likely")) {
            currentSection = "less";
          } else if (trimmed.startsWith("- ") && currentSection) {
            const item = trimmed.slice(2).trim();
            if (currentSection === "more") moreLikely.push(item);
            else lessLikely.push(item);
          }
        }
        blocks.push({ type: "likelihood-factors", moreLikely, lessLikely });
      } else if (type === "safety-checklist") {
        const items = [];
        for (const l of blockLines) {
          const match = l.match(/^\*\*([^*]+):\*\*\s*(.+)$/);
          if (match) items.push({ label: match[1].trim(), desc: match[2].trim() });
        }
        blocks.push({ type: "safety-checklist", title, items });
      } else if (type === "comparison") {
        let leftLabel = "Too vague";
        let rightLabel = "Specific";
        if (title && title.includes("|")) {
          const [l, r] = title.split("|").map(s => s.trim());
          leftLabel = l;
          rightLabel = r;
        }
        const pairs = [];
        let current = {};
        for (const l of blockLines) {
          if (l.startsWith("**Too vague:**") || l.startsWith("**Left:**")) {
            current.vague = l.replace(/^\*\*(Too vague|Left):\*\*\s*/, "").replace(/^"|"$/g, "").trim();
          } else if (l.startsWith("**Specific:**") || l.startsWith("**Right:**")) {
            current.specific = l.replace(/^\*\*(Specific|Right):\*\*\s*/, "").replace(/^"|"$/g, "").trim();
            if (current.vague && current.specific) pairs.push({ ...current });
            current = {};
          }
        }
        blocks.push({ type: "comparison", pairs, leftLabel, rightLabel });
      }
    } else {
      blocks.push({ type: "text", content: line });
    }
    i++;
  }

  return { blocks, takeaway };
}

function DeepDiveSection({ title, innerBlocks }) {
  return (
    <div className="border border-dashed border-[#c7d2fe] rounded-2xl p-6 flex flex-col gap-4 bg-[rgba(238,242,255,0.3)]">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold tracking-[0.8px] uppercase text-[#4748d4]">Optional</span>
        <p className="text-sm font-bold text-[#191c1e]">{title}</p>
      </div>
      {innerBlocks.map((b, i) => {
        if (b.type === "likelihood-factors") return <LikelihoodFactors key={i} moreLikely={b.moreLikely} lessLikely={b.lessLikely} />;
        if (b.type === "text-chunk") return <PlainContent key={i} lines={b.lines} />;
        return null;
      })}
    </div>
  );
}

function renderBlock(block, key, simHtml) {
  if (block.type === "concept-cards") return <ConceptCards key={key} cards={block.cards} />;
  if (block.type === "analogy") return <AnalogyBlock key={key} title={block.title} content={block.content} />;
  if (block.type === "simulation") return simHtml ? <LessonSimulation key={key} html={simHtml} /> : null;
  if (block.type === "not-grid") return <NotGrid key={key} title={block.title} items={block.items} />;
  if (block.type === "karel") return <KarelBlock key={key} title={block.title} body={block.body} prompt={block.prompt} footnote={block.footnote} />;
  if (block.type === "learning-outcomes") return <LearningOutcomesBlock key={key} questions={block.questions} quote={block.quote} />;
  if (block.type === "what-we-wont-do") return <WhatWeWontDoBlock key={key} paragraphs={block.paragraphs} analogy={block.analogy} />;
  if (block.type === "spectrum") return <SpectrumBlock key={key} title={block.title} levels={block.levels} />;
  if (block.type === "definition") return <DefinitionBlock key={key} term={block.term} content={block.content} />;
  if (block.type === "likelihood-factors") return <LikelihoodFactors key={key} moreLikely={block.moreLikely} lessLikely={block.lessLikely} />;
  if (block.type === "figure-aside") return <FigureAside key={key} src={block.src} paragraphs={block.paragraphs} />;
  if (block.type === "safety-checklist") return <SafetyChecklist key={key} title={block.title} items={block.items} />;
  if (block.type === "comparison") return <ComparisonBlock key={key} pairs={block.pairs} leftLabel={block.leftLabel} rightLabel={block.rightLabel} />;
  return null;
}

function LessonContentBlocks({ blocks, simHtml, howItWorks }) {
  // Split blocks into named sections
  const hookBlocks = [];
  const conceptBlocks = [];
  const karelBlocks = [];
  const postKarelBlocks = [];
  const deepDiveBlocks = [];
  let phase = "concept";
  for (const block of blocks) {
    if (block.type === "analogy") {
      hookBlocks.push(block);
      phase = "concept";
    } else if (block.type === "karel") {
      karelBlocks.push(block);
      phase = "post-karel";
    } else if (block.type === "deep-dive") {
      deepDiveBlocks.push(block);
    } else if (phase === "post-karel") {
      postKarelBlocks.push(block);
    } else {
      conceptBlocks.push(block);
    }
  }

  const renderSection = (sectionBlocks, simHtmlArg) => {
    const elements = [];
    let textBuffer = [];
    let keyIdx = 0;
    const flush = () => {
      const lines = textBuffer.filter(l => l && l.trim());
      if (lines.length) elements.push(<PlainContent key={`t-${keyIdx++}`} lines={lines} />);
      textBuffer = [];
    };
    for (const block of sectionBlocks) {
      if (block.type === "text") { textBuffer.push(block.content); }
      else { flush(); elements.push(renderBlock(block, keyIdx++, simHtmlArg)); }
    }
    flush();
    return elements;
  };

  return (
    <div className="flex flex-col gap-6">
      {hookBlocks.length > 0 && (
        <div id="section-hook" className="flex flex-col gap-3">
          <SectionLabel label="TL;DR" />
          {renderSection(hookBlocks, null)}
        </div>
      )}

      {conceptBlocks.length > 0 && (
        <div id="section-concept" className="flex flex-col gap-3">
          <SectionLabel label="The concept" />
          {renderSection(conceptBlocks, null)}
        </div>
      )}

      {howItWorks && (
        <div id="section-how" className="flex flex-col gap-3">
          <SectionLabel label="How it works" />
          <HowItWorksInline items={howItWorks} />
        </div>
      )}

      {karelBlocks.length > 0 && (
        <div id="section-karel" className="flex flex-col gap-3">
          <SectionLabel label="Karel in practice" />
          {renderSection(karelBlocks, null)}
          {postKarelBlocks.length > 0 && renderSection(postKarelBlocks, null)}
        </div>
      )}

      {simHtml && (
        <div id="section-sim" className="flex flex-col gap-3">
          <SectionLabel label="Try it yourself" />
          <LessonSimulation html={simHtml} />
        </div>
      )}

      {deepDiveBlocks.length > 0 && (
        <div id="section-deepdive" className="flex flex-col gap-3">
          <SectionLabel label="Deep dive" />
          {deepDiveBlocks.map((b, i) => (
            <DeepDiveSection key={i} title={b.title} innerBlocks={b.innerBlocks} />
          ))}
        </div>
      )}
    </div>
  );
}

// --- Sidebar data keyed by module id ---
const sidebarData = {
  1: {
    howItWorks: [
      { step: "01", title: "Tokenization", desc: "Text is broken down into small chunks called 'tokens'." },
      { step: "02", title: "Vectorization", desc: "Tokens are converted into complex mathematical vectors." },
      { step: "03", title: "Prediction", desc: "The model predicts the next token in the sequence." },
    ],
    didYouKnow: "GPT-3 was trained on roughly 45 terabytes of text data. That's equivalent to reading the entire Wikipedia library over 6,000 times.",
  },
  2: {
    howItWorks: [
      { step: "01", title: "Pattern completion", desc: "The model generates the most statistically likely continuation of your input, with no mechanism for checking whether what it says is actually true." },
      { step: "02", title: "Confident by default", desc: "Because training data rewards confident-sounding answers, the model produces them even when it has weak or no reliable signal on the topic." },
      { step: "03", title: "Design as the fix", desc: "Grounding the model in real sources (RAG), constraining it via system prompt, and validating output before it reaches users reduces hallucination at the system level." },
    ],
    didYouKnow: "Studies show LLMs hallucinate at rates of 3–27% depending on the task. Citation-heavy tasks are worst; in some studies, models invented plausible-sounding but non-existent academic papers in over 30% of requests.",
  },
  3: {
    howItWorks: [
      { step: "01", title: "One token stream", desc: "Everything the model sees (system instructions, conversation history, injected data, and the user message) arrives as one continuous stream of tokens." },
      { step: "02", title: "Instructions are text", desc: "The model doesn't execute prompts like code. It reads the full context and predicts what a reasonable, helpful continuation would look like." },
      { step: "03", title: "Examples beat descriptions", desc: "Including two or three concrete examples of the behavior you want teaches the model more reliably than describing that behavior in words." },
    ],
    didYouKnow: "The system prompt is just text; there's nothing architecturally special about it. The model distinguishes it from user messages because of formatting labels, not because it lives in a different memory region.",
  },
  4: {
    howItWorks: [
      { step: "01", title: "Tool calling", desc: "The model generates a structured request to run a tool. Your application code executes it and returns the result. The model plans; the application acts." },
      { step: "02", title: "The loop", desc: "The agent repeats a perceive–plan–act–observe cycle, using each result to shape the next step, until the task is complete or a stopping condition is hit." },
      { step: "03", title: "Stakes scale with autonomy", desc: "Because agents take actions with real-world effects, failures are harder to reverse. Every new capability introduces a corresponding failure mode to design for." },
    ],
    didYouKnow: "The first AI systems called 'agents' date to the 1980s. What changed recently is that modern LLMs can reliably translate natural language into structured tool calls, bridging understanding and action.",
  },
  5: {
    howItWorks: [
      { step: "01", title: "Define scope first", desc: "Allowed actions, prohibited actions, and edge case decisions get made explicitly, in writing, before any prompt or tool is written." },
      { step: "02", title: "Layer up", desc: "System prompt guardrails, tool restrictions, and output validation each enforce scope at a different layer. Each catches what the layer above missed." },
      { step: "03", title: "Stay vigilant", desc: "Scope isn't solved at launch. Real users surface edge cases tests didn't. Monitoring, red-teaming, and prompt iteration keep scope enforced over time." },
    ],
    didYouKnow: '"Jailbreaking" (bypassing an LLM\'s guardrails) is an active research area. Even carefully constrained models can be prompted to violate scope under sufficiently persistent or creative pressure, which is why no single layer is enough.',
  },
  6: {
    howItWorks: [
      { step: "01", title: "Three memory types", desc: "In-context memory (the conversation), external memory (databases and vector stores), and fine-tuning (baked into the model) each serve different needs." },
      { step: "02", title: "Retrieval", desc: "External memory requires a retrieval step: finding the right memories to inject into context before the model responds. What gets retrieved shapes the answer." },
      { step: "03", title: "Design choice", desc: "What to remember, how long to keep it, and how to retrieve it are product decisions. They don't come built into the model; someone has to design them." },
    ],
    didYouKnow: "The context window of the first GPT model (2018) was 512 tokens, about 400 words. Modern models support over 1 million tokens. That's the equivalent of going from one page to an entire novel.",
  },
  7: {
    howItWorks: [
      { step: "01", title: "Specialization", desc: "Each agent has its own system prompt, tools, and scope. The orchestrator coordinates; subagents execute. Narrow agents are more reliable than generalist ones." },
      { step: "02", title: "Parallelism", desc: "Independent tasks can be delegated to subagents running simultaneously, dramatically reducing total task time for complex workflows." },
      { step: "03", title: "Trust architecture", desc: "Agents don't inherit each other's trust. Each validates its own inputs and enforces its own scope, regardless of which agent sent the instruction." },
    ],
    didYouKnow: "The largest multi-agent AI deployments use hundreds of specialized agents. In some large software companies, different agents handle code review, documentation, testing, and deployment, each with its own scope and toolset.",
  },
  8: {
    howItWorks: [
      { step: "01", title: "Define 'good' first", desc: "Success criteria are written before evaluation: explicit pass/fail thresholds, not directional goals. 'Seems to work' is not a criterion." },
      { step: "02", title: "Four eval types", desc: "Rule-based evals catch binary violations. Model-graded evals assess quality at scale. Human evals set the bar. Red-team evals find the gaps." },
      { step: "03", title: "Production signals", desc: "Five metrics (validation block rate, escalation rate, completion rate, tool call patterns, and satisfaction) are monitored continuously with defined response protocols." },
    ],
    didYouKnow: "The term 'eval' in AI comes from the research practice of evaluating models against benchmarks. What began as academic measurement is now one of the most critical engineering disciplines in production AI.",
  },
};

export default function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  // Scroll to top when lesson changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);

  const moduleId = parseInt(lessonId?.split("-")[0]) || 1;
  const mod = modules.find((m) => m.id === moduleId) || modules[0];
  const lessons = mod.lessons;
  const lessonMeta = lessons.find((l) => l.id === lessonId) || lessons[0];
  const loaded = lessonMeta ? getLessonContent(lessonMeta.file) : null;
  const simHtml = lessonMeta ? getSimulationHtml(lessonMeta.file) : null;
  const extra = sidebarData[moduleId] || {};

  const contentText = loaded?.content || "";
  const { blocks, takeaway } = parseLessonBlocks(contentText);

  const lesson = {
    moduleLabel: `MODULE ${mod.id}`,
    moduleTagline: mod.tagline || mod.title,
    title: loaded?.frontmatter?.title || lessonMeta?.title || "Lesson",
    subtitle: loaded?.frontmatter?.subtitle || null,
    howItWorks: extra.howItWorks || null,
    didYouKnow: extra.didYouKnow || null,
  };

  const currentIdx = lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? lessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null;

  return (
    <div className="min-h-screen bg-surface font-sans">
      <TopNav currentScreen="lesson" />
      <Sidebar activeModuleId={mod.id} activeLessonId={lessonId} />

      <main className="pl-72 pt-16">
        <div className="max-w-[1280px] px-12 py-10 flex flex-col gap-8">

          {/* Lesson header */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-[#e1e0ff] rounded-full px-3 py-1">
                <span className="text-[#07006c] text-[10px] uppercase">{lesson.moduleLabel}</span>
              </div>
              <div className="h-px w-8 bg-[#c7c4d7]" />
              <span className="text-[#777586] text-sm font-medium">{lesson.moduleTagline}</span>
            </div>
            <h1 className="text-[48px] font-extrabold text-[#191c1e] tracking-[-0.96px] leading-[52.8px]">
              {lesson.title}
            </h1>
            {lesson.subtitle && (
              <p className="text-[18px] font-light text-ink-mid leading-[29px] max-w-2xl">
                {lesson.subtitle}
              </p>
            )}
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-12 gap-12">

            {/* Left column: lesson content */}
            <div className="col-span-8 flex flex-col gap-5">
              <LessonContentBlocks blocks={blocks} simHtml={simHtml} howItWorks={lesson.howItWorks} />
              {takeaway && (
                <div id="section-takeaway" className="flex flex-col gap-4">
                  <SectionLabel label="Key takeaway" />
                  <TakeawayBlock title={takeaway.title} content={takeaway.content} />
                </div>
              )}
            </div>

            {/* Right column: jump nav */}
            <div className="col-span-4 flex flex-col gap-8">
              <div className="bg-white border border-[rgba(172,179,183,0.15)] rounded-2xl p-6 shadow-[0_12px_20px_0_rgba(44,52,55,0.06)] sticky top-24">
                <p className="text-[10px] font-bold tracking-[1.2px] uppercase text-[#777586] mb-4">In this lesson</p>
                <div className="flex flex-col gap-1">
                  {[
                    blocks.some(b => b.type === "analogy") && { id: "hook", label: "TL;DR" },
                    { id: "concept", label: "The concept" },
                    lesson.howItWorks && { id: "how", label: "How it works" },
                    blocks.some(b => b.type === "karel") && { id: "karel", label: "Karel in practice" },
                    simHtml && { id: "sim", label: "Try it yourself" },
                    blocks.some(b => b.type === "deep-dive") && { id: "deepdive", label: "Deep dive" },
                    takeaway && { id: "takeaway", label: "Key takeaway" },
                  ].filter(Boolean).map(({ id, label }) => (
                    <a
                      key={id}
                      href={`#section-${id}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#464554] hover:bg-[#f5f4ff] hover:text-[#382ac0] transition-colors no-underline"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c7c4d7] flex-shrink-0" />
                      {label}
                    </a>
                  ))}
                </div>
                {lesson.didYouKnow && (
                  <div className="border-t border-[#f1f5f9] mt-5 pt-5">
                    <div className="bg-[rgba(255,251,235,0.5)] border border-[#fef3c7] rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-base">✨</span>
                        <span className="text-[10px] font-bold text-[#78350f] tracking-[0.5px] uppercase">Did you know?</span>
                      </div>
                      <p className="text-xs text-[#92400e] leading-[19.5px]">{lesson.didYouKnow}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom navigation */}
          <div className="border-t border-[rgba(226,232,240,0.5)] flex items-center justify-between pt-10">
            <button
              onClick={() =>
                prevLesson ? navigate(`/lesson/${prevLesson.id}`) : navigate(`/module/${moduleId}`)
              }
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[#464554] text-lg">
                ←
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold text-[#777586] tracking-[1px] uppercase">PREVIOUS LESSON</span>
                <span className="text-base font-bold text-[#191c1e]">
                  {prevLesson ? prevLesson.title : "Back to Module"}
                </span>
              </div>
            </button>

            <button
              onClick={() =>
                nextLesson ? navigate(`/lesson/${nextLesson.id}`) : navigate(`/quiz/${moduleId}`)
              }
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-[#777586] tracking-[1px] uppercase">NEXT LESSON</span>
                <span className="text-base font-bold text-[#191c1e]">
                  {nextLesson ? nextLesson.title : "Take Quiz"}
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#382ac0] flex items-center justify-center text-white text-lg">
                →
              </div>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
