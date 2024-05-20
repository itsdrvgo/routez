import chalk from "chalk";

export class Logger {
    public info(...messages: any[]): void {
        console.log(
            "[ " +
                new Date().toLocaleTimeString() +
                " ] - " +
                chalk.cyanBright("[INFO] - ", ...messages)
        );
    }

    public warn(...messages: any[]): void {
        console.warn(
            "[ " +
                new Date().toLocaleTimeString() +
                " ] - " +
                chalk.yellowBright("[WARNING] - ", ...messages)
        );
    }

    public error(...messages: any[]): void {
        console.error(
            "[ " +
                new Date().toLocaleTimeString() +
                " ] - " +
                chalk.redBright("[ERROR] - ", ...messages)
        );
    }

    public debug(...messages: any[]): void {
        console.debug(
            "[ " +
                new Date().toLocaleTimeString() +
                " ] - " +
                chalk.blueBright("[DEBUG] - ", ...messages)
        );
    }
}
