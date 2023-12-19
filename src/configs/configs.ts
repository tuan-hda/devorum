const configs = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/',
  SHELL_HOSTNAME: process.env.NEXT_PUBLIC_SHELL_HOSTNAME || '127.0.0.1',
  AGORA_APP_ID: process.env.NEXT_PUBLIC_AGORA_APP_ID || '0',
}

export default configs
