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

export const getOrderList = async (email: string) => {
    console.log("Calling API with email:", email);
    const response = await fetch(`${apiUrl}/user/orderList?userEmail=${email}`);
    
    if (!response.ok) {
      throw new Error("Lỗi khi lấy thông tin người dùng");
    }
    
    const data = await response.json();
    console.log("Successfully fetched user orders info:");
    return data;
  }

export const cancelOrder = async (orderId: number) => {
    console.log("Calling API with orderId:", orderId);
    const response = await fetch(`${apiUrl}/user/cancel-order?orderId=${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error("Lỗi khi hủy đơn hàng");
    }
    
    const data = await response.json();
    console.log("Successfully canceled order:", data);
    return data;
  }