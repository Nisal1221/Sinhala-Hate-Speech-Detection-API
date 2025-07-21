const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const sendEmail = require("./sendEmail");

// ✅ Load .env BEFORE using any env variables
dotenv.config();

// ✅ Create Express app
const app = express();
app.use(cors());
app.use(express.json());
console.log("Mongo URI:", process.env.MONGODB_URI);


// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  // These two options are now optional and deprecated, can remove in future
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected (users collection)");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

// ✅ Set up routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

//Contact us mail


app.post("/send-email", async (req, res) => {
  try {
    await sendEmail(req.body);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});


// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`User backend running on port ${PORT}`);
});

