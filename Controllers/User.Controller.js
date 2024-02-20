const UserService = require('../Services/Users.services');
const UserModel = require('../Models/users.model');
const crypto = require("crypto");
const sendEmail = require("../utiles/SendEmail");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



exports.RegisterUser = async (req, res, next) => {
      try { 
      
        
     const { FirstName, SecondName, email, password } = req.body;

     const  id = crypto.randomBytes(16).toString("hex") ;
      
    const { error } = UserModel.validateUser({email,password});

       if (error) {
        return res.status(400).json({ message: "Invalid data", details: error.details });
      }

    const existingUser = await UserService.FindUser(email);

    if (existingUser) {
      return res.status(400).json({ message: "User is already exist"});
    }

      const user = await UserService.AddUser(id,FirstName, SecondName, email, password);
      let tokenData ;
       tokenData = {
            _id:user._id,
            email:user.email,
            name : user.FirstName + " " + user.SecondName 
      }

      const token = await UserService.generateAccessToken(tokenData,"secret","1h");

      if (!token) {
        return res.status(400).json({ message: "Invalid Access token"});
      }
     
      res.status(200).json({ status: true, success: `${FirstName} Is Already Registered`,token:token});
      
    } catch (error) {
        console.error("Error while adding user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.LoginUser = async (req,res,next)=>{
   
   try {
     const {email,password} = req.body ;  

     const { error } = UserModel.validateUser(req.body);

     if (error) {
      return res.status(400).json({ message: "Invalid data", details: error.details });} 

      const existingUser = await UserService.FindUser(email);

    if (!existingUser) {
      return res.status(400).json({ message: "User n'exist pas "});
    }

    const PaswwordCorrect = await  existingUser.matchPassword(password);
    if(! PaswwordCorrect) {
      return res.status(400).json({ message: "password incorrect" })
    }

    let tokenData ;

    tokenData = {
         _id:existingUser._id,
         email:existingUser.email,
         name : existingUser.FirstName + " " + existingUser.SecondName 
   }

   const token = await UserService.generateAccessToken(tokenData,"secret","1h");

   if (!token) {
     return res.status(400).json({ message: " Invalid Access token"});
   }
  
   res.status(200).json({ status: true, success: `login success`,token:token});

   } catch (e) {
    console.error("Error while adding user:", error);
    return res.status(500).json({ message: "Internal server error" });
   }
  
  
  
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



exports.forgotPassword = async (req,res,next) =>{

  try {
   const {email} = req.body;
    const user = await UserService.FindUser(email);

    if (!user)
        return res.status(400).send("user with given email doesn't exist");


    const link = `${process.env.BASE_URL}/password-reset/${user._id}}`;
    await sendEmail(user.email, "Password reset", link);

    res.send("password reset link sent to your email account");
} catch (error) {
    res.send("An error occured");
    console.log(error);
}
}


