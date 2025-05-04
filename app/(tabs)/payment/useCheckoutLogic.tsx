import { useState, useEffect } from "react";
import { getLocationFromAddress, calculateDistance, getAvailableDiscounts, confirmOrder } from '@/api/products/products';
import { router } from "expo-router";
type CartItem = {
  id: number;
  price: number;
  quantity: number;
};


type OrderConfirmationDTO = {
  userEmail: string;
  address: string;
  itemIdsMap: Record<number, number>;
  discountIds: number[];
  summaryOrderPrice: {
    itemsTotalPrice: number;
    discountAmount: number;
    deliveryAmount: number;
    finalPrice: number;
  };
  // paymentStatus: string;
};
type Discount = {
  id: number;
  description: string;
  discountPercentage: number;
  discountType: string;
  startDate: string;
  endDate: string;
};

export const useCheckoutLogic = (
  cartItems: CartItem[],
  user: { email: string } | null,
  userAddress: string,
  shippingCost: number
) => {
  const [distance, setDistance] = useState<number>(0);
  const [availableDiscounts, setAvailableDiscounts] = useState<Discount[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<Discount[]>([]);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState<boolean>(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);


  // Fetch available discounts when component mounts or user changes
  useEffect(() => {
    const fetchDiscounts = async () => {
      if (user?.email) {
        try {
          const discounts = await getAvailableDiscounts();
          setAvailableDiscounts(discounts);
        } catch (error) {
          console.error('Error fetching discounts:', error);
        }
      }
    };
    fetchDiscounts();
  }, [user?.email]);

  // Calculate delivery fee based on distance
  const calculateDeliveryFee = async (shopAddress: any, userAddress: any) => {
    if (!shopAddress || !userAddress) {
      console.log('Missing address information');
      setCalculationError('Vui lòng cung cấp đầy đủ địa chỉ.');
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
        throw new Error('Không thể tìm thấy tọa độ cho một hoặc cả hai địa chỉ.');
      }

      // Calculate distance between coordinates
      const distanceInMeters = await calculateDistance(
        [shopLocation.lon, shopLocation.lat],
        [userLocation.lon, userLocation.lat]
      );

      const distanceInKm = distanceInMeters / 1000;
      setDistance(distanceInKm);

      // Calculate delivery fee based on distance
      const baseFee = 15000;
      const perKmFee = 5000;
      const calculatedFee = Math.round(baseFee + (distanceInKm * perKmFee));
      setDeliveryFee(calculatedFee);

      console.log(`Distance: ${distanceInKm.toFixed(2)}km, Delivery Fee: ${calculatedFee}đ`);
    } catch (error) {
      console.error('Error calculating delivery fee:', error);
      setCalculationError('Không thể tính khoảng cách giao hàng. Vui lòng kiểm tra lại địa chỉ.');
    } finally {
      setIsCalculatingDistance(false);
    }
  };

  // Calculate subtotal (sum of all items)
  const calculateSubtotal = () => {
    return cartItems.reduce((sum: any, item: any) => sum + item.price * item.quantity, 0);
  };
  const calculateDiscountAmount = (discount: Discount) => {
    const subtotal = calculateSubtotal();
    return Math.round((subtotal * discount.discountPercentage) / 100);
  };
  // Calculate total with shipping cost (for the older calculation)
  const calculateTotal = () => {
    return calculateSubtotal() + shippingCost;
  };

  // Calculate final price including discounts and delivery fee
  const calculateFinalPrice = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = selectedDiscounts.reduce(
      (sum, discount) =>
        sum + (subtotal * discount.discountPercentage) / 100,
      0
    );
    return subtotal + deliveryFee - discountAmount || 0;
  };

  // Handle discount selection/deselection
  const handleSelectDiscount = (discount: Discount) => {
    if (selectedDiscounts.some(d => d.id === discount.id)) {
      setSelectedDiscounts(selectedDiscounts.filter(d => d.id !== discount.id));
    } else {
      setSelectedDiscounts([...selectedDiscounts, discount]);
    }
  };
  // Handle order submission
  const handleSubmitOrder = async () => {
    if (!userAddress) {
      alert("Vui lòng thêm địa chỉ giao hàng trước khi đặt hàng.");
      return;
    }

    if (!user?.email) {
      alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      router.push("/(tabs)/profile/login");
      return;
    }

    const itemIdsMap: Record<number, number> = {};
    cartItems.forEach((item: CartItem) => {
      itemIdsMap[item.id] = item.quantity;
    });

    const orderData: OrderConfirmationDTO = {
      userEmail: user.email,
      address: userAddress,
      itemIdsMap: itemIdsMap,
      discountIds: selectedDiscounts.map((d) => d.id),
      summaryOrderPrice: {
        itemsTotalPrice: calculateSubtotal(),
        discountAmount: selectedDiscounts.reduce(
          (sum, discount) =>
            sum + (calculateSubtotal() * discount.discountPercentage) / 100,
          0
        ),
        deliveryAmount: deliveryFee,
        finalPrice: calculateFinalPrice(),
      },
    };

    console.log("orderData gửi lên:", JSON.stringify(orderData, null, 2));
    try {
      const result = await confirmOrder(orderData);
      alert(`Đơn hàng #${result.orderId} đã được xác nhận thành công!`);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error confirming order:", error.message);
        alert(`Có lỗi xảy ra khi đặt hàng: ${error.message}`);
      } else {
        console.error("Unknown error:", error);
        alert("Có lỗi không xác định xảy ra.");
      }
    }
  };

  const shopAddress = process.env.EXPO_PUBLIC_SHOP_LOCATION;

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
    handleSelectDiscount,
    calculateDiscountAmount
  };
};