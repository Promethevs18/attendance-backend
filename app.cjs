require('dotenv').config()

const express = require('express');
const port = 8080;
const sid = process.env.ACCOUNTSID
const token = process.env.TOKEN

const cors = require("cors");
const twilio = require("twilio");
const bodyParser = require("body-parser");

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.post('/send-sms', async (req, res) => {
    const natanggap = req.body;

    if(natanggap && natanggap.message && natanggap.phoneNum){

    try {
        const accountSid = sid
        const authToken = token
        const client = twilio(accountSid, authToken);

       await client.messages.create({
            body: natanggap.message,
            from: '+13312156754',
            to: natanggap.phoneNum
        });

        res.json({ success: true, message: 'Sending message successful!' });
    } catch (error) {
        res.json({success: false, message: `Sending SMS error due to: ${error}`})
        res.status(500).send("Internal Server Error");
        console.log(error)
    }
    }
});

app.get('/do-ai', (req, res) => {
    try {
       res.send("Wazzup, mah nigga?")
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/', (req, res) => {
    res.send("Backend running nominal")
})


app.listen(port, () => {
    console.log(`Server is now listening at ${port}`)
});