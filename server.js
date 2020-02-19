require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');


console.log(process.env.API_TOKEN);

const app = express();
app.use(morgan('dev'));
app.use(requireAuth);
app.use(cors());
app.use(helmet());

function requireAuth(req, res, next) {
  const authVal = req.get('Authorization') || '';
  // console.log(req.get('Authorization'));
  if (!authVal.startsWith('Bearer ')) {
    return res.status(401).json({message: 'Must provide Bearer Authorization'});
  }
  const token = authVal.split(' ')[1];
  if (token !== API_TOKEN) {
    return res.status(401).json({message: 'Invalid '})
  }
  next();
}
app.use(function validateBearerToken(req, res, next) {
  console.log('validate bearer token middleware');
  next();
});


// eslint-disable-next-line quotes
const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];

function handleGetTypes(req, res, next) {
  res.json(validTypes);
}

app.get('/types', handleGetTypes);
app.get('/valid-types', handleGetTypes);

function handleGetPokemon(req, res, next) {
  res.send('Hello, Pokemon!');
}

app.get('/pokemon', handleGetPokemon);

const PORT = 8000;

app.listen(PORT, ()=>{
  console.log(`Server listening at http://localhost:${PORT}`);
});

