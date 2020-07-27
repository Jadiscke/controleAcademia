const { date } = require("../lib/utils");
const Member = require("../models/member");

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
      callback(members){
        const pagination = {
          total: members[0] ? Math.ceil(members[0].total / limit) : 0,
          page
        }
        return res.render("members/index", { members, filter, pagination});
      }
    }

    Member.paginate(params);
    
  },
  create(req, res) {
    Member.instructorsSelectOptions(function(memberOptions){
      return res.render("members/create", { memberOptions });
    });
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
      member.gender = member.gender == 'M' ? 'Masculino' : 'Feminino';
      return res.render("members/show", { member });
    });
  },
  edit(req, res) {
    Member.find(req.params.id, function (member) {
      member.birth = date(member.birth).iso;
      Member.membersSelectOptions(function(memberOptions){
        return res.render("members/edit", { member, memberOptions });
      });
      return
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


