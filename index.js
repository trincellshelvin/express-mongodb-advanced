import express from 'express';
import  mongoose from 'mongoose';
import dotenv from 'dotenv';
import user from './models/users.js';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

dotenv.config();

const mongoURL = process.env.MONGO_URL

// Connect to MongoDB
mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/users', async (req, res)=>{
    try{
        const { name, email, age, isActive } = req.body;
        const newUser = new User({ name, email, age, isActive });
        await newUser.save();
        res.status(201).send(newUser);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
});

app.get('/users', async (req, res)=>{
    try{
        const activeUsers = await User.find({ isActive: true });
        res.status(200).send(activeUsers);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
