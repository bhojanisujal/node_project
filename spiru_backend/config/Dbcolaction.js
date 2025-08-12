const mongoose = require("mongoose");
require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1); 
    }
};

connectDB();








