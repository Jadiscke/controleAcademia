const fs = require('fs');
const data = require('../data.json');

// show

exports.show = function(req,res) {
  const { id } = req.params;
  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  });

  if(!foundInstructor){
    return res.send("INSTRUCTOR NOT FOUND");
  }
  
  const milisecondsYear = Date.parse(1971,1,1);
  console.log(milisecondsYear);

  const instructor = {
    ...foundInstructor,
    age: parseInt((Date.now() - foundInstructor.birth)/milisecondsYear,10),
    gender: foundInstructor.gender == 'M' ? 'Masculino': 'Feminino',
    services: foundInstructor.services.split(','),
    created_at: new Intl.DateTimeFormat('en-GB').format(foundInstructor.created_at),

  }
  return res.render('instructors/show', {instructor});
}

// create
exports.post = function(req,res){
  const keys = Object.keys(req.body);

  for (const key of keys) {
    if (req.body[key] == ""){
      return res.send('Please, fill all fields');
    }
  }

  const {avatar_url, name, services, gender } = req.body;
  const created_at = Date.now();
  const id = Number(data.instructors.length) + 1;
  let { birth } = req.body;
  birth = Date.parse(birth);
  

  
  data.instructors.push({
    id,
    avatar_url,
    name,
    gender,
    birth,
    services,
    created_at,
  });

  fs.writeFile("data.json",JSON.stringify(data, null, 2), function(err){
    if(err) return res.send('Write File Error');
    
    return res.redirect('/instructors')
  });
}
// update

// delete