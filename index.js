const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require('path');

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@registrationpg.8dqyzvl.mongodb.net/collectedDB`, {
  //  useNewurlParser :true,
  //  useUnifiedTopology :true,
});

// registration schema
const registrationSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    subject: String,
    message: String
});

// subscription schema
const subscriptionSchema = new mongoose.Schema({
    email: String
});

// models
const Registration = mongoose.model("Registration", registrationSchema);
const Subscription = mongoose.model("Subscription", subscriptionSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
});

app.post("/cont", async (req, res) => {
    try {
        const { name, phone, email, subject, message } = req.body;

        const registrationData = new Registration({
            name,
            phone,
            email,
            subject,
            message
        });

        await registrationData.save();
        res.redirect("/success");
    } catch (error) {
        console.log(error);
        res.redirect("/error");
    }
});

app.post("/subs", async (req, res) => {
    try {
        const { email } = req.body;

        const subscriptionData = new Subscription({
            email
        });

        await subscriptionData.save();
        res.redirect("/success");
    } catch (error) {
        console.log(error);
        res.redirect("/subscription-error");
    }
});

app.use(express.static(path.join(__dirname, 'pages')));

app.get("/success", (req, res) => {
    res.sendFile(__dirname + "/pages/success.html");
});

app.get("/error", (req, res) => {
    res.sendFile(__dirname + "/pages/error.html");
});

app.get("/subscription-success", (req, res) => {
    res.sendFile(__dirname + "/pages/subscription-success.html");
});

app.get("/subscription-error", (req, res) => {
    res.sendFile(__dirname + "/pages/subscription-error.html");
});

app.get("/projectPage/project.html", (req, res) => {
    res.sendFile(__dirname + "/pages/projectPage/project.html");
});

app.get("/blogPage/blog.html", (req, res) => {
    res.sendFile(__dirname + "/pages/blogPage/blog.html");
});

app.get("/contactPage/contact.html", (req, res) => {
    res.sendFile(__dirname + "/pages/contactPage/contact.html");
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
