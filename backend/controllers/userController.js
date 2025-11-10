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
    res.status(500).json({ message: req.t("internalServerError") });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.user._id;
  const { firstName, surname, email, dateOfBirth } = req.body;

  if (!firstName || !surname || !email || !dateOfBirth) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const updateData = {
      firstName,
      surname,
      email,
      dateOfBirth,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: req.t("userNotFound") });
    }

    res.status(200).json({
      message: req.t("profilUpdatedSuccess"),
      user: updatedUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        errors: { email: req.t("emailExists") },
      });
    }
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ errors });
    }
    res.status(500).json({ message: req.t("internalServerError") });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: req.t("badId") });
    }

    const user = await User.findById(id).select(
      "_id email firstName surname dateOfBirth role"
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: req.t("userNotFound") });
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
    res.status(500).json({ message: req.t("internalServerError") });
  }
};
