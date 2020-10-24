import axios from 'axios';

const url = 'http://localhost:3000/';

class SchemaHandler{ 

    async asyncFunc() {
        try {
          // fetch data from a url endpoint
          const response = await axios.get('http://localhost:3000/');
          const data = await response.json();
            
          return data;
        } catch (error) {
          alert(error); // catches both errors
        }
      }

}

export default SchemaHandler;