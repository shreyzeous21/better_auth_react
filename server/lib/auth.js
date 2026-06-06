import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { jwt } from "better-auth/plugins";
import { env } from "./env.js";

const isProduction = env.NODE_ENV === "production";
const trustedOrigins = isProduction
  ? ["https://betterauthreact.vercel.app"]
  : ["*"];

export const auth = betterAuth({
  trustedOrigins,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  plugins: [jwt()],

  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
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
    database: {
      generateId: false,
    },
  },

  advanced: {
    cookiePrefix: "better-auth",
    crossSubDomainCookies: {
      enabled: true,
    },
    cookies: {
      session_token: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
        },
      },
      dont_remember: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
        },
      },
    },
  },
});
