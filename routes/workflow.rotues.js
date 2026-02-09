import { Router } from "express";
import { sendRemainders } from "../controller/workflow.controller.js";

const workflowRouter = Router();

// Define your workflow-related routes here
workflowRouter.post('/subscription/reminder',sendRemainders);

export default workflowRouter ;