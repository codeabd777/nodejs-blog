const { formidable } = require("formidable");
const Posts = require("../models/Posts")
const postForm = (req, res) => {
    res.render('createPost', { title: 'Create new post', login: true, errors: [], input_title: '', body: '' });
};

const storePost = (req, res) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
        const errors = [];
        const { title, body } = fields;

        if (title.length === 0) {
            errors.push({ msg: 'Title is required' });
        }
        if (body.length === 0) {
            errors.push({ msg: 'Body is required' });
        }

        
                
                
        if(errors.length !== 0) {
              res.render("createPost", { title: 'Create new post', login: true, errors, input_title: title, body})
        } else {
          
        }
            
        module.exports.create = async (err) => {
            if (!err) {
               const id = req.id;
               try {
                const user = await URLSearchParams.findOne({_id: id })
                const name = user.name;
                const newPost = new Posts({
                    userID: id,
                    title,
                    body,
                    userName: name
                })
                try{
                  const result = await newPost.save();
                  if(result){
                    req.flash('success', "your post has been added successfully")
                    res.redirect('/posts')
                  }

                }catch (err) {
                    res.send(err.msg)
                }
               }catch (err) {
                  res.send(err.msg);
               }
            }

        }
            console.log("errors------------->",errors);
        // Check if there are any validation errors
        if (errors.length > 0) {
            // Handle validation errors here (e.g., render a form with error messages)
            res.render('createPost', { title: 'Create new post', login: true, errors });
        } else {
            // No validation errors, proceed with storing the post
            // Rest of your code...
        }
    }); 


};
const posts = async(req, res) => {
    const id = req.id;
    const allPosts = await Posts.find({userID: id}).sort({updatedAt: -1});
    res.render("Posts", {title: 'Posts', login: true, posts: allPosts})
}   
module.exports = {
    postForm,
    storePost,
    posts
};
