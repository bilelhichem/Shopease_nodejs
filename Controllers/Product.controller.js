const multer = require("multer");
const Path = require("path");
const ProductService = require("../Services/Product.service");
const upload = require("../utilies/upload.image");





exports.AjouterProduct = async(req, res, next) =>{
     
try {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(404).json({message: "Seuls les fichiers .png, .jpg et .jpeg sont autorisés"});
        } else {
            const file =  req.file != null ? req.file : "";
             
            const {title , description,category} = req.body;
                if(!file || !title || !description || !category ){
                    return res.status(404).json({message: "Invalid Data"});
                }

           
                
                const response = await ProductService.AddProduct(file,title,description,category);
                res.status(200).json({ status: true, success: "Product ajouté" });
        }
    });
  

      
    
} catch (error) {
    return res.status(500).json({ message: error.message});
}


}



exports.DeleteProd = async (req,res,next)=>{
    try {
        const {id} = req.body; 
        console.log(id);
           if(!id) {
            return res.status(500).json({ message: "Invalid Data"});
           }

           const Delete = await ProductService.DeleteProduct(id); 
           res.status(200).json({ status: true, success: "Product Suprimier" });

    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}



exports.UploadPro = async (req,res,next)=>{
    try {

        upload(req, res, async function (err) {
            if (err) {
                return res.status(404).json({message: "Seuls les fichiers .png, .jpg et .jpeg sont autorisés"});
            } else {
          
                const file =  req.file != null ? req.file : "";
                const {id, title , description,category} = req.body;
                 if (  !file ) {
                    return res.status(404).json({message: "Invalid Image"});
                 }
                    if(!id || !title || !description || !category ){
                        return res.status(404).json({message: "Invalid Data"});
                    }
    

                   const UploadPro = await ProductService.UpdateProduct(id, file, title, description, category);
                    res.status(200).json({ status: true, success: "Product Upload" });
            }
        });
      
        

    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}


