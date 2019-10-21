const express = require('express');
const router = express.Router();

const genres = [
  { id:1, name:'Comedy'},
  { id:2, name:'Action'},
  { id:3, name:'SciFi'},
  { id:4, name:'Romance'},
  { id:5, name:'Fantasy'}
];

router.get('/', (req, res) => {
  res.send(genres);
})

router.get('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) res.status(404).send("The genre with givwn id is not found!")

  res.send(genre);
  
});

router.post('/', (req, res) => {
  const { error } = ValidateGenre(req.body);
  if(error){
    return res.status(400).send(result.error.details[0].message);
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genres);
});

router.put('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) res.status(404).send("The genre with givwn id is not found!")

  genre.name = req.body.name;
  res.send(genres);
});

router.delete('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) res.status(404).send("The genre with givwn id is not found!")

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genres);
});


function ValidateGenre(genre){
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.valid(genre, schema);
}

module.exports = router;