import { Router } from "express";
import { createSubscription, getUserSubscriptions } from "../controller/subscription.controller.js";
import authorize from "../middleware/auth.middleware.js";

const subscriptionRouter = Router();

// Specific routes FIRST
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "fetch all upcoming renewals" });
});

subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({ title: "fetch all subscriptions for a user" });
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "cancel a subscription" });
});

// General CRUD routes
subscriptionRouter.get("/", (req, res) => {
  res.send({ title: "fetch all subscriptions" });
});

subscriptionRouter.get("/:id",authorize,getUserSubscriptions);

subscriptionRouter.post("/",authorize,createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "update a subscription" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "delete a subscription" });
});

export default subscriptionRouter;
