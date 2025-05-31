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
    
export const getAllOrders = async (token: any) => {
    const response = await fetch(`${apiUrl}/order/get-all-orders`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Lỗi khi lấy danh sách đơn hàng");
    }
    return response.json();
}

export const updateOrder = async (id:any, updateOrderInfoDTO:any, token:any) => {
    const response = await fetch(`${apiUrl}/order/update-order/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updateOrderInfoDTO),
    });
    if (!response.ok) {
        throw new Error("Lỗi khi cập nhật đơn hàng");
    }
    return response.json();
}


export const deleteOrder = async (id:any, token:any) => {
    const response = await fetch(`${apiUrl}/order/delete-order/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Lỗi khi xóa đơn hàng");
    }
    return response.json();
}



