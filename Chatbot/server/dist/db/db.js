import mongoose from "mongoose";
const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to db");
    }
    catch (error) {
        console.log(error);
    }
};
export default connection;
//# sourceMappingURL=db.js.map