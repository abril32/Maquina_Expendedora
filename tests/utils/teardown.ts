import globalTearDown from "./global.teardown";
import 'dotenv/config'; // simplest way

(async () => {
    await globalTearDown()
})()