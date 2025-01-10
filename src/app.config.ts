const CONFIG = {
    development: {
      API_URL: "http://localhost:3000",
    },
    production: {
      API_URL: "https://caravanstalling-ter-apel-node.fly.dev",
    },
  };
  
  // Export the config based on the current environment
  const ENV = process.env.NODE_ENV || "development";
  export const { API_URL } = CONFIG[ENV as keyof typeof CONFIG];
  