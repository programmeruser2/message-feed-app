import mongoose from 'mongoose';

const url = process.env.MONGODB_URL; 
const options = {};
if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
}
async function dbConnect() {
    if (global.mongoose.conn) {
        return global.mongoose.conn;
    } 
    if (!global.mongoose.promise) {
        global.mongoose.promise = mongoose.connect(url, options);
    }
    try {
        global.mongoose.conn = await global.mongoose.promise;
    } catch (e) {
        global.mongoose.promise = null;
        throw e;
    }
    return global.mongoose.conn;
}
export default dbConnect; 

