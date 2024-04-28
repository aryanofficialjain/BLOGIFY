const express = require("express");
const app = express();
const userRoute = require('./routes/user')
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const PORT = 8000;
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}))

mongoose.connect('mongodb+srv://7985447692:7985447692@cluster0.ufxdpfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/blogify')
.then((e) => console.log("MongoDB Connected Succesfully"))
.catch((err) => console.log("Error while connectong mongoDB", err))

app.get('/', (req,res) => {
	res.render('Home')
})

app.use('/user', userRoute)

app.listen(PORT, () => {
	console.log(`Server started at PORT ${PORT}`)
})





	
