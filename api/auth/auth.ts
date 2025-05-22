
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const login = async (email : string, password : string) => {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  });
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};

export const register = async (fullName : string, email : string, password : string, phone : string) => {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({'fullName' : fullName, 'email' : email, 'password' : password, 'phone' : phone}), 
  });
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};

export const loginAdmin = async (email: string, password: string) => {
  const response = await fetch(`${apiUrl}/auth/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { token: null, error: data.error || "Login failed" };
  }

  return data; 
};