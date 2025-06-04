import mongoose from 'mongoose';
import * as argon2 from 'argon2';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    passwordHash: String,
});

UserSchema.methods.setPassword = async function (password) {
    this.passwordHash = await argon2.hash(password);
    await this.save();
};

UserSchema.methods.checkPassword = async function (password) {
    return (await argon2.verify(this.passwordHash, password));
}

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;


