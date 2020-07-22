const { age, date } = require('../lib/utils');
Intl = require('intl');

module.exports = {
  index(req,res){

    return res.render('instructors/index');
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

    const {avatar_url, name, services, gender } = req.body;
    const created_at = Date.now();
    let { birth } = req.body;
    

    
    return res.redirect(`/instructors/${id}`);
    
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