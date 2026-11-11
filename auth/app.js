const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const JWT_SECRET = process.env.JWT_SECRET;

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Replace with real database validation
  if (username !== 'alice' || password !== 'password123') {
    return res.status(401).json({
      error: 'Invalid credentials'
    });
  }

  const token = jwt.sign(
    {
      userId: 123,
      username: 'alice'
    },
    JWT_SECRET,
    {
      expiresIn: '1h'
    }
  );

  res.json({ token });
});


const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

app.use('/api/v1', order);
app.use('/api/v1', payment);

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}

module.exports = app;