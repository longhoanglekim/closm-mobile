const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(apiUrl);

export interface VnPayResponse {
    code: string;
    message: string;
    paymentUrl: string;
}

export async function initiateVnPay(amount: number,bankCode?: string): Promise<string> {
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