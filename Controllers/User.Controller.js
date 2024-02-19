const UserService = require('../Services/Users.services');


exports.RegisterUser= async (req,res,next)=>{
       
     const{FirstName,SecondName,email,password} = req.body;


      const User =  await UserService.AddUser(FirstName,SecondName,email,password);

      res.status(200).json({ status: true, success:  FirstName + '  Is Already Register ' });

}