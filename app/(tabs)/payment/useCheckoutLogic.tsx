import { useState, useEffect } from "react";
import { getLocationFromAddress, calculateDistance, getAvailableDiscounts } from '@/api/products/products';
import { router } from "expo-router";

export const useCheckoutLogic = (cartItems, user, userAddress, shippingCost) => {
  const [distance, setDistance] = useState(0);
  const [availableDiscounts, setAvailableDiscounts] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  const [calculationError, setCalculationError] = useState(null);

  // Fetch available discounts when component mounts or user changes
  useEffect(() => {
    const fetchDiscounts = async () => {
      if (user?.email) {
        try {
          const discounts = await getAvailableDiscounts(user.email);
          setAvailableDiscounts(discounts);
        } catch (error) {
          console.error('Error fetching discounts:', error);
        }
      }
    };
    fetchDiscounts();
  }, [user?.email]);

  // Calculate delivery fee based on distance
  const calculateDeliveryFee = async (shopAddress, userAddress) => {
    if (!shopAddress || !userAddress) {
      console.log('Missing address information');
      return;
    }
    
    setIsCalculatingDistance(true);
    setCalculationError(null);
    
    try {
      // Get coordinates for shop address
      const shopLocation = await getLocationFromAddress(shopAddress);
      console.log('Shop Location:', shopLocation);
      
      // Get coordinates for user address
      const userLocation = await getLocationFromAddress(userAddress);
      console.log('User Location:', userLocation);
      
      if (!shopLocation || !userLocation) {
        throw new Error('Could not find coordinates for one or both addresses');
      }
      
      // Calculate distance between coordinates
      const distanceInMeters = await calculateDistance(
        [shopLocation.lon, shopLocation.lat],
        [userLocation.lon, userLocation.lat]
      );
      
      const distanceInKm = distanceInMeters / 1000;
      setDistance(distanceInKm);
      
      // Calculate delivery fee based on distance
      const baseFee = 15000; // Base delivery fee in VND
      const perKmFee = 5000; // Additional fee per km in VND
      const calculatedFee = Math.round(baseFee + (distanceInKm * perKmFee));
      setDeliveryFee(calculatedFee);
      
      console.log(`Distance: ${distanceInKm.toFixed(2)}km, Delivery Fee: ${calculatedFee}đ`);
      
    } catch (error) {
      console.error('Error calculating delivery fee:', error);
      setCalculationError('Could not calculate delivery distance. Please check your address.');
    } finally {
      setIsCalculatingDistance(false);
    }
  };

  // Calculate subtotal (sum of all items)
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Calculate total with shipping cost (for the older calculation)
  const calculateTotal = () => {
    return calculateSubtotal() + shippingCost;
  };

  // Calculate final price including discounts and delivery fee
  const calculateFinalPrice = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = selectedDiscounts.reduce((sum, discount) => sum + discount.amount, 0);
    return subtotal + deliveryFee - discountAmount;
  };

  // Handle discount selection/deselection
  const handleSelectDiscount = (discount) => {
    if (selectedDiscounts.some(d => d.id === discount.id)) {
      setSelectedDiscounts(selectedDiscounts.filter(d => d.id !== discount.id));
    } else {
      setSelectedDiscounts([...selectedDiscounts, discount]);
    }
  };

  // Handle order submission
  const handleSubmitOrder = async () => {
    if (!userAddress) {
      alert('Vui lòng thêm địa chỉ giao hàng trước khi đặt hàng.');
      return;
    }
    
    try {
      const orderData = {
        userEmail: user.email,
        address: userAddress,
        itemIdsMap: cartItems.reduce((map, item) => {
          map[item.id] = item.quantity;
          return map;
        }, {}),
        discountIds: selectedDiscounts.map(d => d.id),
        summaryOrderPrice: {
          itemsTotalPrice: calculateSubtotal(),
          discountAmount: selectedDiscounts.reduce((sum, d) => sum + d.amount, 0),
          deliveryAmount: deliveryFee,
          finalPrice: calculateFinalPrice()
        }
      };

      console.log('Sending order data:', orderData);

      // Call your API to submit the order
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit order');
      }

      // Handle successful order
      alert('Đơn hàng đã được đặt thành công!');
      router.push('/');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert(`Có lỗi xảy ra khi đặt hàng: ${error.message}. Vui lòng thử lại!`);
    }
  };
  const shopAddress = process.env.EXPO_PUBLIC_SHOP_LOCATION
  // Update delivery fee when user address changes
  useEffect(() => {
    if (userAddress) {
      calculateDeliveryFee(shopAddress, userAddress);
    }
  }, [userAddress]);

  return {
    distance,
    availableDiscounts,
    selectedDiscounts,
    deliveryFee,
    isCalculatingDistance,
    calculationError,
    calculateSubtotal,
    calculateTotal,
    calculateFinalPrice,
    handleSubmitOrder,
    handleSelectDiscount
  };
};