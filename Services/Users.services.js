const UserModel = require('../Models/users.model');
const jwt = require('jsonwebtoken');

class UserService {
    //--------------------------------------------------------------------------------------------------------------------------------



    static async FindUser(email){
        try{
         return await UserModel.User.findOne({email});
        }catch(e){
             console.log(e.message);
        }
    }
  
    //--------------------------------------------------------------------------------------------------------------------------------


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

    

    //--------------------------------------------------------------------------------------------------------------------------------
    
    
    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }




}




module.exports = UserService;