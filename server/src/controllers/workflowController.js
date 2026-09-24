import Workflow from "../models/Workflow.js";

// CREATE WORKFLOW
export const createWorkflow = async (req, res) => {
  try {
    const { name, nodes, edges } = req.body;

    const workflow = await Workflow.create({
      userId: req.user.id,
      name,
      nodes,
      edges,
    });

    res.status(201).json({
      message: "Workflow created successfully",
      workflow,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create workflow",
    });
  }
};

// GET ALL USER WORKFLOWS
export const getWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find({
      userId: req.user.id,
    }).sort({ updatedAt: -1 });

    res.status(200).json(workflows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch workflows",
    });
  }
};

// GET ONE WORKFLOW
export const getWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!workflow) {
      return res.status(404).json({
        message: "Workflow not found",
      });
    }

    res.status(200).json(workflow);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch workflow",
    });
  }
};

// UPDATE WORKFLOW
export const updateWorkflow = async (req, res) => {
  try {
    const { name, nodes, edges, active } = req.body;

    const workflow = await Workflow.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        name,
        nodes,
        edges,
        active,
      },
      {
        new: true,
      }
    );

    if (!workflow) {
      return res.status(404).json({
        message: "Workflow not found",
      });
    }

    res.status(200).json({
      message: "Workflow updated successfully",
      workflow,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update workflow",
    });
  }
};

// DELETE WORKFLOW
export const deleteWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!workflow) {
      return res.status(404).json({
        message: "Workflow not found",
      });
    }

    res.status(200).json({
      message: "Workflow deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete workflow",
    });
  }
};