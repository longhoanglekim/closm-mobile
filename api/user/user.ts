const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const getUserInfo = async (email: string) => {
    console.log("Calling API with email:", email);
    const response = await fetch(`${apiUrl}/user/info?email=${email}`);
    
    if (!response.ok) {
      throw new Error("Lỗi khi lấy thông tin người dùng");
    }
    
    const data = await response.json();
    console.log("Successfully fetched user info:", data);
    return data;
  };