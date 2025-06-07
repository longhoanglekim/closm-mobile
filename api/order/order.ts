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
    
export const getAllOrders = async (token: string) => {
    console.log("TOKEN GỬI LÊN:", token);
    const res = await fetch(`${apiUrl}/order/get-all-orders`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    });
    console.log("RES STATUS", res.status);
    const text = await res.text();
    if (!res.ok) {
        throw new Error("Lỗi khi lấy danh sách đơn hàng");
    }
    return JSON.parse(text);
};


export const updateOrder = async (
  id: number | string,
  updateOrderInfoDTO: any,
  token: string
) => {
  // Gọi fetch với method PUT
  const response = await fetch(`${apiUrl}/order/update-order/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateOrderInfoDTO),
  });

  // Đọc toàn bộ body dưới dạng text (chỉ gọi một lần)
  const text = await response.text();
  console.log(">> updateOrder response status:", response.status);
  console.log(">> updateOrder response body:", text);

  // Cố gắng parse phần text thành JSON, nếu không parse được thì parsed = null
  let parsed: any = null;
  try {
    parsed = text.length ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }

  // Nếu response không OK (status >= 400), ném exception với message từ parsed (nếu có)
  if (!response.ok) {
    let errorMsg = `HTTP ${response.status}`;
    if (parsed && typeof parsed === "object" && parsed.message) {
      errorMsg = parsed.message;
    }
    throw new Error(errorMsg);
  }

  // Nếu response OK, trả về object đã parse (hoặc null/nếu backend không trả body)
  return parsed;
};



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



