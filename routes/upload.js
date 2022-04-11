const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadCtrl = require("../controllers/uploadctrl")
const auth = require('../middleware/auth')


router.post('/upload_avatar', uploadImage, auth,  uploadCtrl.uploadavatar)

module.exports = router