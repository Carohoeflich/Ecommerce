const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB connection successfull!")).catch((err)=> {
    console.log(err);
});

//Call routes
app.use(express.json()); //So I'm able to POST json from POSTMAN
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);


app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is running");
});