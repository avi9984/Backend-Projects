const express = require("express");
const router = express.Router();
const collegeController=require("../controllers/collegeController")
const internController=require("../controllers/internController")



router.post("/functionup/colleges", collegeController.createCollage);
router.post("/functionup/interns", internController.createInter)
router.get("/functionup/collegeDetails",collegeController.getCollegeDetails)

module.exports = router;
