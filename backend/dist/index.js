"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const otpLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 7,
    message: " too many request in jsut 5 min ",
    standardHeaders: true,
    legacyHeaders: false
});
const resetPasswordlimiter = (0, express_rate_limit_1.default)({
    windowMs: 3 * 60 * 1000, // 15 minutes
    limit: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // ipv6Subnet: 56,
    message: "too many req in given window"
});
const otpStore = {};
app.post("/generate-otp", otpLimiter, (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: "email is not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generate the 6-digit OTP 
    otpStore[email] = otp;
    console.log(`OTP for ${email}: ${otp}`);
    res.status(200).json({ message: "OTP generated and logged " });
});
app.post('/reset-password', resetPasswordlimiter, (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Email, otp, new Password are required " });
    }
    if (otpStore[email] === otp) {
        console.log(`Password for ${email} has beeend rest to : ${newPassword}`);
        delete otpStore[email]; // clear the OTP after use ;
        return res.status(200).json({ message: "passowrd has been reset sucdessfully" });
    }
    else {
        res.status(401).json({ message: "INvalid OTP " });
    }
});
app.listen(3000, () => {
    console.log(" The backend is running in 3000");
});
