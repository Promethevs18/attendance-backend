import express from "express";
import cors from 'cors'
import twilio from "twilio"
import bodyparser from "body-parser"


const app = express();
const port = 8080;

app.use(cors());
app.use(bodyparser.json())

app.post("/send-sms", async (req, res) => {
    const natanggap = req.body;

    if(natanggap && natanggap.message && natanggap.phoneNum){

    try {
        const accountSid = 'AC8315974106a1f479fc54523580a28064';
        const authToken = '8d7c22642ec477493163b5e755409864';
        const client = twilio(accountSid, authToken);

       await client.messages.create({
            body: natanggap.message,
            from: '+18153454981',
            to: natanggap.phoneNum
        });

        res.json({ success: true, message: 'Sending message successful!' });
    } catch (error) {
        res.json({success: false, message: `Sending SMS error due to: ${error}`})
        res.status(500).send("Internal Server Error");
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