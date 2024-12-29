export enum EnvNames {
  PROD = 'production',
  DEV = 'development',
}

type EnvName = EnvNames.PROD | EnvNames.DEV;

export interface EnvConfig {
  apiURL: string;
  env: EnvName;
}

const ENV_CONFIGS: Record<EnvName, EnvConfig> = {
  production: {
    apiURL: import.meta.env.VITE_API_URL || 'https://pokeapi.co/api/v2/',
    env: EnvNames.PROD,
  },
  development: {
    apiURL: import.meta.env.VITE_API_URL || 'https://pokeapi.co/api/v2/',
    env: EnvNames.DEV,
  },
};

export function getEnvConfig(): EnvConfig {
  const nodeEnv = (import.meta.env.MODE as EnvName) || EnvNames.DEV;
  return ENV_CONFIGS[nodeEnv];
}
