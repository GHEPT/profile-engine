import { Engine } from "./engine/Engine";

function main(): void {
    try {
        const engine = new Engine();

        engine.run();

        console.log("✅ Profile Engine v2 completed successfully.");
    } catch (error) {
        console.error("❌ Profile Engine v2 failed.");

        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }

        process.exit(1);
    }
}

main();