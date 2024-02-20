const UserModel = require('../Models/users.model');


class UserService {
    static async FindUser(email){
        try{
         return await UserModel.User.findOne({email});
        }catch(e){
             console.log(e.message);
        }
    }
  
    static async AddUser(id,FirstName, SecondName, email, password) {
        try {
           const user = new UserModel.User({
                id,
                FirstName,
                SecondName,
                email,
                password
           });
           return await user.save();
        } catch(e) {
            console.log(e.message);
          
        }
    }

    
   


}




module.exports = UserService;