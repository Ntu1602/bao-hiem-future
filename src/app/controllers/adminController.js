const member = require("../model/memberModel");
const formList = require("../model/formModel");
const Event = require('../model/eventModel');
const Design = require('../model/design');
const companyInfoModel = require("../model/companyModel");
const softPosition = require("../utils/softPosition");
class adminController {
  showProfile(req, res, next) {
    member
      .findById(req.session.user.id)
      .then((mem) => {
        res.render("admin/accountinfo", {
          layout: "dashboard",
          user: req.session.user,
          member: mem.toObject(),
        });
      })
      .catch((err) => {
        next();
      });
  }

  showListStaff(req, res, next) {
    softPosition()
      .then(member =>{
        res.render("admin/liststaff", {
          layout: "dashboard",
          member
        });
      })
    // member
    //   .find().lean().sort({position:1})
    //   .then((member) => {
    //     res.render("admin/liststaff", {
    //       layout: "dashboard",
    //       user: req.session.user,
    //       member
    //     });
    //   })
    //   .catch((err) => {
    //     next();
    //   });
  }

  showAddStaff(req, res, next) {
    res.render("admin/addstaff", {
      layout: "dashboard",
      user: req.session.user,
    });
  }

  addStaff(req, res, next) {
    const {
      image,
      account,
      password,
      name,
      position,
      code,
      date,
      phonenumber,
      email,
      address,
      facebook,
      zalo,
    } = req.body;
    const imageFilePath = req.file
      ? "/images/members/" + req.file.filename
      : "/images/members/default-member.jpeg";
    member
      .create({
        image: imageFilePath,
        name: name,
        position: position,
        code: code,
        account: account,
        password: password,
        email: email,
        phonenumber: phonenumber,
        birthday: date,
        address: address,
        // image: {type: String, default: "/images/members/default-member.jpeg"},
        social_facebook: facebook,
        social_zalo: zalo,
      })
      .then(()=>{
        res.redirect('/admin/liststaff');
      })
  }

  showListRecruitment(req, res, next) {
    formList
      .find({ typeForm: "Recruitment" })
      .sort({ formAtTime: -1 })
      .then((form) => {
        res.render("admin/listRecruitment", {
          layout: "dashboard",
          forms: form.map((value) => value.toObject()),
          user: req.session.user,
        });
      })
      .catch();
  }
  showListEvent(req, res, next) {
    formList
      .find({ typeForm: "Event" })
      .sort({ formAtTime: -1 })
      .then((form) => {
        res.render("admin/listEvent", {
          layout: "dashboard",
          forms: form.map((value) => value.toObject()),
          user: req.session.user,
        });
      })
      .catch();
  }
  showListContact(req, res, next) {
    formList
      .find({ typeForm: "Contact" })
      .sort({ formAtTime: -1 })
      .then((form) => {
        res.render("admin/listContact", {
          layout: "dashboard",
          forms: form.map((value) => value.toObject()),
          user: req.session.user,
        });
      })
      .catch();
  }
  showListAdvise(req, res, next) {
    formList
      .find({ typeForm: "Advise" })
      .sort({ formAtTime: -1 })
      .then((form) => {
        res.render("admin/listAdvise", {
          layout: "dashboard",
          forms: form.map((value) => value.toObject()),
          user: req.session.user,
        });
      })
      .catch();
  }

  showCompanyInfo(req, res, next) {
    companyInfoModel.find({ name: "Future" }).then((result) => {
      res.render("admin/companyInfo", {
        layout: "dashboard",
        user: req.session.user,
        companyInfo: result[0].toObject(),
      });
    });
  }
  formCompanyInfo(req, res, next) {
    const { _id, name, mail, phone, address, mapLink } = req.body;
    console.log(_id);
    companyInfoModel
      .findById(_id)
      .then((info) => {
        if (!info) {
          return res.status(404).send("Không tìm thấy thông tin công ty.");
        }

        // Gán giá trị mới
        info.name = name;
        info.mail = mail;
        info.phone = phone;
        info.address = address;
        info.mapLink = mapLink;

        // Lưu lại
        return info.save();
      })
      .then(() => {
        res.redirect("/admin/companyInfo");
      })
      .catch((err) => {
        console.error("Lỗi cập nhật companyInfo:", err);
        next(err);
      });
  }

  showAddEvent(req, res, next) {
    res.render("admin/addevent", {
      layout: "dashboard",
      user: req.session.user,
    });
  }

addEvent(req, res, next) {
  const { title, content, date, time, location, status, slug,ticket } = req.body;

  const image = "images/events/" + req.files?.image?.[0]?.filename || null;
  const thumbnail = "images/events/" + req.files?.thumbnail?.[0]?.filename || null;
  const startAt = new Date(`${date}T${time}Z`);
  Event.create({
    title,
    content,
    startAt,
    location,
    status,
    ticket,
    slug,
    image,
    thumbnail
  })
    .then(() => {
      res.render("admin/addevent", {
        layout: "dashboard",
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.error("Lỗi tạo sự kiện:", err);
      res.status(500).send("Đã xảy ra lỗi khi tạo sự kiện.");
    });
}

showListEventMain(req,res,next){
  Event.find()
    .sort({status :-1})
    .then(event =>{
      res.render("admin/listeventmain", {
        layout:"dashboard",
        user: req.session.user,
        event: event.map((e) => e.toObject())
      });
    })
}

editEvent(req,res,next){
  const { title, content, date, time, location, status, slug, ticket, imagePre, thumbnailPre } = req.body;
  let image, thumbnail;
  if(req.files?.image?.[0]?.filename != null){
   image = "images/events/" + req.files?.image?.[0]?.filename || null;
  }else{
    image = imagePre;
  }
  if(req.files?.thumbnail?.[0]?.filename != null){
   thumbnail = "images/events/" + req.files?.thumbnail?.[0]?.filename || null;
  }else{
    thumbnail = thumbnailPre;
  }
  const startAt = new Date(`${date}T${time}Z`);
  Event.findById({_id: req.params.id}).updateOne({
    title,
    content,
    startAt,
    location,
    status,
    ticket,
    slug,
    image,
    thumbnail
  })
    .then(() => {
      res.redirect("/admin/listeventmain");
    })
    .catch((err) => {
      console.error("Lỗi tạo sự kiện:", err);
      res.status(500).send("Đã xảy ra lỗi khi tạo sự kiện.");
    });
}

editMember(req,res,next){
  const {id,imagePre,name,position,code,date,phonenumber,email,address,facebook,zalo} = req.body;
  const image = req.file
    ? "/images/members/" + req.file.filename
    : imagePre;
  member.findById({_id:id}).updateOne({
    image,
    name,
    position,
    code,
    birthday:date,
    phonenumber,
    email,
    address,
    social_facebook: facebook,
    social_zalo: zalo
  })
    .then(()=>{
      res.redirect("/admin/liststaff");
    })
    .catch((err) => {
      console.error("Lỗi tạo sự kiện:", err);
      res.status(500).send("Đã xảy ra lỗi khi tạo sự kiện.");
    });
}

  deleteMember(req,res,next){
    let staff = req.params.id;
    member.findById({_id:staff}).updateOne({status:"deleted"})
      .then(()=>{
        res.redirect('/admin/liststaff')
      })
  }
  showStoredStaff(req,res,next){
    member.find({status:"deleted"}).lean()
      .then(members =>{
        res.render("admin/storedStaff",{layout:"dashboard",member:members})
      })
  }
  reStoreStaff(req,res,next){
    const staff = req.params.id;
    member.findById({_id:staff}).updateOne({status:""})
      .then(()=>{
        res.redirect('/admin/storedStaff');
      })
  }
  deleteStaffForever(req,res,next){
    const staff = req.params.id;
    member.find({_id:staff}).deleteOne()
      .then(()=>{
        res.redirect('/admin/storedStaff');
      })
  }

  showDesign(req,res,next){
    res.render('admin/design',{layout:"dashboard"});
  }
  design(req,res,next){
    let contentEdit = req.params.slug;
    let change = req.files?.['image']||[];
    let saveChange = '';
    let count = change.length;
    change.forEach((element,index) => {
      saveChange += element.filename;
      if(index<count-1){
        saveChange += " , ";
      }
    });
    console.log(contentEdit)
    Design.findOneAndUpdate({name:contentEdit},{image:saveChange})
    .then((doc)=>{
      if(!doc){
        Design.create({name:contentEdit,image:saveChange})
        .then(
          res.redirect('/admin/design')
        )
      }
      res.redirect('/admin/design');
    })
  }
}

module.exports = new adminController();
