const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/task_controller");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", getTasks);
router.post("/", upload.single("photo"), createTask); 
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
