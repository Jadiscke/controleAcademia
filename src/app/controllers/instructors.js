const { age, date, formatInstructors } = require('../lib/utils');
const db = require('../config/db');
const Instructor = require('../models/instructor');
Intl = require('intl');

module.exports = {
  index(req,res){

    Instructor.all(function(instructors) {
      formatInstructors(instructors);
      return res.render('instructors/index', {instructors});
    })

    
  },
  create(req,res){
    return res.render('instructors/create');
  },
  post(req,res){
    const keys = Object.keys(req.body);

    for (const key of keys) {
      if (req.body[key] == ""){
        return res.send('Please, fill all fields');
      }
    }

    Instructor.create(req.body,function(instructor){
      return res.redirect(`instructors/${instructor.id}`);
    });
    
    
    
    },
  show(req,res){
    },
  edit(req,res){
    
  return
  },
  put(req,res){
    return
  },
  delete(req,res){
    return
  },
}