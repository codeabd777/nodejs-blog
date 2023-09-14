const mongoose = require("mongoose");

//connect mongodb 

const  connection = async () => {
  try{
    await mongoose.connect("mongodb://127.0.0.1/youtube", { useNewUrlParser: true, useUnifiedTopology: true})
    console.log('Mongodb connected')
  } catch (err) {
    console.log(err.message)
  }

}
connection();
//define schema

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    }
}, {timestamps: true})

//create model

const users = mongoose.model("user", userschema);
/*const name = "as";
const email = "shahilkhan@gmail.com";
const phone = 234523;
const newUser = new users({
    name,
    email,
    phone
})
newUser.save().then(user => {
    console.log(user)

}).catch(err =>{
    console.log(err.message)
})
users.find({_id: '64fea7265cf285cdf8dd8eb2'}).then(users =>{
    console.log(user)
}).catch(error =>{
    console.log(error.message)
})
users.findByIdAndUpdate("64fea7265cf285cdf8dd8eb2", {name: 'shakil', email:'shakil@gmail.com'}).then(user => {
    console.log(user)
}).catch(error => {
    console.log(error.message)
})*/
users.findByIdAndDelete("64fea7265cf285cdf8dd8eb2").then(user => {
    console.log('document was deleted successfully')
}).catch(error => {
    console.log(error.message)
})