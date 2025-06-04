import mongoose from 'mongoose';
const PostSchema = new mongoose.Schema({
    author: String,
    contents: String,
    id: String 
});
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
export default Post;

