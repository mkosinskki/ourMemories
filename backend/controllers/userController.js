import User from '../models/User.js'
import mongoose from 'mongoose';


export const getUser = (req, res) => {
  const user = req.user;

  try {
    res.json(user);
  }
  catch {
    res.status(500).json({ error: 'Internal server error.' });
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Incorrect id format.' });
    }

    const user = await User.findById(id).select('_id email firstName surname dateOfBirth role');

    if (!user) {
      return res.status(404).json({ message: 'No user with specified ID was found.' });
    }

    res.status(200).json(user);

  } 
  catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};