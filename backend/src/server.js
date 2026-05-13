require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const jobRoutes = require("./routes/jobRoutes");
const teamMemberRoutes = require("./routes/teamMemberRoutes");
const jobCategoryRoutes = require("./routes/jobCategoryRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend API is running",
  });
});

app.use("/api/jobs", jobRoutes);
app.use("/api/team-members", teamMemberRoutes);
app.use("/api/job-categories", jobCategoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
