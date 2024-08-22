import mongoose, { Mongoose } from "mongoose";

interface UserAttrs {
    email: string;
    password: string;
}
 
interface  UserModal extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs) : UserDoc;
}

//we access property safely
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


userSchema.statics.build = (attr: UserAttrs) => {
    return new User(attr);
}
const User = mongoose.model<UserDoc,UserModal>('User', userSchema);


// //with help of this ts will get power hahaha
// // suppose we add something weong using new User there will a probe 
// // so we use this 
// and it have some improvemetn 
// const buildUser = (attrs: UserAttrs)=> {
//     return new User(attrs)
// }

export {User};