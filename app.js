import express from "express";
import cors from 'cors'
import twilio from "twilio"
import bodyparser from "body-parser"


const app = express();
const port = 8080;

app.use(cors());
app.use(bodyparser.json())

app.post('/send-sms', async (req, res) => {
    const natanggap = req.body;

    if(natanggap && natanggap.message && natanggap.phoneNum){

    try {
        const accountSid = 'AC7333bb8c337e7511bd48d736931b645e';
        const authToken = 'abc848d69e4ecb0ac2d7d8e05d39269a';
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