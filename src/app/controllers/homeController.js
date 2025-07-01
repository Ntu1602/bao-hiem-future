const Event = require("../model/eventModel");
const Members = require("../model/memberModel");
const Company = require("../model/companyModel");
const Design = require("../model/design");
const softPosition = require("../utils/softPosition");
class homeController {
  show(req, res) {
    Promise.all([
      softPosition(),  
      // Members.find({position:{$in:["SrUM","GAD","DM"]},status:""}).lean(),
      Members.find({position:{$in:["UM","FC"]},status:""}).lean(),
      Event.find({ status: "upcoming" }).lean().sort({startAt: 1}),
      Design.find({location:"home-page"}).lean()
    ]).then(([member,memberFC, event,design]) => {
      let members = [];
      if(member.length>0){
        members =[typeof member[0] === 'object'?member[0]:null,
                  typeof member[1] === 'object'?member[1]:null,
                  typeof member[2] === 'object'?member[2]:null,
                  typeof member[3] === 'object'?member[3]:null]
        members = members.filter(
          m => typeof m === 'object' && m !== null
        )
      }
      const success = req.session.success;
      req.session.success = false;
      res.render("home", { event, member : members, memberFC,success});
    });
  }
}
module.exports = new homeController();
