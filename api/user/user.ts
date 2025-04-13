const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const getUserInfo = async (email : string) => {
    const response = await fetch(`${apiUrl}/user/info?email=${email}`);
    
    if (!response.ok) {
        throw new Error("Lỗi khi lấy thông tin người dùng");
    }
    
    const data = await response.json();
    console.log("Successfully fetched user info:");
    return data;
}