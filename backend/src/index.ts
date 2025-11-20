import expres from 'express'

 const app = expres ();

app.use(expres.json());

const otpStore :Record<string, string> = {}

app.post ( "/generate-otp", (req, res )=>{
    const email = req.body.email;

    if (!email){
         return res.status(400).json ({ message: "email is not found"})
    }
})