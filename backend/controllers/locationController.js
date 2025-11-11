import Location from '../models/Location.js'
import mongoose from 'mongoose';

export const getAllLocations = async (req, res, next) => {
    try {
        const locations = await Location.find().select('name location');

        res.status(200).json(locations);
    } 
    catch (error) {
        next(error)
    }
};