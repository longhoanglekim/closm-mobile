const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const getOrderInfo = async (orderId: number) => {
    const response = await fetch(`${apiUrl}/order/${orderId}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Lỗi khi lấy thông tin đơn hàng");
    }
    return response.json();
    }
    