const mongoose = require('mongoose'); 


const Schema = mongoose.Schema;

const ProductShema =  new Schema({
    image: 
    {
      type: String,
      required: true,   
    },

    title:{
        type:String,
        required: true,
    }
    ,
    description:{
        type:String,
        required: true,
    }, 
    category:{
        type:String,
        required: true,
    }
    

})



const Product = mongoose.model("ProductDb", ProductShema);
module.exports = Product;
