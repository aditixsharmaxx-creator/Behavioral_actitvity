const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
mongoose.connect("mongodb+srv://aditixsharmaxx:aditi@test.lpuij85.mongodb.net/")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Example Schema & Model
const ItemSchema = new mongoose.Schema({
    name: String
});
const Item = mongoose.model("Item", ItemSchema);

// Routes
app.get("/items", async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post("/items", async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.json(newItem);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
