const markdownFiles = import.meta.glob('../../../lessons/**/*.md', { query: '?raw', import: 'default', eager: true });
const quizFiles = import.meta.glob('../../../lessons/**/*.quiz.json', { eager: true });
const moduleQuizFiles = import.meta.glob('../../../lessons/**/quiz.json', { eager: true });
const simulationFiles = import.meta.glob(
  ['../../../lessons/**/*.sim.html', '../../../lessons/**/simulations.html'],
  { query: '?raw', import: 'default', eager: true }
);

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content: raw.trim() };

  const fm = {};
  match[1].split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > -1) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim().replace(/^"(.*)"$/, '$1');
      fm[key] = val;
    }
  });

  // Strip the H1 heading (first # line) from content body
  const body = match[2].replace(/^\s*# [^\n]+\n+/, '').trim();
  return { frontmatter: fm, content: body };
}

export function getLessonContent(filePath) {
  const key = `../../../lessons/${filePath}`;
  const raw = markdownFiles[key];
  if (!raw) return null;
  return parseFrontmatter(raw);
}

export function getLessonQuiz(filePath) {
  const key = `../../../lessons/${filePath}`;
  return quizFiles[key] ?? null;
}

// Returns the raw HTML string for a simulation, or null if none exists.
// filePath is the lesson's .md path — e.g. "02-hallucination/01-what-is-hallucination.md"
// First tries {lesson}.sim.html, then falls back to simulations.html in the same module folder.
export function getSimulationHtml(filePath) {
  const simPath = filePath.replace(/\.md$/, '.sim.html');
  const key = `../../../lessons/${simPath}`;
  if (simulationFiles[key]) return simulationFiles[key];

  const folder = filePath.split('/')[0];
  const sharedKey = `../../../lessons/${folder}/simulations.html`;
  return simulationFiles[sharedKey] ?? null;
}

// Aggregate all per-lesson quiz questions for a module folder (e.g. "01-how-llms-work")
export function getModuleQuestions(folderName) {
  const prefix = `../../../lessons/${folderName}/`;
  return Object.entries(quizFiles)
    .filter(([key]) => key.startsWith(prefix))
    .flatMap(([, data]) => data.questions ?? []);
}
