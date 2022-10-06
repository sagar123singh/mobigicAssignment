const express = require('express');
const router = express.Router();
const userController=require('./controllers/userController')
const fileController= require('./controllers/fileController')
const auth=require('../nodejsProject/middleware/auth')



router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/createFileUrl',auth.Authorise,fileController.CreateFileUrl)
router.get('getData',auth.Authorise,fileController.getFile)
router.get('removeData',auth.Authorise,fileController.RemoveFile)

module.exports=router;