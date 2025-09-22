export const config = {
  app: {
    urls: {
      dev: 'https://app.dev.mentorium.ai',
      prod: 'https://app.mentorium.ai'
    }
  }
}

export function getAppUrl(): string {
  const isDev = process.env.NODE_ENV === 'development' ||
                process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'

  return isDev ? config.app.urls.dev : config.app.urls.prod
}