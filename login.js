const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

process.on('warning', (warning) => {
    console.warn(warning.message);
});

mongoose.connect('mongodb://localhost:27017/Database', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error("Error in connecting to database:", err);
    });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post("/log_in", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send("User not found");
        } else {
            if (user.password === password) {
                // Redirect to index.html upon successful login
                return res.redirect('http://127.0.0.1:5501/index.html');
            } else {
                return res.status(401).send("Incorrect password");
            }
        }
    } catch (err) {
        console.log(err); 
        return res.status(500).send("Internal Server Error");
    }
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('login.html');
});

app.listen(3002, () => {
    console.log("Listening on port 3002");
});
