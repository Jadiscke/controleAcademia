const { formatInstructors, formatInstructor, date } = require("../lib/utils");
const Instructor = require("../models/instructor");

module.exports = {
  index(req, res) {
    Instructor.all(function (instructors) {
      formatInstructors(instructors);
      return res.render("instructors/index", { instructors });
    });
  },
  create(req, res) {
    return res.render("instructors/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (const key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    Instructor.create(req.body, function (instructor) {
      return res.redirect(`instructors/${instructor.id}`);
    });
  },
  show(req, res) {
    Instructor.find(req.params.id, function (instructor) {
      formatInstructor(instructor);
      return res.render("instructors/show", { instructor });
    });
  },
  edit(req, res) {
    Instructor.find(req.params.id, function (instructor) {
      instructor.birth = date(instructor.birth).iso;
      return res.render("instructors/edit", { instructor });
    });

    return;
  },
  put(req, res) {
    Instructor.update(req.body,function(){
      return res.redirect(`instructors/${req.body.id}`);
    });
    return
  },
  delete(req, res) {
    Instructor.delete(req.body.id, function(){
      return res.redirect('/instructors')
    });
  },
};
