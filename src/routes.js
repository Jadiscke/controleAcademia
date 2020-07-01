const express = require('express');
const routes = express.Router();
const instructors = require('./instructors');
const { Router } = require('express');

routes.get('/', (req,res) => {
  return res.redirect('/instructors');
});

routes.get('/instructors', (req,res) => {
  return res.render('instructors/index');
});

routes.get('/instructors/create', (req,res) => {
  return res.render('instructors/create');
});

routes.get('/instructors/:id',instructors.show);
routes.get('/instructors/:id/edit',instructors.edit);
routes.put('/instructors', instructors.put);
routes.post('/instructors',instructors.post);
routes.delete('/instructors',instructors.delete);

routes.get('/members', (req,res) => {
  return res.render('members/index');
});

module.exports = routes