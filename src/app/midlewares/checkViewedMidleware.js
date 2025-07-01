const Post = require('../model/postModel');
const Page = require('../model/pageModel');

async function isViewedPost(req, res, next) {
    const viewed = req.session.viewedPost || [];

    const slug = req.params.slug;

    if (!viewed.includes(slug)) {
        await Post.findOneAndUpdate({ slug }, { $inc: { view: 1 } });

        viewed.push(slug);
        req.session.viewedPost = viewed;
    }

    req.session.save(err => {
        if (err) {
            console.error("Lỗi khi lưu session:", err);
            return next(err);
        }
        next();
    });
}
async function isViewedPage(req,res,next){
    const viewedPage = req.session.viewedPage || [];

    if(!viewedPage.includes(req.hostname)){
        console.log(req.hostname)
        await Page.findOneAndUpdate({name: "Future"},{$inc :{dailyView:1}});
        await Page.findOneAndUpdate({name: "Future"},{$inc :{weekView:1}});
        await Page.findOneAndUpdate({name: "Future"},{$inc :{view:1}});
        viewedPage.push(req.hostname);
        req.session.viewedPage = viewedPage;
    }
    req.session.save();
    next();
}

module.exports = {isViewedPost,isViewedPage};