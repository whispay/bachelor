import axios from 'axios';


export async function login() {
   
    let response = axios.post("http://localhost:3000/api/login");
    Promise.resolve(await response).then((values) => {
        return values.data;
    });
    
     
}


