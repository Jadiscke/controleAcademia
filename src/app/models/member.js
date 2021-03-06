const db = require('../config/db');
const { date } = require('../lib/utils');
module.exports = {
  all(callback) {
    db.query(`
      SELECT * 
      FROM members
      ORDER BY name ASC
      `, function(err,results){
      if (err) throw `Database Erro! ${err}`;
      
      callback(results.rows);
      return
    });
  },
  create(data,callback){
    const query = `
      INSERT INTO members (
        name,
        avatar_url,
        email,
        gender,
        birth,
        blood,
        weight,
        height,
        instructor_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `
    const values = [
      data.name,
      data.avatar_url,
      data.email,
      data.gender,
      date(data.birth).iso,
      data.blood,
      data.weight,
      data.height,
      data.instructor_id
    ];

    db.query(query, values, function(err, results){
      if (err) throw `Database Erro! ${err}`;
      
      callback(results.rows[0]);
      return
    });
  },
  find(id, callback){
    db.query(`
    SELECT members.*, instructors.name AS instructor_name
    FROM members
    LEFT JOIN instructors ON (members.instructor_id = instructors.id) 
    WHERE members.id = ${id}`, 
    function(err,results){
      if(err) throw `Database Erro! ${err}`;

      callback(results.rows[0]);
      return
    });
  },
  findBy(filter,callback){
    db.query(`
    SELECT *
    FROM members
    WHERE members.name ILIKE '%${filter}%' 
    ORDER BY name ASC
    `, function(err,results){
    if (err) throw `Database Erro! ${err}`;
    
    callback(results.rows);
    });
    return

  },
  update(data, callback){
    const query =`
    UPDATE members SET
      name=($1),
      avatar_url=($2),
      email=($3),
      gender=($4),
      birth=($5),
      blood=($6),
      weight=($7),
      height=($8),
      instructor_id=($9)
    WHERE id = $10
    ` ;
    const values = [
      data.name,
      data.avatar_url,
      data.email,
      data.gender,
      date(data.birth).iso,
      data.blood,
      data.weight,
      data.height,
      data.instructor_id,
      data.id
    ];

    db.query(query,values, function(err,results){
      if(err) throw `Database Erro! ${err}`;

      callback();
    });
  },
  delete(id,callback){
    db.query(`DELETE FROM members WHERE id = ${id}`, function(err){
      if(err) throw `Database Erro! ${err}`;

      callback();
    });
  },
  instructorsSelectOptions(callback){
    db.query(`SELECT name, id FROM instructors`, function(err,results){
      if(err) throw `Database Error!${err}`;

      callback(results.rows);
    });
  },
  paginate(params){
    const {filter, limit, offset, callback} = params;

    let query = "",
        filterQuery = "",
        totalQuery = `(
          SELECT count(*) FROM members
           ) AS total`

    
  
    if( filter ) {
      filterQuery = `
      WHERE members.name ILIKE '%${filter}%'
      `

      totalQuery = `(
        SELECT count (*) FROM members
        ${filterQuery}
      ) AS total`
    }

    query = `
    SELECT members.*, ${totalQuery}
    FROM members
    ${filterQuery}
    LIMIT $1 OFFSET $2
    `

    db.query(query, [limit,offset], function(err, results){
      if (err) throw `Database Error! ${err}`;
      callback(results.rows);
      return
    });

    return
  }
}