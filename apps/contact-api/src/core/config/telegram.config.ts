export type TelegramConfig = {
  apiBaseUrl: string;
  botToken: string;
  chatId: string;
  requestTimeoutMs: number;
};

export const TELEGRAM_CONFIG = Symbol('TELEGRAM_CONFIG');

function optional(environment: NodeJS.ProcessEnv, name: string) {
  return environment[name]?.trim() || undefined;
}

export function createTelegramConfig(environment: NodeJS.ProcessEnv = process.env): TelegramConfig | null {
  const botToken = optional(environment, 'TELEGRAM_BOT_TOKEN');
  const chatId = optional(environment, 'TELEGRAM_CHAT_ID');

  if (!botToken && !chatId) return null;
  if (!botToken || !chatId) {
    throw new Error('TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be configured together.');
  }

  return {
    apiBaseUrl: 'https://api.telegram.org',
    botToken,
    chatId,
    requestTimeoutMs: 900,
  };
}
