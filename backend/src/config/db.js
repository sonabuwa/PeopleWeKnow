import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // exit with failure
  }
};
