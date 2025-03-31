const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const postRouter = require('./routes/posts');
const userRouter = require('./routes/users');
const commentRouter = require('./routes/comments');
const authRoutes = require('./routes/auth');  // Import auth routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));  
  
  
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);

app.listen(5000, () => console.log("Server running on port 5000"));






