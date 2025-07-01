const loginController = require("../app/controllers/loginController");
const adminController = require("../app/controllers/adminController");
const postController = require("../app/controllers/postController");
const {upload, uploadEvent, uploadAvatar, uploadPost, uploadDesign} = require("../app/midlewares/multer");
const express = require('express');
const router = express.Router();

router.get('/',loginController.show);
router.get('/login',loginController.checkLogout);
router.get('/profile',adminController.showProfile)
router.get('/liststaff',adminController.showListStaff)    
router.get('/addstaff',adminController.showAddStaff)
router.post('/addstaff',upload.single('image'),adminController.addStaff)
router.get('/recruitment',adminController.showListRecruitment);
router.get('/event',adminController.showListEvent);
router.get('/contact',adminController.showListContact);
router.get('/advise',adminController.showListAdvise);
router.get('/companyInfo',adminController.showCompanyInfo)
router.post('/formCompanyInfo',adminController.formCompanyInfo)
router.get('/addevent',adminController.showAddEvent);
router.post('/addevent',uploadEvent.fields([
    { name: 'image', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),adminController.addEvent);

router.get('/listeventmain', adminController.showListEventMain);
router.post('/edit-event/:id',uploadEvent.fields([
    { name: 'image', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),adminController.editEvent);

router.post('/edit-member/:id',uploadAvatar.single('image'),adminController.editMember);

router.get('/delete-staff/:id',adminController.deleteMember);

router.get('/storedStaff',adminController.showStoredStaff);

router.get('/restoreStaff/:id',adminController.reStoreStaff);
router.get('/delete-staff-forever/:id',adminController.deleteStaffForever);

router.get('/design',adminController.showDesign);
router.post('/design-edit/:slug',uploadDesign.fields([{name:'image',maxCount:10}]),adminController.design);

router.get('/add-post',postController.showEditPost);
router.post('/add-post',uploadPost.single('image'),postController.addPost);
router.get('/list-post',postController.showAdminListPost);
router.get('/delete-post/:id',postController.deletePost);
router.post('/edit-post/:id',uploadPost.single('image'),postController.editPost);
router.get('/storedPost',postController.showStoredPost);
router.get('/restorePost/:id',postController.reStorePost);
router.get('/delete-post-forever/:id',postController.deletePostForever);




module.exports = router;