const UserModel = require('../Models/users.model');


class UserService {
  
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

    
    static async FindUser(id){
        try{
          
        }catch(e){

        }
    }


}




module.exports = UserService;