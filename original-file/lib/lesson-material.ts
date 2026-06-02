import type { CourseModule, Lesson } from "@/data/types";

type LessonMaterial = {
  explanation: string[];
  workflow: string[];
  practice: string[];
  deliverable: string;
  reflection: string[];
  videoPlan: string[];
  worksheet: {
    title: string;
    sections: string[];
  };
};

const moduleOneMaterials: Record<string, LessonMaterial> = {
  "what-ai-really-is": {
    explanation: [
      "AI systems do not think like people. Modern language models predict useful next tokens from patterns learned across huge datasets. They can produce expert-looking answers because they have learned the shape of expert language, not because they verify every claim against reality.",
      "This distinction is the first professional skill in AI: treat the model as a powerful reasoning partner, pattern finder, and draft generator, but never as an automatic source of truth. The better you understand this, the less likely you are to be fooled by confident nonsense.",
      "The core operating model is probabilistic. When you ask a question, the model estimates which words, structures, examples, and arguments are likely to satisfy the request. That is useful for drafting, explaining, brainstorming, summarizing, and transforming information. It is dangerous when the task requires current facts, private context, calculations, legal certainty, medical judgment, or exact citations.",
      "Your goal is not to distrust AI. Your goal is to assign it the right job. Use it to accelerate thinking, then build verification into the workflow before any output reaches customers, clients, employers, or investors.",
    ],
    workflow: [
      "Ask the model a factual question you already know the answer to. Watch how confidently it responds.",
      "Ask the same question with a false assumption inside it. Example: 'Why did Company X acquire Company Y in 2024?' when no acquisition happened.",
      "Ask for sources, then open and verify each source manually.",
      "Mark each failure type: fabricated fact, wrong date, fake citation, missing caveat, overconfident summary, or outdated information.",
      "Rewrite your prompt so the model must separate known facts, assumptions, uncertainty, and recommended verification steps.",
      "Save the improved prompt as your default verification prompt.",
    ],
    practice: [
      "Run a 10-question failure audit across topics you care about: your industry, your city, a public company, a legal/regulatory topic, a technical concept, and a historical event.",
      "For each answer, record what the model got right, what it got wrong, and what you needed to check elsewhere.",
      "Create a personal rule for when AI output is allowed to be used directly, when it needs human review, and when it needs external source verification.",
    ],
    deliverable: "An AI Reliability Log with 10 tested prompts, the model responses, failure labels, verified corrections, and your personal verification checklist.",
    reflection: [
      "Which type of AI error surprised you most?",
      "Where did the model sound most convincing while being least reliable?",
      "What kinds of tasks can you now safely delegate to AI?",
      "What kinds of tasks should never leave the verification stage?",
    ],
    videoPlan: [
      "Open with a side-by-side: one impressive AI answer and one hidden false claim inside it.",
      "Animate the difference between 'predicting likely text' and 'knowing verified truth.'",
      "Show a live hallucination test using a false premise prompt.",
      "Demonstrate a corrected prompt that forces uncertainty and source checks.",
      "End with the AI Reliability Log assignment.",
    ],
    worksheet: {
      title: "AI Reliability Log",
      sections: ["Prompt tested", "Model answer", "What sounded convincing", "What was wrong or uncertain", "Verification source", "Rule for future use"],
    },
  },
  "ai-landscape-map": {
    explanation: [
      "The AI market looks chaotic because thousands of tools are competing for attention. Underneath the noise, most tools fall into a small number of categories: language models, search and research tools, image tools, audio tools, video tools, coding assistants, automation platforms, agents, and specialized vertical products.",
      "Professionals do not choose AI tools by hype. They choose by job. If the job is open-ended reasoning, use a frontier language model. If the job is factual research, use a search-grounded tool. If the job is repeatable workflow execution, use automation. If the job is visual production, use image or video models.",
      "The practical skill is tool routing. A strong operator can look at a task and decide whether it needs generation, retrieval, classification, transformation, analysis, automation, or human judgment. That decision determines the tool stack.",
    ],
    workflow: [
      "Write down the outcome you want, not the tool you want to use.",
      "Classify the task: generate, retrieve, analyze, transform, automate, code, design, or verify.",
      "Choose the smallest tool that can do the job reliably.",
      "Check whether the task needs current web information, private data, visual output, code execution, or human approval.",
      "Run the task in two tools and compare speed, quality, trust, and cost.",
      "Create your personal tool map with a default tool for each task class.",
    ],
    practice: [
      "Take 10 real tasks from your week and classify them by task type.",
      "Assign each task to a tool category, then to a specific tool.",
      "Write one sentence explaining why that tool is the best fit.",
    ],
    deliverable: "A Personal AI Tool Map that lists your default tools for writing, research, coding, design, automation, analysis, and verification.",
    reflection: [
      "Which tasks were you using the wrong AI tool for?",
      "Where does one general chatbot work well enough?",
      "Where do you need a specialized tool?",
      "Which tools are worth paying for first?",
    ],
    videoPlan: [
      "Animate the AI landscape as a routing map rather than a giant tool list.",
      "Show 10 tasks moving into the right tool categories.",
      "Demo the same task in a chatbot and a search-grounded tool to show the difference.",
      "End with the Personal AI Tool Map assignment.",
    ],
    worksheet: {
      title: "Personal AI Tool Map",
      sections: ["Task", "Task type", "Best tool category", "Specific tool", "Reason", "Cost or risk note"],
    },
  },
  "how-llms-actually-work": {
    explanation: [
      "Large language models process text as tokens. A token can be a word, part of a word, punctuation, or symbol. The model reads tokens, calculates relationships between them, and predicts what should come next.",
      "The transformer architecture is powerful because attention lets the model weigh which parts of the context matter most. In plain English: the model scans the conversation and decides what to pay attention to when forming the next response.",
      "This explains many common behaviors. Models are sensitive to wording because wording changes the token pattern. They can lose the plot in long conversations because important details compete for attention. They can imitate expertise because they learned expert patterns. They can fail at exact arithmetic because text prediction is not the same as calculation.",
      "When you understand tokens, attention, and context, prompting stops feeling mystical. You start writing instructions that make the important details easier for the model to notice and harder for it to ignore.",
    ],
    workflow: [
      "Write one messy prompt with too much background and no clear output format.",
      "Highlight the tokens that matter most: role, task, context, constraints, examples, output format.",
      "Rewrite the prompt so the important information appears in a clean structure.",
      "Ask the model to produce a short answer, then a structured answer, then a JSON-style answer.",
      "Compare how structure changes quality and consistency.",
      "Estimate cost risk by marking which prompts are short, medium, or long context tasks.",
    ],
    practice: [
      "Take five prompts you actually use.",
      "Cut unnecessary context while preserving the decision-critical details.",
      "Add a clear output format and test whether the result improves.",
    ],
    deliverable: "A Prompt Optimization Sheet showing before/after prompts, what changed, and how the output improved.",
    reflection: [
      "What information did the model need most?",
      "What context was noise?",
      "Where did formatting improve the answer?",
      "How will you reduce cost and confusion in long prompts?",
    ],
    videoPlan: [
      "Animate text turning into tokens.",
      "Show attention as highlights moving across a prompt.",
      "Demo messy prompt versus structured prompt.",
      "Show why output format changes model behavior.",
    ],
    worksheet: {
      title: "Prompt Optimization Sheet",
      sections: ["Original prompt", "Important context", "Removed noise", "New structure", "Output comparison", "Cost/length note"],
    },
  },
  "your-professional-ai-stack": {
    explanation: [
      "A professional AI stack is not a random pile of subscriptions. It is a small set of tools assigned to clear jobs: reasoning, research, writing, coding, automation, storage, and verification.",
      "For most learners, the first stack should include one frontier chatbot, one search-grounded research tool, one workspace for notes and templates, one coding assistant if relevant, and one automation tool. Add specialized creative tools only when your work requires them.",
      "The second professional habit is account hygiene. Keep API keys private, separate personal and client data, track monthly costs, and document which tools are approved for which kinds of information.",
    ],
    workflow: [
      "Choose your primary reasoning model: ChatGPT, Claude, Gemini, or another frontier assistant.",
      "Choose your research tool: Perplexity, You.com, or a search-grounded workflow.",
      "Create a workspace folder for prompts, outputs, checklists, and project notes.",
      "Set monthly spending limits where the platform allows it.",
      "Create a simple data rule: public data, internal data, sensitive data, and forbidden data.",
      "Run one real task end-to-end and save the output as your first portfolio artifact.",
    ],
    practice: [
      "Set up your AI workspace and document each tool's job.",
      "Run a real research-to-output workflow using at least two tools.",
      "Write down the cost, time saved, and quality improvement.",
    ],
    deliverable: "A Professional AI Stack one-pager with tools, use cases, data rules, cost estimates, and first workflow proof.",
    reflection: [
      "Which tool will be your daily driver?",
      "Which tool is only for specialized tasks?",
      "What data should never enter public AI tools?",
      "What monthly cost is justified by the time saved?",
    ],
    videoPlan: [
      "Show a clean AI workspace setup.",
      "Walk through tool roles: reasoning, research, storage, automation.",
      "Demo a first workflow from question to final artifact.",
      "Show where API keys and data rules matter.",
    ],
    worksheet: {
      title: "Professional AI Stack Planner",
      sections: ["Tool", "Job", "Cost", "Data allowed", "Primary workflow", "Risk or limit"],
    },
  },
  "context-windows-and-memory": {
    explanation: [
      "A context window is the amount of information a model can consider at one time. It is not the same as memory. A model may read a long conversation, but it still has to prioritize which details matter.",
      "Most bad long-session AI work fails because the user lets the conversation become messy. Requirements, decisions, examples, and corrections get buried. The model then optimizes against the wrong context.",
      "Professional context management means creating a working brief. You periodically summarize the goal, constraints, decisions, definitions, examples, and open questions. This gives the model a clean state without losing the important history.",
    ],
    workflow: [
      "Start every complex AI session with a project brief.",
      "Separate stable facts from temporary exploration.",
      "After major decisions, ask the model to produce a decision log.",
      "When the conversation gets long, create a fresh summary and continue in a new thread.",
      "Store reusable context in a template outside the chat.",
      "Review whether the model is following the current brief or drifting back to old assumptions.",
    ],
    practice: [
      "Pick one recurring task that usually takes a long conversation.",
      "Create a reusable context brief for it.",
      "Run the task once with no brief and once with the brief. Compare output quality.",
    ],
    deliverable: "A Context Brief Template for one recurring professional workflow.",
    reflection: [
      "Which details must always be present?",
      "Which details change each run?",
      "Where does the model usually drift?",
      "When should you start a new thread?",
    ],
    videoPlan: [
      "Animate context as a limited workspace.",
      "Show a messy thread losing key details.",
      "Demo a clean project brief and decision log.",
      "End with the Context Brief Template.",
    ],
    worksheet: {
      title: "Context Brief Template",
      sections: ["Goal", "Audience", "Known facts", "Constraints", "Examples", "Decisions", "Open questions"],
    },
  },
  "hallucination-and-verification": {
    explanation: [
      "Hallucination is not one failure. It is a family of failures: invented facts, fake citations, wrong dates, overgeneralized claims, broken code, missing caveats, and confident answers to under-specified questions.",
      "Verification is the operating discipline that turns AI from a risky toy into a professional tool. The goal is to build workflows where important claims are checked before they leave your hands.",
      "The right verification method depends on the output. Facts need sources. Calculations need recomputation. Code needs tests. Strategy needs assumptions. Legal, medical, and financial content needs qualified human review.",
    ],
    workflow: [
      "Extract every factual claim from the AI output.",
      "Label each claim as low, medium, or high risk.",
      "Verify high-risk claims with primary sources or trusted references.",
      "Ask the model to identify uncertainty and possible failure points.",
      "Run adversarial checks: what would make this answer wrong?",
      "Add the final result to a verification checklist before using it publicly.",
    ],
    practice: [
      "Generate an AI answer on a topic with real-world consequences.",
      "Extract and verify at least five claims.",
      "Rewrite the answer with citations, caveats, and corrected claims.",
    ],
    deliverable: "A Verification Checklist that can be used before publishing, presenting, sending, or shipping AI-assisted work.",
    reflection: [
      "Which claims were easiest to verify?",
      "Which claims required primary sources?",
      "What should trigger expert human review?",
      "How will you make verification fast enough to use every day?",
    ],
    videoPlan: [
      "Show a polished AI answer with hidden errors.",
      "Animate claim extraction and risk labels.",
      "Demo source verification and correction.",
      "End with the reusable Verification Checklist.",
    ],
    worksheet: {
      title: "AI Verification Checklist",
      sections: ["Claim", "Risk level", "Verification method", "Source", "Correction", "Approved for use"],
    },
  },
};

export function buildLessonMaterial(lesson: Lesson, courseModule: CourseModule) {
  const moduleOneMaterial = moduleOneMaterials[lesson.id];

  if (courseModule.id === 1 && moduleOneMaterial) {
    return moduleOneMaterial;
  }

  return {
    explanation: [
      lesson.concept,
      `In ${courseModule.title}, this matters because learners need to turn the idea into repeatable judgment, not just remember a definition.`,
      `The practical test is simple: can you use this lesson to make a better decision, produce a stronger artifact, or avoid a common failure mode in real work?`,
    ],
    workflow: [
      `Name the job: write down the exact outcome this lesson should help you create.`,
      `Choose the smallest useful example from your own work, business, study, or creative project.`,
      `Apply the concept once manually so you understand the moving parts before automating it.`,
      `Use one AI tool from this module to improve the result, then compare the before and after output.`,
      `Save the winning version as a reusable checklist, prompt, template, or operating procedure.`,
    ],
    practice: [
      lesson.exercise,
      `Add one constraint that makes the exercise realistic: a deadline, audience, budget, risk, data source, or quality bar.`,
      `Review your output against three standards: accuracy, usefulness, and whether a real person would trust it.`,
    ],
    deliverable: `A finished ${lesson.title.toLowerCase()} artifact you could show in a portfolio, client conversation, team meeting, or learning journal.`,
    reflection: [
      "What did the AI improve?",
      "Where did human judgment still matter?",
      "What would break if this were used with real users or real business data?",
      "What would you turn into a reusable template for next time?",
    ],
    videoPlan: [
      "Cold open: show the real problem this lesson solves.",
      "Visual model: animate the core concept as a simple flow.",
      "Tool demo: record the exact workflow in the AI tool.",
      "Before/after: compare weak and strong outputs.",
      "Assignment: show the deliverable learners must create.",
    ],
    worksheet: {
      title: `${lesson.title} Worksheet`,
      sections: ["Goal", "Input", "AI workflow", "Output", "Quality check", "Next improvement"],
    },
  };
}
