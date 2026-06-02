"use client";

/* eslint-disable react/no-unescaped-entities */

import { useState, useMemo } from "react";

/* ─── THEME ─────────────────────────────────────────────────── */
const T = {
  bg:"#08090D", surface:"#0F1117", border:"#1A1D27", hi:"#252836",
  text:"#C8C4BC", muted:"#5A5760", faint:"#1E1D26",
  green:"#4ADE80", yellow:"#FACC15", orange:"#F97316",
  purple:"#A78BFA", blue:"#38BDF8", pink:"#FB7185", white:"#EAE6DE",
};

const PHASES = [
  {id:"foundation",   label:"Foundation",   num:1, accent:T.green},
  {id:"intermediate", label:"Intermediate", num:2, accent:T.yellow},
  {id:"advanced",     label:"Advanced",     num:3, accent:T.orange},
  {id:"expert",       label:"Expert",       num:4, accent:T.purple},
];

/* ─── MODULES ────────────────────────────────────────────────── */
const MODULES = [
  /* ══ FOUNDATION ══════════════════════════════════════════════ */
  {
    id:1,phase:"foundation",icon:"◈",
    title:"The AI Operating System",
    sub:"Understand the intelligence revolution from first principles",
    time:"6 hrs",difficulty:"Beginner",lessonCount:12,
    objectives:["Understand what AI is and isn't at a fundamental level","Map the modern AI landscape with confidence","Install and configure your complete AI stack","Run your first meaningful AI interaction"],
    lessons:[
      {n:"1.1",title:"What AI Really Is (And Isn't)",hook:"You've been lied to about AI — here's the truth",concept:"AI as probabilistic pattern matching, not magic. Narrow AI, LLMs, and the difference between intelligence and understanding.",app:"Understand exactly why ChatGPT confidently lies — and how to catch it every time",exercise:"Quiz an AI on 10 topics until it produces errors. Document every failure mode you find.",time:"22 min"},
      {n:"1.2",title:"The AI Landscape Map",hook:"10,000 AI tools exist. Here's the only map you'll ever need.",concept:"Full taxonomy: LLMs, image gen, audio, video, agents, specialized models, multimodal systems. When to use each.",app:"Pick the correct tool for any task in under 60 seconds without analysis paralysis",exercise:"Map 10 real-world problems to the correct AI tool category. Check and refine your answers.",time:"28 min"},
      {n:"1.3",title:"How LLMs Actually Work",hook:"Understanding the engine makes you a dramatically better driver",concept:"Tokens, attention mechanisms, transformers — explained entirely through analogy. No math required.",app:"Predict AI behavior before you prompt. Stop being surprised by failures.",exercise:"Token-count 5 prompts. Optimize each for both quality and cost simultaneously.",time:"35 min"},
      {n:"1.4",title:"Your Professional AI Stack",hook:"Pro operators use 6 core tools. Set them all up right now.",concept:"API keys, web interfaces, local vs cloud tradeoffs, cost management, security basics.",app:"A fully operational AI workspace producing real output within the hour",exercise:"Complete full workspace setup. Make your first successful API call and document it.",time:"45 min"},
      {n:"1.5",title:"Context Windows & Memory",hook:"Why AI forgets — and how to make it remember what matters",concept:"Context limits, conversation architecture, memory workarounds, state management patterns.",app:"Never lose important context in long AI working sessions again",exercise:"Design a context management system for your most complex recurring AI task.",time:"30 min"},
      {n:"1.6",title:"Hallucination & Verification",hook:"The failure mode that will make you look stupid in front of a client",concept:"Hallucination taxonomy, confidence calibration, systematic verification workflows.",app:"Catch AI errors before they reach anyone who matters",exercise:"Find and document 5 factual AI errors. Build a personal verification checklist.",time:"25 min"},
    ],
    project:{title:"AI Capability Audit",desc:"Systematically evaluate 10 AI tools against 20 real tasks from your work. Produce a ranked comparison report with justified selections.",deliverable:"A personal AI toolkit manifesto with tool selections, use cases, and cost estimates."},
    tools:["ChatGPT-4o","Claude Sonnet","Gemini Ultra","Perplexity","You.com"],
    skills:["AI literacy","Tool selection","Cost awareness","Critical evaluation","Context management"],
    keyTakeaways:["AI is pattern matching at scale, not understanding","The right tool beats the best tool for everything","Verification is non-negotiable, not optional"],
    commonMistakes:["Treating AI output as ground truth","Using one tool for everything","Ignoring context management in long sessions"],
  },
  {
    id:2,phase:"foundation",icon:"◉",
    title:"Prompt Engineering Mastery",
    sub:"The single highest-leverage skill in the AI age",
    time:"10 hrs",difficulty:"Beginner–Intermediate",lessonCount:18,
    objectives:["Master all 8 major prompting frameworks","Build a professional reusable prompt library","Engineer prompts for consistent, production-quality output","Design system prompts and AI personas for any application"],
    lessons:[
      {n:"2.1",title:"Anatomy of a Perfect Prompt",hook:"99% of bad AI output is the human's fault",concept:"RCIF framework: Role, Context, Instruction, Format, Constraints. How each transforms output quality.",app:"Turn any vague request into a precision instrument in under 2 minutes",exercise:"Rewrite 10 weak prompts using RCIF. Compare outputs side by side.",time:"30 min"},
      {n:"2.2",title:"Chain-of-Thought Prompting",hook:"Make AI show its work — get dramatically better answers",concept:"Step-by-step reasoning elicitation, tree of thought, self-consistency prompting.",app:"Complex analysis and problem-solving with reasoning you can audit",exercise:"Solve a real business case using CoT. Compare against non-CoT output.",time:"35 min"},
      {n:"2.3",title:"Few-Shot & Zero-Shot Mastery",hook:"Train an AI to think exactly like you — without code",concept:"In-context learning, example injection, format cloning, style transfer.",app:"Brand-consistent content and specialized analysis every time",exercise:"Build a few-shot prompt that outputs perfectly in your professional voice.",time:"40 min"},
      {n:"2.4",title:"System Prompts & Personas",hook:"Build a custom AI personality for every use case",concept:"System prompt architecture, persona design, behavioral constraints, instruction hierarchy.",app:"Custom AI assistants for sales, support, research, and analysis",exercise:"Engineer 3 distinct AI personas. Test each for consistency across 10 different inputs.",time:"45 min"},
      {n:"2.5",title:"Prompt Chaining & Pipelines",hook:"One prompt is a tool. A chain of prompts is a factory.",concept:"Sequential prompting, intermediate output capture, conditional logic, state passing.",app:"Multi-step content pipelines, research workflows, data transformation",exercise:"Build a 5-step research-to-published-post prompt chain on a real topic.",time:"50 min"},
      {n:"2.6",title:"Structured Output Engineering",hook:"Make AI speak your exact data format every time",concept:"Structured outputs, JSON mode, XML, schema enforcement, API-ready outputs.",app:"AI outputs that plug directly into your existing data systems",exercise:"Engineer a prompt outputting nested JSON matching a real database schema.",time:"35 min"},
      {n:"2.7",title:"Meta-Prompting",hook:"Use AI to write better prompts than you ever could alone",concept:"Prompt generation, evaluation frameworks, iterative AI-driven refinement.",app:"10× faster prompt evolution with AI doing the iteration work",exercise:"Use Claude to improve 5 existing prompts. Measure and document quality delta.",time:"40 min"},
      {n:"2.8",title:"Prompt Security",hook:"How attackers break AI systems — and how you stop them",concept:"Injection attacks, jailbreak taxonomy, adversarial inputs, defensive patterns.",app:"AI products that cannot be manipulated or broken by end users",exercise:"Red-team test a prompt system for 3 distinct attack types. Document defenses.",time:"30 min"},
    ],
    project:{title:"Professional Prompt Library",desc:"Build a library of 60 production-ready prompts across 12 business categories with documented variables, use cases, and quality benchmarks.",deliverable:"A living Notion/Airtable prompt library you'll use and expand throughout your career."},
    tools:["Claude API","OpenAI Playground","PromptLayer","LangSmith","Anthropic Console"],
    skills:["Prompt architecture","Output control","Persona design","Chain design","Security"],
    keyTakeaways:["Every output quality problem is a prompt quality problem","System prompts are the foundation of every serious AI product","Prompt chaining transforms AI from a tool into a workflow"],
    commonMistakes:["Writing vague context-free prompts","Ignoring output format specification","Not testing across edge cases"],
  },
  {
    id:3,phase:"foundation",icon:"◫",
    title:"AI Productivity & Deep Work",
    sub:"Reclaim 3 hours every single day",
    time:"8 hrs",difficulty:"Beginner",lessonCount:14,
    objectives:["Automate email, calendar, and research with AI","Build a personal AI second brain","Create custom AI assistants for recurring tasks","Measure and achieve 10× personal output"],
    lessons:[
      {n:"3.1",title:"The AI-Augmented Workday",hook:"A day in the life of someone using AI properly — it's insane",concept:"AI integration mapping, workday audit, leverage point identification and prioritization.",app:"Find your 3 highest-ROI AI opportunities in under 45 minutes",exercise:"Record your full workday hour by hour. Identify every AI-replaceable task.",time:"25 min"},
      {n:"3.2",title:"AI Email Mastery",hook:"Inbox zero every day in 20 minutes — with better replies",concept:"AI triage, tone-matched response generation, follow-up automation, template systems.",app:"Process 100 emails in the time it used to take to write 10 good ones",exercise:"Build an AI email system for your 10 most common email scenarios.",time:"40 min"},
      {n:"3.3",title:"AI Research & Summarization",hook:"Read 50 documents, extract every insight, in under an hour",concept:"Document ingestion, layered summarization, cross-document synthesis, verification.",app:"Competitive intelligence and research at 10× speed with reliable quality",exercise:"Summarize and synthesize 5 dense industry reports. Document time saved.",time:"45 min"},
      {n:"3.4",title:"Your AI Second Brain",hook:"What if AI knew everything about your work, clients, and goals?",concept:"Personal RAG systems, custom GPTs, knowledge bases, retrieval-augmented assistants.",app:"An AI assistant that understands your full context in every conversation",exercise:"Build a personal knowledge base with AI query interface. Test it with 20 questions.",time:"60 min"},
      {n:"3.5",title:"AI Meeting Intelligence",hook:"Never take a note again. Get better insights than before.",concept:"Transcription AI, structured summarization, action extraction, CRM sync.",app:"Perfect meeting follow-ups and relationship intelligence automatically",exercise:"Process a real recorded meeting end-to-end through an AI pipeline.",time:"35 min"},
      {n:"3.6",title:"AI-Accelerated Learning",hook:"Learn anything 5× faster with AI as your Socratic tutor",concept:"AI tutoring protocols, custom curriculum, spaced repetition, knowledge testing.",app:"Compress months of learning into focused weeks in any field",exercise:"Design and complete a 1-week AI-accelerated learning sprint.",time:"40 min"},
    ],
    project:{title:"Personal AI Operating System",desc:"Deploy your complete AI-augmented workflow: email, research, planning, meetings, and learning with AI at every step.",deliverable:"A running system saving a documented minimum of 10 hours per week."},
    tools:["Notion AI","Otter.ai","ChatGPT","Zapier","Superhuman","NotebookLM"],
    skills:["Time reclamation","Workflow design","Knowledge management","Meeting intelligence"],
    keyTakeaways:["Start with your 3 highest-frequency tasks — that's where ROI is highest","Your AI second brain is worth more than any individual AI tool","Meeting intelligence compounds: each meeting gets better over time"],
    commonMistakes:["Trying to automate everything at once","Not maintaining the knowledge base","Skipping the measurement step"],
  },
  /* ══ INTERMEDIATE ═════════════════════════════════════════════ */
  {
    id:4,phase:"intermediate",icon:"◐",
    title:"AI Content Engine",
    sub:"Build a content factory that never sleeps",
    time:"12 hrs",difficulty:"Intermediate",lessonCount:20,
    objectives:["Build automated end-to-end content pipelines","Master AI writing at industrial scale","Create multi-platform distribution systems","Monetize AI content ethically and profitably"],
    lessons:[
      {n:"4.1",title:"Content Strategy with AI",hook:"How one person publishes 50 quality pieces per week",concept:"Content pillar mapping, AI ideation frameworks, editorial calendar automation, repurposing trees.",app:"Build a complete 90-day content calendar in under 2 hours",exercise:"Generate 30 high-quality content ideas from one topic using AI expansion.",time:"40 min"},
      {n:"4.2",title:"Long-Form AI Writing",hook:"Write a 5,000-word article that reads like a genuine expert wrote it",concept:"Outline engineering, section-by-section generation, voice consistency, polish workflows.",app:"Blog posts, whitepapers, and ebooks at any scale with consistent quality",exercise:"Write a complete, publication-ready 3,000-word piece with AI. Document the process.",time:"60 min"},
      {n:"4.3",title:"Social Media AI Systems",hook:"One idea → 50 posts across every platform. Automatically.",concept:"Platform-specific repurposing, algorithm-aware formatting, tone adaptation, scheduling.",app:"A full social presence operating near-autopilot",exercise:"Build a complete one-to-many repurposing workflow. Run one piece through it fully.",time:"55 min"},
      {n:"4.4",title:"AI Video Scripting",hook:"The script is 80% of the video. Let AI write 80% of that.",concept:"Hook formula engineering, script structure, B-roll prompting, AI voiceover, editing pipeline.",app:"YouTube, TikTok, and course content at industrial scale",exercise:"Script, storyboard, and outline a complete video using only AI tools.",time:"50 min"},
      {n:"4.5",title:"AI SEO Domination",hook:"Rank on Google before you publish using AI prediction",concept:"Semantic SEO, NLP optimization, AI keyword clustering, content gap analysis.",app:"Rank for hundreds of keywords with AI-assisted content strategy",exercise:"Create a fully SEO-optimized piece targeting a 5-keyword semantic cluster.",time:"45 min"},
      {n:"4.6",title:"AI Copywriting for Conversion",hook:"The AI ad that outperformed the human's by 340%",concept:"AIDA, PAS, hook formulas, conversion principles, A/B variation generation.",app:"Landing pages, ads, and email sequences that consistently convert",exercise:"Write 20 ad variations. Test and document which angles perform best.",time:"40 min"},
      {n:"4.7",title:"Newsletter & Email at Scale",hook:"Grow a newsletter with AI handling 70% of the work",concept:"Issue structure templates, personalization, subject line optimization, segmentation.",app:"A thriving newsletter that feels personally crafted at any list size",exercise:"Write a full newsletter issue in under 30 minutes using AI.",time:"35 min"},
    ],
    project:{title:"Autonomous Content Machine",desc:"Build an end-to-end system: idea → outline → draft → edit → publish → distribute across 5 platforms with AI at every step.",deliverable:"A live content engine producing 10+ pieces per week with documented minimal manual input."},
    tools:["Claude","Jasper","Surfer SEO","Descript","Buffer","Canva AI","HeyGen","Beehiiv"],
    skills:["Content at scale","SEO","Platform strategy","Conversion copywriting","Newsletter growth"],
    keyTakeaways:["Content at scale requires systems, not just tools","Every piece should be repurposed at least 5 ways","Voice consistency is the #1 quality challenge at scale"],
    commonMistakes:["Publishing without human review","Ignoring platform-specific formats","Skipping SEO intent matching"],
  },
  {
    id:5,phase:"intermediate",icon:"◑",
    title:"AI Image, Video & Audio",
    sub:"The complete creative AI production toolkit",
    time:"14 hrs",difficulty:"Intermediate",lessonCount:22,
    objectives:["Master Midjourney, DALL-E, Stable Diffusion for professional output","Create cinematic AI video for commercial use","Produce professional audio with AI","Build end-to-end AI creative pipelines"],
    lessons:[
      {n:"5.1",title:"Image Generation Fundamentals",hook:"The difference between a $50 stock photo and a $0.001 AI image is 10 words",concept:"Image prompt anatomy: subject, style, lighting, camera, mood, negative prompts, aspect ratios.",app:"Brand assets, mockups, and social imagery at zero marginal cost",exercise:"Recreate a specific professional stock photo using only AI prompting.",time:"45 min"},
      {n:"5.2",title:"Midjourney Advanced Mastery",hook:"The techniques that separate amateur from professional AI imagery",concept:"Stylize, chaos, version params, image references, multi-prompts, seeds, --cref flag.",app:"Consistent brand imagery and product visualization at scale",exercise:"Create a 10-image brand mood board with full character and style consistency.",time:"60 min"},
      {n:"5.3",title:"Stable Diffusion & ControlNet",hook:"Infinite free generation with total creative control",concept:"ComfyUI workflows, ControlNet for pose/structure, LoRA training, inpainting.",app:"Custom fine-tuned models for specific brands or visual styles",exercise:"Train a LoRA on a product. Generate 20 unique on-brand variations.",time:"90 min"},
      {n:"5.4",title:"AI Video Production",hook:"Cinematic video without a camera, crew, or budget",concept:"Runway Gen-3, Kling, Sora, Pika 2.0 — prompting, directing, consistency.",app:"Ads, explainers, and social content at near-zero production cost",exercise:"Produce a complete 60-second branded video using only AI video tools.",time:"75 min"},
      {n:"5.5",title:"AI Voice, Audio & Music",hook:"Clone your voice. Create any voice. Score anything for free.",concept:"ElevenLabs voice cloning, Suno/Udio music generation, audio enhancement.",app:"Courses, ads, podcasts, multilingual content at zero marginal cost",exercise:"Build a complete audio package: voiceover + music + sound design.",time:"50 min"},
      {n:"5.6",title:"AI Avatars & Presenters",hook:"A digital version of you that presents while you sleep",concept:"HeyGen, D-ID, Synthesia — avatar creation, scripting, lip sync.",app:"Course videos, onboarding, multilingual content automatically",exercise:"Create a 3-minute product demo video using your AI avatar.",time:"45 min"},
      {n:"5.7",title:"Creative Production Pipeline",hook:"From brief to finished campaign asset in under 4 hours",concept:"Workflow orchestration, quality gates, brand consistency systems.",app:"Agency-quality creative at solo-operator speed and cost",exercise:"Build and run a complete campaign for a real product using only AI.",time:"60 min"},
    ],
    project:{title:"Full AI Creative Campaign",desc:"Create a complete campaign: hero images, 60-second video ad, audio spot, and 10 social assets — all AI-generated.",deliverable:"A production-ready creative campaign with 20+ assets, documented and ready to deploy."},
    tools:["Midjourney","DALL-E 3","Stable Diffusion","Runway ML","ElevenLabs","HeyGen","Suno","Kling"],
    skills:["Visual art direction","Video production","Voice design","Creative strategy","Brand consistency"],
    keyTakeaways:["Prompting for images is a distinct skill from text prompting","Consistency is harder than quality in AI creative work","The pipeline matters as much as any individual tool"],
    commonMistakes:["Not establishing brand style parameters upfront","Ignoring resolution requirements","Skipping quality gates"],
  },
  {
    id:6,phase:"intermediate",icon:"◒",
    title:"AI Automation & No-Code",
    sub:"Build systems that generate value while you sleep",
    time:"16 hrs",difficulty:"Intermediate",lessonCount:24,
    objectives:["Build complex multi-step automations confidently","Connect AI to hundreds of apps","Create autonomous business systems","Design workflows that replace manual labor"],
    lessons:[
      {n:"6.1",title:"Automation Architecture Thinking",hook:"Think in systems, not tasks — the mindset shift that changes everything",concept:"Triggers, actions, conditions, loops, error handling, idempotency, retry logic.",app:"Map any business process to an automatable workflow in minutes",exercise:"Draw automation diagrams for 3 real processes in your work or life.",time:"35 min"},
      {n:"6.2",title:"Make.com Deep Dive",hook:"The most powerful no-code automation platform most people ignore",concept:"Scenarios, routers, iterators, data transformers, webhooks, error handlers.",app:"Complex multi-step automations without writing a single line of code",exercise:"Build a lead capture → qualify → assign → notify automation end to end.",time:"90 min"},
      {n:"6.3",title:"Zapier AI Workflows",hook:"Connect everything to AI with zero code and zero friction",concept:"Zaps, paths, filters, AI steps, code blocks, webhook triggers.",app:"Cross-platform AI-enhanced data sync and process automation",exercise:"Build a social mention → sentiment → CRM → response automation.",time:"75 min"},
      {n:"6.4",title:"n8n: The Self-Hosted Powerhouse",hook:"Own your automations completely. Pay nothing per run.",concept:"Node types, credential management, expressions, complex workflows.",app:"Enterprise-grade automations at zero per-run cost on your own infrastructure",exercise:"Build an n8n AI agent workflow from a completely blank canvas.",time:"90 min"},
      {n:"6.5",title:"AI Customer Service Automation",hook:"Handle 80% of support tickets without a human — and customers prefer it",concept:"Chatbot design, escalation logic, knowledge base integration, sentiment routing.",app:"24/7 support that resolves issues instead of deflecting them",exercise:"Build a support bot handling 10 common scenarios end to end.",time:"70 min"},
      {n:"6.6",title:"Document & Data Automation",hook:"Turn any document into structured data at any volume",concept:"OCR + AI, document parsing, extraction pipelines, report generation.",app:"Invoice processing, contract analysis, form automation",exercise:"Build an invoice → structured JSON → spreadsheet → report pipeline.",time:"55 min"},
      {n:"6.7",title:"AI + CRM Automation",hook:"Your CRM should update itself. Here's how.",concept:"HubSpot + AI, pipeline automation, AI lead scoring, sequence triggers.",app:"Automatic scoring, follow-ups, and deal progression with no manual entry",exercise:"Build an AI-powered lead intelligence and nurture system in a real CRM.",time:"60 min"},
    ],
    project:{title:"Autonomous Business Unit",desc:"Build a complete automated function: lead capture, AI qualification, nurturing, support, and weekly reporting with AI at every step.",deliverable:"A running automation with documented ROI replacing 10+ hours of manual work weekly."},
    tools:["Make.com","Zapier","n8n","Airtable","HubSpot","Typeform","Slack","Clay"],
    skills:["Automation architecture","No-code development","Systems thinking","Process design","ROI measurement"],
    keyTakeaways:["Best automations eliminate job functions, not just tasks","Error handling is 50% of production automation work","Start with the process you hate most — that's where ROI is highest"],
    commonMistakes:["Building without error handling","Not testing edge cases","Automating a broken process instead of fixing it first"],
  },
  {
    id:7,phase:"intermediate",icon:"◓",
    title:"AI Marketing & Sales",
    sub:"Build the world's most efficient revenue engine",
    time:"14 hrs",difficulty:"Intermediate",lessonCount:20,
    objectives:["Deploy AI across the full marketing and sales funnel","Build AI-powered sales systems that improve conversion","Create personalized campaigns at unlimited scale","Measure and optimize with AI analytics"],
    lessons:[
      {n:"7.1",title:"AI Market Research",hook:"Know your customer better than they know themselves",concept:"Persona generation, pain point mining, competitor analysis, trend detection, ICP refinement.",app:"Launch products with AI-validated product-market fit",exercise:"Produce a complete market analysis for a product category using only AI.",time:"50 min"},
      {n:"7.2",title:"AI Paid Advertising",hook:"The system that cut cost-per-acquisition by 60%",concept:"Creative variation at scale, AI audience research, copy testing, performance prediction.",app:"Meta, Google, TikTok ads with AI-driven creative iteration",exercise:"Build a 20-variation ad creative test using AI for all copy and imagery.",time:"55 min"},
      {n:"7.3",title:"AI Email Marketing",hook:"Personalized at the scale of a million subscribers",concept:"Dynamic segmentation, personalized content, subject line AI, send-time optimization.",app:"Campaigns that feel hand-written to every subscriber at any list size",exercise:"Build a fully AI-personalized 5-email nurture sequence.",time:"45 min"},
      {n:"7.4",title:"AI Sales Intelligence",hook:"Your team should know everything before the first word",concept:"AI prospect research, intent data, conversation intelligence, objection libraries.",app:"Higher close rates with AI-prepared, fully-briefed sales reps",exercise:"Build an AI sales brief generator for any incoming lead.",time:"50 min"},
      {n:"7.5",title:"Conversational AI for Sales",hook:"The bot booking 30 qualified calls per month on autopilot",concept:"Qualification bot design, AI-driven follow-up, booking integration.",app:"A perpetual-motion lead qualification and meeting booking system",exercise:"Build a conversational bot that qualifies and books meetings.",time:"60 min"},
      {n:"7.6",title:"AI Analytics & BI",hook:"Talk to your data in plain English",concept:"Natural language querying, AI insight generation, anomaly detection, automated reporting.",app:"Instant executive dashboards and forecasting without SQL",exercise:"Build a natural language reporting interface for a real business metric.",time:"45 min"},
    ],
    project:{title:"AI Revenue System",desc:"Build a full-funnel AI system: awareness, lead capture, AI qualification, nurture, and conversion — fully instrumented for optimization.",deliverable:"A live revenue system outperforming the manual baseline with documented metrics."},
    tools:["Instantly.ai","Clay","Apollo","AdCreative.ai","Klaviyo","Mutiny","Gong","Surfer SEO"],
    skills:["Growth marketing","Sales automation","Data analysis","Conversion optimization"],
    keyTakeaways:["Personalization at scale is the #1 AI competitive advantage","AI sales intelligence beats any CRM feature","The analytics step is where most AI revenue systems fail"],
    commonMistakes:["Over-automating before validating the manual process","Ignoring deliverability in AI email","Not A/B testing AI-generated creative"],
  },
  /* ══ ADVANCED ═════════════════════════════════════════════════ */
  {
    id:8,phase:"advanced",icon:"◈",
    title:"AI Coding & Development",
    sub:"Build software 10× faster with AI as your engineering partner",
    time:"20 hrs",difficulty:"Advanced",lessonCount:28,
    objectives:["Build complete applications with AI assistance","Master every major AI coding tool","Deploy AI-powered products to production","Design AI-native software architecture"],
    lessons:[
      {n:"8.1",title:"The AI Developer Mindset",hook:"Coding is now about architecture and taste, not typing",concept:"AI as pair programmer, code reviewer, architecture partner, documentation engine.",app:"Ship more in a day than most developers ship in a week",exercise:"Rebuild a simple project using only AI-assisted coding — time it vs. your normal pace.",time:"40 min"},
      {n:"8.2",title:"GitHub Copilot Mastery",hook:"The shortcut that replaces 40% of your typing permanently",concept:"Copilot chat, inline completions, context optimization, custom instructions.",app:"Dramatically faster development across all languages",exercise:"Build a complete REST API using only Copilot completions.",time:"60 min"},
      {n:"8.3",title:"Cursor & AI-Native IDEs",hook:"The IDE that turned a non-developer into a product builder",concept:"Cursor Composer, full codebase chat, multi-file editing, large context.",app:"Build entire features from single natural language descriptions",exercise:"Build a complete feature from scratch using only Cursor Composer.",time:"75 min"},
      {n:"8.4",title:"Claude Code & Autonomous Coding",hook:"Tell AI what to build. Come back to something running.",concept:"Claude Code CLI, agentic loops, file system interaction, test generation.",app:"Fully autonomous development for well-scoped tasks",exercise:"Write a spec for a module and let Claude Code build it autonomously.",time:"90 min"},
      {n:"8.5",title:"Vibe Coding & Rapid Prototyping",hook:"From idea to working prototype in 2 hours — no CS degree required",concept:"Bolt.new, Lovable, v0 — prompting UI, logic, database, and deployment together.",app:"MVPs, internal tools, client demos at zero development cost",exercise:"Build a complete SaaS interface from a written description in under 3 hours.",time:"120 min"},
      {n:"8.6",title:"AI API Integration",hook:"Add powerful AI features to any app in 30 minutes",concept:"REST APIs, streaming responses, function calling, tool use, structured outputs.",app:"AI features in any product regardless of tech stack",exercise:"Add 3 distinct AI features to an existing application via API.",time:"60 min"},
      {n:"8.7",title:"AI Pipelines in Python",hook:"LangChain, LlamaIndex, and the production AI engineering stack",concept:"Chain composition, retrieval, memory management, tool use, streaming, async.",app:"Production AI backends and pipelines at scale",exercise:"Build a multi-step pipeline with retrieval, memory, and tool use in Python.",time:"90 min"},
      {n:"8.8",title:"Testing, Evals & Deploying AI",hook:"AI in production fails in ways regular code never does",concept:"Evals design, regression testing, latency, cost monitoring, observability.",app:"Reliable AI features that don't fail in production",exercise:"Build a complete eval suite for a real AI-powered feature.",time:"60 min"},
    ],
    project:{title:"AI-Native SaaS Build",desc:"Build a complete deployed SaaS: authentication, database, AI core feature, billing, and deployment to a real domain.",deliverable:"A live, publicly accessible AI-powered application with production-ready architecture."},
    tools:["Cursor","GitHub Copilot","Claude Code","Bolt.new","Vercel","Supabase","LangChain","Railway"],
    skills:["Full-stack AI dev","API integration","Deployment","AI engineering","Eval design"],
    keyTakeaways:["Architecture decisions matter 10× more in AI systems","Evals are your most important investment","The gap between prototype and production is wider in AI"],
    commonMistakes:["Skipping evals entirely","Not handling API failures gracefully","Building without cost monitoring from day one"],
  },
  {
    id:9,phase:"advanced",icon:"◉",
    title:"AI Agents & Autonomous Systems",
    sub:"Build AI that acts, decides, and executes on its own",
    time:"18 hrs",difficulty:"Advanced",lessonCount:22,
    objectives:["Understand agent architecture and build production agents","Create multi-agent collaborative systems","Deploy autonomous business workflows","Build agentic products users trust"],
    lessons:[
      {n:"9.1",title:"Agent Architecture Fundamentals",hook:"An AI agent isn't a chatbot. It's an autonomous employee.",concept:"Perception-Planning-Memory-Action loop, ReAct pattern, tool use, agent types.",app:"Understand any framework deeply and design any agent confidently",exercise:"Design a full architecture diagram for a customer service AI agent.",time:"45 min"},
      {n:"9.2",title:"Building with LangGraph",hook:"The most powerful way to build production-grade agents",concept:"State machines, typed state, nodes, edges, conditional routing, human-in-the-loop.",app:"Complex multi-step agents with reliable logic and graceful error recovery",exercise:"Build a research agent that searches, reads, synthesizes, and formats a report.",time:"90 min"},
      {n:"9.3",title:"Tool Use & Function Calling",hook:"Give AI real hands — let it search, calculate, write, and execute",concept:"Tool definition schemas, parallel calls, error handling, chaining patterns.",app:"Agents that operate real software systems end to end",exercise:"Build a tool-using agent with web search, calculations, and email.",time:"75 min"},
      {n:"9.4",title:"Memory Systems for Agents",hook:"Build an AI that remembers and improves over time",concept:"Short-term context, long-term vector memory, episodic and semantic memory.",app:"Personalized agents that improve with every interaction",exercise:"Add persistent vector memory to an agent. Test cross-session recall quality.",time:"60 min"},
      {n:"9.5",title:"Multi-Agent Orchestration",hook:"One AI is impressive. Ten collaborating is transformative.",concept:"Supervisor-worker patterns, communication protocols, CrewAI, consensus.",app:"Complex knowledge work done autonomously with specialist agents",exercise:"Build a 4-agent research and writing team producing real reports.",time:"90 min"},
      {n:"9.6",title:"Computer Use Agents",hook:"AI that uses your computer like a human operator. It's here.",concept:"Anthropic Computer Use, browser agents, UI automation, screenshot reasoning.",app:"Automate any desktop or web workflow without APIs",exercise:"Build a computer use agent completing a real multi-step web task.",time:"75 min"},
      {n:"9.7",title:"Agent Reliability & Safety",hook:"An unreliable agent causes disasters — here's how to prevent them",concept:"Guardrails, human-in-the-loop design, rollback, monitoring, cost limits.",app:"Agents you can trust running autonomously in production",exercise:"Add a complete reliability and safety layer to an existing agent.",time:"50 min"},
    ],
    project:{title:"Autonomous AI Employee",desc:"Build and deploy a multi-tool agent that autonomously completes a complex recurring business task — research, execution, and reporting included.",deliverable:"A running agent completing a real workflow autonomously with full logging."},
    tools:["LangGraph","CrewAI","AutoGen","Claude API","OpenAI Agents SDK","Composio","E2B"],
    skills:["Agent engineering","Multi-agent design","Autonomous workflow","Reliability","Safety"],
    keyTakeaways:["Agents fail differently from regular software — design for it","Human-in-the-loop is a feature, not a limitation","Memory architecture determines usefulness more than model capability"],
    commonMistakes:["Giving agents too much autonomy too fast","Not logging agent actions","Skipping the reliability layer until after a failure"],
  },
  {
    id:10,phase:"advanced",icon:"◫",
    title:"RAG & Knowledge Systems",
    sub:"Build AI that deeply knows your data",
    time:"16 hrs",difficulty:"Advanced",lessonCount:18,
    objectives:["Build production RAG systems from first principles","Implement vector databases at scale","Create enterprise AI knowledge bases","Deploy semantic search that actually works"],
    lessons:[
      {n:"10.1",title:"RAG Architecture Deep Dive",hook:"Every serious AI product is built on this. Here's exactly how.",concept:"Ingestion, chunking, embedding, vector storage, retrieval, augmented generation — full pipeline.",app:"AI that knows your documents, products, and institutional knowledge",exercise:"Build a complete RAG pipeline from scratch with 3 document types.",time:"60 min"},
      {n:"10.2",title:"Embeddings & Semantic Search",hook:"Semantic search is magic until you understand it — then it's power",concept:"Embedding models, cosine similarity, ANN algorithms, bi-encoders vs cross-encoders.",app:"Search that understands meaning and context, not just keywords",exercise:"Build a semantic search engine. Evaluate precision and recall.",time:"75 min"},
      {n:"10.3",title:"Production Vector Databases",hook:"Pinecone, Qdrant, Weaviate — which one and exactly why",concept:"Indexing strategies, metadata filtering, hybrid search, performance, cost.",app:"Production knowledge systems for thousands of documents with real users",exercise:"Set up a vector database with 1,000 real documents. Test and optimize.",time:"60 min"},
      {n:"10.4",title:"Advanced Retrieval Strategies",hook:"Basic RAG is mediocre. Advanced RAG is a superpower.",concept:"Hybrid search, re-ranking, multi-query, HyDE, parent-child chunking.",app:"AI that retrieves precisely the right information consistently",exercise:"Implement and compare 4 retrieval strategies on identical queries.",time:"90 min"},
      {n:"10.5",title:"Enterprise Knowledge Systems",hook:"Build AI that knows everything about a company at any scale",concept:"Document processing pipelines, access control, versioning, governance.",app:"Internal AI assistants trusted for business-critical questions",exercise:"Build an internal knowledge AI for a 500+ document corpus.",time:"80 min"},
    ],
    project:{title:"Enterprise Knowledge AI",desc:"Build a production RAG system: 500+ documents, hybrid search, re-ranking, and a polished chat interface.",deliverable:"A deployed knowledge AI you can immediately demo to enterprise clients."},
    tools:["Pinecone","Qdrant","LlamaIndex","LangChain","OpenAI Embeddings","Cohere Rerank","Weaviate"],
    skills:["RAG engineering","Vector databases","Semantic search","Knowledge architecture","Retrieval optimization"],
    keyTakeaways:["Chunking strategy is the most underrated RAG decision","Hybrid search outperforms pure semantic search almost always","Evaluation is the only way to know if retrieval is working"],
    commonMistakes:["Fixed chunk sizes for all document types","Not filtering metadata before vector search","Skipping re-ranking in production"],
  },
  {
    id:11,phase:"advanced",icon:"◐",
    title:"AI Business Strategy",
    sub:"Transform any organization with AI at the strategic level",
    time:"12 hrs",difficulty:"Advanced",lessonCount:16,
    objectives:["Conduct rigorous AI audits and build transformation roadmaps","Deploy AI across entire organizations","Measure and communicate AI ROI","Lead AI transformation from strategy to execution"],
    lessons:[
      {n:"11.1",title:"AI Readiness Assessment",hook:"Every business is at a different AI starting point — find yours",concept:"AI maturity model, data readiness, process auditability, team capability.",app:"Create credible AI transformation roadmaps for any organization",exercise:"Conduct a full AI readiness audit on a real or fictional business.",time:"50 min"},
      {n:"11.2",title:"AI Opportunity Identification",hook:"The 5 places in every business where AI delivers highest ROI",concept:"Task classification, automation feasibility, value vs. effort matrix.",app:"A prioritized AI roadmap that justifies itself financially",exercise:"Map a business unit and identify all high-value AI insertion points.",time:"45 min"},
      {n:"11.3",title:"AI Change Management",hook:"Technology isn't the hard part. People always are.",concept:"Adoption curve, training frameworks, fear mitigation, culture change.",app:"Successful org-wide AI rollouts without resistance and failure",exercise:"Design a change management plan for a real AI deployment scenario.",time:"40 min"},
      {n:"11.4",title:"AI ROI & Business Cases",hook:"If you can't measure it, you can't get the budget — or keep it",concept:"ROI frameworks, productivity metrics, quality metrics, cost-benefit analysis.",app:"Executive-ready AI business cases that get approved and funded",exercise:"Build a complete 3-year ROI model for a specific AI deployment.",time:"45 min"},
      {n:"11.5",title:"Enterprise AI Architecture",hook:"How Fortune 500s structure AI — and what you can steal",concept:"AI platform design, data governance, security, vendor selection, build vs. buy.",app:"Enterprise AI that scales, complies, and actually gets used",exercise:"Design the complete AI infrastructure for a 500-person company.",time:"60 min"},
    ],
    project:{title:"AI Transformation Blueprint",desc:"Complete AI transformation strategy: readiness audit, 3-year roadmap, technology selection, change plan, and ROI projection.",deliverable:"A consultant-grade strategy document ready for C-suite presentation."},
    tools:["Miro","Notion","Airtable","Tableau","Power BI","Microsoft Copilot"],
    skills:["Strategic planning","Change management","ROI analysis","Enterprise architecture"],
    keyTakeaways:["AI readiness is about data and process quality, not enthusiasm","Change management determines adoption more than technology selection","The ROI case is often stronger than executives expect"],
    commonMistakes:["Underestimating change management","Choosing technology before defining problems","Ignoring data quality issues"],
  },
  {
    id:12,phase:"advanced",icon:"◑",
    title:"AI Research & Analysis",
    sub:"10× the depth and speed of any research process",
    time:"10 hrs",difficulty:"Advanced",lessonCount:14,
    objectives:["Conduct deep AI-assisted research at expert level","Build systematic literature review pipelines","Create competitive intelligence systems","Analyze complex data with natural language"],
    lessons:[
      {n:"12.1",title:"Deep Research Architecture",hook:"Research like a PhD in 2 hours, not 2 months",concept:"Research frameworks, source triangulation, synthesis hierarchies, verification.",app:"World-class research reports rapidly for any purpose",exercise:"Conduct a complete market research project from scratch with AI.",time:"60 min"},
      {n:"12.2",title:"Scientific Literature with AI",hook:"Read 100 papers. Understand a field. In a day.",concept:"PubMed + AI, arXiv, citation graphs, systematic review protocols.",app:"Academic research, grant writing, medical literature review",exercise:"Review 20 papers in a field. Synthesize findings into a structured report.",time:"75 min"},
      {n:"12.3",title:"Competitive Intelligence Systems",hook:"Know exactly what every competitor is doing — automatically",concept:"Web scraping + AI, news monitoring, social listening, patent analysis.",app:"Always-on competitive intelligence at zero manual effort",exercise:"Build a competitive monitoring system for a real industry.",time:"60 min"},
      {n:"12.4",title:"Data Analysis with Natural Language",hook:"Ask your data anything in plain English",concept:"Code Interpreter, Julius AI, Pandas AI, SQL + LLM, AI visualization.",app:"Deep analysis of complex datasets without SQL",exercise:"Analyze a real 10,000-row dataset using only natural language queries.",time:"55 min"},
    ],
    project:{title:"Autonomous Research Engine",desc:"Build an AI system that monitors a domain, synthesizes developments, and delivers weekly intelligence briefings automatically.",deliverable:"A live research intelligence system producing real weekly output."},
    tools:["Perplexity Pro","Elicit","Consensus","Julius AI","Tavily","NotebookLM"],
    skills:["Research methodology","Data analysis","Intelligence synthesis","Literature review"],
    keyTakeaways:["Source triangulation is non-negotiable for anything that matters","Competitive intelligence is most valuable when continuous","Natural language analysis works best with clean data"],
    commonMistakes:["Relying on one AI source for factual claims","Not setting up automatic monitoring","Ignoring data quality before analysis"],
  },
  /* ══ EXPERT ═══════════════════════════════════════════════════ */
  {
    id:13,phase:"expert",icon:"◈",
    title:"Fine-Tuning & Custom Models",
    sub:"Build AI that thinks exactly like your domain requires",
    time:"20 hrs",difficulty:"Expert",lessonCount:18,
    objectives:["Fine-tune LLMs for domain-specific tasks","Create, evaluate, and improve custom models","Deploy at production scale","Build dataset pipelines that make fine-tuning work"],
    lessons:[
      {n:"13.1",title:"When to Fine-Tune vs. Prompt",hook:"Fine-tuning costs $500. Prompting costs $0.50. When does $500 win?",concept:"Decision framework: consistency, latency, cost at scale, domain depth, data availability.",app:"Make correct build-vs-configure decisions every time",exercise:"Evaluate 5 use cases for fine-tuning vs. prompting with a scoring matrix.",time:"40 min"},
      {n:"13.2",title:"Dataset Engineering",hook:"Your model is only as good as your training data",concept:"Data collection, cleaning, deduplication, formatting, quality scoring, synthetic generation.",app:"Datasets that produce genuinely capable, reliable models",exercise:"Prepare a 500-example dataset from raw source documents.",time:"90 min"},
      {n:"13.3",title:"OpenAI Fine-Tuning Pipeline",hook:"Fine-tune GPT-4o on your data in under 3 hours",concept:"JSONL format, training runs, hyperparameters, evaluation, cost management.",app:"Custom models for classification, extraction, and specialized generation",exercise:"Fine-tune a model for a specific task. Rigorously evaluate against baseline.",time:"90 min"},
      {n:"13.4",title:"Open-Source Fine-Tuning",hook:"Fine-tune Llama, Mistral, Qwen for free — or near-free",concept:"LoRA, QLoRA, PEFT, Unsloth, Axolotl, Hugging Face Trainer.",app:"Custom models you own that run anywhere at zero per-call cost",exercise:"Fine-tune Llama 3.1 8B on a domain task end to end. Evaluate rigorously.",time:"120 min"},
      {n:"13.5",title:"Model Evaluation & Benchmarking",hook:"How do you actually know your model improved?",concept:"Eval suite design, LLM-as-judge, benchmarking, regression testing.",app:"Scientifically validate every model change. Never ship a regression.",exercise:"Design and run a complete eval suite for a custom model.",time:"75 min"},
      {n:"13.6",title:"Deploying Custom Models",hook:"A fine-tuned model no one can access is worthless",concept:"Modal, Replicate, HF Inference, Together AI, vLLM, batching, auto-scaling.",app:"Production model APIs at competitive cost with real reliability",exercise:"Deploy a fine-tuned model as a scalable, monitored API endpoint.",time:"60 min"},
    ],
    project:{title:"Domain Expert Model",desc:"Fine-tune an open-source model on a professional domain, evaluate against baseline, and deploy as a production API.",deliverable:"A running custom model outperforming the base model on your target task."},
    tools:["OpenAI Fine-tuning","Unsloth","Axolotl","Weights & Biases","Hugging Face","Modal","vLLM"],
    skills:["Model training","Dataset engineering","Evaluation","Deployment","Cost optimization"],
    keyTakeaways:["Dataset quality determines 80% of fine-tuning outcome","Evals must be designed before training begins","QLoRA made open-source fine-tuning accessible to anyone"],
    commonMistakes:["Starting without a strong eval suite","Under-investing in dataset quality","Not benchmarking against base model before deployment"],
  },
  {
    id:14,phase:"expert",icon:"◉",
    title:"AI Monetization & Entrepreneurship",
    sub:"Build businesses that generate real income with AI",
    time:"16 hrs",difficulty:"Expert",lessonCount:20,
    objectives:["Identify and validate AI business opportunities","Build and launch AI products with paying customers","Create profitable AI service businesses","Scale multiple AI revenue streams"],
    lessons:[
      {n:"14.1",title:"The AI Business Opportunity Map",hook:"12 categories of AI businesses you could start this month",concept:"AI products, services, agencies, courses, SaaS — full taxonomy and selection criteria.",app:"Pick the right AI business model for your skills and situation",exercise:"Score 5 AI business ideas against a structured opportunity framework.",time:"50 min"},
      {n:"14.2",title:"AI SaaS Blueprint",hook:"Build an AI SaaS without funding or a technical co-founder",concept:"Problem selection, AI core design, distribution, pricing logic, growth loops.",app:"A validated AI SaaS ready to build and launch within 30 days",exercise:"Complete a business model canvas for a specific AI SaaS opportunity.",time:"60 min"},
      {n:"14.3",title:"AI Agency Model",hook:"The fastest path to $10K/month with AI skills",concept:"Service productization, client acquisition, delivery systematization, scaling.",app:"A running AI agency with paying clients within 60 days",exercise:"Design your complete offer, pricing, and first 20 targeted outreach messages.",time:"55 min"},
      {n:"14.4",title:"AI Consulting Practice",hook:"Companies pay $500/hour for AI strategy. Here's how to deliver it.",concept:"Expert positioning, frameworks, deliverable design, premium pricing.",app:"A consulting practice that commands and justifies premium rates",exercise:"Build a complete AI consulting offer with a real case study.",time:"50 min"},
      {n:"14.5",title:"Building AI-Powered Products",hook:"From idea to paying customers in 30 days flat",concept:"No-code and low-code AI product development, MVP, launch strategy.",app:"A live AI product generating real revenue from real customers",exercise:"Build and launch an AI micro-product in a single sprint.",time:"120 min"},
      {n:"14.6",title:"Pricing & Packaging",hook:"Most AI businesses leave 50% of revenue on the table",concept:"Value-based pricing, tier packaging, retainers, performance fees.",app:"Dramatically higher revenue from the exact same work",exercise:"Redesign the pricing architecture for a real or fictional AI service.",time:"40 min"},
      {n:"14.7",title:"Scaling AI Operations",hook:"What gets you to $10K/month won't get you to $100K/month",concept:"Delivery systematization, hiring AI talent, operational playbooks.",app:"An AI business that scales revenue without scaling founder hours",exercise:"Design the operational playbook for an AI business at 10× current scale.",time:"45 min"},
    ],
    project:{title:"AI Business Launch",desc:"From validated idea to first dollar: build, launch, and acquire your first paying customer.",deliverable:"A live AI business with at least one paying customer and documented acquisition path."},
    tools:["Stripe","Framer","Lemon Squeezy","Apollo","Typeform","Beehiiv","Cal.com"],
    skills:["Business strategy","Product development","Client acquisition","Revenue operations","Scaling"],
    keyTakeaways:["First paying customer teaches more than 1,000 hours of planning","Service businesses fund SaaS businesses — use that sequencing","Pricing is a positioning decision, not a cost calculation"],
    commonMistakes:["Building before validating customer and problem","Under-pricing to win clients","Trying to scale before systematizing delivery"],
  },
  {
    id:15,phase:"expert",icon:"◫",
    title:"Open-Source & Local AI",
    sub:"Own your entire stack. Pay nothing per inference.",
    time:"18 hrs",difficulty:"Expert",lessonCount:16,
    objectives:["Run production-grade AI locally and privately","Master the open-source model ecosystem","Build fully private AI systems","Deploy self-hosted infrastructure at any scale"],
    lessons:[
      {n:"15.1",title:"Open-Source AI Landscape",hook:"Meta, Mistral, and Alibaba made frontier AI free. Here's what that means.",concept:"Llama, Mistral, Qwen, Gemma, Phi — capabilities, benchmarks, use-case fit.",app:"Make informed open vs. closed source decisions for every use case",exercise:"Benchmark 3 open-source models vs. GPT-4o on your specific use case.",time:"60 min"},
      {n:"15.2",title:"Running Models with Ollama",hook:"ChatGPT-level AI on your laptop. Free. Private. Offline.",concept:"Ollama setup, model pulling, API endpoint, selection, quantization levels.",app:"Private AI for sensitive data — nothing leaves your machine",exercise:"Set up 5 local models. Compare quality, speed, and memory use.",time:"45 min"},
      {n:"15.3",title:"Open WebUI & Local Interfaces",hook:"Build your own fully-featured ChatGPT with complete control",concept:"Open WebUI, LM Studio, Jan — setup, configuration, team access.",app:"Professional local AI for any individual or team of any size",exercise:"Deploy Open WebUI with 3 models and custom system prompts.",time:"50 min"},
      {n:"15.4",title:"Cloud GPU Deployment",hook:"Self-host AI at 10% of OpenAI's cost with full control",concept:"RunPod, vast.ai, Lambda Labs — provisioning, vLLM, cost optimization.",app:"Production APIs at dramatically lower cost with complete data control",exercise:"Deploy a production Llama inference server on RunPod with monitoring.",time:"75 min"},
      {n:"15.5",title:"Private AI for Enterprise",hook:"AI that never sends your data anywhere — certified and sovereign",concept:"Air-gapped deployments, on-premise inference, data sovereignty, compliance.",app:"Enterprise AI for regulated industries: finance, healthcare, legal",exercise:"Design a complete private AI architecture for a regulated industry.",time:"60 min"},
    ],
    project:{title:"Private AI Infrastructure",desc:"Build a complete private system: local model serving, RAG knowledge base, web interface, API — on infrastructure you own.",deliverable:"A fully self-hosted AI system with zero external data dependencies."},
    tools:["Ollama","LM Studio","Open WebUI","RunPod","vLLM","LocalAI","Hugging Face"],
    skills:["Infrastructure","Cost optimization","Data privacy","Self-hosting","Compliance"],
    keyTakeaways:["Local models are genuinely production-capable for most use cases","Privacy is a feature you can sell in regulated industries","Self-hosted AI's TCO is lower than cloud at any meaningful volume"],
    commonMistakes:["Choosing quantization without testing quality impact","Not planning model update procedures","Underestimating hardware requirements"],
  },
  {
    id:16,phase:"expert",icon:"◐",
    title:"AI Ethics & Governance",
    sub:"Build AI that is powerful, responsible, and trusted",
    time:"8 hrs",difficulty:"Expert",lessonCount:10,
    objectives:["Understand and mitigate real AI risks in production","Implement responsible AI practices","Navigate AI regulation and compliance","Build governance frameworks for organizational AI"],
    lessons:[
      {n:"16.1",title:"AI Risk Taxonomy",hook:"The AI failures that cost billions — and the patterns behind them",concept:"Bias, hallucination, misuse, security vulnerabilities, concentration risks.",app:"Identify and mitigate risks in any AI system before deployment",exercise:"Conduct a structured risk audit on a real AI deployment.",time:"45 min"},
      {n:"16.2",title:"Bias, Fairness & Representation",hook:"Your AI might be discriminating right now. Here's how to find out.",concept:"Algorithmic bias types, demographic parity, disparate impact testing.",app:"AI that demonstrably treats all users fairly",exercise:"Design and run a systematic bias test on a real AI system.",time:"40 min"},
      {n:"16.3",title:"AI Regulation & Compliance",hook:"The EU AI Act changes everything for every AI product",concept:"EU AI Act risk classification, GDPR implications, US orders, sector standards.",app:"Compliant AI products that enter regulated markets without legal risk",exercise:"Classify a portfolio of AI applications under the EU AI Act.",time:"50 min"},
      {n:"16.4",title:"AI Safety Engineering",hook:"Safety is the feature that makes every other feature more valuable",concept:"Content filtering, output monitoring, rate limiting, human oversight, red-teaming.",app:"AI safe enough to deploy to real users at real scale",exercise:"Design and implement a complete safety layer for an AI application.",time:"45 min"},
    ],
    project:{title:"Responsible AI Framework",desc:"Create a governance framework: risk taxonomy, mitigation, policies, compliance checklist, and audit trail.",deliverable:"An audit-ready AI governance document meeting global regulatory standards."},
    tools:["Guardrails AI","Azure AI Content Safety","Langfuse","LlamaGuard","OpenAI Moderation"],
    skills:["Risk assessment","Compliance","Fairness testing","Governance","Red-teaming"],
    keyTakeaways:["Safety is a competitive advantage, not a constraint","Governance prevents problems that destroy companies overnight","Bias testing must be systematic and documented, not ad hoc"],
    commonMistakes:["Treating safety as post-launch","Not testing for bias before deployment","Ignoring jurisdiction-specific regulations"],
  },
  {
    id:17,phase:"expert",icon:"◑",
    title:"AI System Design & Architecture",
    sub:"Design AI-native products that scale to millions",
    time:"20 hrs",difficulty:"Expert",lessonCount:20,
    objectives:["Design scalable AI systems from first principles","Architect multi-modal AI products","Build observable, maintainable AI infrastructure","Lead technical AI strategy at any scale"],
    lessons:[
      {n:"17.1",title:"AI System Design Patterns",hook:"The patterns behind every AI product that works at scale",concept:"Gateway pattern, orchestration layer, fallback chains, cache-aside, async processing.",app:"Design reliable, scalable AI systems from first principles",exercise:"Design the complete architecture for a real AI product idea.",time:"60 min"},
      {n:"17.2",title:"Multi-Modal AI Architecture",hook:"Products that see, hear, speak, and write — how they're built",concept:"Vision + text pipelines, audio integration, cross-modal routing, fusion.",app:"AI products using multiple modalities seamlessly",exercise:"Design a complete multi-modal AI system with data flow diagrams.",time:"75 min"},
      {n:"17.3",title:"AI Observability & Operations",hook:"You can't improve what you can't measure — especially in AI",concept:"Distributed tracing, structured logging, cost tracking, latency, quality metrics.",app:"Production AI systems you can debug, improve, and explain",exercise:"Instrument a real AI application with a full observability stack.",time:"60 min"},
      {n:"17.4",title:"Scaling AI Infrastructure",hook:"From 100 to 1,000,000 users without paging you at 3am",concept:"Load balancing for LLMs, semantic caching, async processing, queue architecture.",app:"AI products that handle viral growth without degradation",exercise:"Design a scaling architecture for a specific AI product at 10× load.",time:"55 min"},
    ],
    project:{title:"AI Architecture Document",desc:"Complete system design document: architecture diagrams, data flow, scaling strategy, observability plan, and cost model.",deliverable:"A technical architecture document any engineering team could execute."},
    tools:["Mermaid","Lucidchart","LangSmith","Helicone","Datadog","Redis","Cloudflare"],
    skills:["System design","Architecture","Observability","Cost modeling","Scaling"],
    keyTakeaways:["Caching is the highest-ROI optimization in any AI system","Observability must be designed in, not bolted on","Cost model is as important as the technical architecture"],
    commonMistakes:["Not planning cache invalidation","Ignoring P99 latency","Building without a failure budget"],
  },
  {
    id:18,phase:"expert",icon:"◒",
    title:"The Future of AI",
    sub:"Position yourself ahead of what's coming",
    time:"8 hrs",difficulty:"Expert",lessonCount:10,
    objectives:["Understand AI's real development trajectory","Position for emerging opportunities early","Evaluate frontier capabilities with intellectual honesty","Build an AI career that compounds over a decade"],
    lessons:[
      {n:"18.1",title:"AI Capability Trajectories",hook:"AI in 2030 will be as different from today as today is from 2020",concept:"Scaling laws, capability emergence, reasoning improvements, agentic capability roadmap.",app:"Career and business decisions based on real trajectory, not media narrative",exercise:"Create a personal AI capability prediction timeline with confidence levels.",time:"45 min"},
      {n:"18.2",title:"AI & The Future of Work",hook:"Which jobs survive? Which thrive? Which disappear entirely?",concept:"Task decomposition, augmentation vs automation spectrum, new role creation.",app:"Career planning and workforce strategy that holds up as AI advances",exercise:"Audit your role for AI impact. Redesign it for resilience and leverage.",time:"50 min"},
      {n:"18.3",title:"Emerging AI Technologies",hook:"Technologies redefining AI in the next 36 months — before they're obvious",concept:"World models, embodied AI, AI scientists, long context scaling, reasoning models.",app:"Early mover advantage before everyone else sees it coming",exercise:"Identify 3 emerging AI opportunities. Build a concrete 90-day action plan.",time:"45 min"},
      {n:"18.4",title:"Building a Compounding AI Career",hook:"The highest-paid, fastest-growing skill set on Earth — how to build it",concept:"AI career paths, skill stack design, personal brand, portfolio, network effects.",app:"An AI career that compounds in value as technology advances",exercise:"Write your complete AI career roadmap with 6-month milestones.",time:"40 min"},
    ],
    project:{title:"AI Future Thesis",desc:"Write and publish a personal AI futures document: trajectory view, industry impact, and your strategic response.",deliverable:"A published thought leadership piece establishing your AI perspective publicly."},
    tools:["Substack","LinkedIn","NotebookLM","Perplexity","Claude","Gamma"],
    skills:["Strategic foresight","Career design","Thought leadership","Trend analysis"],
    keyTakeaways:["People who shape AI adoption do better than those who just use AI","Career capital compounds fastest when built in public","Your AI future thesis is your most important marketing document"],
    commonMistakes:["Planning for today's AI instead of 3 years from now","Avoiding public opinions out of fear of being wrong","Waiting for certainty before acting on trends"],
  },
];

/* ─── PROMPT TOOLKIT DATA ────────────────────────────────────── */
const TOOL_MAP = {
  claude:    {label:"Claude",       color:"#E8844A"},
  chatgpt:   {label:"ChatGPT",      color:"#10A37F"},
  gemini:    {label:"Gemini",       color:"#4285F4"},
  midjourney:{label:"Midjourney",   color:"#FF6B9D"},
  dalle:     {label:"DALL·E",       color:"#10A37F"},
  perplexity:{label:"Perplexity",   color:"#20B8CD"},
  cursor:    {label:"Cursor",       color:"#9B59B6"},
  runway:    {label:"Runway",       color:"#FF4444"},
  suno:      {label:"Suno",         color:"#F5A623"},
  elevenlabs:{label:"ElevenLabs",   color:"#7B68EE"},
  stable:    {label:"Stable Diff.", color:"#FF8C42"},
  notebooklm:{label:"NotebookLM",   color:"#4285F4"},
};

const PCATS = [
  {id:"all",       label:"All Prompts",    icon:"◈"},
  {id:"writing",   label:"Writing",        icon:"✦"},
  {id:"business",  label:"Business",       icon:"◆"},
  {id:"coding",    label:"Coding & Dev",   icon:"⟨⟩"},
  {id:"research",  label:"Research",       icon:"◎"},
  {id:"marketing", label:"Marketing",      icon:"▲"},
  {id:"image",     label:"Image Gen",      icon:"◐"},
  {id:"productivity",label:"Productivity", icon:"◉"},
  {id:"creativity",label:"Creative",       icon:"✧"},
  {id:"thinking",  label:"Deep Thinking",  icon:"⬡"},
  {id:"automation",label:"Automation",     icon:"⟳"},
  {id:"career",    label:"Career",         icon:"◇"},
];

const PROMPTS = [
  {id:1,cat:"writing",tier:"POWER",title:"The Expert Voice Transfer",task:"Rewrite any content in the authoritative voice of a domain expert",tools:["claude","chatgpt"],
   prompt:`You are a world-class [FIELD] expert with 20+ years of experience, known for making complex ideas crystal clear. Rewrite the following content in your expert voice — confident, specific, insight-dense, and completely free of filler words.

Replace generic claims with precise data, trade-specific terminology, and hard-won perspective. The result must feel like it came from someone who has lived this topic, not researched it.

Content to rewrite:
[PASTE CONTENT HERE]

Expert field: [e.g. behavioral economics / enterprise security / molecular biology]
Audience: [WHO WILL READ THIS]
Desired outcome: [WHAT YOU WANT READERS TO THINK OR DO]`,
   tags:["rewriting","voice","expertise","authority"],tip:"Specify the field precisely. 'Marketing expert' = mediocre. 'B2B SaaS demand generation specialist' = gold."},

  {id:2,cat:"writing",tier:"POWER",title:"The Viral Hook Generator",task:"Generate 20 high-converting hooks using every psychological trigger",tools:["claude","chatgpt"],
   prompt:`Generate 20 distinct opening hooks for the following topic. Each hook must use a DIFFERENT psychological trigger: curiosity gap, contrarian take, shocking statistic, personal failure, future vision, common misconception, urgent warning, social proof, identity challenge, direct provocation, aspirational promise, paradox, specific number, or taboo topic.

For each hook:
- Label the trigger type
- Write exactly 1–2 sentences
- Make it impossible not to continue reading

Topic: [YOUR TOPIC]
Target audience: [WHO READS THIS]
Desired emotion: [urgency / curiosity / FOMO / inspiration]
Platform: [WHERE THIS WILL BE USED]

After all 20, select your top 3 with specific reasoning for why each will perform best for this audience.`,
   tags:["hooks","copywriting","viral","content"],tip:"Run this before writing any article, email, or video script. Test your top 3 hooks before committing to one."},

  {id:3,cat:"writing",tier:"ADVANCED",title:"The Long-Form Article Engine",task:"Write a complete, publication-ready 2,000–5,000 word article",tools:["claude","chatgpt"],
   prompt:`Write a comprehensive, publication-ready article on [TOPIC].

Structure:
- Headline: Specific, curiosity-driven, 8–12 words, no clickbait
- Subheadline: Expands the promise with mechanism + audience + timeframe
- Introduction (150–200 words): Scene or counterintuitive claim → problem → specific payoff promise
- 5–7 H2 sections (250–400 words each): 2 real-world examples, 1 counterargument addressed, 3 actionable takeaways each
- Conclusion: Synthesis + single clear call-to-action

Rules:
- NEVER use: "In today's rapidly changing world," "It's important to note," "In conclusion"
- Every sentence must earn its place
- Use specifics: names, numbers, dates, companies — not vague generalities

Tone: [authoritative / conversational / provocative]
Audience: [WHO AND THEIR KNOWLEDGE LEVEL]
Word count: [NUMBER]
Key argument: [YOUR THESIS]`,
   tags:["long-form","articles","SEO","blog"],tip:"Add 'cite real studies with authors and publication years' for research-heavy pieces. Always fact-check citations."},

  {id:4,cat:"writing",tier:"ESSENTIAL",title:"The Email That Gets Replies",task:"Write cold or warm emails with high reply rates",tools:["claude","chatgpt"],
   prompt:`Write a [cold/warm] email to [RECIPIENT TYPE] with the goal of [OUTCOME: booking a call / getting feedback / closing a deal].

Strict rules:
- Subject line: Under 8 words, no clickbait, feels personal
- Opening: Reference something specific about them (not generic flattery)
- Body: Exactly 3 sentences — [1] their problem, [2] my solution, [3] specific proof
- CTA: One specific ask, easy to say yes to in under 10 seconds
- Tone: Human and direct, zero corporate-speak
- Length: Under 120 words total

Context:
- About the recipient: [SPECIFIC DETAILS]
- My value proposition: [ONE SENTENCE]
- My social proof: [ONE CREDIBLE PROOF POINT]
- Why right now: [TIMELY REASON]

Deliverables: 3 subject line variations + 2 full email versions (professional and casual).`,
   tags:["email","outreach","cold email","sales"],tip:"The 3-sentence body rule is non-negotiable. Shorter = dramatically higher response rates."},

  {id:5,cat:"writing",tier:"POWER",title:"The Content Repurposing Machine",task:"Turn one piece of content into 10 platform-optimized pieces",tools:["claude","chatgpt"],
   prompt:`Transform the following content into 10 distinct pieces, each optimized for the platform's format, algorithm, and audience:

1. Twitter/X thread — 8–12 tweets, hook + layered value + CTA
2. LinkedIn article — professional, insight-led, 400 words
3. LinkedIn post — personal story angle, 150 words
4. Instagram caption — emotional, punchy, 3 hashtag groups
5. TikTok/Reels script — hook in 3 seconds, 60-second structure
6. YouTube description — SEO-optimized, timestamps, subscribe CTA
7. Email newsletter intro — conversational, 200 words
8. Podcast talking points — 5 structured discussion topics
9. Meta ad copy — 3 variations with different angles
10. SMS/push notification — under 160 characters, single action

Source content: [PASTE YOUR CONTENT]
Brand voice: [bold and direct / warm and educational / witty]
Primary goal: [TRAFFIC / LEADS / BRAND / SALES]`,
   tags:["repurposing","social media","distribution"],tip:"Use this immediately after publishing anything significant. One article = 10 pieces of distribution."},

  {id:6,cat:"writing",tier:"ADVANCED",title:"The Editing Assassin",task:"Cut any text by 30% while increasing its power",tools:["claude","chatgpt"],
   prompt:`You are a ruthless senior editor. Cut the following text by at least 30% while making it MORE powerful.

Rules:
- Delete every adverb that weakens a verb
- Replace passive voice with active voice
- Cut hedging: "it seems," "perhaps," "might," "could be"
- Remove explanations of things already demonstrated
- Replace abstract nouns with specific, concrete alternatives
- Ensure every paragraph's first sentence demands attention
- If a sentence can be removed without loss — remove it

Deliverables:
1. Fully edited text
2. Word count reduction and percentage achieved
3. The 3 most impactful changes and why each strengthens the piece
4. 2 additional suggestions for the writer to consider

Original text: [PASTE TEXT]`,
   tags:["editing","clarity","conciseness","polish"],tip:"Perfect for anything that feels too long but you can't see where to cut."},

  {id:7,cat:"business",tier:"POWER",title:"The Business Model Stress Test",task:"Find every vulnerability in a business idea before you build",tools:["claude","chatgpt"],
   prompt:`You are a skeptical senior venture partner who has evaluated 5,000 pitches and funded 50. Stress-test the following business idea with complete intellectual honesty.

Evaluate across 10 dimensions:
1. Market size reality — TAM vs. what's addressable in years 1–3
2. Customer acquisition — exact path to first 100 paying customers
3. Unit economics — realistic margins, CAC, LTV, payback period
4. Competitive moat — what prevents a funded competitor copying in 6 months
5. Founder-market fit — who is uniquely positioned to win here
6. Regulatory and legal exposure
7. Technology risk and dependencies
8. Distribution bottlenecks
9. Three most likely failure modes in year 1
10. The single most dangerous assumption

Business idea: [DESCRIBE IN DETAIL]
Stage: [IDEA / MVP / EARLY REVENUE]
Target market: [DESCRIBE SPECIFICALLY]

Close with: "The two questions you must answer before spending another dollar."`,
   tags:["startups","validation","strategy","risk"],tip:"Do this before writing a business plan. It's faster and more valuable."},

  {id:8,cat:"business",tier:"ESSENTIAL",title:"The Strategic Decision Framework",task:"Make complex business decisions with structured reasoning",tools:["claude","chatgpt"],
   prompt:`I need to make the following decision: [DESCRIBE PRECISELY]

Walk me through with structured reasoning:

1. REFRAME — What is the real decision? (Often different from how it's framed)
2. CRITERIA — The 5 most important success factors, ranked
3. OPTIONS — 3–5 distinct options including at least one non-obvious alternative
4. ANALYSIS — Score each 1–10 on each criterion with one-sentence justification
5. RISKS — For top 2 options: worst realistic outcome with probability estimate
6. REVERSIBILITY — Which can be undone? What's the reversal cost?
7. SECOND-ORDER EFFECTS — What happens 6–12 months downstream?
8. RECOMMENDATION — Top pick and the 2 conditions that would change it

My constraints: [TIME / MONEY / RESOURCES]
Optimizing for: [GROWTH / STABILITY / OPTIONALITY]
Non-negotiables: [WHAT I WILL NOT SACRIFICE]
Decision deadline: [WHEN I MUST DECIDE]`,
   tags:["decisions","strategy","frameworks","analysis"],tip:"Add 'What would the best-informed competitor do?' for competitive scenarios."},

  {id:9,cat:"business",tier:"POWER",title:"The Competitor Autopsy",task:"Comprehensively analyze any competitor's strategy and weaknesses",tools:["claude","perplexity"],
   prompt:`Conduct a strategic analysis of [COMPETITOR NAME] for a board-level competitive intelligence report.

Analyze across 10 dimensions:
1. Business model — exactly how do they make money?
2. Target customer — primary persona with psychographic detail
3. Core value proposition — the specific job they're hired to do
4. Pricing strategy and packaging logic
5. Marketing channels — where they spend most attention
6. Content and messaging themes
7. Product strengths — what customers genuinely love
8. Product weaknesses — consistent complaints signaling unmet needs
9. Customer acquisition mechanics
10. Retention mechanism — what keeps customers from leaving

Strategic synthesis:
- 3 exploitable gaps you could win on
- 2 things they do well to copy or improve upon
- The 1 position they fundamentally cannot own (your opening)
- Their most vulnerable segment and why

Company: [NAME] | My company: [YOUR CONTEXT]
My differentiation: [YOUR ADVANTAGE]`,
   tags:["competitive analysis","positioning","strategy"],tip:"Use Perplexity for recent news and announcements before running this for maximum accuracy."},

  {id:10,cat:"business",tier:"ADVANCED",title:"The Investor Pitch Architect",task:"Build a compelling, fund-ready narrative pitch for any business",tools:["claude","chatgpt"],
   prompt:`Build a complete investor pitch narrative using the story architecture top-tier VCs respond to.

Write 12 narrative beats (2–4 sentences each):
1. The World Before — the status quo that's broken
2. The Inciting Incident — the moment we discovered the problem
3. The Problem — specific, visceral, quantified
4. Who Suffers — the customer in real pain
5. Why Now — specific timing signals
6. The Insight — what we understand that others missed
7. How It Works — product mechanics explained simply
8. Traction — specific, verifiable evidence we've proven something
9. Business Model — how a dollar in becomes multiple dollars out
10. The Market — bottom-up TAM that a skeptic finds credible
11. The Team — why this specific group for this specific problem
12. The Ask — exactly what we need and what we'll do with it

Company: [DESCRIBE]
Stage: [PRE-SEED / SEED / A]
Key metrics: [YOUR STRONGEST NUMBERS]
Funding ask: [AMOUNT AND USE]

After: write the 3 hardest questions a sharp investor will ask, with the best possible answers.`,
   tags:["fundraising","pitch","investors","narrative"],tip:"Use this as your verbal pitch script first. Build slides around each beat after."},

  {id:11,cat:"business",tier:"ESSENTIAL",title:"The SOPs Generator",task:"Transform any process into a clear, bulletproof SOP",tools:["claude","chatgpt"],
   prompt:`Create a detailed, immediately usable Standard Operating Procedure for [PROCESS NAME].

Required sections:
- Process Name and Owner
- Purpose: Why this SOP exists (1 sentence)
- Trigger: The exact event that starts this process
- Prerequisites: Everything that must be ready before starting
- Step-by-Step Procedure: Numbered, with sub-steps and decision points flagged
- Decision Points: Where judgment is required and criteria to use
- Common Errors: Top 3 mistakes and specific prevention steps
- Quality Check: How to verify output meets required standard
- Escalation Protocol: When and how to escalate
- Required Tools: With access links and credential notes
- Time Estimates: Per step and total
- Review Schedule: When to review and update

Process to document: [DESCRIBE IN DETAIL]
Intended users: [WHO WILL FOLLOW THIS]
Skill level to assume: [KNOWLEDGE LEVEL]`,
   tags:["SOPs","processes","operations","documentation"],tip:"Describe the process verbally or stream-of-consciousness first, then paste notes into this prompt."},

  {id:12,cat:"coding",tier:"POWER",title:"The Application Architect",task:"Design complete architecture before writing a single line of code",tools:["claude","cursor","chatgpt"],
   prompt:`You are a principal software architect. Design the complete architecture for this application before any code is written.

Deliver 12 architectural artifacts:
1. System overview in text/ASCII diagram
2. Technology stack with specific justification for each choice
3. Data models — entities, relationships, key fields, constraints
4. API design — endpoints with HTTP methods and payload shapes
5. Component breakdown with clear single responsibilities
6. State management approach
7. Authentication and authorization strategy
8. Error handling patterns for each error category
9. Performance — bottlenecks and mitigation strategies
10. Testing strategy — unit, integration, e2e, load
11. Deployment architecture — environments, CI/CD, infrastructure
12. Top 3 technical decisions that will most define success or failure

Application: [DESCRIBE WHAT YOU'RE BUILDING]
Scale: [USERS / REQUESTS / DATA VOLUME]
Team: [SOLO / SMALL / LARGE] | Timeline: [DEADLINE]
Constraints: [TECH PREFERENCES / BUDGET / COMPLIANCE]`,
   tags:["architecture","system design","planning","backend"],tip:"This 30-minute exercise regularly saves 3–4 weeks of rework. Never skip it for any project over 2 days of work."},

  {id:13,cat:"coding",tier:"ESSENTIAL",title:"The Systematic Bug Hunter",task:"Debug any code issue with expert-level systematic reasoning",tools:["claude","cursor","chatgpt"],
   prompt:`Debug this code issue using systematic diagnostic reasoning.

PROBLEM: [What's happening vs. what should happen]

ERROR:
\`\`\`
[PASTE EXACT ERROR MESSAGE]
\`\`\`

CODE:
\`\`\`[LANGUAGE]
[PASTE CODE]
\`\`\`

Diagnose:
1. Most likely root cause (with confidence %)
2. 2–3 alternative causes ranked by probability
3. Why this bug exists — root cause, not symptom
4. The fix with clear explanation of why it works
5. Corrected code in full, ready to use
6. A test to verify the fix resolved the issue
7. How to prevent this class of bug in future code

Context: [WHAT THIS CODE DOES]
Already tried: [YOUR DEBUGGING ATTEMPTS]
Dependencies/versions: [IF APPLICABLE]`,
   tags:["debugging","bug fixes","troubleshooting"],tip:"Always include what you've already tried — it focuses the debugging and avoids ruling out already-excluded causes."},

  {id:14,cat:"coding",tier:"POWER",title:"The Senior Code Review",task:"Get a rigorous, production-standard code review",tools:["claude","cursor"],
   prompt:`Perform a senior engineer code review. Treat this as a PR at Stripe, Linear, or Notion level.

Review 8 dimensions:
1. CORRECTNESS — Does it work? Edge cases? Off-by-one errors?
2. SECURITY — Injection, XSS, auth bypass, secret exposure, input validation
3. PERFORMANCE — N+1 queries, unnecessary loops, memory leaks, algorithmic complexity
4. READABILITY — Will a new engineer understand this in 6 months without help?
5. MAINTAINABILITY — Will this be easy or painful to change?
6. ERROR HANDLING — What breaks under bad input, network failure, timeout?
7. TESTING — What coverage is missing or insufficient?
8. CONVENTIONS — Language/framework idioms and team patterns followed?

For each issue:
- Severity: Critical / Major / Minor / Nitpick
- Specific problem and location
- Why it matters (concrete consequences)
- Suggested fix with corrected code

\`\`\`[LANGUAGE]
[YOUR CODE]
\`\`\`

Language/Framework: [SPECIFY] | Context: [WHAT THIS DOES]`,
   tags:["code review","security","performance","best practices"],tip:"Run on any code touching auth, payments, or data privacy before it ships."},

  {id:15,cat:"coding",tier:"ADVANCED",title:"The Complete Feature Builder",task:"Implement any feature fully from spec to tested code",tools:["cursor","claude","chatgpt"],
   prompt:`Implement the following feature completely, from specification to production-ready code.

FEATURE: [DESCRIBE EXACTLY WHAT YOU WANT]

REQUIREMENTS:
- Must have: [NON-NEGOTIABLE FUNCTIONALITY]
- Should have: [PREFERRED BEHAVIOR]
- Won't have: [EXPLICITLY OUT OF SCOPE]

EXISTING CODE:
\`\`\`[LANGUAGE]
[PASTE RELEVANT CODE, SCHEMA, OR PATTERNS]
\`\`\`

Complete deliverables:
1. Full implementation with all affected files
2. Database migrations or schema changes
3. Unit tests — happy path and top 3 edge cases
4. Integration test for the primary user flow
5. API documentation updates if applicable
6. Key design decisions explained
7. Known limitations or technical debt introduced

Tech stack: [YOUR STACK]
Conventions: [NAMING, STYLE, PATTERNS TO FOLLOW]`,
   tags:["feature development","full stack","implementation","testing"],tip:"The more existing code context you provide, the more the output matches your codebase."},

  {id:16,cat:"coding",tier:"ADVANCED",title:"The Documentation Engine",task:"Generate complete developer documentation for any code or system",tools:["claude","chatgpt"],
   prompt:`Write comprehensive developer documentation for the following code, API, or system.

Documentation package:
1. Overview — what this does and why it exists (2 substantive paragraphs)
2. Quick Start — working in under 5 minutes
3. Installation & Setup — every prerequisite with version requirements
4. Core Concepts — 5 key terms and mental models
5. API/Function Reference — every public interface with:
   - Parameters: name, type, required/optional, default, description
   - Return value: type and shape
   - Errors/exceptions thrown
   - Code example with real values and expected output
6. Common Use Cases — 3 worked examples end to end
7. Configuration Reference — every option in table format
8. Troubleshooting — top 5 issues with diagnostic steps and solutions

Code/System: [PASTE CODE OR DESCRIBE SYSTEM]
Target audience: [SKILL LEVEL AND CONTEXT]`,
   tags:["documentation","README","API docs","developer experience"],tip:"Include example inputs AND outputs in your context. Documentation quality jumps dramatically."},

  {id:17,cat:"research",tier:"POWER",title:"The Deep Research Synthesizer",task:"Synthesize any complex topic into a structured intelligence report",tools:["claude","perplexity","notebooklm"],
   prompt:`Produce a comprehensive research synthesis on [TOPIC].

Report structure:
1. EXECUTIVE SUMMARY — 200 words max, key findings for a decision-maker
2. BACKGROUND — Why this matters now and current state of the field
3. KEY FINDINGS — 7–10 insights, each with:
   - Finding stated precisely
   - Supporting evidence or data
   - Source type: established / emerging / contested
   - Confidence level: high / medium / low with rationale
4. COMPETING PERSPECTIVES — Where experts genuinely disagree and why
5. KNOWLEDGE GAPS — What is not yet known and why it matters
6. PRACTICAL IMPLICATIONS — What this means for [YOUR CONTEXT]
7. RECOMMENDED ACTIONS — 3 specific, concrete actions to take
8. FURTHER READING — 5 highest-value sources

Depth: [OVERVIEW / DEEP DIVE / EXPERT]
Use case: [WHY YOU NEED THIS AND HOW YOU'LL USE IT]
Audience: [WHO WILL READ THIS]`,
   tags:["research","synthesis","reports","intelligence"],tip:"Pair with Perplexity for real-time source validation. Never rely on AI synthesis alone for high-stakes research."},

  {id:18,cat:"research",tier:"ESSENTIAL",title:"The First Principles Breakdown",task:"Deconstruct any complex problem to its fundamental truths",tools:["claude","chatgpt"],
   prompt:`Break down [TOPIC/PROBLEM] using first principles reasoning — the method of Musk, Feynman, and Aristotle.

Process:
1. ASSUMPTION INVENTORY — List every assumption being made (aim for 10+, include hidden ones)
2. TRUTH TEST — For each: actually proven true? Or convention accepted without proof?
3. VERIFIED FUNDAMENTALS — What can we know with genuine certainty?
4. RECONSTRUCTION — Starting ONLY from verified fundamentals, rebuild the best understanding
5. DIVERGENCE POINTS — Where does first-principles thinking disagree with conventional wisdom?
6. PRACTICAL IMPLICATIONS — How does this reframing change what you should do?

Final: What would someone think about [TOPIC] with ZERO prior exposure to the conventional narrative?

Topic: [YOUR TOPIC]
Conventional wisdom to challenge: [THE DOMINANT VIEW]
Reason for examination: [WHY THIS MATTERS FOR YOUR DECISION]`,
   tags:["first principles","critical thinking","reasoning","problem solving"],tip:"Most valuable when the conventional approach feels expensive, slow, or arbitrary."},

  {id:19,cat:"research",tier:"ADVANCED",title:"The Data Interpreter",task:"Extract deep, actionable insights from any dataset",tools:["claude","chatgpt"],
   prompt:`Perform comprehensive data analysis and extract meaningful, actionable insights.

Data: [PASTE DATA IN CSV, TABLE, OR DESCRIPTION FORMAT]

Deliver:
1. DATA QUALITY — Missing values, outliers, type issues, integrity problems
2. DESCRIPTIVE STATISTICS — Key summary stats for all numerical columns
3. TOP 5 PATTERNS — Most interesting and non-obvious trends
4. ANOMALIES — Significant deviations with hypothesized explanations
5. CORRELATIONS — Relationships worth investigating further
6. NATURAL SEGMENTS — Groupings or clusters in the data
7. BUSINESS IMPLICATIONS — What patterns mean for real decisions
8. VISUALIZATION RECOMMENDATIONS — The 3 charts that tell this story best
9. NEXT ANALYTICAL STEPS — Follow-up questions worth investigating

What this data represents: [DESCRIBE]
Decision this should inform: [SPECIFIC DECISION]
Most important metric: [NORTH STAR]
Known data limitations: [CAVEATS]`,
   tags:["data analysis","insights","statistics","BI"],tip:"Paste actual CSV data directly — Claude handles structured data very well. Include a header row and 20–50 representative rows."},

  {id:20,cat:"research",tier:"ADVANCED",title:"The Competitive Intelligence System",task:"Design an always-on competitive monitoring operation",tools:["perplexity","claude"],
   prompt:`Design a comprehensive competitive intelligence system for [MY COMPANY] in the [INDUSTRY].

Competitors: [LIST 3–5 KEY COMPETITORS]

For each competitor, analyze:
1. Product updates and launches in the last 90 days
2. Marketing message shifts and new positioning
3. Pricing model changes or new packaging
4. Hiring signals — roles and scale indicating strategic direction
5. Content themes and thought leadership
6. Customer sentiment changes from reviews, social, forums
7. Partnership and integration announcements

Strategic synthesis:
- What coordinated moves are competitors making?
- What do these signal about industry direction?
- Where are they vulnerable or overextended?
- Optimal response for my company?

Intelligence cadence: [WEEKLY / BIWEEKLY / MONTHLY]
My current position: [DESCRIBE]
Monitoring setup recommendations: [WHAT TO WATCH AUTOMATICALLY]`,
   tags:["competitive intelligence","monitoring","strategy"],tip:"Set up automated Google Alerts and Mention.com alerts alongside this prompt for continuous monitoring."},

  {id:21,cat:"marketing",tier:"POWER",title:"The Deep Customer Avatar",task:"Build a frighteningly detailed ICP with full psychology and language",tools:["claude","chatgpt"],
   prompt:`Build a hyper-detailed Ideal Customer Profile for [PRODUCT/SERVICE].

DEMOGRAPHIC LAYER:
Age range, gender distribution, geography, income, education, job title, company type, seniority

PSYCHOGRAPHIC LAYER:
- Core values (what they believe is fundamentally true about the world)
- How they see themselves vs. how they want to be seen
- What they're privately proud of | What they're privately ashamed of
- Their deepest fear | What they tell people they want vs. what they actually want
- Who they aspire to be | What they believe about successful people like them

BEHAVIORAL LAYER:
- Hour-by-hour typical workday sketch
- Specific publications, podcasts, newsletters, and accounts they follow
- Buying triggers — events causing them to start looking for a solution
- Real objections — the actual reasons they don't buy (not surface objections)
- Decision process — who else is involved, what they need to approve

LANGUAGE LAYER:
- Exact phrases they use to describe their problem
- Industry jargon that signals belonging | Words that mark outsiders
- Their internal monologue in the 60 seconds before discovering your solution

Product: [YOUR PRODUCT] | Best real customer: [DESCRIBE IF KNOWN]`,
   tags:["ICP","customer avatar","personas","targeting"],tip:"Interview 3 real customers before running this. Paste their exact quotes. The language layer becomes your copywriting."},

  {id:22,cat:"marketing",tier:"ESSENTIAL",title:"The High-Converting Landing Page",task:"Write complete, conversion-optimized landing page copy from scratch",tools:["claude","chatgpt"],
   prompt:`Write complete, high-converting landing page copy for [PRODUCT/SERVICE].

All 10 sections required:
1. HERO: Main headline (<10 words, outcome-focused) + subheadline (mechanism + audience + timeframe) + CTA text
2. SOCIAL PROOF BAR: 5 specific credibility signals
3. PROBLEM SECTION: 3 specific pain points, emotionally resonant
4. SOLUTION REVEAL: The "aha moment" — your unique mechanism
5. FEATURES → BENEFITS: 6 features, each to a specific emotional benefit
6. HOW IT WORKS: 3-step process, simple enough for anyone
7. TESTIMONIALS: 3 templates with specific results and before/after (no generic praise)
8. OBJECTION HANDLING: FAQ for top 5 objections with real answers
9. PRICING SECTION: Price framing that makes cost feel small vs. value
10. FINAL CTA: Urgency + risk reversal + specific next action

Product: [DESCRIBE IN DETAIL] | Ideal buyer: [DESCRIBE]
Price: [PRICE] | Primary differentiator: [WHAT MAKES YOU DIFFERENT]
Biggest objection: [THE #1 REASON PEOPLE DON'T BUY]`,
   tags:["landing page","conversion","copywriting","CRO"],tip:"Write 3 hero headline variations and test them. Headlines account for 60–80% of conversion rate variance."},

  {id:23,cat:"marketing",tier:"POWER",title:"The 20-Angle Ad Creative Matrix",task:"Generate 20 ad variations across every major psychological angle",tools:["claude","chatgpt"],
   prompt:`Generate 20 distinct ad copy variations for [PRODUCT] targeting [AUDIENCE] at [PRICE].

2 ads for each of 10 angles:
1. PROBLEM-AGITATION: The exact pain they feel right now in visceral detail
2. TRANSFORMATION: Compressed before → after with specific metrics
3. SOCIAL PROOF: A real, specific result from a real person
4. FEAR OF MISSING OUT: What they lose by not acting
5. CURIOSITY GAP: Tease a counterintuitive insight without revealing it
6. CONTRARIAN TAKE: Challenge something the audience believes
7. SPECIFICITY HOOK: A hyper-specific number or claim
8. HOW-TO PROMISE: Lead with genuine value before selling
9. IDENTITY ALIGNMENT: "This is for people who [identity marker]..."
10. URGENCY/SCARCITY: Time-limited with specific framing

For each variation:
- Headline (under 8 words)
- Primary text (under 125 words)
- CTA (3–5 words)
- Best platform: Facebook / Instagram / TikTok / LinkedIn

Key benefit: [MOST IMPORTANT OUTCOME]`,
   tags:["advertising","paid ads","creative","Facebook ads"],tip:"Run every variation in a controlled test. The winning angle almost never matches your intuition."},

  {id:24,cat:"marketing",tier:"ADVANCED",title:"The Sales Script Builder",task:"Write a complete, objection-proof sales conversation script",tools:["claude","chatgpt"],
   prompt:`Create a complete sales call script for [PRODUCT] at [PRICE].

Script with exact language:
1. OPENER (30 sec): Build genuine rapport, reference something specific
2. AGENDA SETTING: Take control professionally
3. DISCOVERY (10 questions): Uncover pain, urgency, buying criteria
4. DIAGNOSIS: Mirror back to build trust and confirm understanding
5. SOLUTION: Feature → benefit → proof → specific impact on their situation
6. TRIAL CLOSE: Gauge readiness before commitment pitch
7. PRICE PRESENTATION: Value anchor before price reveal
8. OBJECTION HANDLING for each:
   - "It's too expensive"
   - "I need to think about it"
   - "Need to talk to my partner/boss"
   - "I use [COMPETITOR]"
   - "Now isn't the right time"
9. CLOSING: 3 different approaches for different buyer personalities
10. NEXT STEPS: Always close with a specific booked next action

Product: [WHAT YOU SELL] | Price: [AMOUNT]
Decision maker: [WHO BUYS] | Sales cycle: [ONE CALL / MULTI-TOUCH]
Biggest competitor: [WHO YOU LOSE TO MOST]`,
   tags:["sales","scripts","objection handling","closing"],tip:"Record all your sales calls. Run them against this script. Gaps between script and reality are your training program."},

  {id:25,cat:"image",tier:"POWER",title:"Commercial Product Photography",task:"Create commercial-quality product photography with AI",tools:["midjourney","dalle","stable"],
   prompt:`High-end commercial product photograph. Shot on Hasselblad H6D-100C medium format.

Product: [DESCRIBE IN DETAIL — materials, colors, size, key features]
Setting: [STUDIO / LIFESTYLE — describe environment specifically]
Lighting: [DIRECTION and TYPE: e.g. "soft box from camera left creating subtle shadow," "hard backlight rim lighting," "golden hour window diffusion"]
Mood: [e.g. "clinical precision," "warm and inviting," "premium and aspirational"]
Camera angle: [e.g. "straight-on hero shot," "45° showing depth," "overhead flat lay"]
Background: [SPECIFIC COLOR, TEXTURE, OR ENVIRONMENT]
Props: [COMPLEMENTARY ITEMS if any]
Color grade: [WARM/COOL/NEUTRAL/DESATURATED]
Reference: [e.g. Apple product photography / Glossier / Patagonia outdoor]

8K, magazine commercial quality --ar 4:5 --style raw --stylize 200 --no text watermark logo`,
   tags:["product photography","commercial","ecommerce","brand"],tip:"The lighting description is the most important element — it determines 60% of the image feel."},

  {id:26,cat:"image",tier:"ESSENTIAL",title:"Brand Identity & Logo Concepts",task:"Generate cohesive brand visual identity concepts",tools:["midjourney","dalle"],
   prompt:`Minimal modern logo concept and brand identity system for [BRAND NAME] in the [INDUSTRY].

Brand character:
- Core values: [VALUE 1], [VALUE 2], [VALUE 3]
- Personality: [e.g. "precise but warm," "bold and irreverent"]
- Target audience: [WHO THEY SERVE]
- NOT this: [WHAT THE BRAND EXPLICITLY IS NOT]

Design direction: [geometric / organic / typographic / symbolic / abstract]
Style: [e.g. Swiss International / Japanese minimalism / American industrial / Scandinavian functional]
Color palette: [PRIMARY] with [ACCENT] on [WHITE/BLACK/NEUTRAL]

Requirements: Works at 16px favicon AND full billboard scale. No gradients. Flat design. Scalable vector.

Reference brands (aesthetic only): [e.g. Stripe / Notion / Linear / Monzo]

Present as: logo mark + wordmark + brand colors on white and black backgrounds --ar 16:9 --style raw --stylize 300`,
   tags:["logo","brand identity","design","visual identity"],tip:"Generate 4–8 variations with different directions. Pick the strongest, then iterate 10 variations before selecting final."},

  {id:27,cat:"image",tier:"POWER",title:"Cinematic Editorial Portrait",task:"Create editorial-quality portrait photography with precise mood control",tools:["midjourney","stable"],
   prompt:`Editorial portrait photograph. [GENDER, AGE RANGE] subject.

Subject: [DETAILED PHYSICAL DESCRIPTION — hair, build, distinctive features]
Expression: [SPECIFIC EMOTION AND INTENSITY: e.g. "quiet determination," "fierce confidence"]
Wardrobe: [DESCRIBE CLOTHING SPECIFICALLY]

Lighting: [e.g. "single large window camera right, golden hour, deep Rembrandt shadow," "ring light straight-on creating catchlights," "neon pink backlight with ambient fill"]
Environment: [BACKGROUND — in focus / bokeh, what's in it]

Camera: [Leica M11 / Canon 1DX / Fujifilm GFX / 35mm film]
Lens: [50mm f/0.95 / 85mm f/1.2 / 135mm f/1.8]
Film grade: [e.g. "Kodak Portra 400 grain," "high contrast matte," "desaturated cinema"]

Published in: [TIME Magazine / Vogue Italia / Rolling Stone]
Style of: [Annie Leibovitz / Gregory Crewdson / Platon]

--ar 2:3 --style raw --stylize 250 --no watermark text`,
   tags:["portrait","editorial","photography","cinema"],tip:"For series consistency, use identical --seed NUMBER across all shots."},

  {id:28,cat:"image",tier:"ADVANCED",title:"Architectural Interior Visualization",task:"Visualize any interior with precise architectural style and mood",tools:["midjourney","dalle","stable"],
   prompt:`Photorealistic architectural interior visualization.

Room type: [ROOM AND FUNCTION]
Style: [e.g. "Japanese wabi-sabi minimalism," "Milanese industrial brutalism," "California organic modernism"]
Space: [SIZE/VOLUME: e.g. "double-height industrial loft," "compact Tokyo apartment"]
Natural light: [e.g. "north-facing afternoon light through floor-to-ceiling glass, diffused and even"]

Materials: [LIST PRECISELY: flooring, walls, ceiling, furniture materials]
Furniture: [SPECIFIC PIECES — style, material, arrangement]
Color palette: [DOMINANT] + [ACCENT] + [NEUTRAL BASE]
Artwork/objects: [WHAT'S ON WALLS AND SURFACES]

Time of day: [MORNING / GOLDEN HOUR / NIGHT]
Mood: [3 ADJECTIVES]

Published in: [Architectural Digest / Wallpaper* / Dezeen]
Shot: [WIDE ANGLE / DETAIL / MEDIUM PERSPECTIVE]

Ultra-realistic, material-accurate, professionally staged --ar 16:9 --style raw --stylize 350`,
   tags:["interior design","architecture","visualization","real estate"],tip:"Use ControlNet depth map in Stable Diffusion to maintain layout of an actual room you're redesigning."},

  {id:29,cat:"image",tier:"ADVANCED",title:"Character Consistency System",task:"Create fully consistent character designs across multiple scenes",tools:["midjourney","stable"],
   prompt:`Complete CHARACTER REFERENCE SHEET for [CHARACTER NAME].

SCENE 1 — Full body reference: neutral stance, plain white background, front-facing
SCENE 2 — Portrait reference: close-up face, front AND 3/4 view side by side
SCENE 3 — Character in action: [DESCRIBE SPECIFIC SCENE]

Character (exhaustive — every detail matters):
- Age: [EXACT] | Build: [SPECIFIC] | Height: [RELATIVE TO AVERAGE]
- Face shape: [SHAPE] | Jawline: [DESCRIPTION] | Cheekbones: [DESCRIPTION]
- Eye color: [EXACT] | Eye shape: [DESCRIPTION] | Eyebrow style: [DESCRIPTION]
- Hair: [EXACT COLOR] | [SPECIFIC STYLE AND LENGTH]
- Distinguishing marks: [SCARS / TATTOOS / MOLES / ACCESSORIES]
- Signature outfit: [DESCRIBE EVERY PIECE WITH SPECIFIC COLORS AND MATERIALS]

Art style: [Studio Ghibli / Marvel Comics / Pixar / anime / watercolor]

--ar 3:2 --stylize 400 --seed [CHOOSE ONE NUMBER — USE IDENTICALLY FOR ALL SCENES]`,
   tags:["character design","consistency","illustration","animation","game art"],tip:"In Midjourney, use --cref [image URL] to lock appearance from a previously generated reference."},

  {id:30,cat:"productivity",tier:"POWER",title:"The Comprehensive Life Audit",task:"Get an honest assessment of your life across all dimensions",tools:["claude","chatgpt"],
   prompt:`Conduct a comprehensive life audit with me. Be a brilliant, completely honest life strategist — not a cheerleader.

My current situation:
- Career/Work: [DESCRIBE HONESTLY]
- Health/Fitness: [DESCRIBE HONESTLY]
- Key Relationships: [DESCRIBE HONESTLY]
- Financial Situation: [DESCRIBE HONESTLY]
- Personal Growth/Learning: [DESCRIBE HONESTLY]
- Mental Health/Energy: [DESCRIBE HONESTLY]
- Recreation/Joy: [DESCRIBE HONESTLY]
- Living Environment: [DESCRIBE HONESTLY]

For each area:
1. Honest assessment: 1–10 with non-sugarcoated reasoning
2. Single highest-leverage change
3. Concrete leading indicator to track weekly
4. Most likely root cause if score is below 7

Cross-area synthesis:
- Which 2 areas create strongest positive cascade for everything else?
- What patterns appear across multiple low scores?
- What single change has the broadest positive effect?
- What am I avoiding that I most need to confront?`,
   tags:["life audit","self-assessment","goals","life design"],tip:"Do this quarterly. Pattern recognition across all areas simultaneously is the most valuable output."},

  {id:31,cat:"productivity",tier:"ESSENTIAL",title:"The Optimal Week Designer",task:"Design your entire week for maximum output and fulfillment",tools:["claude","chatgpt"],
   prompt:`Design my optimal week using time-blocking and energy management principles.

My inputs:
- Non-negotiable commitments: [LIST WITH SPECIFIC TIMES]
- Top 3 work priorities this week: [LIST IN ORDER]
- One personal goal to advance: [SPECIFIC GOAL]
- Peak mental energy times: [MORNING / MIDDAY / AFTERNOON / EVENING]
- Energy drains to minimize: [WHAT EXHAUSTS YOU]
- This week's biggest bottleneck: [WHAT'S BLOCKING PROGRESS]

Design:
1. Day-by-day time-blocked schedule with rationale for each major block
2. A theme for each day (single primary work mode)
3. Morning routine (30–45 min maximum)
4. Evening shutdown ritual (15–20 min)
5. Deep work blocks positioned at peak energy
6. Buffer for the inevitable unexpected
7. Three things I will NOT do this week
8. One investment in next week I'll make this week

Work context: [REMOTE / OFFICE / HYBRID]
Personal obligations: [KEY COMMITMENTS]
What genuinely recharges me: [RESTORATION ACTIVITIES]`,
   tags:["weekly planning","time-blocking","productivity","scheduling"],tip:"Run this Sunday evening. The '3 things I will NOT do' section delivers the most ROI."},

  {id:32,cat:"productivity",tier:"ADVANCED",title:"The Negotiation Master Brief",task:"Prepare completely for any high-stakes negotiation",tools:["claude","chatgpt"],
   prompt:`Prepare me completely for this negotiation: [DESCRIBE IN FULL DETAIL]

Complete negotiation brief:

MY POSITION:
- BATNA: My best alternative if this fails completely
- Reservation point: My absolute walk-away condition
- Target outcome | Opening position and rationale

THEIR POSITION:
- Their likely BATNA and how strong it is
- Their constraints, pressures, and timeline
- What they most want | Where they're most flexible

ZONE OF POSSIBLE AGREEMENT: Map the realistic overlap

TACTICAL PLANNING:
1. First offer strategy — anchor approach
2. First 3 things I will say to open
3. Concession sequencing — give, in order, linked to what
4. What I will never concede
5. Counter-moves for 5 likely pressure tactics

KEY QUESTIONS to ask before making any offer

My context: [WHAT I'M NEGOTIATING]
My leverage: [DESCRIBE] | Timeline: [DEADLINE]`,
   tags:["negotiation","salary","deals","persuasion"],tip:"The BATNA analysis is the most important section. A strong BATNA gives you genuine power."},

  {id:33,cat:"creativity",tier:"POWER",title:"The Story Architecture Engine",task:"Build complete narrative structure for any story or script",tools:["claude","chatgpt"],
   prompt:`Design the complete narrative architecture for [STORY TYPE: novel / screenplay / short story / brand film].

Core:
- Premise: [ONE SENTENCE]
- Genre: [GENRE] | Tone: [DARK / COMEDIC / LITERARY / THRILLER]
- Format: [TARGET LENGTH AND MEDIUM]
- Audience: [WHO AND WHAT THEY WANT FROM THIS STORY]

Architecture:
1. LOGLINE — One sentence that sells the whole story to a skeptic
2. THEME — The central question posed (and tentatively answered)
3. PROTAGONIST — Name, external goal, internal wound, fatal flaw, desire vs. need
4. ANTAGONIST — What opposes and why they're justified from their perspective
5. THREE-ACT STRUCTURE with labeled turning points
6. 8 ESSENTIAL SCENES — What changes in each and why
7. THE ENDING — And why it's earned by everything before
8. THE GOVERNING PRINCIPLE — One storytelling rule this story lives by`,
   tags:["storytelling","screenplay","novel","narrative structure"],tip:"The 'desire vs. need' gap in character design is the engine of the entire story."},

  {id:34,cat:"creativity",tier:"ESSENTIAL",title:"The Worldbuilding Blueprint",task:"Create a rich, internally consistent fictional world",tools:["claude","chatgpt"],
   prompt:`Build a complete fictional world for [PROJECT: novel / game / series].

Foundation:
- Genre/Tone: [FANTASY / SCI-FI / ALT HISTORY / NEAR-FUTURE]
- Scale: [CITY / REGION / PLANET] | Central conflict: [THE CORE TENSION]

World design (7 systems):
1. PHYSICAL WORLD — Geography, climate, resources, how they shape culture and conflict
2. HISTORY — 5 specific events that made this world what it is today (with dates)
3. POWER STRUCTURE — 3–4 major factions with power, beliefs, internal tensions
4. SYSTEMS OF POWER — Magic/technology/economics: how power is gained and transferred
5. LIVED EXPERIENCE — Daily life for an ordinary person — what do they eat, fear, celebrate?
6. CULTURE & LANGUAGE — 5 customs, 3 taboos, unique words, art forms
7. SECRETS — 3 things almost no one in this world knows

INTERNAL RULES — 5 immutable laws (violate them and reader trust collapses)
SENSORY PALETTE — What this world smells, sounds, feels like (3 sentences)
THE UNIQUE ELEMENT — One thing about this world that exists nowhere else in fiction`,
   tags:["worldbuilding","fantasy","sci-fi","game design"],tip:"Build the internal rules first. Consistency matters more than complexity or originality."},

  {id:35,cat:"creativity",tier:"ADVANCED",title:"The Brand Voice Codifier",task:"Define and operationalize a brand's unique communication DNA",tools:["claude","chatgpt"],
   prompt:`Create a comprehensive Brand Voice Guide for [BRAND NAME] — specific enough that any writer could replicate the voice precisely.

Context:
- What we do: [DESCRIPTION] | Core audience: [DESCRIBE]
- Market position: [HOW WE'RE DIFFERENT AND FOR WHOM]
- Brand we admire: [AESTHETIC REFERENCE] | Brand we are NOT: [ANTI-EXAMPLE — be specific]

Voice architecture:
1. VOICE PILLARS — 4 traits, each documented as:
   - What this means in practice (3 concrete examples)
   - What this does NOT mean (the common misinterpretation)
   - A model sentence that perfectly embodies this trait

2. TONE MATRIX — How voice adapts across contexts:
   - Responding to a frustrated customer
   - Speaking to a new potential customer
   - In-product UI microcopy
   - Crisis or difficult news

3. VOCABULARY: 15 words we use | 15 we never use (with alternatives)

4. STRUCTURAL RULES: Sentence length | Formality | Pronoun policy | Humor approach

5. BEFORE/AFTER: 5 generic sentences rewritten to perfectly on-brand

Intended users: [CONTENT TEAM / AGENCY / ALL STAFF]`,
   tags:["brand voice","copywriting","style guide","brand strategy"],tip:"The 'what we are NOT' exercise is almost always more clarifying than positive descriptions."},

  {id:36,cat:"thinking",tier:"POWER",title:"The Steel Man Generator",task:"Build the most powerful possible case for any position",tools:["claude","chatgpt"],
   prompt:`Construct the strongest possible intellectual argument FOR [POSITION/IDEA/POLICY] as its most brilliant, well-informed, and honest advocate.

Build a STEELMAN — so strong that smart critics say: "I disagree, but that's the best case for this position I've encountered."

Do NOT hedge. Do NOT add caveats that weaken the case.

Structure:
1. THE CORE INSIGHT — The fundamental truth that makes this position compelling
2. THE EMPIRICAL FOUNDATION — Strongest data, studies, and historical examples
3. THE PHILOSOPHICAL LOGIC — First-principles reasoning that leads here
4. PREEMPTIVE REBUTTALS — Address 3 strongest counterarguments
5. THE CONSEQUENTIALIST CASE — Why outcomes are better if this position wins
6. WHAT CRITICS GET WRONG — The most persistent misunderstanding
7. WHERE EVEN ADVOCATES SHOULD BE UNCERTAIN — Honest limits

Position: [THE IDEA OR POLICY]
My current view: [WHERE YOU STAND]
Context: [DEBATE / DECISION / EXPLORATION]

Final: What evidence would genuinely falsify this position?`,
   tags:["steel-manning","critical thinking","argumentation","epistemology"],tip:"Run this specifically for positions you STRONGLY DISAGREE with. The fastest path to actually understanding the other side."},

  {id:37,cat:"thinking",tier:"ADVANCED",title:"The Premortem Analysis",task:"Identify every failure mode of a plan before you commit",tools:["claude","chatgpt"],
   prompt:`Conduct a rigorous premortem. It is 12 months from today and [PROJECT/PLAN] has failed completely. Work backwards and explain exactly how.

Plan: [DESCRIBE IN FULL DETAIL]
Team: [WHO'S INVOLVED] | Timeline: [MILESTONES]

Failure analysis:
1. PRIMARY CAUSE — Single most likely fatal flaw in the current plan
2. FAILURE PATHS — 5 other realistic routes to failure, ranked by probability
3. EARLY WARNING SIGNALS — For each path: what's observable in months 1–3?
4. ENVIRONMENTAL CONTRIBUTORS — External conditions that accelerate failure
5. INTERNAL BLIND SPOTS — What does the team currently believe that is probably wrong?
6. THE CRITICAL PATH — Single dependency whose failure brings down everything
7. CONFIDENCE INFLECTION POINTS — Where will we be most overconfident?

Inversion: For each major failure mode, what is the minimum viable change that would neutralize it?

Output: A "Failure Prevention Checklist" — 10 specific verifiable checkpoints to clear before committing fully.`,
   tags:["premortem","risk analysis","planning","project management"],tip:"The best time to run a premortem is exactly when a plan feels most exciting."},

  {id:38,cat:"thinking",tier:"POWER",title:"The Mental Models Engine",task:"Apply the most relevant mental models to illuminate any problem",tools:["claude","chatgpt"],
   prompt:`Apply the 5 most relevant mental models to this problem. For each, tell me what it reveals that I'd miss without it.

Problem/Situation: [DESCRIBE YOUR SITUATION OR DECISION]

For each of the 5 models:
1. Name the model
2. Explain it in 2 sentences to a smart non-expert
3. Apply it specifically and concretely to my problem
4. What does this reveal that would be invisible without it?
5. What action does this model suggest?

Draw from (only those genuinely applicable): inversion, second-order thinking, Occam's razor, Hanlon's razor, survivorship bias, base rate neglect, commitment bias, incentive analysis, circle of competence, regret minimization, opportunity cost, via negativa, margin of safety, map vs. territory, Goodhart's Law, availability heuristic, local vs. global optimum.

After all 5:
- Strongest consensus signal across models?
- Where do models conflict, and what does that tension reveal?`,
   tags:["mental models","decision-making","frameworks","thinking"],tip:"Inversion alone ('how does this fail?') often clarifies more than 4 other models combined."},

  {id:39,cat:"thinking",tier:"ADVANCED",title:"The Scenario Planning Matrix",task:"Map out futures and build strategies that survive deep uncertainty",tools:["claude","chatgpt"],
   prompt:`Conduct full scenario planning for [ORGANIZATION / STRATEGY / DECISION].

Context: [DESCRIBE YOUR SITUATION]
Time horizon: [1 / 3 / 5 / 10 YEARS]

STEP 1 — DRIVING FORCES:
8 forces shaping your environment:
- 4 Predetermined: will happen regardless of choices
- 4 Critical Uncertainties: could go significantly either way

STEP 2 — SCENARIO MATRIX:
Select the 2 most impactful AND most uncertain forces.
Build a 2×2 matrix → 4 named scenarios (names should evoke the scenario vividly).

STEP 3 — SCENARIO NARRATIVES (150 words each):
For each scenario: How did we get here? What does this world look like? Who wins and loses? What is my specific situation?

STEP 4 — STRATEGIC RESPONSE:
- Robust strategies: succeed in ALL 4 scenarios
- Hedging strategies: protect against downside in any scenario
- Speculative bets: win big in specific scenarios
- Early indicators: signals that tell me which scenario is unfolding`,
   tags:["scenario planning","strategy","futures","uncertainty"],tip:"Most valuable when making a 3–5 year commitment that's hard to reverse."},

  {id:40,cat:"automation",tier:"POWER",title:"The Automation Opportunity Scanner",task:"Map every automation opportunity in any business process",tools:["claude","chatgpt"],
   prompt:`Analyze the following process and identify every automation opportunity with ROI analysis.

Process (step by step): [DESCRIBE COMPLETELY]
Current tools: [LIST ALL] | Team involved: [NUMBER AND ROLES]
Time spent per week: [HOURS AND BY WHOM]

For every opportunity identified:
1. Specific task being automated
2. Current weekly time cost
3. Automation approach: Zapier / Make / n8n / custom code / AI / RPA
4. Specific implementation — tools + workflow design
5. Estimated weekly time saved
6. Implementation difficulty: 1 (easy) to 5 (hard)
7. ROI: (hours saved × rate) ÷ implementation cost = payback period

Prioritization matrix:
- QUICK WINS: High impact + low difficulty
- STRATEGIC PROJECTS: High impact + higher difficulty
- FILL-INS: Lower impact + easy
- SKIP: Low impact + difficult

Synthesis: Identify the single highest-ROI automation to build first.
Deliver: Step-by-step implementation brief for that top automation.`,
   tags:["automation","workflows","efficiency","ROI"],tip:"The highest-value automations eliminate entire job functions, not just tasks within them."},

  {id:41,cat:"automation",tier:"ADVANCED",title:"The AI Agent Design Brief",task:"Write a complete specification for any autonomous AI agent",tools:["claude","chatgpt"],
   prompt:`Design a complete, production-ready AI agent specification.

Task: [DESCRIBE WHAT THE AGENT DOES AUTONOMOUSLY]
Run frequency: [CONTINUOUS / HOURLY / DAILY / TRIGGERED]
Human oversight: [FULLY AUTONOMOUS / HUMAN-IN-LOOP / HUMAN APPROVAL BEFORE FINAL ACTION]

Complete specification:
1. AGENT OBJECTIVE — Single unambiguous goal statement
2. SUCCESS CRITERIA — Exactly how we know it worked (measurable)
3. REQUIRED TOOLS:
   □ Web search (Tavily / Perplexity API)
   □ Code execution (E2B sandbox)
   □ Email/calendar
   □ Database read/write
   □ Browser control
   □ Third-party APIs: [LIST]
4. MEMORY ARCHITECTURE: Working context | Long-term storage
5. DECISION LOGIC — 5 most important decisions + criteria for each
6. FAILURE MODES & GUARDRAILS — What goes wrong + prevention
7. ESCALATION PROTOCOL — When to stop and ask a human
8. IMPLEMENTATION PATH — LangGraph / CrewAI / AutoGen + rationale
9. TESTING PLAN — How to validate before production
10. MONITORING — What to log, alert on, and review regularly`,
   tags:["AI agents","autonomous systems","LangGraph","agent design"],tip:"The failure modes section is the most important. Agents fail in unexpected ways — design for failure from the start."},

  {id:42,cat:"automation",tier:"ADVANCED",title:"The Make.com Scenario Architect",task:"Design a complete Make.com automation scenario from scratch",tools:["claude","chatgpt"],
   prompt:`Design a complete, implementation-ready Make.com automation scenario.

I want to automate: [DESCRIBE THE COMPLETE DESIRED OUTCOME]
Trigger: [WEBHOOK / SCHEDULE / NEW RECORD / EMAIL / FORM SUBMISSION]
Final result: [WHAT SHOULD EXIST WHEN DONE]
Apps involved: [LIST EVERY APP]

Complete scenario design:

1. TRIGGER MODULE: App + trigger type + key config + data provided

2. ALL PROCESSING MODULES (in sequence):
   Each module: Name (App + Action) | Input data | Key config | Output fields

3. ROUTER LOGIC: Branching conditions and path handling

4. FILTERS: Where to add conditions so irrelevant data doesn't flow through

5. ERROR HANDLING: What happens when each module fails + recovery

6. DATA TRANSFORMERS: Text/number/date manipulation needed

7. FINAL MODULES: Where data lands and what it looks like

TEXT FLOW DIAGRAM: [MODULE] → [MODULE] → [MODULE]

Monthly operation estimate: [CALCULATE]
Potential bottlenecks/API limits: [FLAG]`,
   tags:["Make.com","no-code","automation","integration"],tip:"Paste this design into Make's AI assistant for step-by-step build guidance."},

  {id:43,cat:"career",tier:"POWER",title:"The Resume Overhaul",task:"Transform any resume for maximum ATS performance and human impact",tools:["claude","chatgpt"],
   prompt:`Perform a complete, professional-grade resume overhaul optimized for ATS systems and human readers.

REWRITE ALL BULLETS using: STRONG VERB + SPECIFIC TASK + QUANTIFIED METRIC + MEASURABLE IMPACT
Example: "Reduced customer churn 23% by redesigning onboarding email sequence, saving $340K in ARR"
Never: "responsible for," "helped with," "assisted in," or passive voice.

COMPLETE DELIVERABLES:
1. Professional Summary: 3-sentence value proposition — who you are, what you uniquely do, why it matters
2. All experience bullets rewritten to above standard
3. Skills section optimized for [TARGET ROLE]
4. 12 priority keywords to add from job description for ATS
5. What to cut — flag everything that weakens the document
6. Red flags to address: gaps, dated technologies, irrelevant content
7. Format recommendations: length, structure, visual hierarchy

Current resume: [PASTE FULL RESUME]
Target role: [TITLE AT COMPANY]
Job description: [PASTE FULL JD]
Seniority: [ENTRY / MID / SENIOR / EXEC]`,
   tags:["resume","job search","ATS","career"],tip:"Customize the keywords section for every application. A customized resume with 12 matched keywords dramatically outperforms a perfect generic resume."},

  {id:44,cat:"career",tier:"ESSENTIAL",title:"The Interview Dominator",task:"Prepare completely for any job interview",tools:["claude","chatgpt"],
   prompt:`Prepare me for a complete, confident interview at [COMPANY] for [POSITION].

PREPARATION PACKAGE:

1. COMPANY INTELLIGENCE BRIEF:
   - Business model, revenue streams, strategic priorities
   - Most important news in the last 90 days
   - Culture signals from Glassdoor, LinkedIn, founder interviews
   - Problems this role is likely hired to solve

2. 25 PREDICTED QUESTIONS:
   - 5 behavioral with STAR structure (Situation, Task, Action, Result)
   - 5 technical/role-specific
   - 5 cultural fit and values questions
   - 5 situational judgment questions
   - 5 designed to stress test or reveal weaknesses

3. MY STORY — Compelling 90-second introduction: memorable, relevant, honest

4. 10 QUESTIONS TO ASK — Demonstrate strategic thinking, not just preparation

5. SALARY NEGOTIATION SCRIPT — When they ask "What are your expectations?"

6. TOP 5 MISTAKES for this role/level to avoid

7. THE INSIGHT THAT WINS OFFERS — One non-obvious thing most candidates won't know

My background: [DESCRIBE YOUR EXPERIENCE]
Job description: [PASTE FULL JD]`,
   tags:["interview prep","job search","career","salary negotiation"],tip:"Do a recorded mock interview immediately after this. Say answers out loud, record, ask Claude for critical feedback."},

  {id:45,cat:"career",tier:"POWER",title:"The Personal Brand Architect",task:"Design a complete, monetizable personal brand and thought leadership strategy",tools:["claude","chatgpt"],
   prompt:`Build a comprehensive, actionable personal brand strategy for [YOUR NAME / ROLE].

My expertise: [SPECIFIC DOMAIN KNOWLEDGE]
Target audience: [WHO I WANT TO REACH — specifically]
Brand objective: [WHAT I WANT TO BE KNOWN FOR AND BY WHOM]
Primary platform: [LINKEDIN / TWITTER/X / SUBSTACK / YOUTUBE / SPEAKING]

Complete strategy:
1. POSITIONING STATEMENT — One sentence defining your unique value
2. DISTINCTIVE POV — 3 contrarian beliefs about your field
3. CONTENT PILLARS — 4 topics you'll systematically own (with rationale)
4. SIGNATURE FRAMEWORK — A named, proprietary model associated with you
5. CONTENT ARCHITECTURE:
   - Flagship content (70% of effort) | Distribution content | Engagement content
   - Posting cadence by platform
6. 50-PERSON NETWORK STRATEGY — Build relationships with the people who matter
7. 90-DAY LAUNCH PLAN — Week-by-week for the first 4 weeks
8. MONETIZATION ROADMAP — Path from audience to income in 12–18 months (3 streams)
9. VOICE GUIDELINES — 3 adjectives with what they mean in practice

Current assets: [ANY EXISTING CONTENT, AUDIENCE, CREDENTIALS]`,
   tags:["personal brand","thought leadership","LinkedIn","creator economy"],tip:"The 'signature framework' is the single most important element. Name yours before anything else."},

  {id:46,cat:"career",tier:"ADVANCED",title:"The Skill Acceleration Blueprint",task:"Design the fastest path to mastery of any professional skill",tools:["claude","chatgpt","perplexity"],
   prompt:`Design an aggressive, evidence-based accelerated learning curriculum for [SKILL/FIELD].

Starting point: [COMPLETE BEGINNER / HAVE BASICS / INTERMEDIATE]
Target outcome: [SPECIFIC DEFINITION OF COMPETENCE]
Available time: [X HOURS PER WEEK]
Target timeline: [3 / 6 / 12 MONTHS]
Learning mode: [READING / VIDEO / PROJECTS / PRACTICE / COACHING]
Why this matters: [YOUR GOAL BEHIND LEARNING THIS]

Learning architecture:
1. SKILL DECOMPOSITION — Break into 5–8 sub-skills with dependencies
2. THE 80/20 — Which 20% of this skill delivers 80% of the value? Start here.
3. CURATED RESOURCES (specific, not generic):
   - 3 books with specific chapters to prioritize and why
   - 3 courses/resources with specific modules to focus on
   - 2 practitioners to study — what specifically to learn from each
4. THE PROJECT LADDER — 6 progressively harder projects (not just knowledge)
5. WEEK-BY-WEEK — Detailed plan for the first 4 weeks
6. MILESTONE CHECKPOINTS — How to verify you've reached each level
7. PLATEAU ANTICIPATION — Where most learners stall and how to push through
8. THE ONE HABIT — If you could only do one thing daily for 30 days

Field: [SKILL] | Adjacent skills: [RELEVANT BACKGROUND]`,
   tags:["learning","skill development","accelerated learning","career"],tip:"The project ladder is where real skill is built. Each project should be slightly harder than you think you can handle."},
];


/* ─── SUPPLEMENTARY DATA ──────────────────────────────────── */
const CERTIFICATIONS = [
  {level:1,name:"AI Foundations",color:"#4ADE80",modules:"1–3",req:"Modules 1–3 + 50-question exam (75% pass)",outcome:"Core AI literacy and practical tool proficiency across all major platforms"},
  {level:2,name:"AI Practitioner",color:"#FACC15",modules:"4–7",req:"Modules 4–7 + 2 submitted capstone projects",outcome:"Proven ability to deploy AI across content, marketing, and automation"},
  {level:3,name:"AI Engineer",color:"#F97316",modules:"8–12",req:"Modules 8–12 + one live deployed production project",outcome:"Certified to build and ship AI systems, agents, and RAG architectures"},
  {level:4,name:"AI Architect",color:"#A78BFA",modules:"13–18",req:"Modules 13–18 + capstone defense before practitioner panel",outcome:"Elite credential: system design, fine-tuning, and AI business mastery"},
];

const CAREERS = [
  {title:"AI Engineer",salary:"$160K–$350K",path:"M1,2,8,9,10,13,17",color:"#4ADE80",desc:"Build AI products, integrate LLMs, deploy agents and RAG systems"},
  {title:"AI Product Manager",salary:"$140K–$280K",path:"M1,2,6,11,16,17",color:"#FACC15",desc:"Define and drive AI product strategy, roadmap, and execution"},
  {title:"AI Consultant",salary:"$200–$800/hr",path:"M1,2,11,12,14,16",color:"#F97316",desc:"Advise organizations on AI strategy, transformation, and ROI"},
  {title:"AI Content Strategist",salary:"$80K–$180K",path:"M1,2,3,4,5,7",color:"#FB7185",desc:"Lead AI-powered content and creative operations for brands"},
  {title:"AI Entrepreneur",salary:"Unlimited",path:"Full curriculum",color:"#A78BFA",desc:"Build and scale AI-native businesses, products, and services"},
  {title:"AI Automation Specialist",salary:"$90K–$200K",path:"M1,2,6,8,9,14",color:"#38BDF8",desc:"Design and deploy automation systems that replace manual work"},
];

const TOOL_STACK = [
  {cat:"Language Models",col:"#4ADE80",items:["Claude Sonnet/Opus","GPT-4o","Gemini Ultra","Llama 3.1","Mistral Large","Qwen 2.5"]},
  {cat:"Image Generation",col:"#FB7185",items:["Midjourney v7","DALL-E 3","Stable Diffusion XL","Flux","Ideogram 2.0","Adobe Firefly"]},
  {cat:"Video AI",col:"#F97316",items:["Runway Gen-3","Sora","Kling","Pika 2.0","HeyGen","Descript"]},
  {cat:"Audio AI",col:"#FACC15",items:["ElevenLabs","Suno v4","Udio","Whisper Large","Adobe Podcast","Mubert"]},
  {cat:"Coding AI",col:"#A78BFA",items:["Cursor","GitHub Copilot","Claude Code","Bolt.new","Lovable","v0 by Vercel"]},
  {cat:"Automation",col:"#38BDF8",items:["Make.com","n8n","Zapier","LangGraph","CrewAI","Composio"]},
  {cat:"RAG & Vector",col:"#4ADE80",items:["Pinecone","Qdrant","Weaviate","LlamaIndex","LangChain","Chroma"]},
  {cat:"Research",col:"#F97316",items:["Perplexity Pro","Elicit","Consensus","NotebookLM","Julius AI","Tavily"]},
  {cat:"Agents & Orchestration",col:"#A78BFA",items:["LangGraph","AutoGen","CrewAI","Agents SDK","E2B","Browserbase"]},
  {cat:"Observability",col:"#FACC15",items:["LangSmith","Helicone","Langfuse","Weights & Biases","Datadog","Arize"]},
];

const CAPSTONES = [
  {title:"AI Business in 30 Days",phase:"Intermediate",col:"#FACC15",desc:"Build and launch a real AI-powered business and generate your first dollar of revenue.",deliverable:"Live business with first paying customer and documented acquisition playbook."},
  {title:"Enterprise AI Transformation",phase:"Advanced",col:"#F97316",desc:"Design and present a complete AI transformation plan for an organization of 100+ people.",deliverable:"40-slide board-ready strategy with roadmap, ROI model, and change management plan."},
  {title:"Open-Source AI Product",phase:"Expert",col:"#A78BFA",desc:"Build and launch an open-source AI tool on GitHub with real users.",deliverable:"GitHub repo with 100+ stars, live demo, and Product Hunt launch post-mortem."},
  {title:"AI Research Report",phase:"Expert",col:"#38BDF8",desc:"Research and publish a definitive 10,000-word report on an emerging AI application area.",deliverable:"Published report with original data, expert input, and 1,000+ organic reads."},
];

/* ─── MICRO COMPONENTS ────────────────────────────────────── */
function CopyBtn({text}){
  const [ok,setOk]=useState(false);
  return(
    <button onClick={()=>{navigator.clipboard.writeText(text);setOk(true);setTimeout(()=>setOk(false),2000)}}
      style={{display:"flex",alignItems:"center",gap:5,padding:"6px 14px",background:ok?"rgba(74,222,128,.1)":"rgba(255,255,255,.05)",border:`1px solid ${ok?"rgba(74,222,128,.35)":"rgba(255,255,255,.09)"}`,borderRadius:6,color:ok?"#4ADE80":"#888",fontFamily:"inherit",fontSize:11,cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap"}}>
      {ok?"✓ Copied":"⎘ Copy"}
    </button>
  );
}

function Chip({label,color}){
  return <span style={{display:"inline-block",padding:"2px 9px",background:color+"18",color,border:`1px solid ${color}33`,borderRadius:3,fontSize:10,letterSpacing:".04em",fontWeight:500}}>{label}</span>;
}

function ToolPill({tid}){
  const t=TOOL_MAP[tid];if(!t)return null;
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 9px",background:t.color+"10",color:t.color,border:`1px solid ${t.color}25`,borderRadius:20,fontSize:10,fontWeight:500}}><span style={{width:4,height:4,borderRadius:"50%",background:t.color}}/>{t.label}</span>;
}

/* ─── MAIN APP ────────────────────────────────────────────── */
export default function App(){
  const [page,setPage]       = useState("home");
  const [selMod,setSelMod]   = useState(null);
  const [selLes,setSelLes]   = useState(null);
  const [modTab,setModTab]   = useState("lessons");
  const [phOpen,setPhOpen]   = useState("foundation");
  const [pCat,setPCat]       = useState("all");
  const [pTier,setPTier]     = useState("all");
  const [pTool,setPTool]     = useState("all");
  const [pQ,setPQ]           = useState("");
  const [pOpen,setPOpen]     = useState(null);

  const grouped = useMemo(()=>
    PHASES.reduce((a,ph)=>{a[ph.id]=MODULES.filter(m=>m.phase===ph.id);return a;},{}),[]);

  const filteredP = useMemo(()=>PROMPTS.filter(p=>{
    if(pCat!=="all"&&p.cat!==pCat)return false;
    if(pTier!=="all"&&p.tier!==pTier)return false;
    if(pTool!=="all"&&!p.tools.includes(pTool))return false;
    if(pQ){const q=pQ.toLowerCase();return p.title.toLowerCase().includes(q)||p.task.toLowerCase().includes(q)||p.tags.some(t=>t.includes(q));}
    return true;
  }),[pCat,pTier,pTool,pQ]);

  const totalHrs = MODULES.reduce((s,m)=>s+parseInt(m.time),0);
  const nav=(pg)=>{setPage(pg);setSelMod(null);setSelLes(null);};
  const phAccent=(id)=>PHASES.find(p=>p.id===id)?.accent||"#888";

  const NAV=[
    {id:"home",l:"Home"},{id:"course",l:"Course"},{id:"prompts",l:"Prompts"},
    {id:"projects",l:"Projects"},{id:"tools",l:"Tools"},
    {id:"certify",l:"Certify"},{id:"careers",l:"Careers"},
  ];

  const css=`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Instrument+Serif:ital@0;1&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    ::-webkit-scrollbar{width:4px;height:4px}
    ::-webkit-scrollbar-track{background:#08090D}
    ::-webkit-scrollbar-thumb{background:#252836;border-radius:2px}
    button,input,textarea{font-family:'DM Sans',sans-serif}
    .nb{background:none;border:none;cursor:pointer;padding:8px 12px;font-size:12.5px;font-weight:500;border-radius:6px;transition:all .18s}
    .nb:hover{background:rgba(255,255,255,.04)}
    .phhdr{width:100%;background:none;border:1px solid #1A1D27;border-radius:8px;padding:15px 20px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;color:#C8C4BC;transition:all .2s;text-align:left}
    .phhdr:hover{border-color:#252836;background:rgba(255,255,255,.015)}
    .mc{background:#0F1117;border:1px solid #1A1D27;border-radius:8px;padding:20px;cursor:pointer;transition:all .2s}
    .mc:hover{border-color:#252836;transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.35)}
    .lr{display:flex;align-items:center;gap:14px;padding:13px 20px;border-bottom:1px solid #111318;cursor:pointer;transition:background .13s}
    .lr:hover{background:rgba(255,255,255,.025)}
    .pc{background:#0F1117;border:1px solid #1A1D27;border-radius:8px;overflow:hidden;transition:border-color .2s}
    .pc:hover{border-color:#252836}
    .pcat{background:none;border:1px solid transparent;border-radius:6px;padding:6px 11px;font-size:11px;font-weight:500;cursor:pointer;display:flex;align-items:center;gap:7px;white-space:nowrap;transition:all .15s;color:#55525E}
    .pcat:hover{background:rgba(255,255,255,.03);color:#888}
    .pcat.on{background:rgba(255,255,255,.06);border-color:#252836;color:#C8C4BC}
    .tb{background:none;border:none;border-bottom:2px solid transparent;padding:10px 16px;font-size:11.5px;font-weight:500;cursor:pointer;color:#3E3C4A;transition:all .2s;letter-spacing:.03em;text-transform:capitalize}
    .tb.on{color:#C8C4BC;border-bottom-color:currentColor}
    .si{width:100%;background:#0F1117;border:1px solid #1A1D27;border-radius:7px;padding:10px 16px 10px 40px;font-size:13px;color:#C8C4BC;outline:none;transition:border .2s}
    .si:focus{border-color:#252836}
    .si::placeholder{color:#2E2C3A}
    .sb{background:#0F1117;border:1px solid #1A1D27;border-radius:8px;padding:18px;text-align:center}
    .cb{background:#0A0B0F;border:1px solid #1A1D27;border-radius:6px;padding:20px;font-family:'DM Mono','Fira Code',monospace;font-size:11.5px;line-height:1.8;color:#A8A4A0;white-space:pre-wrap;word-break:break-word;overflow-x:auto}
    .g2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .g3{display:grid;grid-template-columns:repeat(auto-fill,minmax(268px,1fr));gap:8px}
    @keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fu .22s ease forwards}
    @media(max-width:680px){.g2{grid-template-columns:1fr}}
  `;

  return(
    <div style={{background:"#08090D",minHeight:"100vh",color:"#C8C4BC",fontFamily:"'DM Sans','Helvetica Neue',sans-serif"}}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={{borderBottom:"1px solid #13141A",padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",height:54,position:"sticky",top:0,background:"rgba(8,9,13,.97)",backdropFilter:"blur(14px)",zIndex:200}}>
        <button onClick={()=>nav("home")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:26,height:26,background:"linear-gradient(135deg,#A78BFA,#F97316)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>N</div>
          <span style={{fontFamily:"Instrument Serif,serif",fontSize:16,color:"#EAE6DE"}}>Neural Ascent</span>
        </button>
        <div style={{display:"flex",gap:2}}>
          {NAV.map(n=>(
            <button key={n.id} className="nb" onClick={()=>nav(n.id)}
              style={{color:page===n.id?"#C8C4BC":"#3E3C4A",background:page===n.id?"rgba(255,255,255,.055)":"none"}}>
              {n.l}
            </button>
          ))}
        </div>
        <div style={{fontSize:10,color:"#1E1D26",letterSpacing:".1em"}}>{totalHrs}H · 18 MOD · 46 PROMPTS</div>
      </nav>

      <div style={{maxWidth:1140,margin:"0 auto",padding:"0 28px 88px"}}>

        {/* ═══ HOME ════════════════════════════════════════════ */}
        {page==="home"&&(
          <div className="fu">
            <div style={{padding:"64px 0 48px",borderBottom:"1px solid #13141A",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-60,right:-80,width:460,height:460,background:"radial-gradient(circle,rgba(167,139,250,.08) 0%,transparent 65%)",pointerEvents:"none"}}/>
              <div style={{position:"absolute",top:80,left:-50,width:340,height:340,background:"radial-gradient(circle,rgba(249,115,22,.05) 0%,transparent 65%)",pointerEvents:"none"}}/>
              <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".2em",textTransform:"uppercase",marginBottom:18}}>— The Complete AI Education Platform —</div>
              <h1 style={{fontFamily:"Instrument Serif,serif",fontSize:"clamp(44px,6.5vw,78px)",fontWeight:400,lineHeight:.98,letterSpacing:"-.01em",marginBottom:6}}>Neural Ascent</h1>
              <h2 style={{fontFamily:"Instrument Serif,serif",fontSize:"clamp(26px,4vw,50px)",fontWeight:400,fontStyle:"italic",background:"linear-gradient(135deg,#A78BFA,#F97316)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:26,lineHeight:1}}>AI Mastery Academy</h2>
              <p style={{fontSize:15,color:"#4A4858",maxWidth:490,lineHeight:1.75,marginBottom:36}}>18 complete modules. 46 battle-tested prompt templates. One integrated platform for becoming a highly capable AI operator in 90 days.</p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <button onClick={()=>nav("course")} style={{padding:"11px 26px",background:"linear-gradient(135deg,#A78BFA,#6D28D9)",border:"none",borderRadius:7,color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer"}}>Start the Course →</button>
                <button onClick={()=>nav("prompts")} style={{padding:"11px 26px",background:"rgba(255,255,255,.04)",border:"1px solid #252836",borderRadius:7,color:"#888",fontSize:13,cursor:"pointer"}}>Prompt Toolkit</button>
                <button onClick={()=>nav("projects")} style={{padding:"11px 26px",background:"rgba(255,255,255,.04)",border:"1px solid #252836",borderRadius:7,color:"#888",fontSize:13,cursor:"pointer"}}>Projects</button>
              </div>
            </div>

            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:6,marginTop:24}}>
              {[["18","Modules"],["420+","Lessons"],["46","Prompts"],["52","Projects"],[totalHrs+"h","Content"],["4","Certifications"]].map(([v,l])=>(
                <div key={l} className="sb">
                  <div style={{fontFamily:"Instrument Serif,serif",fontSize:28,color:"#EAE6DE",lineHeight:1}}>{v}</div>
                  <div style={{fontSize:10,color:"#3E3C4A",marginTop:5,letterSpacing:".07em",textTransform:"uppercase"}}>{l}</div>
                </div>
              ))}
            </div>

            {/* Two col */}
            <div className="g2" style={{marginTop:10}}>
              <div style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,padding:26}}>
                <div style={{fontSize:10,color:"#A78BFA",letterSpacing:".14em",textTransform:"uppercase",marginBottom:14}}>AI Mastery Course</div>
                <div style={{fontFamily:"Instrument Serif,serif",fontSize:20,marginBottom:14,lineHeight:1.2}}>4 Phases · 18 Modules · 90 Days</div>
                {PHASES.map(ph=>(
                  <div key={ph.id} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 10px",background:"rgba(255,255,255,.018)",borderRadius:5,borderLeft:`2px solid ${ph.accent}`,marginBottom:5}}>
                    <span style={{fontSize:10,color:ph.accent,fontWeight:600,minWidth:88,letterSpacing:".07em",textTransform:"uppercase"}}>Phase {ph.num}: {ph.label}</span>
                    <span style={{fontSize:11,color:"#3E3C4A"}}>{grouped[ph.id]?.length} modules</span>
                  </div>
                ))}
                <button onClick={()=>nav("course")} style={{marginTop:16,background:"none",border:"1px solid #252836",borderRadius:6,color:"#666",padding:"8px 18px",fontSize:12,cursor:"pointer"}}>Explore Curriculum →</button>
              </div>
              <div style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,padding:26}}>
                <div style={{fontSize:10,color:"#F97316",letterSpacing:".14em",textTransform:"uppercase",marginBottom:14}}>Prompt Toolkit</div>
                <div style={{fontFamily:"Instrument Serif,serif",fontSize:20,marginBottom:14,lineHeight:1.2}}>46 Prompts · 12 Categories</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:16}}>
                  {PCATS.slice(1).map(c=>(
                    <span key={c.id} style={{background:"rgba(255,255,255,.025)",border:"1px solid #1A1D27",borderRadius:4,padding:"3px 8px",fontSize:10,color:"#3E3C4A"}}>{c.icon} {c.label}</span>
                  ))}
                </div>
                <button onClick={()=>nav("prompts")} style={{background:"none",border:"1px solid #252836",borderRadius:6,color:"#666",padding:"8px 18px",fontSize:12,cursor:"pointer"}}>Browse Prompts →</button>
              </div>
            </div>

            {/* Transformation */}
            <div style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,padding:30,marginTop:10}}>
              <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".14em",textTransform:"uppercase",marginBottom:22}}>The Transformation Promise</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 36px 1fr",gap:20,alignItems:"start"}}>
                <div>
                  <div style={{fontSize:10,color:"#3E3C4A",marginBottom:10,letterSpacing:".1em",textTransform:"uppercase"}}>Before</div>
                  {["AI feels overwhelming and opaque","Hours spent on tasks AI handles in minutes","No reliable system for consistent AI output","Watching others gain competitive advantage","Unsure how to monetize AI skills"].map(t=>(
                    <div key={t} style={{display:"flex",gap:10,padding:"7px 0",fontSize:12,color:"#2E2C3A",borderBottom:"1px solid #13141A"}}><span style={{color:"#252835",flexShrink:0}}>✕</span>{t}</div>
                  ))}
                </div>
                <div style={{fontSize:20,color:"#1A1D27",textAlign:"center",paddingTop:22}}>→</div>
                <div>
                  <div style={{fontSize:10,color:"#4ADE80",marginBottom:10,letterSpacing:".1em",textTransform:"uppercase"}}>After</div>
                  {["Highly capable AI operator across all domains","10× personal and professional output","Production AI systems you designed and built","Clear compounding competitive advantage","AI skills commanding premium market rates"].map(t=>(
                    <div key={t} style={{display:"flex",gap:10,padding:"7px 0",fontSize:12,color:"#706D6A",borderBottom:"1px solid #13141A"}}><span style={{color:"#4ADE80",flexShrink:0}}>✓</span>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ COURSE — Module List ════════════════════════════ */}
        {page==="course"&&!selMod&&(
          <div className="fu" style={{paddingTop:40}}>
            <div style={{marginBottom:28}}>
              <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".15em",textTransform:"uppercase",marginBottom:8}}>Complete Curriculum</div>
              <h2 style={{fontFamily:"Instrument Serif,serif",fontSize:32,fontWeight:400}}>18 Modules · 4 Phases · {totalHrs}+ Hours</h2>
            </div>
            {PHASES.map(ph=>{
              const mods=grouped[ph.id];const isOpen=phOpen===ph.id;
              return(
                <div key={ph.id} style={{marginBottom:6}}>
                  <button className="phhdr" onClick={()=>setPhOpen(isOpen?null:ph.id)}
                    style={{borderColor:isOpen?ph.accent+"44":"#1A1D27",background:isOpen?"rgba(255,255,255,.018)":"none"}}>
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:ph.accent}}/>
                      <span style={{fontFamily:"Instrument Serif,serif",fontSize:18}}>Phase {ph.num}: {ph.label}</span>
                      <span style={{fontSize:11,color:"#3E3C4A"}}>{mods.length} modules · {mods.reduce((s,m)=>s+parseInt(m.time),0)} hrs</span>
                    </div>
                    <span style={{color:"#3E3C4A",fontSize:15}}>{isOpen?"−":"+"}</span>
                  </button>
                  {isOpen&&(
                    <div className="g3" style={{marginTop:6}}>
                      {mods.map(mod=>(
                        <div key={mod.id} className="mc" onClick={()=>{setSelMod(mod);setModTab("lessons");}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                            <span style={{fontSize:22,color:ph.accent}}>{mod.icon}</span>
                            <div style={{textAlign:"right"}}>
                              <Chip label={mod.difficulty} color={ph.accent}/>
                              <div style={{fontSize:10,color:"#3E3C4A",marginTop:4}}>{mod.time} · {mod.lessonCount} lessons</div>
                            </div>
                          </div>
                          <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".1em",textTransform:"uppercase",marginBottom:5}}>Module {mod.id}</div>
                          <div style={{fontFamily:"Instrument Serif,serif",fontSize:17,lineHeight:1.2,marginBottom:6}}>{mod.title}</div>
                          <div style={{fontSize:11,color:"#4A4858",lineHeight:1.6,marginBottom:14}}>{mod.sub}</div>
                          <div style={{fontSize:11,color:ph.accent}}>View module →</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ COURSE — Module Detail ══════════════════════════ */}
        {page==="course"&&selMod&&!selLes&&(()=>{
          const ph=PHASES.find(p=>p.id===selMod.phase);
          return(
            <div className="fu" style={{paddingTop:36}}>
              <button onClick={()=>setSelMod(null)} style={{background:"none",border:"none",color:"#3E3C4A",cursor:"pointer",fontSize:11,marginBottom:22,padding:0,letterSpacing:".08em"}}>← Back to Curriculum</button>
              <div style={{display:"grid",gridTemplateColumns:"1fr 252px",gap:22,marginBottom:30,alignItems:"start"}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                    <span style={{fontSize:26,color:ph.accent}}>{selMod.icon}</span>
                    <div>
                      <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".12em",textTransform:"uppercase"}}>Module {selMod.id} · {ph.label}</div>
                      <h2 style={{fontFamily:"Instrument Serif,serif",fontSize:26,fontWeight:400,lineHeight:1.1,marginTop:4}}>{selMod.title}</h2>
                    </div>
                  </div>
                  <p style={{color:"#4A4858",fontSize:13,lineHeight:1.7,maxWidth:440,marginBottom:14}}>{selMod.sub}</p>
                  <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                    {[["⏱",selMod.time],["📚",`${selMod.lessonCount} lessons`],["⚡",selMod.difficulty]].map(([ic,v])=>(
                      <span key={v} style={{fontSize:12,color:"#4A4858"}}>{ic} {v}</span>
                    ))}
                  </div>
                </div>
                <div style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,padding:18}}>
                  <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".1em",textTransform:"uppercase",marginBottom:10}}>Objectives</div>
                  {selMod.objectives.map(o=>(
                    <div key={o} style={{display:"flex",gap:8,padding:"6px 0",fontSize:11,color:"#706D6A",borderBottom:"1px solid #111318",lineHeight:1.5}}>
                      <span style={{color:ph.accent,flexShrink:0}}>◆</span>{o}
                    </div>
                  ))}
                </div>
              </div>
              {/* Tabs */}
              <div style={{borderBottom:"1px solid #13141A",marginBottom:20,display:"flex"}}>
                {["lessons","project","tools","skills","takeaways"].map(t=>(
                  <button key={t} className={`tb${modTab===t?" on":""}`} onClick={()=>setModTab(t)}
                    style={{color:modTab===t?ph.accent:"#3E3C4A",borderBottomColor:modTab===t?ph.accent:"transparent"}}>
                    {t}
                  </button>
                ))}
              </div>
              {modTab==="lessons"&&(
                <div style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,overflow:"hidden"}}>
                  {selMod.lessons.map((les,i)=>(
                    <div key={les.n} className="lr" onClick={()=>setSelLes(les)}>
                      <div style={{width:30,height:30,background:ph.accent+"12",border:`1px solid ${ph.accent}30`,borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:ph.accent,flexShrink:0,fontWeight:600}}>{i+1}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,color:"#B8B4B0",fontWeight:500,marginBottom:3}}>{les.title}</div>
                        <div style={{fontSize:11,color:"#2E2C3A",fontStyle:"italic"}}>"{les.hook}"</div>
                      </div>
                      <span style={{fontSize:10,color:"#3E3C4A",marginRight:6,flexShrink:0}}>{les.time}</span>
                      <span style={{color:"#1E1D26",fontSize:13}}>→</span>
                    </div>
                  ))}
                </div>
              )}
              {modTab==="project"&&(
                <div style={{background:"#0F1117",border:`1px solid ${ph.accent}33`,borderRadius:8,padding:26,borderLeft:`2px solid ${ph.accent}`}}>
                  <div style={{fontSize:10,color:ph.accent,letterSpacing:".14em",textTransform:"uppercase",marginBottom:10}}>Capstone Project</div>
                  <h3 style={{fontFamily:"Instrument Serif,serif",fontSize:22,fontWeight:400,marginBottom:12}}>{selMod.project.title}</h3>
                  <p style={{color:"#4A4858",fontSize:13,lineHeight:1.75,marginBottom:20}}>{selMod.project.desc}</p>
                  <div style={{background:"#0A0B0F",border:"1px solid #1A1D27",borderRadius:6,padding:16,borderLeft:`2px solid ${ph.accent}55`}}>
                    <div style={{fontSize:9,color:"#3E3C4A",letterSpacing:".1em",textTransform:"uppercase",marginBottom:7}}>Deliverable</div>
                    <div style={{fontSize:13,color:"#888",lineHeight:1.65}}>{selMod.project.deliverable}</div>
                  </div>
                </div>
              )}
              {modTab==="tools"&&(
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {selMod.tools.map(t=>(
                    <span key={t} style={{background:"#0F1117",border:`1px solid ${ph.accent}28`,color:ph.accent,padding:"8px 16px",borderRadius:6,fontSize:12}}>{t}</span>
                  ))}
                </div>
              )}
              {modTab==="skills"&&(
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {selMod.skills.map(s=>(
                    <span key={s} style={{background:"#0F1117",border:"1px solid #1A1D27",color:"#706D6A",padding:"9px 16px",borderRadius:6,fontSize:12}}>{s}</span>
                  ))}
                </div>
              )}
              {modTab==="takeaways"&&(
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  <div style={{fontSize:9,color:"#3E3C4A",letterSpacing:".12em",textTransform:"uppercase",marginBottom:6}}>Key Takeaways</div>
                  {selMod.keyTakeaways?.map((tk,i)=>(
                    <div key={i} style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:7,padding:"14px 18px",borderLeft:`2px solid ${ph.accent}`,display:"flex",gap:10}}>
                      <span style={{color:ph.accent,flexShrink:0}}>◆</span>
                      <span style={{fontSize:13,color:"#A8A4A0",lineHeight:1.65}}>{tk}</span>
                    </div>
                  ))}
                  {selMod.commonMistakes?.length>0&&(
                    <>
                      <div style={{fontSize:9,color:"#3E3C4A",letterSpacing:".12em",textTransform:"uppercase",marginTop:14,marginBottom:6}}>Common Mistakes</div>
                      {selMod.commonMistakes.map((m,i)=>(
                        <div key={i} style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:7,padding:"12px 18px",borderLeft:"2px solid rgba(251,113,133,.35)",display:"flex",gap:10}}>
                          <span style={{color:"rgba(251,113,133,.5)",flexShrink:0}}>✗</span>
                          <span style={{fontSize:12,color:"#4A4858",lineHeight:1.6}}>{m}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })()}

        {/* ═══ COURSE — Lesson Detail ══════════════════════════ */}
        {page==="course"&&selLes&&(()=>{
          const ph=PHASES.find(p=>p.id===selMod.phase);
          return(
            <div className="fu" style={{paddingTop:36}}>
              <button onClick={()=>setSelLes(null)} style={{background:"none",border:"none",color:"#3E3C4A",cursor:"pointer",fontSize:11,marginBottom:22,padding:0,letterSpacing:".08em"}}>← Back to {selMod.title}</button>
              <div style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,overflow:"hidden"}}>
                <div style={{padding:"24px 28px",borderBottom:"1px solid #111318"}}>
                  <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".12em",textTransform:"uppercase",marginBottom:9}}>Lesson {selLes.n} · {selLes.time}</div>
                  <h2 style={{fontFamily:"Instrument Serif,serif",fontSize:26,fontWeight:400,lineHeight:1.1,marginBottom:14}}>{selLes.title}</h2>
                  <div style={{padding:"12px 16px",background:"#0A0B0F",borderLeft:`2px solid ${ph.accent}`,borderRadius:"0 5px 5px 0",fontStyle:"italic",fontSize:13,color:"#4A4858"}}>"{selLes.hook}"</div>
                </div>
                {[{label:"Core Concept",icon:"◈",k:"concept"},{label:"Real-World Application",icon:"◉",k:"app"},{label:"Exercise / Assignment",icon:"◫",k:"exercise"}].map(s=>(
                  <div key={s.label} style={{padding:"20px 28px",borderBottom:"1px solid #111318"}}>
                    <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                      <span style={{color:ph.accent,fontSize:13}}>{s.icon}</span>
                      <span style={{fontSize:9,color:"#3E3C4A",letterSpacing:".12em",textTransform:"uppercase"}}>{s.label}</span>
                    </div>
                    <p style={{fontSize:13,color:"#888",lineHeight:1.8}}>{selLes[s.k]}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ═══ PROMPTS ═════════════════════════════════════════ */}
        {page==="prompts"&&(
          <div className="fu" style={{paddingTop:40}}>
            <div style={{marginBottom:24}}>
              <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".15em",textTransform:"uppercase",marginBottom:8}}>Master Prompt Toolkit</div>
              <h2 style={{fontFamily:"Instrument Serif,serif",fontSize:32,fontWeight:400}}>46 Production-Ready Prompts</h2>
              <p style={{color:"#4A4858",fontSize:13,marginTop:6}}>Tested across Claude, ChatGPT, Midjourney, and more. Copy, customize, deploy.</p>
            </div>
            <div style={{display:"flex",gap:20}}>
              {/* Sidebar */}
              <div style={{width:184,flexShrink:0}}>
                <div style={{position:"sticky",top:62}}>
                  <div style={{fontSize:9,color:"#2E2C3A",letterSpacing:".12em",textTransform:"uppercase",marginBottom:7}}>Category</div>
                  <div style={{display:"flex",flexDirection:"column",gap:2,marginBottom:20}}>
                    {PCATS.map(c=>{
                      const cnt=c.id==="all"?PROMPTS.length:PROMPTS.filter(p=>p.cat===c.id).length;
                      return(
                        <button key={c.id} className={`pcat${pCat===c.id?" on":""}`} onClick={()=>setPCat(c.id)}>
                          <span style={{fontSize:11,opacity:.65}}>{c.icon}</span>
                          <span style={{flex:1,fontSize:11}}>{c.label}</span>
                          <span style={{fontSize:9,color:"#2A2835"}}>{cnt}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div style={{fontSize:9,color:"#2E2C3A",letterSpacing:".12em",textTransform:"uppercase",marginBottom:7}}>Tier</div>
                  <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:20}}>
                    {[["all","All Tiers","#666"],["POWER","Power","#FACC15"],["ADVANCED","Advanced","#38BDF8"],["ESSENTIAL","Essential","#555"]].map(([v,l,c])=>(
                      <label key={v} style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",fontSize:11,color:pTier===v?"#C8C4BC":"#4A4858",fontWeight:pTier===v?600:400}}>
                        <input type="radio" name="tier" checked={pTier===v} onChange={()=>setPTier(v)} style={{accentColor:c,cursor:"pointer"}}/>
                        {v!=="all"&&<span style={{width:6,height:6,borderRadius:"50%",background:c,flexShrink:0}}/>}
                        {l}
                      </label>
                    ))}
                  </div>
                  <div style={{fontSize:9,color:"#2E2C3A",letterSpacing:".12em",textTransform:"uppercase",marginBottom:7}}>Tool</div>
                  <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:230,overflowY:"auto"}}>
                    {["all",...Object.keys(TOOL_MAP)].map(tid=>{
                      const t=TOOL_MAP[tid];
                      return(
                        <label key={tid} style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",fontSize:11,color:pTool===tid?"#C8C4BC":"#4A4858"}}>
                          <input type="radio" name="atool" checked={pTool===tid} onChange={()=>setPTool(tid)} style={{accentColor:t?.color||"#888",cursor:"pointer"}}/>
                          {t&&<span style={{width:5,height:5,borderRadius:"50%",background:t.color,flexShrink:0}}/>}
                          {t?t.label:"All Tools"}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* Cards */}
              <div style={{flex:1,minWidth:0}}>
                <div style={{position:"relative",marginBottom:12}}>
                  <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:"#2E2C3A",fontSize:15,pointerEvents:"none"}}>⌕</span>
                  <input className="si" placeholder="Search prompts, tasks, tags…" value={pQ} onChange={e=>setPQ(e.target.value)}/>
                </div>
                <div style={{fontSize:11,color:"#3E3C4A",marginBottom:12}}><strong style={{color:"#666"}}>{filteredP.length}</strong> prompts</div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {filteredP.length===0
                    ?<div style={{textAlign:"center",padding:56,color:"#2A2835",fontSize:13}}>No prompts match your filters.</div>
                    :filteredP.map(pr=>{
                    const isOpen=pOpen===pr.id;
                    const tc={POWER:"#FACC15",ADVANCED:"#38BDF8",ESSENTIAL:"#555"}[pr.tier];
                    return(
                      <div key={pr.id} className="pc">
                        <div style={{padding:"15px 18px",cursor:"pointer"}} onClick={()=>setPOpen(isOpen?null:pr.id)}>
                          <div style={{display:"flex",alignItems:"flex-start",gap:14,flexWrap:"wrap"}}>
                            <div style={{flex:1,minWidth:170}}>
                              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7,flexWrap:"wrap"}}>
                                <Chip label={pr.tier} color={tc}/>
                                <span style={{fontSize:10,color:"#2A2835",letterSpacing:".07em"}}>{PCATS.find(c=>c.id===pr.cat)?.label}</span>
                              </div>
                              <div style={{fontFamily:"Instrument Serif,serif",fontSize:16,color:"#B8B4B0",marginBottom:4,lineHeight:1.2}}>{pr.title}</div>
                              <div style={{fontSize:11.5,color:"#4A4858",lineHeight:1.55}}>{pr.task}</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6,flexShrink:0}}>
                              <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"flex-end"}}>
                                {pr.tools.map(tid=><ToolPill key={tid} tid={tid}/>)}
                              </div>
                              <span style={{color:"#1A1D27",fontSize:14}}>{isOpen?"↑":"↓"}</span>
                            </div>
                          </div>
                          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:8}}>
                            {pr.tags.map(t=><span key={t} style={{background:"rgba(255,255,255,.02)",border:"1px solid #1A1D27",borderRadius:3,padding:"2px 7px",fontSize:10,color:"#2E2C3A"}}>{t}</span>)}
                          </div>
                        </div>
                        {isOpen&&(
                          <div style={{borderTop:"1px solid #111318"}}>
                            <div style={{padding:"16px 18px 0"}}>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                                <span style={{fontSize:9,color:"#3E3C4A",letterSpacing:".12em",textTransform:"uppercase"}}>Prompt Template</span>
                                <CopyBtn text={pr.prompt}/>
                              </div>
                              <div className="cb">{pr.prompt}</div>
                            </div>
                            {pr.tip&&(
                              <div style={{margin:"12px 18px 16px",padding:"12px 15px",background:"rgba(250,204,21,.04)",border:"1px solid rgba(250,204,21,.12)",borderRadius:6,display:"flex",gap:10}}>
                                <span style={{fontSize:13,flexShrink:0,marginTop:1}}>💡</span>
                                <div style={{fontSize:12,color:"#706D6A",lineHeight:1.65}}><strong style={{color:"#FACC15"}}>Pro tip: </strong>{pr.tip}</div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ PROJECTS ════════════════════════════════════════ */}
        {page==="projects"&&(
          <div className="fu" style={{paddingTop:40}}>
            <div style={{marginBottom:28}}>
              <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".15em",textTransform:"uppercase",marginBottom:8}}>Hands-On Learning</div>
              <h2 style={{fontFamily:"Instrument Serif,serif",fontSize:32,fontWeight:400}}>52 Projects · 4 Mastery Capstones</h2>
            </div>
            {/* Capstones */}
            <div style={{marginBottom:30}}>
              <div style={{fontSize:10,color:"#A78BFA",letterSpacing:".14em",textTransform:"uppercase",marginBottom:12}}>Mastery Capstones</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {CAPSTONES.map((cp,i)=>(
                  <div key={cp.title} style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,padding:22,borderLeft:`2px solid ${cp.col}`,display:"flex",gap:20}}>
                    <div style={{width:42,height:42,background:cp.col+"12",border:`1px solid ${cp.col}28`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Instrument Serif,serif",fontSize:20,color:cp.col,flexShrink:0}}>{String.fromCharCode(65+i)}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                        <h3 style={{fontFamily:"Instrument Serif,serif",fontSize:18,fontWeight:400}}>{cp.title}</h3>
                        <Chip label={cp.phase} color={cp.col}/>
                      </div>
                      <p style={{color:"#4A4858",fontSize:12.5,lineHeight:1.7,marginBottom:12}}>{cp.desc}</p>
                      <div style={{background:"#0A0B0F",padding:"9px 14px",fontSize:12,color:cp.col,borderLeft:`1px solid ${cp.col}38`,borderRadius:"0 4px 4px 0"}}><span style={{color:"#3E3C4A",marginRight:7}}>Deliverable →</span>{cp.deliverable}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Module projects grid */}
            <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".14em",textTransform:"uppercase",marginBottom:12}}>Module Capstone Projects (18)</div>
            <div className="g3">
              {MODULES.map(mod=>{
                const ac=phAccent(mod.phase);
                return(
                  <div key={mod.id} style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:7,padding:16,cursor:"pointer"}} onClick={()=>{setSelMod(mod);setModTab("project");setPage("course");}}>
                    <div style={{fontSize:9,color:ac,letterSpacing:".1em",textTransform:"uppercase",marginBottom:6}}>Module {mod.id}</div>
                    <div style={{fontFamily:"Instrument Serif,serif",fontSize:15,marginBottom:6,lineHeight:1.2}}>{mod.project.title}</div>
                    <div style={{fontSize:10.5,color:"#4A4858",lineHeight:1.55,marginBottom:10}}>{mod.project.deliverable}</div>
                    <div style={{fontSize:10,color:ac}}>View brief →</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ TOOLS ═══════════════════════════════════════════ */}
        {page==="tools"&&(
          <div className="fu" style={{paddingTop:40}}>
            <div style={{marginBottom:28}}>
              <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".15em",textTransform:"uppercase",marginBottom:8}}>Technology Stack</div>
              <h2 style={{fontFamily:"Instrument Serif,serif",fontSize:32,fontWeight:400}}>The 2026 AI Tool Encyclopedia</h2>
              <p style={{color:"#4A4858",fontSize:13,marginTop:6}}>Every tool covered in the curriculum — organized by category.</p>
            </div>
            <div className="g3">
              {TOOL_STACK.map(tc=>(
                <div key={tc.cat} style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,padding:20}}>
                  <div style={{fontSize:9,color:tc.col,letterSpacing:".14em",textTransform:"uppercase",marginBottom:12,fontWeight:600}}>{tc.cat}</div>
                  {tc.items.map(item=>(
                    <div key={item} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:"1px solid #111318"}}>
                      <span style={{width:4,height:4,borderRadius:"50%",background:tc.col,flexShrink:0,opacity:.45}}/>
                      <span style={{fontSize:12,color:"#555260"}}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Prompt tool coverage */}
            <div style={{marginTop:24,background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,padding:24}}>
              <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".14em",textTransform:"uppercase",marginBottom:16}}>Prompt Coverage by Tool</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {Object.entries(TOOL_MAP).map(([id,t])=>{
                  const cnt=PROMPTS.filter(p=>p.tools.includes(id)).length;
                  return(
                    <div key={id} style={{background:"rgba(255,255,255,.02)",border:`1px solid ${t.color}1A`,borderRadius:6,padding:"9px 14px",display:"flex",alignItems:"center",gap:8}}>
                      <span style={{width:6,height:6,borderRadius:"50%",background:t.color}}/>
                      <span style={{fontSize:12,color:"#706D6A"}}>{t.label}</span>
                      <span style={{fontSize:11,color:t.color,fontWeight:600}}>{cnt} prompts</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══ CERTIFY ═════════════════════════════════════════ */}
        {page==="certify"&&(
          <div className="fu" style={{paddingTop:40}}>
            <div style={{marginBottom:28}}>
              <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".15em",textTransform:"uppercase",marginBottom:8}}>Credential System</div>
              <h2 style={{fontFamily:"Instrument Serif,serif",fontSize:32,fontWeight:400}}>4 Levels of Mastery</h2>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:32}}>
              {CERTIFICATIONS.map(cert=>(
                <div key={cert.name} style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,padding:22,borderLeft:`2px solid ${cert.color}`,display:"flex",gap:20,alignItems:"center",flexWrap:"wrap"}}>
                  <div style={{width:54,height:54,background:cert.color+"10",border:`1px solid ${cert.color}28`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontFamily:"Instrument Serif,serif",fontSize:22,color:cert.color,lineHeight:1}}>{cert.level}</div>
                      <div style={{fontSize:7,color:cert.color,letterSpacing:".1em",textTransform:"uppercase"}}>LEVEL</div>
                    </div>
                  </div>
                  <div style={{flex:1,minWidth:200}}>
                    <div style={{fontFamily:"Instrument Serif,serif",fontSize:21,color:cert.color,marginBottom:5}}>{cert.name}</div>
                    <div style={{fontSize:11,color:"#4A4858",marginBottom:5}}>Modules {cert.modules} · {cert.req}</div>
                    <div style={{fontSize:12,color:"#555260"}}>{cert.outcome}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="g2" style={{marginBottom:10}}>
              <div style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,padding:24}}>
                <div style={{fontSize:10,color:"#FACC15",letterSpacing:".14em",textTransform:"uppercase",marginBottom:16}}>Gamification</div>
                {[["XP Points","Earn for every lesson, exercise, and project"],["Streak Tracking","Daily streaks with escalating rewards at 7, 14, 30 days"],["Skill Tree","Visual map unlocking advanced modules automatically"],["Leaderboard","Weekly ranking by XP, projects, and contribution"],["50+ Badges","Achievement badges for every milestone"],["Peer Review","Submit projects for double XP bonuses"]].map(([n,d])=>(
                  <div key={n} style={{padding:"9px 0",borderBottom:"1px solid #111318"}}>
                    <div style={{fontSize:12,color:"#FACC15",marginBottom:3}}>{n}</div>
                    <div style={{fontSize:11,color:"#4A4858",lineHeight:1.5}}>{d}</div>
                  </div>
                ))}
              </div>
              <div style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,padding:24}}>
                <div style={{fontSize:10,color:"#4ADE80",letterSpacing:".14em",textTransform:"uppercase",marginBottom:16}}>Community</div>
                {[["Private Discord","Real-time community of AI operators globally"],["Weekly Live Sessions","Live Q&A, project reviews, and guest talks"],["Project Showcase","Public gallery of student AI builds"],["Study Groups","Auto-paired by timezone and pace"],["AI Job Board","Exclusive curated opportunities for graduates"],["Alumni Network","Verified AI Architect graduates for collaboration"]].map(([n,d])=>(
                  <div key={n} style={{padding:"9px 0",borderBottom:"1px solid #111318"}}>
                    <div style={{fontSize:12,color:"#4ADE80",marginBottom:3}}>{n}</div>
                    <div style={{fontSize:11,color:"#4A4858",lineHeight:1.5}}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Final exam */}
            <div style={{background:"#0F1117",border:"1px solid rgba(167,139,250,.28)",borderRadius:8,padding:28,borderLeft:"2px solid #A78BFA"}}>
              <div style={{fontSize:10,color:"#A78BFA",letterSpacing:".14em",textTransform:"uppercase",marginBottom:12}}>Final Mastery Exam</div>
              <h3 style={{fontFamily:"Instrument Serif,serif",fontSize:23,fontWeight:400,marginBottom:12}}>The AI Architect Assessment</h3>
              <p style={{color:"#4A4858",fontSize:13,lineHeight:1.75,marginBottom:20}}>A 3-part assessment: 100-question written exam across all 18 modules, a 4-hour live technical challenge building a real AI system from scratch, and a 20-minute capstone defense before a panel of active AI practitioners.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                {[["Written Exam","100 questions · 90 min · 75% pass threshold"],["Technical Challenge","Live build · 4 hours · Architecture + implementation"],["Capstone Defense","20-min presentation · Panel of 3 practitioners"]].map(([t,d])=>(
                  <div key={t} style={{background:"#0A0B0F",border:"1px solid #1A1D27",borderRadius:6,padding:16}}>
                    <div style={{fontFamily:"Instrument Serif,serif",fontSize:14,color:"#A78BFA",marginBottom:7}}>{t}</div>
                    <div style={{fontSize:11,color:"#4A4858",lineHeight:1.55}}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ CAREERS ═════════════════════════════════════════ */}
        {page==="careers"&&(
          <div className="fu" style={{paddingTop:40}}>
            <div style={{marginBottom:28}}>
              <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".15em",textTransform:"uppercase",marginBottom:8}}>Where This Takes You</div>
              <h2 style={{fontFamily:"Instrument Serif,serif",fontSize:32,fontWeight:400}}>6 High-Demand AI Career Paths</h2>
            </div>
            <div className="g2" style={{marginBottom:28}}>
              {CAREERS.map(c=>(
                <div key={c.title} style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,padding:20,borderLeft:`2px solid ${c.color}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:9}}>
                    <div style={{fontSize:10,color:c.color,letterSpacing:".1em",textTransform:"uppercase"}}>Career Path</div>
                    <div style={{fontFamily:"Instrument Serif,serif",fontSize:14,color:c.color}}>{c.salary}</div>
                  </div>
                  <div style={{fontFamily:"Instrument Serif,serif",fontSize:21,marginBottom:7,lineHeight:1.1}}>{c.title}</div>
                  <div style={{fontSize:12,color:"#4A4858",lineHeight:1.6,marginBottom:12}}>{c.desc}</div>
                  <div style={{fontSize:10,color:"#3E3C4A"}}>Path: <span style={{color:c.color,fontFamily:"'DM Mono',monospace",fontSize:10}}>{c.path}</span></div>
                </div>
              ))}
            </div>
            {/* Full tool stack */}
            <div style={{background:"#0F1117",border:"1px solid #1A1D27",borderRadius:8,padding:26}}>
              <div style={{fontSize:10,color:"#3E3C4A",letterSpacing:".14em",textTransform:"uppercase",marginBottom:22}}>Complete 2026 AI Tool Stack</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:18}}>
                {TOOL_STACK.map(tc=>(
                  <div key={tc.cat}>
                    <div style={{fontSize:9,color:tc.col,letterSpacing:".1em",textTransform:"uppercase",marginBottom:9,fontWeight:600}}>{tc.cat}</div>
                    {tc.items.map(item=>(
                      <div key={item} style={{display:"flex",gap:7,padding:"5px 0",borderBottom:"1px solid #111318",alignItems:"center"}}>
                        <span style={{width:4,height:4,borderRadius:"50%",background:tc.col,flexShrink:0,opacity:.4}}/>
                        <span style={{fontSize:11.5,color:"#4A4858"}}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{borderTop:"1px solid #111318",padding:"16px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:10,color:"#1A1D27",letterSpacing:".1em"}}>NEURAL ASCENT AI MASTERY ACADEMY · 2026 EDITION</div>
        <div style={{fontSize:10,color:"#1A1D27",letterSpacing:".08em"}}>18 MODULES · {totalHrs}H · 46 PROMPTS · 4 CERTIFICATIONS</div>
      </div>
    </div>
  );
}
