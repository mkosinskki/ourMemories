import Location from '../models/Location.js'
import mongoose from 'mongoose';

export const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find().select('name location');

        res.status(200).json(locations);
    } 
    catch (error) {
        console.error("Błąd podczas pobierania lokalizacji:", error);
        res.status(500).json({ message: "Wystąpił wewnętrzny błąd serwera." });
    }
};