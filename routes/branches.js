const express = require("express");
const router = express.Router();

const branch_controller = require("../controllers/branchController");

// BRANCH ROUTES

// GET branch list
router.get("/", branch_controller.branch_list);

// ADD branch
router.post("/", branch_controller.add_branch);

// EDIT branch
router.put("/:id", branch_controller.edit_branch);

// DELETE branch
router.delete("/:id", branch_controller.delete_branch);

module.exports = router;
