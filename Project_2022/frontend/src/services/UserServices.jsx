import axios from 'axios';
class UserService{
    constructor(){
        this.url = "http://localhost:7011";
    }

    async createNewUser(data) {
        let response = await axios.post(`${this.url}/api/createuser`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response;
      }

      async getusers() {
        let response = await axios.get(`${this.url}/api/users`);
        return response;
      }  
      async getDataById(id){
        let response = await axios.get(`${this.url}/api/users/${id}`);
        return response;
    }
    async putUserData(data,id){
      let response = await axios.put(`${this.url}/api/users/${id}`,data, {
          headers:{
              'Content-Type': 'application/json'
          }
      });
      return response;
  }

  async deleteData(id,imgName){
      let response = await axios.delete(`${this.url}/api/users/${id}/${imgName}`);
      return response;
  }
}
export default UserService;