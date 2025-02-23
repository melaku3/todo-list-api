import app from "./app";
import dotenv from "dotenv";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));
