"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error", {
      message: error.message,
      digest: error.digest,
    });

    void fetch("/api/errors/client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "global-boundary",
        message: error.message,
        digest: error.digest,
        path: window.location.pathname,
      }),
    }).catch(() => undefined);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main
          style={{
            maxWidth: "42rem",
            margin: "4rem auto",
            padding: "0 1rem",
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          <section
            role="alert"
            style={{
              border: "1px solid #ef4444",
              borderRadius: "0.5rem",
              padding: "1.25rem",
            }}
          >
            <h1 style={{ fontSize: "1.5rem", margin: 0 }}>Application error</h1>
            <p style={{ lineHeight: 1.6 }}>
              AI Academy could not load correctly. Try again in a moment.
            </p>
            {error.digest ? (
              <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>
                Error code: {error.digest}
              </p>
            ) : null}
            <button
              onClick={reset}
              style={{
                border: "0",
                borderRadius: "0.375rem",
                background: "#111827",
                color: "#fff",
                cursor: "pointer",
                padding: "0.625rem 0.875rem",
              }}
              type="button"
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
