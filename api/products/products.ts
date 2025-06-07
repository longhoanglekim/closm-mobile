const apiUrl = process.env.EXPO_PUBLIC_API_URL;
console.log(apiUrl);

export const getCategories = async () => {
  const response = await fetch(`${apiUrl}/products/categories`);

  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};

export const getProductOverview = async () => {

  const response = await fetch(`${apiUrl}/products/overview`);
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};


export const getProductDetails = async () => {
  const response = await fetch(`${apiUrl}/products/details`);

  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};


export const getVariantListByName = async (name: string) => {
  const response = await fetch(`${apiUrl}/items?variantName=${encodeURIComponent(name)}`);
  console.log(`${apiUrl}/products/items?category=${encodeURIComponent(name)}`);

  if (!response.ok) {
    throw new Error("Lỗi khi lấy tag sản phẩm");
  }

  const data = await response.json();

  console.log("Successfully fetched tag variants:");
  return data;
};



//new
export async function getLocationFromAddress(address: any) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`,
    {
      headers: {
        'User-Agent': 'Closm Mobile App',
        'Referer': 'https://closm.com',
      }
    }
  );
  const contentType = res.headers.get('content-type');
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Không thể lấy địa chỉ: ${res.status} ${res.statusText} - ${errorText}`);
  }
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  } else {
    const text = await res.text();
    throw new Error('API không trả về JSON: ' + text);
  }
}

export async function calculateDistance(srcCoords: any, dstCoords: any) {
  const res = await fetch(
    'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '5b3ce3597851110001cf62485935227e9443429ab33ea720c8b05f6c',
      },
      body: JSON.stringify({
        coordinates: [srcCoords, dstCoords],
      }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error('Không thể tính khoảng cách: ' + text);
  }
  const data = await res.json();
  return data.features[0].properties.segments[0].distance;
}


// submit order
export const confirmOrder = async (orderData: any) => {
  try {
    const response = await fetch(`${apiUrl}/order/confirm-order`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Lỗi khi xác nhận đơn hàng');
    }

    return await response.json();
  } catch (error) {
    console.error('Error confirming order:', error);
    throw error;
  }
};
export const getTopItems = async () => {
  try {
    const response = await fetch(`${apiUrl}/items/top-items`);
    if (!response.ok) {
      throw new Error('Failed to fetch top items');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching top items:', error);
    throw error;
  }
}

export async function getProvinces() {
  const res = await fetch(`${apiUrl}/p/`);
  const contentType = res.headers.get('content-type');
  if (!res.ok) throw new Error("Không thể lấy danh sách tỉnh thành");
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  } else {
    const text = await res.text();
    throw new Error('API không trả về JSON: ' + text);
  }
}

export const getOrderDetails = async (orderId: string) => {
  try {
    const response = await fetch(`${apiUrl}/order/${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};