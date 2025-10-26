import Location from '../models/Location.js'
import mongoose from 'mongoose';

export const getLocation = (req, res) => {
  res.json("Location");
};

export const addLocation = (req, res) => {
  res.json("Adding new location");
};