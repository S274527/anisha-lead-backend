import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import server from "./server";
import { CONFIG } from "config";

const env = dotenv.config({ path: `${__dirname}/.env` });
dotenvExpand.expand(env);

const PORT = CONFIG.PORT;
server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
