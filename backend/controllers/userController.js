import User from "../models/User.js";
import Memory from "../models/Memory.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

export const getUser = async (req, res, next) => {
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
      avatar: user.avatar,
      postCount: postCount,
      locationCount: locationCount,
      firstMemoryDate: firstMemory ? firstMemory.timestamp : null,
    };

    res.status(200).json(userToReturn);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const userId = req.user._id;
  const { firstName, surname, email, dateOfBirth } = req.body;
  const uploadsDir = path.join(process.cwd(), '../../uploads');

  const updateData = {
    firstName,
    surname,
    email,
    dateOfBirth,
  };

  if (req.file) {
    updateData.avatar = req.file.filename;
  }

  try {
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      if (req.file) {
        const newFilePath = path.join(uploadsDir, req.file.filename);
        fs.unlink(newFilePath, () => {});
      }
      return res.status(404).json({ message: req.t("userNotFound") });
    }

    const oldAvatarFilename = currentUser.avatar;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
      context: 'query'
    })
    .select("_id email firstName surname dateOfBirth role avatar");

    if (req.file && oldAvatarFilename) {
      if (!oldAvatarFilename.startsWith('http')) {
        const oldFilePath = path.join(uploadsDir, oldAvatarFilename);

        if (fs.existsSync(oldFilePath)) {
          fs.unlink(oldFilePath, () => {});
        }
      }
    }

    res.status(200).json({
      message: req.t("profilUpdatedSuccess"),
      user: updatedUser,
    });

  } catch (error) {
    if (req.file) {
      const newFilePath = path.join(uploadsDir, req.file.filename);
      fs.unlink(newFilePath, () => {});
    }

    if (error.name === 'ValidationError') {
      const firstErrorKey = Object.keys(error.errors)[0];
      const errorMessageKey = error.errors[firstErrorKey].message;
      return res.status(400).json({ message: req.t(errorMessageKey) });
    }

    if (error.code === 11000) {
      if (error.keyPattern?.email) {
         return res.status(400).json({ message: req.t("emailInUse")});
      }
    }

    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: req.t("badId") });
    }

    const user = await User.findById(id).select(
      "_id email firstName surname dateOfBirth role avatar"
    );

    if (!user) {
      return res.status(404).json({ message: req.t("userNotFound") });
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
    next(error);
  }
};