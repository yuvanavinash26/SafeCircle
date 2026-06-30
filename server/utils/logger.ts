type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaString = meta ? ` | ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}${metaString}`;
  }

  public info(message: string, meta?: any): void {
    console.log(this.formatMessage('info', message, meta));
  }

  public warn(message: string, meta?: any): void {
    console.warn(this.formatMessage('warn', message, meta));
  }

  public error(message: string, error?: any): void {
    const errorDetails = error instanceof Error ? error.stack || error.message : error;
    console.error(this.formatMessage('error', message, errorDetails));
  }

  public debug(message: string, meta?: any): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }
}

export const logger = new Logger();
