const apiUrl = process.env.EXPO_PUBLIC_API_URL;
console.log(apiUrl);

export interface VnPayResponse {
    code: string;
    message: string;
    paymentUrl: string;
}

export async function initiateVnPay(amount: number, bankCode?: string): Promise<string> {
    const params = new URLSearchParams({
        amount: amount.toString(),
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
    return json.data.paymentUrl;
}

export const updateOrderPaymentStatus = async (
    orderId: string,
    status: "PAID" | "FAILED" | "PENDING" | "UNPAID"
) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/order/${orderId}/update-payment-status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
    });

    if (!response.ok) {
        throw new Error("Cập nhật trạng thái thanh toán thất bại");
    }

    return await response.json();
};
