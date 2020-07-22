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
      date(data.birth),
      date(Date.now()),
    ];

    console.log(values);

    db.query(query, values, function(err, results){
      if (err) return res.send("Database Error");
      
      callback(results.rows[0]);
      return
    });
  },
  find(id, callback){
    db.query(`SELECT * FROM instructors WHERE id = ${id}`, function(err,results){
      if(err) return res.send(err);

      callback(results.rows[0]);
      return
    });
  }
}