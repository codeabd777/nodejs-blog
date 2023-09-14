const { formidable } = require("formidable");

const postForm = (req, res) => {
    res.render('createPost', { title: 'Create new post', login: true });
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

        // Check if the 'image' field is present in the form data
        if (!files.image) {
            errors.push({ msg: 'Image is required' });
        } else {
            // Access the file name and check its length
            const imageName = files.image[0].originalFilename;
            if (imageName.length === 0) {
                errors.push({ msg: 'Image file name is required' });
            }else{
                const imageName = files.image[0].originalFilename;
                const split = imageName.split(".");
                console.log("spsplitlit",split)
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

module.exports = {
    postForm,
    storePost
};
