const UserModel = require('../Models/users.model');


class UserService {
  
    static async AddUser(FirstName,SecondName,email,password) {
        try{
           const user = new UserModel.User({
            FirstName,
            SecondName,
             email,
             password
           });
           return await user.save();
        }catch(e){
                console.log(e.message);
        }
    }
     
      



}



module.exports = UserService;