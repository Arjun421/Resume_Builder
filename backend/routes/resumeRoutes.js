const express = require('express');
const {
  createResume,
  getUserResume,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController")
const {protect}=require("../middlewares/authmiddleware")
const {uploadResumeImages}=require("../controllers/uploadImages")
const upload = require("../middlewares/uploadMiddleware")

const router = express.Router();
router.post("/",protect,createResume)
router.get('/',protect,getUserResume)
router.get("/:id",protect,getResumeById)
router.put("/:id",protect,updateResume)
router.put("/:id/upload-images",protect,upload.array('images', 5),uploadResumeImages)
router.delete("/:id",protect,deleteResume)




// Add your resume routes here
// Example:
// router.get('/', getAllResumes);
// router.post('/', createResume);

module.exports = router;