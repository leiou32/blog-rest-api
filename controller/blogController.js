const Blog = require('../models/Blog')
const blogController = {
    all_blogs: async (req, res) => {
        try {
            const query = {};
            const { search, limit, page, createdAt = 1 } = req.query;
            const skip = (page - 1) * limit;
            const regex = new RegExp(search, 'i');
            
            if (search) {
              query.$or = [
                { title: regex },
                { content: regex }
              ];
            }
            
            const total = await Blog.countDocuments();
            const count = await Blog.find(query).countDocuments();
            const blogs = await Blog.find(query)
              .skip(skip)
              .limit(limit)
              .sort({ createdAt });
            
            return res.status(200).json({
              code: 200,
              success: true,
              data: blogs,
              page_info: {
                page: +page,
                limit:Number(limit),
                total,
                count
              }
            });
        } catch (err) {
            return res.status(500).json({
                code: 500,
                message: err.message,
            });
        }
    },

    create_blog: async (req, res) => {
        try {
            const {
                title,
                content,
                auther
                
            } = req.body
            if (!title) {
                return res.status(400).json({
                    code: 400,
                    success: false,
                    message: "Blog title requires !"
                });
            }
            if (!content) {
                return res.status(400).json({
                    code: 400,
                    success: false,
                    message: "Blog content requires !"
                });
            }
            const blog = new Blog({
                title,
                content,
                auther,
                user_id:req.user.id
            })
            await blog.save();
            return res.status(200).json({
                code: 200,
                success: true,
                data: blog
            });
        } catch (err) {
            return res.status(500).json({
                code: 500,
                message: err.message,
            });
        }
    },
    update_blog: async (req, res) => {
        try {

            const {
                title,
                content,
                auther,
                user_id

            } = req.body

            await Blog.findOneAndUpdate({
                _id: req.params.id
            }, {
                title,
                content,
                auther,
                user_id
            })
            return res.status(200).json({
                code: 201,
                success: true,
                message: `Update blog with ID : ${req.params.id}`
            });
        } catch (err) {
            return res.status(500).json({
                code: 500,
                message: err.message,
            });
        }
    },
    get_blog: async (req, res) => {
        try {
            const blog = await Blog.find({
                _id: req.params.id
            })
            return res.status(200).json({
                code: 200,
                success: true,
                data: blog
            })
        } catch (err) {
            return res.status(500).json({
                code: 500,
                message: err.message,
            });
        }
    },
    delete_blog: async (req, res) => {
        try {

            await Blog.findByIdAndDelete(req.params.id)
            return res.status(200).json({
                code: 200,
                success: true,
                message: `Delete blog with ID : ${req.params.id}`

            })

        } catch (err) {
            return res.status(500).json({
                code: 500,
                message: err.message,
            });
        }
    }
}
module.exports = blogController