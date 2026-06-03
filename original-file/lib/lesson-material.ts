import type { CourseModule, Lesson } from "@/data/types";

type LessonMaterial = {
  explanation: string[];
  workflow: string[];
  practice: string[];
  deliverable: string;
  reflection: string[];
  videoPlan: string[];
  recommendedVideos: VideoResource[];
  sourceCredits: SourceCredit[];
  quiz: QuizQuestion[];
  rubric: RubricItem[];
  worksheet: {
    title: string;
    sections: string[];
  };
};

export type VideoResource = {
  title: string;
  channel: string;
  url: string;
  fit: string;
};

export type SourceCredit = {
  name: string;
  url: string;
  note: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type RubricItem = {
  criterion: string;
  excellent: string;
  needsWork: string;
};

function buildQuiz(
  lesson: Lesson,
  courseModule: CourseModule,
  riskFrame: string
): QuizQuestion[] {
  return [
    {
      question: `What is the main professional outcome of "${lesson.title}"?`,
      options: [
        "Produce a reusable artifact or decision improvement",
        "Memorize every tool name in the module",
        "Replace human review entirely",
        "Use the longest possible prompt",
      ],
      answer: "Produce a reusable artifact or decision improvement",
      explanation: `${courseModule.title} is designed around practical operating skill: learners should leave with an artifact, workflow, or decision they can reuse.`,
    },
    {
      question:
        "Which review step should happen before using AI-assisted work with real users or business data?",
      options: [
        "Check accuracy, usefulness, risk, and human trust",
        "Publish the first draft immediately",
        "Remove all constraints from the prompt",
        "Ignore source quality if the writing sounds confident",
      ],
      answer: "Check accuracy, usefulness, risk, and human trust",
      explanation:
        "AI output becomes professional only after verification, risk review, and context-aware judgment.",
    },
    {
      question: "What is the likely failure mode to watch for in this lesson?",
      options: [
        riskFrame,
        "Too much verified evidence",
        "Too many human approval points",
        "Over-documenting the final artifact",
      ],
      answer: riskFrame,
      explanation:
        "Every AI workflow needs an explicit failure mode so learners know what to inspect before trusting the output.",
    },
  ];
}

function buildRubric(lesson: Lesson): RubricItem[] {
  return [
    {
      criterion: "Clarity of goal",
      excellent: `The ${lesson.title.toLowerCase()} artifact names the user, outcome, constraints, and success criteria.`,
      needsWork:
        "The goal is vague, tool-centered, or missing a real user outcome.",
    },
    {
      criterion: "Quality of AI workflow",
      excellent:
        "The workflow uses clear inputs, structured prompting, iteration, and review instead of a one-shot answer.",
      needsWork:
        "The workflow depends on a single generic prompt with no evaluation loop.",
    },
    {
      criterion: "Verification and risk control",
      excellent:
        "The learner identifies assumptions, failure modes, source checks, and where human approval is required.",
      needsWork:
        "The output is accepted because it sounds good, without testing or source review.",
    },
    {
      criterion: "Portfolio readiness",
      excellent:
        "The final artifact is clean enough to show to a mentor, employer, client, teammate, or investor.",
      needsWork:
        "The artifact reads like private notes rather than a finished professional deliverable.",
    },
  ];
}

const coreCredits: SourceCredit[] = [
  {
    name: "YouTube creators and education channels",
    url: "https://www.youtube.com/",
    note: "External videos are used as learner references only. AI Academy is not affiliated with these creators unless explicitly stated.",
  },
  {
    name: "OpenAI, Anthropic, Google, IBM, NVIDIA, Hugging Face, DeepLearning.AI, 3Blue1Brown, and Andrej Karpathy",
    url: "https://www.deeplearning.ai/",
    note: "Shout out to the public educators, labs, and companies whose free materials help learners build a stronger foundation.",
  },
];

const approvedVideos = {
  googleGenAi: {
    title: "Introduction to Generative AI",
    channel: "Google Cloud Tech",
    url: "https://www.youtube.com/watch?v=G2fqAlgmoPo",
    fit: "Best for beginners who need clear definitions of AI, ML, deep learning, foundation models, and generative AI.",
  },
  karpathyIntro: {
    title: "Intro to Large Language Models",
    channel: "Andrej Karpathy",
    url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
    fit: "Best for understanding what LLMs are, how they are trained, how they behave, and why verification matters.",
  },
  karpathyDeepDive: {
    title: "Deep Dive into LLMs like ChatGPT",
    channel: "Andrej Karpathy",
    url: "https://www.youtube.com/watch?v=7xTGNNLPyMI",
    fit: "Best for learners who want a deeper mental model of tokens, training, inference, and system behavior.",
  },
  threeBlueOneBrownGpt: {
    title: "But what is a GPT? Visual intro to transformers",
    channel: "3Blue1Brown",
    url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
    fit: "Best for visual intuition about transformers, token prediction, and why context changes output.",
  },
  threeBlueOneBrownAttention: {
    title: "Attention in transformers, visually explained",
    channel: "3Blue1Brown",
    url: "https://www.youtube.com/watch?v=eMlx5fFNoYc",
    fit: "Best for seeing how attention lets models weigh context instead of treating every word equally.",
  },
  promptEngineering: {
    title: "ChatGPT Prompt Engineering for Developers",
    channel: "DeepLearning.AI with Andrew Ng and Isa Fulford",
    url: "https://learn.deeplearning.ai/courses/chatgpt-prompt-eng",
    fit: "Best for practical prompt patterns, iterative prompting, summarization, inference, transformation, and expansion.",
  },
  ibmRag: {
    title: "What is Retrieval-Augmented Generation (RAG)?",
    channel: "IBM Technology",
    url: "https://www.youtube.com/watch?v=T-D1OfcDW1M",
    fit: "Best for understanding why retrieval, citations, and fresh context reduce hallucination risk.",
  },
  huggingFaceCourse: {
    title: "Hugging Face Course",
    channel: "Hugging Face",
    url: "https://huggingface.co/learn",
    fit: "Best for open-source models, transformers, datasets, tokenizers, and practical ML foundations.",
  },
  nvidiaGenAi: {
    title: "NVIDIA Generative AI Developer Resources",
    channel: "NVIDIA Developer",
    url: "https://developer.nvidia.com/generative-ai",
    fit: "Best for understanding the infrastructure, inference, acceleration, and deployment side of production AI.",
  },
  openAiDocs: {
    title: "OpenAI Prompt Engineering Guide",
    channel: "OpenAI",
    url: "https://platform.openai.com/docs/guides/prompt-engineering",
    fit: "Best for current production prompting patterns, tool use, structured outputs, and model behavior guidance.",
  },
};

const moduleVideoMap: Record<number, VideoResource[]> = {
  1: [
    approvedVideos.googleGenAi,
    approvedVideos.karpathyIntro,
    approvedVideos.threeBlueOneBrownGpt,
  ],
  2: [
    approvedVideos.promptEngineering,
    approvedVideos.openAiDocs,
    approvedVideos.threeBlueOneBrownGpt,
  ],
  3: [approvedVideos.promptEngineering, approvedVideos.karpathyIntro],
  4: [approvedVideos.promptEngineering, approvedVideos.openAiDocs],
  5: [approvedVideos.googleGenAi, approvedVideos.promptEngineering],
  6: [approvedVideos.promptEngineering, approvedVideos.openAiDocs],
  7: [approvedVideos.promptEngineering, approvedVideos.karpathyIntro],
  8: [
    approvedVideos.openAiDocs,
    approvedVideos.karpathyDeepDive,
    approvedVideos.huggingFaceCourse,
  ],
  9: [approvedVideos.karpathyDeepDive, approvedVideos.openAiDocs],
  10: [
    approvedVideos.ibmRag,
    approvedVideos.karpathyIntro,
    approvedVideos.nvidiaGenAi,
  ],
  11: [approvedVideos.googleGenAi, approvedVideos.karpathyIntro],
  12: [approvedVideos.ibmRag, approvedVideos.promptEngineering],
  13: [approvedVideos.huggingFaceCourse, approvedVideos.karpathyDeepDive],
  14: [approvedVideos.googleGenAi, approvedVideos.promptEngineering],
  15: [approvedVideos.huggingFaceCourse, approvedVideos.nvidiaGenAi],
  16: [approvedVideos.googleGenAi, approvedVideos.ibmRag],
  17: [
    approvedVideos.ibmRag,
    approvedVideos.nvidiaGenAi,
    approvedVideos.openAiDocs,
  ],
  18: [approvedVideos.karpathyIntro, approvedVideos.nvidiaGenAi],
};

function getRecommendedVideos(courseModule: CourseModule) {
  return (
    moduleVideoMap[courseModule.id] ?? [
      approvedVideos.googleGenAi,
      approvedVideos.karpathyIntro,
    ]
  );
}

const moduleOneMaterials: Record<
  string,
  Omit<LessonMaterial, "quiz" | "rubric">
> = {
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
    deliverable:
      "An AI Reliability Log with 10 tested prompts, the model responses, failure labels, verified corrections, and your personal verification checklist.",
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
    recommendedVideos: [
      approvedVideos.googleGenAi,
      approvedVideos.karpathyIntro,
    ],
    sourceCredits: coreCredits,
    worksheet: {
      title: "AI Reliability Log",
      sections: [
        "Prompt tested",
        "Model answer",
        "What sounded convincing",
        "What was wrong or uncertain",
        "Verification source",
        "Rule for future use",
      ],
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
    deliverable:
      "A Personal AI Tool Map that lists your default tools for writing, research, coding, design, automation, analysis, and verification.",
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
    recommendedVideos: [
      approvedVideos.googleGenAi,
      approvedVideos.karpathyIntro,
      approvedVideos.promptEngineering,
    ],
    sourceCredits: coreCredits,
    worksheet: {
      title: "Personal AI Tool Map",
      sections: [
        "Task",
        "Task type",
        "Best tool category",
        "Specific tool",
        "Reason",
        "Cost or risk note",
      ],
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
    deliverable:
      "A Prompt Optimization Sheet showing before/after prompts, what changed, and how the output improved.",
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
    recommendedVideos: [
      approvedVideos.threeBlueOneBrownGpt,
      approvedVideos.threeBlueOneBrownAttention,
      approvedVideos.karpathyDeepDive,
    ],
    sourceCredits: coreCredits,
    worksheet: {
      title: "Prompt Optimization Sheet",
      sections: [
        "Original prompt",
        "Important context",
        "Removed noise",
        "New structure",
        "Output comparison",
        "Cost/length note",
      ],
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
    deliverable:
      "A Professional AI Stack one-pager with tools, use cases, data rules, cost estimates, and first workflow proof.",
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
    recommendedVideos: [
      approvedVideos.googleGenAi,
      approvedVideos.promptEngineering,
      approvedVideos.openAiDocs,
    ],
    sourceCredits: coreCredits,
    worksheet: {
      title: "Professional AI Stack Planner",
      sections: [
        "Tool",
        "Job",
        "Cost",
        "Data allowed",
        "Primary workflow",
        "Risk or limit",
      ],
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
    deliverable:
      "A Context Brief Template for one recurring professional workflow.",
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
    recommendedVideos: [
      approvedVideos.threeBlueOneBrownAttention,
      approvedVideos.promptEngineering,
    ],
    sourceCredits: coreCredits,
    worksheet: {
      title: "Context Brief Template",
      sections: [
        "Goal",
        "Audience",
        "Known facts",
        "Constraints",
        "Examples",
        "Decisions",
        "Open questions",
      ],
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
    deliverable:
      "A Verification Checklist that can be used before publishing, presenting, sending, or shipping AI-assisted work.",
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
    recommendedVideos: [approvedVideos.karpathyIntro, approvedVideos.ibmRag],
    sourceCredits: coreCredits,
    worksheet: {
      title: "AI Verification Checklist",
      sections: [
        "Claim",
        "Risk level",
        "Verification method",
        "Source",
        "Correction",
        "Approved for use",
      ],
    },
  },
};

const modulePlaybooks: Record<
  number,
  {
    expertFrame: string;
    realWorldCase: string;
    labFrame: string;
    riskFrame: string;
  }
> = {
  2: {
    expertFrame:
      "Prompt engineering is the management layer between human intent and model behavior. Treat every prompt as a reusable operating procedure with inputs, constraints, examples, and a measurable output standard.",
    realWorldCase:
      "A product team can use this skill to turn vague customer feedback into prioritized requirements, acceptance criteria, and release notes without losing the original customer pain.",
    labFrame:
      "Build a prompt, test it on weak and strong examples, compare outputs, then improve the instruction until a second person could reuse it and get similar results.",
    riskFrame:
      "The failure mode is prompt theater: long instructions that sound sophisticated but do not improve accuracy, consistency, or usefulness.",
  },
  3: {
    expertFrame:
      "AI productivity is not about doing more random tasks. It is about protecting deep work, compressing shallow work, and designing repeatable workflows that save attention every week.",
    realWorldCase:
      "A manager can turn meetings, notes, decisions, and follow-ups into a weekly AI-assisted operating rhythm that keeps the team aligned without adding admin drag.",
    labFrame:
      "Choose one recurring workflow, map every step, automate the lowest-risk parts, and keep human review at the decision points.",
    riskFrame:
      "The failure mode is speed without judgment: faster drafts, faster summaries, and faster decisions that still point in the wrong direction.",
  },
  4: {
    expertFrame:
      "An AI content engine is a system, not a pile of posts. Strategy, research, angle selection, production, editing, distribution, and measurement all need defined roles.",
    realWorldCase:
      "A founder can turn one customer interview into a newsletter, sales page section, short video script, LinkedIn post, FAQ, and product insight memo.",
    labFrame:
      "Start with one source asset, extract the strongest ideas, adapt each piece to a channel, and add a human editorial pass before publishing.",
    riskFrame:
      "The failure mode is generic content at scale: more output that weakens trust because it sounds like everybody else.",
  },
  5: {
    expertFrame:
      "Generative media work requires creative direction. Strong operators control style, composition, pacing, brand fit, and revision loops instead of accepting the first impressive output.",
    realWorldCase:
      "A course creator can storyboard a lesson, generate visual metaphors, produce voiceover drafts, and assemble a test video before paying for full production.",
    labFrame:
      "Create a creative brief, generate three variants, critique them against the brief, and build a repeatable revision checklist.",
    riskFrame:
      "The failure mode is visual novelty without message clarity, rights review, or brand consistency.",
  },
  6: {
    expertFrame:
      "Automation turns repeatable decisions into systems. The goal is not to remove people; it is to remove copy-paste work and make handoffs reliable.",
    realWorldCase:
      "A sales team can route leads, enrich company data, draft follow-ups, update the CRM, and notify the owner while keeping approval before customer-facing messages.",
    labFrame:
      "Map trigger, inputs, decision rules, actions, failure alerts, and human approval. Build the smallest safe workflow first.",
    riskFrame:
      "The failure mode is invisible automation that silently corrupts data, spams users, or performs actions nobody owns.",
  },
  7: {
    expertFrame:
      "AI marketing and sales should increase customer understanding before it increases volume. Research, positioning, offers, objections, and proof come before campaign automation.",
    realWorldCase:
      "A consultant can analyze a niche, write sharper outreach, generate objection handling, and build a sales call prep brief for each prospect.",
    labFrame:
      "Pick one audience, identify the buying trigger, write the offer, test messaging variants, and document what evidence would make the claim believable.",
    riskFrame:
      "The failure mode is automated persuasion with weak truth: messages that are personalized but not actually relevant.",
  },
  8: {
    expertFrame:
      "AI coding assistants are strongest when the human owns architecture, tests, review, and deployment discipline. The model can accelerate implementation but should not become the senior engineer.",
    realWorldCase:
      "A solo founder can scaffold features, write tests, debug errors, document APIs, and refactor small modules while using CI as the quality gate.",
    labFrame:
      "Write a clear issue, ask AI for a plan, implement in small pieces, run tests, inspect the diff, and document the change.",
    riskFrame:
      "The failure mode is code that looks plausible, compiles locally, and breaks under real data, edge cases, or production deployment.",
  },
  9: {
    expertFrame:
      "Agents are loops that can plan, use tools, observe results, and continue. Useful agents need narrow goals, permissions, memory boundaries, and stop conditions.",
    realWorldCase:
      "A research agent can gather sources, extract claims, rank confidence, draft a brief, and hand uncertain items to a human reviewer.",
    labFrame:
      "Define the goal, allowed tools, inputs, success criteria, failure states, and approval points before building the loop.",
    riskFrame:
      "The failure mode is giving autonomy to a system that lacks context, permissions discipline, or reliable evaluation.",
  },
  10: {
    expertFrame:
      "RAG systems make AI useful with private or specialized knowledge by retrieving the right context before generation. Retrieval quality usually matters more than model choice.",
    realWorldCase:
      "A company can turn policies, docs, FAQs, and sales collateral into a support assistant that answers with citations and escalates uncertainty.",
    labFrame:
      "Collect source docs, chunk them, embed them, test retrieval, inspect citations, and improve the knowledge base before improving the model prompt.",
    riskFrame:
      "The failure mode is confident answers from weak retrieval: the model sounds grounded even when the wrong documents were retrieved.",
  },
  11: {
    expertFrame:
      "AI business strategy starts with value chain impact: where AI reduces cost, increases speed, improves quality, creates new products, or changes customer expectations.",
    realWorldCase:
      "An executive team can map AI opportunities by function, rank them by ROI and risk, and choose one lighthouse project to prove value.",
    labFrame:
      "Create an opportunity map, score each use case, define metrics, and write a pilot plan with a 30-day proof target.",
    riskFrame:
      "The failure mode is AI theater: impressive demos with no owner, metric, adoption path, or operating change.",
  },
  12: {
    expertFrame:
      "AI research work is a disciplined evidence pipeline. Models can search, summarize, compare, and draft, but the professional owns source quality and conclusions.",
    realWorldCase:
      "An analyst can turn market reports, earnings calls, reviews, and competitor pages into a cited opportunity brief.",
    labFrame:
      "Define the research question, collect sources, extract claims, score confidence, identify gaps, and write a decision-ready memo.",
    riskFrame:
      "The failure mode is summary without skepticism: polished synthesis built on weak or outdated sources.",
  },
  13: {
    expertFrame:
      "Custom models are not the first move. Fine-tuning is useful when you need repeatable style, format, classification, or domain behavior that prompting and RAG cannot solve.",
    realWorldCase:
      "A support organization can fine-tune tone and categorization after collecting enough approved examples from real tickets.",
    labFrame:
      "Define the target behavior, gather examples, clean the dataset, create an evaluation set, and compare against prompting before training.",
    riskFrame:
      "The failure mode is training too early: spending money to bake in messy data, unclear labels, or a problem retrieval could solve.",
  },
  14: {
    expertFrame:
      "AI monetization comes from painful problems, distribution, trust, and repeatable delivery. The technology is only valuable when it changes a customer's outcome.",
    realWorldCase:
      "A creator can package a repeatable AI workflow into a paid template, service, cohort, or micro-SaaS offer.",
    labFrame:
      "Choose a niche, identify a costly workflow, design the offer, validate willingness to pay, and build the smallest paid version.",
    riskFrame:
      "The failure mode is building a clever AI product before proving that a specific buyer urgently wants it.",
  },
  15: {
    expertFrame:
      "Open-source and local AI give teams control over privacy, cost, latency, and customization. They also move more responsibility onto the builder.",
    realWorldCase:
      "A regulated team can test local models for internal document workflows where public API use is limited.",
    labFrame:
      "Compare a hosted frontier model with a local model on the same task, measuring quality, speed, privacy, cost, and maintenance burden.",
    riskFrame:
      "The failure mode is choosing local AI for ideology instead of requirements, then underestimating operations and quality tradeoffs.",
  },
  16: {
    expertFrame:
      "AI governance is how organizations make AI useful without losing trust. It combines policy, risk classification, review, documentation, and accountability.",
    realWorldCase:
      "A company can approve low-risk internal summarization while requiring review for customer-facing, legal, HR, financial, or health-related outputs.",
    labFrame:
      "Create an AI use policy, classify workflows by risk, define approval steps, and write an incident response checklist.",
    riskFrame:
      "The failure mode is either no rules or rules nobody can follow: both create shadow AI and unmanaged risk.",
  },
  17: {
    expertFrame:
      "AI system design connects product goals to models, data, retrieval, tools, evaluation, observability, cost, latency, and security. Architecture is where demos become products.",
    realWorldCase:
      "A SaaS team can design an AI assistant with authenticated data access, cited answers, usage limits, evals, and monitoring before exposing it to users.",
    labFrame:
      "Draw the system boundary, data flow, model calls, tool permissions, evaluation checks, and failure fallback.",
    riskFrame:
      "The failure mode is demo architecture: a prototype that works once but has no reliability, permissions, cost control, or evaluation loop.",
  },
  18: {
    expertFrame:
      "The future of AI is not a prediction contest. Serious operators track capabilities, constraints, regulation, economics, and adoption patterns so they can make better bets.",
    realWorldCase:
      "A founder can use trend analysis to decide whether to build on agents, multimodal interfaces, vertical AI, infrastructure, education, or services.",
    labFrame:
      "Build a signal dashboard, separate hype from durable shifts, and write a 12-month opportunity thesis with risks and trigger points.",
    riskFrame:
      "The failure mode is chasing headlines instead of compounding skills, user insight, and distribution.",
  },
};

export function buildLessonMaterial(
  lesson: Lesson,
  courseModule: CourseModule
) {
  const moduleOneMaterial = moduleOneMaterials[lesson.id];

  if (courseModule.id === 1 && moduleOneMaterial) {
    return {
      ...moduleOneMaterial,
      quiz: buildQuiz(
        lesson,
        courseModule,
        "Skipping verification turns polished AI output into operational risk"
      ),
      rubric: buildRubric(lesson),
    };
  }

  const playbook = modulePlaybooks[courseModule.id] ?? {
    expertFrame: `This lesson turns ${courseModule.title.toLowerCase()} from theory into a repeatable professional operating skill.`,
    realWorldCase: `A learner can apply this lesson to a real project by connecting the concept to a business, career, creative, or technical outcome.`,
    labFrame:
      "Define the real task, apply the method, compare the before and after result, then document the reusable version.",
    riskFrame:
      "The failure mode is using AI as a shortcut without defining quality, ownership, or verification.",
  };

  const riskFrame = playbook.riskFrame;

  return {
    explanation: [
      lesson.concept,
      playbook.expertFrame,
      playbook.realWorldCase,
      `For this specific lesson, the operating question is: how does "${lesson.title}" help a learner make a better decision, produce a stronger artifact, reduce risk, or create measurable business value?`,
      `The professional standard is not whether the output looks impressive on first glance. The standard is whether another person could inspect the inputs, follow the workflow, trust the result, and reuse the method in a similar situation.`,
      `Use the lesson as a small apprenticeship: first understand the concept, then run it on a real example, then add constraints, then evaluate the output, then save the pattern as a reusable asset.`,
    ],
    workflow: [
      "Define the user, buyer, stakeholder, or audience affected by this work.",
      `Name the job: write down the exact outcome ${lesson.title.toLowerCase()} should help you create.`,
      "Collect the minimum useful inputs: source material, constraints, examples, quality bar, and deadline.",
      "Run the workflow manually once so you understand the moving parts before asking AI to accelerate it.",
      "Use an AI tool to produce a first draft, analysis, artifact, or plan.",
      "Critique the result against accuracy, usefulness, originality, risk, and whether it would survive real-world review.",
      "Revise the prompt or workflow, then run a second pass and compare the improvement.",
      "Save the final method as a reusable prompt, checklist, worksheet, SOP, or portfolio artifact.",
    ],
    practice: [
      lesson.exercise,
      playbook.labFrame,
      "Add one realistic constraint: budget, deadline, audience, data quality, compliance risk, brand voice, engineering limit, or customer expectation.",
      "Create one weak version and one strong version of the output so you can explain what quality looks like.",
      "Ask AI to find failure points, missing assumptions, and edge cases, then decide which critiques are valid.",
      "Package the best output so it can be shown to a mentor, teammate, client, hiring manager, or investor.",
    ],
    deliverable: `A finished ${lesson.title.toLowerCase()} artifact you could show in a portfolio, client conversation, team meeting, or learning journal.`,
    reflection: [
      "What did AI make faster, clearer, or more complete?",
      "Where did human judgment still decide quality?",
      "What would break if this were used with real users, real customers, or real business data?",
      playbook.riskFrame,
      "What evidence would prove this workflow is valuable enough to repeat?",
      "What would you turn into a reusable template for next time?",
    ],
    videoPlan: [
      "Cold open: show the expensive real-world problem this lesson solves.",
      "Mental model: animate the core concept as a simple decision flow.",
      "Expert lens: explain how a founder, engineer, operator, or creator would use this skill.",
      "Tool demo: record the exact workflow in the AI tool with realistic inputs.",
      "Before/after: compare a weak output with an investor-grade or workplace-ready output.",
      "Failure mode: show the most likely mistake and how to catch it.",
      "Assignment: walk through the deliverable learners must create.",
    ],
    recommendedVideos: getRecommendedVideos(courseModule),
    sourceCredits: coreCredits,
    quiz: buildQuiz(lesson, courseModule, riskFrame),
    rubric: buildRubric(lesson),
    worksheet: {
      title: `${lesson.title} Worksheet`,
      sections: [
        "Goal",
        "Audience or user",
        "Inputs",
        "AI workflow",
        "Output",
        "Quality check",
        "Risk check",
        "Portfolio proof",
        "Next improvement",
      ],
    },
  };
}
