import axios from "axios";

const API_URL = "https://frozen-bastion-26115.herokuapp.com/api/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", { email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name,phone_no, address,email,password, password_confirmation,role) {
    return axios.post(API_URL + "register", {
      name,
      phone_no,
      address,
      email,
      password,
      password_confirmation,
      role
    });
  }
}

export default new AuthService();
