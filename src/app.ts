import express from "express";
import morgan from "morgan";
import routes from "./routes/index";
import cors from "cors";


//swagger
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./swagger-options";



const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//socket.io

//routes
const specs = swaggerJsDoc(options);
app.use("/api", routes, swaggerUI.serve, swaggerUI.setup(specs));

export default app;
