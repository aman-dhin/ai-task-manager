 require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
 const cors =require('cors');
const app = express();

const empRoutes = require("./routes/Emproute");
// const TaskRoutes = require("./routes/Taskroute");
const taskRoute=require("./routes/Taskroute");



app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    tlsInsecure: false
  })
  .then(() => console.log("✅ Mongodb Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));



app.use("/api/emp", empRoutes);
 app.use("/api/task", taskRoute);


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
