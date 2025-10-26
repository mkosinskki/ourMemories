import Memory from '../models/Memory.js'
import mongoose from 'mongoose';

export const getMemories = (req, res) => {
  res.json(memories);
};

export const addMemory = (req, res) => {
  const newMemory = { id: Date.now(), ...req.body };
  memories.push(newMemory);
  res.status(201).json(newMemory);
};