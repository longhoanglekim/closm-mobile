const apiUrl = process.env.EXPO_PUBLIC_API_URL;
console.log(apiUrl);


type VnPayResponse = {
    code: string;
    message: string;
    paymentUrl: string;
};

export async function initiateVnPay(amount: number, orderId: number, bankCode?: string): Promise<string> {
  const params = new URLSearchParams({
    amount: amount.toString(),
    txnRef: orderId.toString(),
  });

  if (bankCode) {
    params.append('bankCode', bankCode);
  }

  const res = await fetch(`${apiUrl}/api/v1/payment/vn-pay?${params.toString()}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error(`Server responded with status ${res.status}`);
  }

  const json = (await res.json()) as { data: VnPayResponse };

  if (!json.data?.paymentUrl) {
    throw new Error("paymentUrl không tồn tại trong phản hồi");
  }

  return json.data.paymentUrl;
}

export const updateOrderPaymentStatus = async (
    orderId: string,
    status: "PAID" | "FAILED" | "PENDING" | "UNPAID",
    token: string
) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/order/${orderId}/update-payment-status`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,  
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Cập nhật trạng thái thanh toán thất bại");
    }

    return await response.json();
};
