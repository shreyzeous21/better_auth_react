import "dotenv/config";

const requiredVars = [
  "PORT",
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
  "DATABASE_URL",
  "API_SECRET",
  "ADMIN_EMAILS",
  "CLIENT_URL",
  "NODE_ENV",
];

const missing = requiredVars.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`
🚨 Environment Configuration Error

Missing variables:
${missing.map((v) => `  • ${v}`).join("\n")}

Please add them to your .env file.
`);

  process.exit(1);
}

export const env = {
  PORT: parseInt(process.env.PORT),
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  API_SECRET: process.env.API_SECRET,
  ADMIN_EMAILS: process.env.ADMIN_EMAILS,
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_ENV: process.env.NODE_ENV,
};
