/**
 * Maps Supabase auth errors to user-friendly messages
 * Prevents exposing technical error codes to users
 */
export function getUserFriendlyError(error: Error | { message: string } | string): string {
  const message = typeof error === "string" ? error : error.message || "";
  const lowerMessage = message.toLowerCase();

  // Rate limiting errors
  if (lowerMessage.includes("rate limit") || lowerMessage.includes("too many requests")) {
    return "Please wait a moment before trying again. We've sent you an email - check your inbox and spam folder.";
  }

  // Email already exists
  if (lowerMessage.includes("already registered") || lowerMessage.includes("user already")) {
    return "This email is already registered. Try signing in instead, or use a different email address.";
  }

  // Invalid credentials
  if (lowerMessage.includes("invalid login") || lowerMessage.includes("invalid credentials")) {
    return "Invalid email or password. Please check your details and try again.";
  }

  // Weak password
  if (lowerMessage.includes("password")) {
    return "Please choose a stronger password with at least 6 characters.";
  }

  // Invalid email format
  if (lowerMessage.includes("valid email") || lowerMessage.includes("email format")) {
    return "Please enter a valid email address.";
  }

  // Email not confirmed
  if (lowerMessage.includes("not confirmed") || lowerMessage.includes("email not")) {
    return "Please check your email and click the confirmation link before signing in.";
  }

  // Network/connection errors
  if (lowerMessage.includes("network") || lowerMessage.includes("connection") || lowerMessage.includes("fetch")) {
    return "Having trouble connecting. Please check your internet connection and try again.";
  }

  // Default fallback - don't expose technical details
  return "Something went wrong. Please try again in a moment.";
}

/**
 * Handle auth errors with proper user-friendly messages
 */
export function handleAuthError(error: unknown): string {
  if (error instanceof Error) {
    return getUserFriendlyError(error);
  }
  
  if (typeof error === "string") {
    return getUserFriendlyError(error);
  }
  
  if (error && typeof error === "object" && "message" in error) {
    return getUserFriendlyError(error as { message: string });
  }

  return "Something went wrong. Please try again.";
}
