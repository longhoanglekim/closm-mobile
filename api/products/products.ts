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
  const response = await fetch(`${apiUrl}/variants?variantName=${encodeURIComponent(name)}`);
  console.log(`${apiUrl}/variants?variantName=${name}`);

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


export const getAvailableDiscounts = async () => {
  try {
    const response = await fetch(`${apiUrl}/discounts/validateList`);
    if (!response.ok) {
      throw new Error('Failed to fetch discounts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching discounts:', error);
    throw error;
  }
};
