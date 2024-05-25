const express = require("express");
const nodemailer = require('nodemailer');

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

const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
        user: 'meshiva741@gmail.com',
        pass: 'zhtt whog fazp zlro'
    }
});

// Function to send confirmation email
function sendConfirmationEmail(email) {
    // Setup email data
    const mailOptions = {
        from: 'meshiva741@gmail.com',
        to: email,
        subject: 'Confirmation Email',
        text: `Thank you for submitting your email. This is a confirmation that your email address (${email}) has been registered.`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending confirmation email:', error);
        } else {
            console.log('Confirmation email sent:', info.response);
        }
    });
}
const subscribedEmails = new Set();
// Route to handle form submission
app.post('/submit', async (req, res) => {
    const { email } = req.body;
    sendConfirmationEmail(email);
    const subscriptionData = new Subscription({
        email
    });
    await subscriptionData.save();
    const popupScript = `
        <script>
            alert("You have subscribed to our Blogs!");
            window.location.href = "/"; // Redirect to home page or any other page
        </script>
    `;
    res.send(popupScript);
});



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
