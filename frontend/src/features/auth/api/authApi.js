import axiosInstance from "../../../api/axiosInstance";

export const loginUser = async (data) => {
  const response = await axiosInstance.post("/api/auth/login", {
    email: data.email,
    password: data.password,
  });
  return response;
};

export const signupUser = async (data) => {
  const response = await axiosInstance.post("/api/auth/register", {
    username: data.username,
    email: data.email,
    password: data.password,
    fullName: data.fullName,
  });
  return response;
};