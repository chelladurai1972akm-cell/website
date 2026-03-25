const express = require("express");

const app = express();
const cors = require("cors");
require("dotenv").config();
require("./cron/temp");

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const marketerRoutes = require("./routes/marketerroutes");

/* CORS CONFIG (IMPORTANT) */
app.use(cors({
origin: [
"http://127.0.0.1:5500",
"http://localhost:5500"
],
methods: ["GET","POST","PUT","DELETE"],
credentials: true
}));

app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/marketer", marketerRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/user", require("./routes/routeUser"));
app.use("/api/payment", require("./routes/paymentRoutes"));
/* Test Route */
app.get("/", (req, res) => {
res.send("DMCMS API Running");
});
process.on("uncaughtException", (err) => {
console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
console.error("Unhandled Rejection:", err);
});
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});