
export const storeToken = (data: any) => {
  localStorage.setItem("tokens", JSON.stringify(data));
};
export const removeToken = () => {
   localStorage.removeItem("tokens");

}
