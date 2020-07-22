const { age, date } = require('../lib/utils');
const db = require('../config/db');
Intl = require('intl');

module.exports = {
  index(req,res){

    db.query(`SELECT * FROM instructors`, function(err,results){
      if (err) return res.send('Database Error');

      for (let row of results.rows){
        row.services = row.services.split(',');
      }


      return res.render('instructors/index', {instructors: results.rows});
    });

    
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

    // const {avatar_url, name, services, gender } = req.body;
    // const created_at = Date.now();
    // let { birth } = req.body;
    
    const query = `
      INSERT INTO instructors (
        name,
        avatar_url,
        gender,
        services,
        birth,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `
    const values = [
      req.body.name,
      req.body.avatar_url,
      req.body.gender,
      req.body.services,
      date(req.body.birth),
      date(Date.now()),
    ];

    console.log(values);

    db.query(query, values, function(err, results){
      if (err) return res.send("Database Error");
      
      return res.redirect(`/instructor/${result.rows[0].id}`)
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