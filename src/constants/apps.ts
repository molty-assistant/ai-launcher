/**
 * Supported AI apps — the core data model.
 * Each app has a display name, URL scheme for deep linking,
 * a colour for the icon background, and an emoji as placeholder icon.
 *
 * URL schemes are used on iOS; on Android we fall back to Play Store URLs.
 */

export interface AIApp {
  id: string;
  name: string;
  urlScheme: string;
  /** Fallback URL if the app isn't installed (App Store / Play Store) */
  fallbackUrl: string;
  /** Brand colour for the icon tile */
  color: string;
  /** Emoji placeholder — replace with actual icons/images later */
  emoji: string;
}

export const AI_APPS: AIApp[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    urlScheme: "chatgpt://",
    fallbackUrl: "https://apps.apple.com/app/chatgpt/id6448311069",
    color: "#10A37F",
    emoji: "💬",
  },
  {
    id: "claude",
    name: "Claude",
    urlScheme: "claude://",
    fallbackUrl: "https://apps.apple.com/app/claude-by-anthropic/id6473753684",
    color: "#D4A574",
    emoji: "🧠",
  },
  {
    id: "gemini",
    name: "Gemini",
    urlScheme: "gemini://",
    fallbackUrl: "https://apps.apple.com/app/google-gemini/id6477489129",
    color: "#4285F4",
    emoji: "✨",
  },
  {
    id: "copilot",
    name: "Copilot",
    urlScheme: "mscopilot://",
    fallbackUrl: "https://apps.apple.com/app/microsoft-copilot/id6738322478",
    color: "#7B61FF",
    emoji: "🤖",
  },
  {
    id: "grok",
    name: "Grok",
    urlScheme: "grok://",
    fallbackUrl: "https://apps.apple.com/app/grok/id6670324846",
    color: "#1DA1F2",
    emoji: "⚡",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    urlScheme: "perplexity://",
    fallbackUrl: "https://apps.apple.com/app/perplexity-ask-anything/id6714467650",
    color: "#20B8CD",
    emoji: "🔍",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    urlScheme: "deepseek://",
    fallbackUrl: "https://apps.apple.com/app/deepseek/id6737534691",
    color: "#0066FF",
    emoji: "🌊",
  },
  {
    id: "poe",
    name: "Poe",
    urlScheme: "poe://",
    fallbackUrl: "https://apps.apple.com/app/poe-ai-chat-bot/id1640745955",
    color: "#6C5CE7",
    emoji: "📝",
  },
];

/** Default selection: top 6 apps for the home grid */
export const DEFAULT_APP_IDS = [
  "chatgpt",
  "claude",
  "gemini",
  "copilot",
  "grok",
  "perplexity",
];

/** Max apps in the launcher grid */
export const MAX_SELECTED_APPS = 6;

/** Min apps in the launcher grid */
export const MIN_SELECTED_APPS = 2;
