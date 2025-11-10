import Memory from "../models/Memory.js";
import Location from "../models/Location.js";
import mongoose from "mongoose";

export const getMemories = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 12;

    page = Math.max(page, 1);
    limit = Math.max(limit, 1);

    const MAX_LIMIT_PER_PAGE = 50;
    limit = Math.min(limit, MAX_LIMIT_PER_PAGE);

    const skip = (page - 1) * limit;

    const { lng, lat } = req.query;
    let maxDistance = parseInt(req.query.maxDistance) || 100000;
    maxDistance = Math.max(maxDistance, 1);

    const { sortBy, sortOrder } = req.query;
    const order = sortOrder === "asc" ? 1 : -1;

    const pipeline = [];
    if (lng && lat) {
      pipeline.push({
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          distanceField: "distance",
          maxDistance: maxDistance,
          spherical: true,
        },
      });
    }

    pipeline.push({
      $lookup: {
        from: "memories",
        localField: "_id",
        foreignField: "location",
        as: "memory",
      },
    });

    pipeline.push({ $unwind: "$memory" });

    pipeline.push({
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            "$memory",
            {
              distance: "$distance",
              locationData: "$$ROOT",
            },
          ],
        },
      },
    });

    pipeline.push({ $project: { "locationData.memory": 0 } });

    pipeline.push({
        $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            pipeline: [
                { $project: { firstName: 1, surname: 1, email: 1 } }
            ],
            as: 'user'
        }
    });

    pipeline.push({
        $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true
        }
    });

    let sortObject = {};
    if (sortBy === "eventDate") {
      sortObject = { eventDate: order };
    } else if (sortBy === "createdAt") {
      sortObject = { createdAt: order };
    } else if (lng && lat) {
      sortObject = { distance: 1 };
    } else {
      sortObject = { createdAt: -1 };
    }
    pipeline.push({ $sort: sortObject });

    pipeline.push({
      $facet: {
        metadata: [{ $count: "totalMemories" }],
        data: [{ $skip: skip }, { $limit: limit }],
      },
    });

    const results = await Location.aggregate(pipeline);

    const memories = results[0].data;
    const totalMemories = results[0].metadata[0]
      ? results[0].metadata[0].totalMemories
      : 0;
    const totalPages = Math.ceil(totalMemories / limit);

    res.status(200).json({
      data: memories,
      currentPage: page,
      totalPages: totalPages,
      totalMemories: totalMemories,
    });
  } catch (error) {
    res.status(500).json({ message: req.t("internalServerError") });
  }
};

export const addMemory = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { eventDate, description, locationName, lng, lat } = req.body;
    const userId = req.user._id;

    if (!lng || !lat) {
      return res
        .status(400)
        .json({ errors: { coordinates: req.t('coordinatesRequired') } });
    }

    const coordinates = [parseFloat(lng), parseFloat(lat)];

    if (isNaN(coordinates[0]) || isNaN(coordinates[1])) {
      return res
        .status(400)
        .json({
          errors: { coordinates: req.t('coordinatesBadFormat') },
        });
    }

    let photoPaths = [];
    if (req.files && req.files.length > 0) {
      photoPaths = req.files.map((file) => file.filename);
    }

    let location;

    location = await Location.findOne({
      "location.coordinates": coordinates,
    }).session(session);

    if (!location) {
      location = new Location({
        name: locationName,
        location: {
          type: "Point",
          coordinates: coordinates,
        },
      });
      await location.save({ session });
    }

    const newMemory = new Memory({
      location: location._id,
      eventDate,
      description,
      user: userId,
      photos: photoPaths,
    });

    const savedMemory = await newMemory.save({ session });

    await session.commitTransaction();

    const populatedMemory = await Memory.findById(savedMemory._id)
      .populate("location")
      .populate("user", "firstName surname email");

    res.status(201).json(populatedMemory);
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};