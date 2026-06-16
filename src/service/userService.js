import http from "./httpService";

export const fetchUsers = async () => {
  const { data } = await http.get("/users");
  return data;
};

export const createUser = async (userData) => {
  const { data } = await http.post("/users", userData);
  return data;
};

export const updateUser = async (id, userData) => {
  const { data } = await http.patch(`/users/${id}`, userData);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await http.delete(`/users/${id}`);
  return data;
};
