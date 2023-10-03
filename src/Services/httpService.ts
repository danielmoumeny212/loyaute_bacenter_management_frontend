import { toast } from "react-toastify";
import axios, { AxiosInstance } from "axios";

class HttpService {
  private baseUrl = "http://localhost:8000";
  protected http = axios.create({
    baseURL: this.baseUrl,
  });

  constructor(private endPoint: string) {
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
    this.http.interceptors.request.use((config) => {
      if (localStorage.getItem("tokens")) {
        const { access: accessToken } = JSON.parse(
          localStorage.getItem("tokens") || ""
        );
        config.headers.Authorization = `JWT ${accessToken}`;
        return config;
      }
      return config;
    });
    this.http.interceptors.response.use(null, (error) => {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (!expectedError) {
        toast.error("Something went wrong");
      }
      return Promise.reject(error);
    });
  }
   setEndpoint(endPoint: string) {
    this.endPoint = endPoint;
    return this
  }
  getMany<T>() {
    return this.http.get<T>(`${this.baseUrl}/${this.endPoint}`);
  }
  create<T>(data: any) {
    return this.http.post<T>(`${this.baseUrl}/${this.endPoint}`, data);
  }

  getOne<T>() {
    return this.http.get<T>(`${this.baseUrl}/${this.endPoint}`);
  }
  update<T>(data: any) {
    return this.http.put<T>(`${this.baseUrl}/${this.endPoint}`, data);
  }
}
export default HttpService;
