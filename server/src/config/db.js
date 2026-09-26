import mongoose from "mongoose";

const connectDB = async () => {
  console.log("🔵 Starting MongoDB connection...");

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log("🟢 MongoDB Connected!");
    console.log("Database:", connection.connection.name);

    return connection;
  } catch (error) {
    console.error("🔴 MongoDB Connection Failed!");
    console.error(error.message);
    throw error;
  }
};

export default connectDB;