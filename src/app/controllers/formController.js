const Form = require('../model/formModel');
class formController{
    formRecruitment(req,res,next){
        const {name, birthday, phone, mail} = req.body;
        Form.create({
            name,birthday,phone,mail,typeForm:"Recruitment"
        })
        .then(e =>{
            req.session.success = true;
            res.redirect('/');

        }
        )

    }

    formAdvise(req,res,next){
        const {name, birthday, phone, mail,note} = req.body;
        Form.create({
            name,birthday,phone,mail,note,typeForm:"Advise"
        })
        .then(e =>{
            req.session.success = true;
            res.redirect('/')
        }
        )
    }
    
    formEvent(req,res,next){
        const {name, birthday, phone, mail,note} = req.body;
        Form.create({
            name,birthday,phone,mail,note,typeForm:"Event"
        })
        .then(e =>{
            req.session.success = true;
            res.redirect('/')
        }
        )
    }

    formContact(req,res,next){
        const {name, phone, mail,note} = req.body;
        Form.create({
            name,phone,mail,note,typeForm:"Contact"
        })
        .then(e =>{
            req.session.success = true;
            res.redirect('/')
        }
        )
    }
}

module.exports = new formController;