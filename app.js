const dotenv = require("dotenv"); 
dotenv.config({ path: "./.env" });
const connectDB = require("./Config/db");
const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const jobRoutes = require("./routes/jobRoutes.js");
const CvRoutes = require("./routes/CvRoutes.js");

const CourseRoutes = require("./routes/CourseRoutes.js");
const errroMiddelware = require("./middelwares/errroMiddelware.js");
const app = express();
connectDB();
app.use(express.json());
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/Courses", CourseRoutes);
app.use("/api/v1/CV", CvRoutes);
app.use(errroMiddelware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});