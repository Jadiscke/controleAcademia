const db = require('../config/db');
const { date } = require('../lib/utils');
module.exports = {
  all(callback) {
    db.query(`SELECT * FROM instructors`, function(err,results){
      if (err) return res.send('Database Error');
      
      callback(results.rows);
      return
    });
  },
  create(data,callback){
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
      data.name,
      data.avatar_url,
      data.gender,
      data.services,
      date(data.birth).iso,
      date(Date.now()).iso,
    ];

    console.log(values);

    db.query(query, values, function(err, results){
      if (err) return res.send("Database Error");
      
      callback(results.rows[0]);
      return
    });
  },
  find(id, callback){
    db.query(`
    SELECT * 
    FROM instructors 
    WHERE id = ${id}`, 
    function(err,results){
      if(err) return console.log(err);

      callback(results.rows[0]);
      return
    });
  },
  update(data, callback){
    const query =`
    UPDATE instructors SET
      avatar_url=($1),
      name=($2),
      birth=($3),
      gender=($4),
      services=($5)
    WHERE id = $6
    ` ;
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.gender,
      data.services,
      data.id
    ];

    db.query(query,values, function(err,results){
      if(err) return console.log(err);

      callback();
    });
  }
}