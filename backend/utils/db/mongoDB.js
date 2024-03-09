import mongoose from "mongoose";

const connectMongoDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ChatterBeeDB",
    });
    console.log(" MongoDB Connected");
    console.log("-------------------");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectMongoDB;
