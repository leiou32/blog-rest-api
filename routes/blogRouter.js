const router = require("express").Router();
const auth = require("../middleware/authentication");
const blogController = require("../controller/blogController");
router.get("/blogs", blogController.all_blogs);
router.post("/blog", auth,blogController.create_blog);
router.put("/blog/:id",auth,blogController.update_blog);
router.get("/blog/:id", blogController.get_blog);
router.delete("/blog/:id",auth, blogController.delete_blog);
module.exports = router;