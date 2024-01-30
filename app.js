const express = require("express");
const cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
const branchRouter = require("./routes/branches");
const productRouter = require("./routes/products");

const app = express();
const port = process.env.PORT || "3000";

// db setup
mongoose.set("strictQuery", false);
const mongoDB = process.env.DB_URI;

const main = async () => await mongoose.connect(mongoDB);
main().catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/branches", branchRouter);
app.use("/api/products", productRouter);

app.listen(port, () => {
	console.log("server running");
});
