import Memory from '../models/Memory.js'
import Location from '../models/Location.js';
import mongoose from 'mongoose';


export const getMemories = async (req, res) => {
    
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;

        page = Math.max(page, 1);
        limit = Math.max(limit, 1);

        const MAX_LIMIT_PER_PAGE = 50;
        limit = Math.min(limit, MAX_LIMIT_PER_PAGE);

        const skip = (page - 1) * limit;

        const { lng, lat } = req.query;
        let maxDistance = parseInt(req.query.maxDistance) || 100000;
        maxDistance = Math.max(maxDistance, 1);

        const { sortBy, sortOrder } = req.query;
        const order = sortOrder === 'asc' ? 1 : -1;

        const pipeline = [];
        if (lng && lat) {
            pipeline.push({
                $geoNear: {
                    near: { 
                        type: 'Point', 
                        coordinates: [parseFloat(lng), parseFloat(lat)] 
                    },
                    distanceField: 'distance', 
                    maxDistance: maxDistance,
                    spherical: true,
                }
            });
        }

        pipeline.push({
            $lookup: {
                from: 'memories',
                localField: '_id',
                foreignField: 'location',
                as: 'memory'
            }
        });

        pipeline.push({ $unwind: '$memory' });

        pipeline.push({
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        '$memory', 
                        { 
                            distance: '$distance',
                            locationData: '$$ROOT'
                        }
                    ]
                }
            }
        });

        pipeline.push({ $project: { 'locationData.memory': 0 } });

        let sortObject = {};
        if (sortBy === 'eventDate') {
            sortObject = { eventDate: order };
        } else if (sortBy === 'createdAt') {
            sortObject = { createdAt: order };
        } else if (lng && lat) {
            sortObject = { distance: 1 };
        } else {
            sortObject = { createdAt: -1 };
        }
        pipeline.push({ $sort: sortObject });

        pipeline.push({
            $facet: {
                metadata: [ { $count: 'totalMemories' } ],
                data: [ { $skip: skip }, { $limit: limit } ] 
            }
        });

        const results = await Location.aggregate(pipeline);

        const memories = results[0].data;
        const totalMemories = results[0].metadata[0] ? results[0].metadata[0].totalMemories : 0;
        const totalPages = Math.ceil(totalMemories / limit);

        res.status(200).json({
            data: memories,
            currentPage: page,
            totalPages: totalPages,
            totalMemories: totalMemories
        });

    } 
    catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

export const addMemory = async (req, res) => {
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { eventDate, description, locationName, coordinates } = req.body;
        
        let location;

        location = await Location.findOne({ 
            'location.coordinates': coordinates 
        }).session(session);

        if (!location) {
            location = new Location({
                name: locationName,
                location: {
                    type: 'Point',
                    coordinates: coordinates
                }
            });
            await location.save({ session });
        }

        const newMemory = new Memory({
            location: location._id,
            eventDate,
            description
        });

        const savedMemory = await newMemory.save({ session });

        await session.commitTransaction();

        const populatedMemory = await Memory.findById(savedMemory._id)
            .populate('location');

        res.status(201).json(populatedMemory);

    } 
    catch (error) {
        await session.abortTransaction();
        if (error.name === 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: "Internal server error." });

    } 
    finally {
        session.endSession();
    }
};