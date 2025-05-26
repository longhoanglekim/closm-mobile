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
export const getLocationFromAddress = async (address: string) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`
    );
    const data = await response.json();
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    }
    throw new Error('Location not found');
  } catch (error) {
    console.error('Error getting location:', error);
    throw error;
  }
};

export const calculateDistance = async (
  srcCoords: [number, number],
  dstCoords: [number, number]
) => {
  try {
    const response = await fetch(
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
    const data = await response.json();
    return data.features[0].properties.segments[0].distance;
  } catch (error) {
    console.error('Error calculating distance:', error);
    throw error;
  }
};


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