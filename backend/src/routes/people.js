import express from "express";
import Person from "../models/PersonSchema.js";
import { authenticate } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.use(authenticate);

router.post("/people", upload.single("photo"), async (req, res) => {
  const { name } = req.body;
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Photo is required" });
    }

    //check duplicate only for this specific user
    const existingPerson = await Person.findOne({
      name: name,
      userId: req.userId,
    });
    if (existingPerson) {
      return res.status(409).json({
        success: false,
        message: `"${name}" already exists in your list.`,
      });
    }
    const newPerson = await Person.create({
      ...req.body,
      photo: req.file.path,
      userId: req.userId,
    });
    res.status(201).json({
      success: true,
      message: "Person successfully created!",
      data: newPerson,
    });
  } catch (error) {
    console.error("FULL ERROR OBJECT:", error);
    if (error.name === "ValidationError")
      return res
        .status(400)
        .json({ message: "Validation failed", error: error.message });
    res.status(500).json({ message: "Server error while creating person" });
  }
});

router.get("/people", async (req, res) => {
  try {
    const people = await Person.find({ userId: req.userId });
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching peoplr" });
  }
});

router.delete("/people/:id", async (req, res) => {
  try {
    const deletedPerson = await Person.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!deletedPerson)
      return res
        .status(404)
        .json({ message: "Person not found or unauthorized" });
    res
      .status(200)
      .json({ success: true, message: "Person deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting person" });
  }
});

//get one only if it belongs to this user
router.get("/people/:id", async (req, res) => {
  try {
    const person = await Person.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!person) return res.status(404).json({ message: "Person not found" });
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//update only if it belongs to this user
router.put("/people/:id", upload.single("photo"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.photo = req.file.path;
    }
    const updatePerson = await Person.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      updateData,
      { new: true },
    );
    if (!updatePerson)
      return res
        .status(404)
        .json({ message: "Person not found or unauthorized" });
    res.json(updatePerson);
  } catch (error) {
    res.status(500).json({ message: "Server error while updating person" });
  }
});

export default router;
