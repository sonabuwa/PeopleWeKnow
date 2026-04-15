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
    whereIMet: {
      type: String,
    },
    AtWhichYear: {
      type: Number,
    },
    theirPersonality: {
      type: String,
    },
  },
  { timestamps: true },
);
const Person = mongoose.model("Person", PersonSchema);
export default Person;
