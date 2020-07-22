const instructor = require("../models/instructor");

module.exports ={
  age(timestamp){
    const milisecondsYear = Date.parse(1971,1,1);
    return parseInt((Date.now() - timestamp)/milisecondsYear,10)
  },

  date(timestamp){
    // return date to HTML format
    return new Date(timestamp).toISOString().slice(0,10);
  },
  formatInstructors(instructors){
    for (const instructor of instructors){
      instructor.services = instructor.services.split(','); 
    }
    return instructors
  },
  formatInstructor(instructor){
    instructor.services = instructor.services.split(',');
    return instructor
  }

}