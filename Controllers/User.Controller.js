const UserService = require('../Services/Users.services');
const UserModel = require('../Models/users.model');
const crypto = require("crypto");


exports.RegisterUser = async (req, res, next) => {
      try { 
     const { FirstName, SecondName, email, password } = req.body;
     const  id = crypto.randomBytes(16).toString("hex") ;
      
    const { error } = UserModel.validateUser(req.body);

  
    if (error) {
        return res.status(400).json({ message: "Invalid data", details: error.details });
    }

  
      const user = await UserService.AddUser(id,FirstName, SecondName, email, password);
      res.status(200).json({ status: true, success: `${FirstName} Is Already Registered`});
      
    } catch (error) {
        console.error("Error while adding user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
