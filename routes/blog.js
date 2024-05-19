const {Router}  = require("express")
const router = Router();
const multer = require("multer")
const path = require("path")
const Blog = require('../models/blog');


const storage = multer.diskStorage({
    destination: function(req,file, cb) {
        cb(null, path.resolve('./public/uploads'))
    },
    filename: function(req,file,cb) {
        // const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() *1e9 );
        // cb(null, file.fieldname + "_" + uniqueSuffix);
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
})

const upload = multer({storage: storage});


router.get('/add-new', (req,res) => {
    return res.render('addBlog', {
        user: req.user,
    })
})

router.get('/:id', async (req,res) => {
    const blog = await Blog.findById(req.params.id)
    return res.render("Blog", {
        user: req.user,
        blog,
    })
})



router.post('/', upload.single("coverImage"), async(req,res) => {
    // console.log(req.body);
    // console.log(req.file);
    // return res.redirect("/")
    // working till now 
    const {title, body} = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.id,
        coverImageURL: `uploads/${req.file.filename}`,
    })    
    console.log(blog);

    return res.redirect(`/blog/${blog._id}`);




})

module.exports = router;