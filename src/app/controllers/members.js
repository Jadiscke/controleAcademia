const { age, date } = require('../lib/utils');
Intl = require('intl');

module.exports = {
  index(req,res){

    return res.render('members/index');
  },
  create(req,res){
    return res.render('members/create');
  },
  post(req,res){
    const keys = Object.keys(req.body);

    for (const key of keys) {
      if (req.body[key] == ""){
        return res.send('Please, fill all fields');
      }
    }

    const {avatar_url, name, email, gender, blood,height, weight, } = req.body;
    let { birth } = req.body;

    
    return res.redirect(`/members/${id}`);
    
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



