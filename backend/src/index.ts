import expres from 'express'

 const app = expres ();

app.use(expres.json());

const otpStore :Record<string, string> = {}

app.post ( "/generate-otp", (req, res )=>{
    const email = req.body.email;

    if (!email){
         return res.status(400).json ({ message: "email is not found"})
    }

    const otp = Math.floor(100000 + Math.random()*900000).toString(); // generate the 6-digit OTP 

    otpStore[email]= otp;

    console.log(`OTP for ${email}: ${otp}`);
    res.status(200).json({message : "OTP generated and logged "})
})


app.post ( '/reset-password', ( req, res)=>{
    const { email, otp, newPassword }= req.body;
    if(!email || !otp || !newPassword ){
        return res.status(400).json ({message : "Email, otp, new Password are required "})
    }

    if ( otpStore[email]=== otp){
        console.log( `Password for ${email} has beeend rest to : ${newPassword}`);
        delete otpStore[email]; // clear the OTP after use ;
        return res.status(200).json({message: "passowrd has been reset sucdessfully"})
    }
    else {
        res.status (401 ).json ({message: "INvalid OTP "})
    }
})

app.listen ( 3000, ()=>{
    console.log(" The backend is running in 3000")
})