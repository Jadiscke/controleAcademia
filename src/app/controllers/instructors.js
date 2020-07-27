const { formatInstructors, formatInstructor, date } = require("../lib/utils");
const Instructor = require("../models/instructor");
const instructor = require("../models/instructor");

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;
    page = page || 1;
    limit = limit || 2;
    let offset = (page - 1) * limit;

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(instructors){
        const pagination = {
          total: instructors[0] ? Math.ceil(instructors[0].total / limit) : 0,
          page
        }
        formatInstructors(instructors);
        return res.render("instructors/index", { instructors, filter, pagination});
      }
    }

    Instructor.paginate(params);
    
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
