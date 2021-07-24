export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mails Server API's",
      version: "1.0.0",
      description: "A simple express library API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts","./src/swagger-apis/*.ts"],
};
