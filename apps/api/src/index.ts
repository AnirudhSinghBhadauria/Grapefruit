import { config } from "dotenv";
import { app } from "./app.js";

const port = process.env.PORT || 3009;

app.listen(port, () => console.log(`Sever running on port ${port} 🎉`));
