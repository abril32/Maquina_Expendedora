import globalSetup from "./global.setup";
import 'dotenv/config'; // simplest way

(async () => {
    await globalSetup()
})()