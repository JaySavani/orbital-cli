import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js"
import { deviceAuthorization } from "better-auth/plugins";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    plugins: [
        deviceAuthorization({
            verificationUri: "/device",
            expiresIn: "30m",
            interval: "5s",
        }),
    ],
    trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:3000"],
    basePath: "/api/auth",
    advanced: process.env.NODE_ENV === "production" ? {
        crossSubDomainCookies: {
            enabled: true,
            domain: "jaysavani.site"
        },
    } : undefined,
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
    },

});