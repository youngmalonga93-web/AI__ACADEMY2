import { modules, prompts } from "../../data/content";

export type RetrievedContent = {
  id: string;
  type: "course" | "lesson" | "project" | "prompt";
  title: string;
  body: string;
  url: string;
  score: number;
};

const STOP_WORDS = new Set([
  "about",
  "after",
  "again",
  "also",
  "and",
  "are",
  "because",
  "before",
  "can",
  "for",
  "from",
  "have",
  "how",
  "into",
  "that",
  "the",
  "this",
  "what",
  "when",
  "where",
  "with",
  "your",
]);

function tokenize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function scoreDocument(queryTokens: string[], document: string) {
  const documentTokens = tokenize(document);
  const documentTokenSet = new Set(documentTokens);
  const matches = queryTokens.filter((token) => documentTokenSet.has(token));
  const density = matches.length / Math.max(1, queryTokens.length);
  const titleBonus = matches.length > 0 ? 0.2 : 0;

  return density + titleBonus;
}

export function buildRetrievalCorpus(): RetrievedContent[] {
  return modules.flatMap((module) => {
    const courseBody = [
      module.subtitle,
      ...module.objectives,
      ...module.skills,
      ...module.keyTakeaways,
      ...module.commonMistakes,
    ].join(" ");

    const lessonDocuments: RetrievedContent[] = module.lessons.map(
      (lesson) => ({
        id: `lesson:${lesson.id}`,
        type: "lesson",
        title: `${lesson.number} ${lesson.title}`,
        body: [lesson.hook, lesson.concept, lesson.application, lesson.exercise]
          .filter(Boolean)
          .join(" "),
        url: `/lessons/${lesson.id}`,
        score: 0,
      })
    );

    const projectDocument: RetrievedContent = {
      id: `project:${module.id}`,
      type: "project",
      title: `${module.title} capstone`,
      body: [
        module.project.title,
        module.project.description,
        module.project.deliverable,
      ].join(" "),
      url: `/courses/${module.id}`,
      score: 0,
    };

    return [
      {
        id: `course:${module.id}`,
        type: "course" as const,
        title: module.title,
        body: courseBody,
        url: `/courses/${module.id}`,
        score: 0,
      },
      projectDocument,
      ...lessonDocuments,
    ];
  });
}

export function retrieveRelevantContent(query: string, limit = 6) {
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0) {
    return [];
  }

  const courseAndLessonResults = buildRetrievalCorpus()
    .map((document) => ({
      ...document,
      score: scoreDocument(
        queryTokens,
        `${document.title} ${document.title} ${document.body}`
      ),
    }))
    .filter((document) => document.score > 0);

  const promptResults: RetrievedContent[] = prompts
    .map((prompt) => ({
      id: `prompt:${prompt.id}`,
      type: "prompt" as const,
      title: prompt.title,
      body: [prompt.task, prompt.prompt, ...prompt.tags].join(" "),
      url: "/prompts",
      score: scoreDocument(
        queryTokens,
        `${prompt.title} ${prompt.title} ${prompt.task} ${prompt.prompt} ${prompt.tags.join(" ")}`
      ),
    }))
    .filter((document) => document.score > 0);

  return [...courseAndLessonResults, ...promptResults]
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}

export function formatRetrievedContext(items: RetrievedContent[]) {
  return items
    .map(
      (item, index) =>
        `${index + 1}. [${item.type}] ${item.title}\nURL: ${item.url}\nContext: ${item.body.slice(0, 900)}`
    )
    .join("\n\n");
}
