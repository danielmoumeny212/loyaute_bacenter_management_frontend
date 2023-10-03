import { User } from "../models/user";
import HttpService from "./httpService";

class UserService extends HttpService {
  async resetPwd(email: string) {
    return await this.create({ email });
  }
  async deactivateUser() {
    return await this.create<User>({});
  }

  async updateUser(user: any) {
    return await this.update<User>(user);
  }

  async activateUser() {
    return await this.create<User>({});
  }
  getUser<T>() {
    return this.getOne<T>();
  }
  getUsers<T>() {
    return this.getMany<T>();
  }
  getUserServiceStats<T>() {
    return this.getOne<T>();
  }
}

export default UserService;

// import { User } from "../features/userSlice";
// import HttpService from "./httpService";

// class UserService extends HttpService {
//   constructor() {
//     super("/users");
//   }

//   resetPassword(email: string): Promise<void> {
//     return this.create<void>({ email });
//   }

//   deactivateUser(): Promise<User> {
//     return this.create<User>({});
//   }

//   updateUser(user: User): Promise<User> {
//     return this.update<User>(user);
//   }

//   activateUser(): Promise<User> {
//     return this.create<User>({});
//   }

//   getUser<T>(): Promise<T> {
//     return this.getOne<T>("me");
//   }

//   getUsers<T>(): Promise<T> {
//     return this.getAll<T>();
//   }

//   getUserServiceStats<T>(): Promise<T> {
//     return this.getInstance<T>();
//   }
// }

// export default UserService;
