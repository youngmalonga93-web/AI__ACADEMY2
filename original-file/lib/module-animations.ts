const animationFiles = [
  "01-the-ai-operating-system.svg",
  "02-prompt-engineering-mastery.svg",
  "03-ai-productivity-deep-work.svg",
  "04-ai-content-engine.svg",
  "05-ai-image-video-audio.svg",
  "06-ai-automation-no-code.svg",
  "07-ai-marketing-sales.svg",
  "08-ai-coding-development.svg",
  "09-ai-agents-autonomous-systems.svg",
  "10-rag-knowledge-systems.svg",
  "11-ai-business-strategy.svg",
  "12-ai-research-analysis.svg",
  "13-fine-tuning-custom-models.svg",
  "14-ai-monetization-entrepreneurship.svg",
  "15-open-source-local-ai.svg",
  "16-ai-ethics-governance.svg",
  "17-ai-system-design-architecture.svg",
  "18-the-future-of-ai.svg",
] as const;

export type ModuleAnimation = {
  src: string;
  alt: string;
};

export function getModuleAnimation(
  moduleId: number,
  moduleTitle: string
): ModuleAnimation {
  const file = animationFiles[moduleId - 1] ?? animationFiles[0];

  return {
    src: `/animations/${file}`,
    alt: `${moduleTitle} animated lesson visual`,
  };
}

export const moduleAnimationCount = animationFiles.length;
