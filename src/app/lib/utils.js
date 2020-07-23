function date(timestamp) {
  const date = new Date(timestamp);

  const year = date.getUTCFullYear();
  const month = `0${date.getUTCMonth()}`.slice(-2);
  const day = `0${date.getUTCDate()}`.slice(-2);

  return {
    day,
    month,
    year,
    iso: `${year}-${month}-${day}`,
    birthDay: `${day}/${month}`,
    format: `${day}/${month}/${year}`
  }
}

function age(timestamp){
  const milisecondsYear = Date.parse(1971,1,1);
  return parseInt((Date.now() - timestamp)/milisecondsYear,10)
}

module.exports ={
  age: age,
  date: date,
  formatInstructors(instructors){
    for (const instructor of instructors){
      instructor.services = instructor.services.split(','); 
    }
    return instructors
  },
  formatInstructor(instructor){
    instructor.created_at = date(instructor.created_at).format;
    instructor.age = age(instructor.birth);
    instructor.services = instructor.services.split(',');
    return instructor
  }
}