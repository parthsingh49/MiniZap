import express from "express";

import {
  createWorkflow,
  getWorkflows,
  getWorkflow,
  updateWorkflow,
  deleteWorkflow,
} from "../controllers/workflowController.js";

import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// Create workflow
router.post("/", authMiddleware, createWorkflow);

// Get all workflows of logged-in user
router.get("/", authMiddleware, getWorkflows);

// Get one workflow
router.get("/:id", authMiddleware, getWorkflow);

// Update workflow
router.put("/:id", authMiddleware, updateWorkflow);

// Delete workflow
router.delete("/:id", authMiddleware, deleteWorkflow);

export default router;