import express from "express";
import {
  create as createClasses,
  index as indexClasses,
} from "../controllers/ClassesController";
import {
  create as createConnections,
  index as indexConnections,
} from "../controllers/ConnectionsController";

const routes = express.Router();

routes.post("/classes", createClasses);
routes.get("/classes", indexClasses);

routes.post("/connections", createConnections);
routes.get("/connections", indexConnections);

export default routes;
