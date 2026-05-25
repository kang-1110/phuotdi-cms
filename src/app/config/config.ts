interface AppConfig {
    baseUrl: string;
    apiBaseUrl: string;
}

const configs: Record<string, AppConfig> = {
    development: {
        baseUrl: "https://api.labame.airlab.dev",
        apiBaseUrl: "https://api.labame.airlab.dev/api",
    },
    staging: {
        baseUrl: "https://api.labame.airlab.dev",
        apiBaseUrl: "https://api.labame.airlab.dev/api",
    },
    production: {
        baseUrl: "https://api.erp.labame.app",
        apiBaseUrl: "https://api.erp.labame.app/api",
    }
};

export const appConfig = configs[import.meta.env.MODE] || configs.development;