import { useState, useEffect } from "react";
import { getLocationFromAddress, calculateDistance } from '@/api/products/products';
import { getAvailableDiscounts } from '@/api/products/products';
import { router } from "expo-router";

export const useCheckoutLogic = (cartItems, user, userAddress, shippingCost) => {
  const [distance, setDistance] = useState(0);
  const [availableDiscounts, setAvailableDiscounts] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);

  // Fetch available discounts when component mounts
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
  const calculateDeliveryFee = async (shopAddress: string, userAddress: string) => {
    try {
      const shopLocation = await getLocationFromAddress(shopAddress);
      console.log('Shop Location:', shopLocation);
      console.log('User Address:', userAddress);
      const userLocation = await getLocationFromAddress(userAddress);
      
      const distanceInMeters = await calculateDistance(
        [shopLocation.lon, shopLocation.lat],
        [userLocation.lon, userLocation.lat]
      );
      
      const distanceInKm = distanceInMeters / 1000;
      setDistance(distanceInKm);
      
      // Calculate delivery fee based on distance
      const baseFee = 15000; // Base delivery fee in VND
      const perKmFee = 5000; // Additional fee per km in VND
      const calculatedFee = baseFee + (distanceInKm * perKmFee);
      setDeliveryFee(calculatedFee);
    } catch (error) {
      console.error('Error calculating delivery fee:', error);
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
    if (selectedDiscounts.includes(discount)) {
      setSelectedDiscounts(selectedDiscounts.filter(d => d.id !== discount.id));
    } else {
      setSelectedDiscounts([...selectedDiscounts, discount]);
    }
  };

  // Handle order submission
  const handleSubmitOrder = async () => {
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

      // Call your API to submit the order
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      // Handle successful order
      alert('Đơn hàng đã được đặt thành công!');
      router.push('/');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
    }
  };

  // Call this when you need to update delivery fee
  useEffect(() => {
    if (userAddress) {
      const shopAddress = "123 Shop Address"; // Replace with actual shop address
      calculateDeliveryFee(shopAddress, userAddress);
    }
  }, [userAddress]);

  return {
    distance,
    availableDiscounts,
    selectedDiscounts,
    deliveryFee,
    calculateSubtotal,
    calculateTotal,
    calculateFinalPrice,
    handleSubmitOrder,
    handleSelectDiscount
  };
};