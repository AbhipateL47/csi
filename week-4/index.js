const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

let users = [
  { id: 1, name: 'Abbi' },
  { id: 2, name: 'Manal' },
];

app.get('/', (req, res) => {
  res.send('👋 Welcome to my server!');
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

app.post('/users', (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Valid name is required' });
  }

  const newUser = {
    id: users.length + 1,
    name: name.trim(),
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.use((req, res) => {
  res.status(404).send('❌ Sorry, that route does not exist.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
