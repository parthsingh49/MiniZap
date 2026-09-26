import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";

const startServer = async () => {
  try {
    console.log("🚀 Starting MiniZap server...");
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

    await connectDB();

    console.log("🚀 MongoDB initialization finished");

    // Local development
    if (process.env.NODE_ENV !== "production") {
      const PORT = process.env.PORT || 5000;

      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
  }
};

startServer();

export default app;