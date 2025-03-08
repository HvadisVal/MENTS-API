import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Application } from "express";

/**
 * Setup Swagger documentation
 * @param app
 */
export function setUpSwagger(app: Application) {
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Meme Battle API",
      version: "1.0.0",
      description: "An API for uploading, voting, and battling memes.",
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "auth-token",
        },
      },
      schemas: {
        Meme: {
          type: "object",
          properties: {
            title: { type: "string" },
            imageUrl: { type: "string" },
            description: { type: "string" },
            creator: { type: "string" },
            votes: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            registerDate: { type: "string" },
          },
        },
      },
    },
  };

  // Make sure to correctly specify the path to your routes
  const options = {
    swaggerDefinition,
    apis: ["./src/routes.ts", "./src/controllers/*.ts"],  // UPDATED PATH
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
