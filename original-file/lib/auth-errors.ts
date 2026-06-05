type AuthErrorLike = {
  message?: string;
  code?: string;
  status?: number;
};

export function getPublicAuthErrorMessage(
  error: AuthErrorLike,
  mode: "login" | "signup"
) {
  const message = error.message?.toLowerCase() ?? "";
  const code = error.code?.toLowerCase() ?? "";

  if (
    message.includes("email not confirmed") ||
    code.includes("not_confirmed")
  ) {
    return "Confirm your email before logging in. Check your inbox and spam folder, then try again.";
  }

  if (
    message.includes("invalid login credentials") ||
    message.includes("invalid credentials") ||
    code.includes("invalid_credentials")
  ) {
    return "Invalid email or password. If you used Google first, continue with Google or send a password reset link.";
  }

  if (
    message.includes("already registered") ||
    message.includes("already exists") ||
    code.includes("user_already_exists")
  ) {
    return "An account already exists for this email. Log in instead.";
  }

  if (message.includes("password") && message.includes("weak")) {
    return "Choose a stronger password and try again.";
  }

  if (message.includes("rate limit") || error.status === 429) {
    return "Too many attempts. Wait a minute and try again.";
  }

  if (message.includes("signup") && message.includes("disabled")) {
    return "New account signup is temporarily unavailable.";
  }

  return mode === "login"
    ? "We could not log you in. Check your email and password, then try again."
    : "We could not create this account. Check your email and password, then try again.";
}
