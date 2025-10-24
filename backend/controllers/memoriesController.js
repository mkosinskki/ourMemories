let memories = [
  { id: 1, title: 'Pierwsze wspomnienie', description: 'Spacer nad Wisłą 💕' },
];

export const getMemories = (req, res) => {
  res.json(memories);
};

export const addMemory = (req, res) => {
  const newMemory = { id: Date.now(), ...req.body };
  memories.push(newMemory);
  res.status(201).json(newMemory);
};