const { date } = require("../lib/utils");
const Member = require("../models/member");

module.exports = {
  index(req, res) {
    Member.all(function (members) {
      return res.render("members/index", { members });
    });
  },
  create(req, res) {
    return res.render("members/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (const key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    Member.create(req.body, function (member) {
      return res.redirect(`members/${member.id}`);
    });
  },
  show(req, res) {
    Member.find(req.params.id, function (member) {
      member.birth = date(member.birth).birthDay;
      return res.render("members/show", { member });
    });
  },
  edit(req, res) {
    Member.find(req.params.id, function (member) {
      member.birth = date(member.birth).iso;
      return res.render("members/edit", { member });
    });

    return;
  },
  put(req, res) {
    Member.update(req.body,function(){
      return res.redirect(`members/${req.body.id}`);
    });
    return
  },
  delete(req, res) {
    Member.delete(req.body.id, function(){
      return res.redirect('/members')
    });
  },
};


