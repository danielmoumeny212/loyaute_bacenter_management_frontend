import HttpService from "./httpService";
import jwtDecode from "jwt-decode";
import * as JWT from "jwt-decode";
import { removeToken, storeToken } from "../utils/storage";

interface Auth {
  access: string;
  refresh: string;
}

interface User {
  user_id: number;
  is_admin: boolean;
}

class AuthService extends HttpService {
  constructor(endPoint: string) {
    super(endPoint);
  }

  async login(credential: { email: string; password: string }) {
    const response = await this.create<Auth>(credential);
    storeToken(response.data);
  }

  logout() {
    removeToken();
  }
  getCurrentUser(): User | null {
    try {
      const token = this.getToken();
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken as User;
      }
      return null;
    } catch (ex) {
      return null;
    }
  }
  isThereValidToken() {
    const token = this.getToken();
    if (token) {
      return this.isValidToken(token);
    }
    return false;
  }

  private isValidToken(token: string): boolean {
    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime ? false : true;
    } catch (error) {
      return false;
    }
  }

  getToken(): string | null {
    const tokens = localStorage.getItem("tokens"); 
    if (tokens){
      const {access } = JSON.parse(tokens);
      return  access
    }
    return null;
  }
}

export default new AuthService("auth/jwt/create");
