import mongoose from "mongoose";
import initData from "./data.js";
import Listing from "../models/listing.js";

const MONGO_URL = "mongodb://localhost:27017/airbnb";

async function main() {
  try {
    await mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("connected to DB");

    await initDB(); // ✅ run ONLY after DB connects
    mongoose.connection.close();
  } catch (err) {
    console.error("Database error:", err);
  }
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    const listingsWithOwner = initData.map((obj) => ({
      ...obj,
      owner: new mongoose.Types.ObjectId("6954e51e982ebb39730b2b12"),
    }));

    await Listing.insertMany(listingsWithOwner);
    console.log("Data was initialized");
  } catch (err) {
    console.error("Init DB error:", err);
  }
};


main();
