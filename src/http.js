import axios from 'axios';
    
export default axios.create({
 baseURL: "http://localhost:1337",
 headers: {
   //"Authorization": "Bearer bbacbd0402fa88c4f92d7b49a338c8cc2e2f9e46cc6908fc17df4a42d2e17cf78865241a4d51f1c2997e08250e55309f75e5905152d0b53486623208dc4afef2932e83b8805faef2db69bb7a23108662f90a142a26436b90f8547c85d971c320949263cf1472f223c5101cb62d46bd94afe08a427c129891744440c6340741c4",
   "Content-Type": "application/json",
 },
});