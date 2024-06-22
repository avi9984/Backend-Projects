const express = require("express");
const router = express.Router();
const authorContoller = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const middleware = require("../middleware/auth");


router.post("/authors", authorContoller.createAuthor);


//////////////////// -MIDDLEWARE WITH AUTHENTICATION AND AUTHERIZATION- ////////////////

router.post("/login", authorContoller.authorLogIn);
router.post("/blogs",middleware.Authentication, middleware.Authorization,blogController.createBlog);
router.get("/blogs", middleware.Authentication,blogController.getBlogs);
router.put("/blogs/:blogId",middleware.Authentication,middleware.Authorization,blogController.updateBlogs);
router.delete("/blogs/:blogId",middleware.Authentication, middleware.Authorization,blogController.deleteBlogs);
router.delete("/blogs",middleware.Authentication, middleware.Authorization, blogController.deleteByQuery);


module.exports = router;
