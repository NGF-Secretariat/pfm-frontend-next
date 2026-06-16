import http from "./httpService";

export const login = async (email, password) => {
  const { data } = await http.post("/auth/login", { email, password });
  return data;
};
