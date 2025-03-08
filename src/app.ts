import express, { Application } from "express";
import dotenvFlow from "dotenv-flow";
import routes from "./routes";
import { testConnection } from "./repository/database";
import cors from "cors";
import { setUpSwagger } from "./util/docs";

dotenvFlow.config();

// Create Express application
const app: Application = express();

function setupCors() {
  app.use(
    cors({
      origin: "*", // Allow requests from any origin
      methods: "GET,PUT,POST,DELETE",
      allowedHeaders: ["auth-token", "Origin", "X-Requested-Width", "Content-Type", "Accept"],
      credentials: true,
    })
  );
}

export function startServer() {
  // Setup CORS
  setupCors();

  // JSON body parser
  app.use(express.json());

  // API Routes
  app.use("/api", routes);

  // Swagger Docs
  setUpSwagger(app);

  // Test DB Connection
  testConnection();

  // Start the server
  const PORT: number = parseInt(process.env.PORT as string) || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📄 Swagger Docs available at http://localhost:${PORT}/api/docs`);
  });
}
