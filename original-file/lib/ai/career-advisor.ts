import { careerPaths } from "../../data/content";
import { retrieveRelevantContent, type RetrievedContent } from "./retrieval";

export type CareerAdvisorRequest = {
  currentRole: string;
  targetRole: string;
  skills: string;
  timeline: string;
  constraints?: string;
};

export type CareerAdvisorResponse = {
  summary: string;
  skillGaps: string[];
  roadmap: Array<{
    phase: string;
    focus: string;
    actions: string[];
  }>;
  portfolioProjects: string[];
  weeklyPlan: string[];
  positioning: string;
  retrievedContext: RetrievedContent[];
};

function pickCareerPath(targetRole: string) {
  const target = targetRole.toLowerCase();

  return (
    careerPaths.find((career) => target.includes(career.title.toLowerCase())) ??
    careerPaths.find((career) =>
      target
        .split(/\s+/)
        .some((token) => career.title.toLowerCase().includes(token))
    ) ??
    careerPaths[0]
  );
}

export function generateCareerAdvice(
  request: CareerAdvisorRequest
): CareerAdvisorResponse {
  const matchedCareer = pickCareerPath(request.targetRole);
  const retrievedContext = retrieveRelevantContent(
    [
      request.currentRole,
      request.targetRole,
      request.skills,
      request.timeline,
      request.constraints,
      matchedCareer.modulePath,
    ]
      .filter(Boolean)
      .join(" "),
    8
  );
  const hasTechnicalTarget =
    /engineer|architect|developer|rag|agent|system/i.test(request.targetRole);
  const hasBusinessTarget =
    /product|manager|consultant|strategy|founder|entrepreneur/i.test(
      request.targetRole
    );

  const skillGaps = [
    "Clear AI problem framing and workflow design",
    hasTechnicalTarget
      ? "RAG, agents, evaluation, deployment, and system reliability"
      : "Prompt systems, automation design, and operational adoption",
    hasBusinessTarget
      ? "AI product strategy, ROI storytelling, and stakeholder communication"
      : "Portfolio proof, technical explanation, and measurable outcomes",
    "Public proof of work: case studies, demos, and repeatable project artifacts",
  ];

  return {
    summary: `Based on your target role (${request.targetRole}), the closest AI Academy outcome is ${matchedCareer.title}. Your path should turn your current ${request.currentRole} background into visible proof: useful projects, clear before/after results, and strong explanations of how the AI workflow creates value.`,
    skillGaps,
    roadmap: [
      {
        phase: "Days 1-30",
        focus: "Foundation and positioning",
        actions: [
          "Complete the foundation modules and build a reusable prompt/workflow library.",
          "Rewrite your target role into three proof points: skill, project, and measurable result.",
          "Publish one small case study showing a before/after AI workflow.",
        ],
      },
      {
        phase: "Days 31-60",
        focus: "Portfolio build",
        actions: [
          hasTechnicalTarget
            ? "Build one RAG or agent project with evaluation notes and failure handling."
            : "Build one business automation or AI strategy project with ROI assumptions.",
          "Use AI Project Reviewer to score the project and close the highest-risk gaps.",
          "Create a short demo script, screenshots, and a README-style explanation.",
        ],
      },
      {
        phase: "Days 61-90",
        focus: "Market signal",
        actions: [
          "Package two projects into portfolio case studies.",
          "Update resume, LinkedIn, and outreach messages around proof instead of vague AI interest.",
          "Run five mock interviews or client conversations using your project artifacts.",
        ],
      },
    ],
    portfolioProjects: [
      hasTechnicalTarget
        ? "Retrieval assistant with citations, permissions, evaluation table, and fallback behavior."
        : "AI operations workflow that turns messy business input into a tracked decision or action system.",
      "Prompt system library with variables, quality checks, examples, and failure modes.",
      "Before/after case study that measures time saved, quality improved, or revenue opportunity created.",
    ],
    weeklyPlan: [
      "3 hours: course lessons and notes",
      "4 hours: hands-on project build",
      "1 hour: writing the case study or README",
      "1 hour: outreach, feedback, or mock interview practice",
    ],
    positioning: `Position yourself as a ${request.targetRole} candidate who can translate AI tools into practical outcomes, not just use chatbots. Lead with proof: project screenshots, evaluation criteria, demo path, and the business result.`,
    retrievedContext,
  };
}
