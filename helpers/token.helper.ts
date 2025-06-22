let tokenKey = "token";
const tokenHelper = {
  getToken: () => {
    if(typeof window !== "undefined") return localStorage.getItem(tokenKey);
  },
  setToken: (token: string) => {
    if(typeof window !== "undefined") return localStorage.setItem(tokenKey, token);
  },
  removeToken: () => {
    if(typeof window !== "undefined") return localStorage.removeItem(tokenKey);
  },
};

export default tokenHelper;