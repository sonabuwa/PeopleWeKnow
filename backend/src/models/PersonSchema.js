import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emoji: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    traits: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
  },
  { timestamps: true },
);
const Person = mongoose.model("Person", PersonSchema);
export default Person;
