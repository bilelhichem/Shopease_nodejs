const ProductModel = require('../Models/product.model');

class ProductService {
   
     
    static async AddProduct(file,title,description,category) {
        try {
           const Product = new ProductModel({
            image: file != null ? "/" + file.filename : "",
            title,
            description,
            category
            
           });
           return await Product.save();
        } catch(e) {
            console.log(e.message);
          
        }
    }



    static async DeleteProduct(id){
        try {
            const deleted = await ProductModel.findByIdAndDelete({ _id: id})
            return deleted;

        } catch (error) {
            console.log(error.message);
        }
    }

    static async UpdateProduct(id, file, title, description, category) {
        try {
            const updatedProduct = await ProductModel.findByIdAndUpdate(id, {
                image: file ? "/" + file.filename : "",
                title: title,
                description: description,
                category: category
            }, { new: true });
    
            return updatedProduct;
        } catch (error) {
            console.log(error.message);
            throw error; 
        }
    }
    



} 



module.exports = ProductService;