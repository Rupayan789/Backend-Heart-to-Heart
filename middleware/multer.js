const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = file.mimetype.split("/")[1];
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+ext);
    }
  })
  
  const upload = multer({ storage: storage })
  module.exports = upload;