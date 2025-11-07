import User from "../models/User.js";
import Memory from "../models/Memory.js";
import mongoose from "mongoose";

export const getUser = async (req, res) => {
  const user = req.user;

  try {
    const postCount = await Memory.countDocuments({ user: user._id });

    const uniqueLocationIds = await Memory.distinct("location", {
      user: user._id,
    });
    const locationCount = uniqueLocationIds.length;

    const firstMemory = await Memory.findOne({ user: user._id })
      .sort({ timestamp: 1 })
      .select("timestamp");

    const userToReturn = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      surname: user.surname,
      dateOfBirth: user.dateOfBirth,
      role: user.role,
      postCount: postCount,
      locationCount: locationCount,
      firstMemoryDate: firstMemory ? firstMemory.timestamp : null,
    };

    res.status(200).json(userToReturn);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Incorrect id format." });
    }

    const user = await User.findById(id).select(
      "_id email firstName surname dateOfBirth role"
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user with specified ID was found." });
    }

    const postCount = await Memory.countDocuments({ user: id });

    const uniqueLocationIds = await Memory.distinct("location", { user: id });
    const locationCount = uniqueLocationIds.length;

    const firstMemory = await Memory.findOne({ user: id })
      .sort({ timestamp: 1 })
      .select("timestamp");

    const userProfile = user.toObject();
    userProfile.postCount = postCount;
    userProfile.locationCount = locationCount;
    userProfile.firstMemoryDate = firstMemory ? firstMemory.timestamp : null;

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};