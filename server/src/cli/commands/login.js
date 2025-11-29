import { cancel, confirm, intro, isCancel, outro } from "@clack/prompts";
import { logger } from "better-auth";
import { createAuthClient } from "better-auth/client";
import { deviceAuthorizationClient } from "better-auth/client/plugins";
import chalk from "chalk";
import { Command } from "commander";
import fs from "fs/promises";
import open from "open";
import os from "os";
import path from "path";
import yoctoSpinner from "yocto-spinner";

import * as z from "zod/v4";
import dotenv from "dotenv";

dotenv.config();

const URL = "http://localhost:3005";
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CONFIG_DIR = path.join(os.homedir(), ".better-auth");
const TOKEN_FILE = path.join(CONFIG_DIR, "token.json");

export async function loginAction(opts) {
    const options = z.object({
        serverUrl: z.string().optional(),
        clientId: z.string().optional(),
    })

    const serverUrl = options.serverUrl || URL;
    const clientId = options.clientId || CLIENT_ID;

    intro(chalk.bold("🔐Auth Cli Login"))

    const existingToken = false;
    const expired = false;

    if (existingToken && !expired) {
        const shouldReAuth = await confirm({
            message: "You are already logged in. Do you want to re-authenticate?",
            initialValue: false,
        })
        if (isCancel(shouldReAuth) || !shouldReAuth) {
            cancel("Login cancelled.");
            process.exit(0);
        }
    }

    const authClient = createAuthClient({
        baseURL: serverUrl,
        plugins: [
            deviceAuthorizationClient()
        ]
    })

    const spinner = yoctoSpinner({
        text: "Requesting device authorization..."
    });
    spinner.start();

    try {
        const { data, error } = await authClient.device.code({
            client_id: clientId,
            scope: "openid profile email",
        });
        spinner.stop();

        if (error || !data) {
            logger.error("Failed to initiate device authorization.", error);
            process.exit(1);
        }

        const {
            device_code,
            user_code,
            verification_uri,
            verification_uri_complete,
            interval = 5,
            expires_in
        } = data;

        console.log(chalk.cyan("Device Authorization Required"));

        console.log(`Please visit: ${chalk.underline.blue(verification_uri || verification_uri_complete)}`);
        console.log(`And enter the code: ${chalk.bold.green(user_code)}`);

        const shouldOpen = await confirm({
            message: "Open the verification URL in your browser?",
            initialValue: true,
        })

        if (!isCancel(shouldOpen) && shouldOpen) {
            await open(verification_uri || verification_uri_complete);
        }

        console.log(chalk.gray(`Waiting for authorization... (expires in ${Math.floor(expires_in / 60)} minutes)`));
    }
    catch (err) {
    }
}

// Commander Setup
export const login = new Command("login")
    .description("Login to Better Auth CLI")
    .option("--server-url <url>", "The authentication server URL", URL)
    .option("--client-id <id>", "The OAuth client ID", CLIENT_ID)
    .action(loginAction);