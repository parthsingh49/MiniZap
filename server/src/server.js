import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";
import passport from "./config/passport.js";

const PORT = process.env.PORT || 5000;

console.log(
  "Google Client ID:",
  process.env.GOOGLE_CLIENT_ID
);

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});