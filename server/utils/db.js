import mongoose from "mongoose";


const DbConnect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/quiz_anouncement');
        console.log("Database connected successfully...");
    } catch (error) {
        console.error("Error connecting to DB:", error.message);
    }
};

export default DbConnect;

