import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { jwt } from "better-auth/plugins";
import { env } from "./env.js";

const isProduction = env.NODE_ENV === "production";

export const auth = betterAuth({
  trustedOrigins: isProduction ? [env.CLIENT_URL] : ["*"],

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    jwt({
      jwt: {
        expiresIn: "30d",
      },
      schema: {
        jwks: {
          disableMigrations: true,
        },
      },
    }),
  ],

  session: {
    expiresIn: 30 * 24 * 60 * 60,
    cookieCache: {
      enabled: true,
      maxAge: 30 * 24 * 60 * 60,
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(";");
          if (ADMIN_EMAILS?.includes(user.email)) {
            user.role = "SUPERADMIN";
            user.emailVerified = true;
          }
          return { data: user };
        },
      },
    },
  },

  user: {
    additionalFields: {
      role: {
        type: ["SUPERADMIN", "ADMIN", "USER"],
        input: false,
      },
    },
  },

  advanced: {
    cookiePrefix: "better-auth",
    crossSubdomainCookies: {
      enabled: true,
    },
    cookies: {
      session_token: {
        attributes: {
          sameSite: isProduction ? "none" : "lax",
          secure: isProduction,
          httpOnly: true,
        },
      },
      dont_remember: {
        attributes: {
          sameSite: isProduction ? "none" : "lax",
          secure: isProduction,
          httpOnly: true,
        },
      },
    },
    database: {
      generateId: false,
    },
  },
});
