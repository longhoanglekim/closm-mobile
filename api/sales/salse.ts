const apiUrl = process.env.EXPO_PUBLIC_API_URL;
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