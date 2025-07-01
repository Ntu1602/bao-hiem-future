const postModel = require('../model/postModel');
const createSlug = require('../utils/createSlug');
class postController{
    showListPost(req,res,next){
        Promise.all(
            [
                postModel.find({status:""}).lean().sort({createAt:-1}).limit(5),
                postModel.find({status:""}).lean().sort({createAt:-1}).limit(30),
                postModel.find({status:"",category:"Bảo hiểm"}).lean().sort({createAt:-1}).limit(2),
                postModel.find({status:""}).lean().sort({view:-1}).limit(4),
                postModel.find({status:"",category:"Kinh tế"}).lean().sort({createAt:-1}).limit(3),
            ]
        ).then(([postNew,postList,postBaoHiem,postViewest,postEconomy])=>{
            res.render('post-listing',{postNew,postList,postBaoHiem,postViewest,postEconomy});
        })
        .catch(next)
    }
    showPost(req,res,next){
        const slug = req.params.slug;
        postModel.findOne({slug}).lean()
            .then(post =>{
                res.render("post-detail",{post});
            })
    }
    showEditPost(req,res,next){
        res.render('admin/addPost',{layout:"dashboard"});
    }
    addPost(req,res,next){
        const {title,content,author,category,subContent} = req.body
        const slug = createSlug(title)
        const image = "/images/posts/" + req.file.filename;
        postModel.create({
            title,content,image,author,slug,category,subContent
        })
        .then(()=>{
            res.redirect('/admin/add-post');
        })
    }

    showAdminListPost(req,res,next){
        postModel.find({status:""}).lean().sort({createAt: 1})
            .then(posts=>{
                res.render('admin/listPost',{layout: "dashboard",posts})
            })
    }
    editPost(req,res,next){
        const {title,category,content,subContent,author,slug,imagePre} = req.body
        let image = imagePre;
        let id = req.params.id;
        if(req.file){
            image = "/images/posts/"+req.file.filename;
        }
        postModel.findById({_id:id}).updateOne({
            title,category,content,subContent,author,slug,image
        })
        .then(()=>{
            res.redirect('/admin/list-post')
        })
    }
    deletePost(req,res,next){
        const id = req.params.id;
        postModel.findOneAndUpdate({_id:id},{status:"deleted"})
        .then(()=>{
            res.redirect('/admin/list-post');
        })
    }
    showStoredPost(req,res,next){
        postModel.find({status:"deleted"}).lean()
        .then(posts => {
            res.render("admin/storedPost",{layout:"dashboard",posts})
        })
    }
    deletePostForever(req,res,next){
        postModel.findByIdAndDelete({_id:req.params.id})
        .then(()=>{
            res.redirect("/admin/storedPost");
        })
    }
    reStorePost(req,res,next){
        postModel.findOneAndUpdate({_id:req.params.id},{status:""})
        .then(()=>{
            res.redirect("/admin/storedPost");
        })
    }
}

module.exports = new postController;