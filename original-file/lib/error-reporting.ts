type ErrorReport = {
  context: string;
  error: unknown;
  metadata?: Record<string, string | number | boolean | null | undefined>;
};

function getErrorText(error: unknown) {
  if (error instanceof Error) {
    return error.stack || error.message;
  }

  return typeof error === "string" ? error : JSON.stringify(error);
}

function getReportConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    to: process.env.ERROR_ALERT_EMAIL,
    from: process.env.ERROR_ALERT_FROM ?? "AI Academy <onboarding@resend.dev>",
  };
}

export async function reportServerError({
  context,
  error,
  metadata = {},
}: ErrorReport) {
  const errorText = getErrorText(error);
  const config = getReportConfig();

  console.error(`[${context}]`, { error: errorText, metadata });

  if (!config.apiKey || !config.to) {
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        subject: `AI Academy error: ${context}`,
        text: [
          `Context: ${context}`,
          "",
          "Metadata:",
          JSON.stringify(metadata, null, 2),
          "",
          "Error:",
          errorText,
        ].join("\n"),
      }),
    });
  } catch (reportingError) {
    console.error("[error-reporting]", getErrorText(reportingError));
  }
}

export function getPublicErrorMessage(fallback: string) {
  return fallback;
}
