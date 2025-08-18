import apiClient from "./apiClient";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

// ✅ Login API
export const loginUser = async (data: LoginPayload) => {
  const response = await apiClient.post("/Auth/login", data);
  
  // The response usually contains a token and user info
  // We return it so it can be stored in AuthContext
  return response.data;
};

// ✅ Register API
export const registerUser = async (data: RegisterPayload) => {
  const response = await apiClient.post("/Auth/register", data);

  // The response usually contains only a message like "User registered successfully"
  return response.data;
};

// ✅ Optional Logout
export const logoutUser = async () => {
  // If a logout API exists in the future, we can call it here
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
