#!/usr/bin/env node

import dotenv from "dotenv";
import { Command } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import { login, logout, whoami } from "./commands/login.js";


dotenv.config();

async function main() {
    // Display banner
    console.log(
        chalk.cyan(
            figlet.textSync("Orbital CLI", {
                font: "Standard",
                horizontalLayout: "default",
            })
        )
    );
    console.log(chalk.gray("  Authentication CLI for Better Auth\n"));

    const program = new Command("orbital");

    program
        .version("0.0.1")
        .description("Orbital CLI - Device Flow Authentication");

    // Add commands
    program.addCommand(login);
    program.addCommand(logout);
    program.addCommand(whoami);

    // Default action shows help
    program.action(() => {
        program.help();
    });

    program.parse();
}

main().catch((error) => {
    console.error(chalk.red("Error running Orbital CLI:"), error);
    process.exit(1);
});