import { useState, useEffect } from "react";
import {
  getLocationFromAddress,
  calculateDistance,
  confirmOrder,
} from "@/api/products/products";
import { getAvailableDiscounts } from "@/api/sales/salse";
import { router } from "expo-router";
type CartItem = {
  id: number;
  price: number;
  quantity: number;
};
type PaymentMethod =
  | "CASH"
  | "BANK_TRANSFER"
  | "CREDIT_CARD"
  | "MOMO"
  | "VNPAY";
type PaymentStatus = "PAID" | "UNPAID" | "REFUNDED" | "PREPAID";

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
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
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
  shippingCost: number,
  selectedPaymentMethod: string
) => {
  const [distance, setDistance] = useState<number>(0);
  const [availableDiscounts, setAvailableDiscounts] = useState<Discount[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<Discount[]>([]);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [deliveryMethod, selectedDeliveryMethod] = useState<number>(0);
  const [isCalculatingDistance, setIsCalculatingDistance] =
    useState<boolean>(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // Fetch available discounts when component mounts or user changes
  useEffect(() => {
    const fetchDiscounts = async () => {
      if (user?.email) {
        try {
          const discounts = await getAvailableDiscounts();
          setAvailableDiscounts(discounts);
        } catch (error) {
          console.error("Error fetching discounts:", error);
        }
      }
    };
    fetchDiscounts();
  }, [user?.email]);

  // Calculate delivery fee based on distance
  const calculateDeliveryFee = async (shopAddress: any, userAddress: any) => {
    if (!shopAddress || !userAddress) {
      console.log("Missing address information");
      setCalculationError("Vui lòng cung cấp đầy đủ địa chỉ.");
      return;
    }

    setIsCalculatingDistance(true);
    setCalculationError(null);

    try {
      // Get coordinates for shop address
      const shopLocationArr = await getLocationFromAddress(shopAddress);
      console.log("Shop Location:", shopLocationArr);

      // Get coordinates for user address
      const userLocationArr = await getLocationFromAddress(userAddress);
      console.log("User Location:", userLocationArr);

      const shopLocation = Array.isArray(shopLocationArr) && shopLocationArr.length > 0 ? shopLocationArr[0] : null;
      const userLocation = Array.isArray(userLocationArr) && userLocationArr.length > 0 ? userLocationArr[0] : null;

      if (!shopLocation || !userLocation) {
        console.error("Không tìm thấy tọa độ:", { shopLocationArr, userLocationArr });
        throw new Error(
          "Không thể tìm thấy tọa độ cho một hoặc cả hai địa chỉ."
        );
      }
      if (!shopLocation.lon || !shopLocation.lat || !userLocation.lon || !userLocation.lat) {
        console.error("Thiếu trường lat/lon:", { shopLocation, userLocation });
        throw new Error("Thiếu thông tin tọa độ lat/lon.");
      }

      // Ép kiểu về số và truyền đúng thứ tự [lon, lat]
      const shopCoords = [parseFloat(shopLocation.lon), parseFloat(shopLocation.lat)];
      const userCoords = [parseFloat(userLocation.lon), parseFloat(userLocation.lat)];
      // Calculate distance between coordinates
      const distanceInMeters = await calculateDistance(
        shopCoords,
        userCoords
      );

      const distanceInKm = distanceInMeters / 1000;
      setDistance(distanceInKm);

      // Calculate delivery fee based on distance
      const baseFee = 15000;
      const perKmFee = 5000;
      const calculatedFee = Math.round(baseFee + distanceInKm * perKmFee);
      setDeliveryFee(calculatedFee);

      console.log(
        `Distance: ${distanceInKm.toFixed(
          2
        )}km, Delivery Fee: ${calculatedFee}đ`
      );
    } catch (error) {
      console.error("Error calculating delivery fee:", error);
      setCalculationError(
        "Không thể tính khoảng cách giao hàng. Vui lòng kiểm tra lại địa chỉ."
      );
    } finally {
      setIsCalculatingDistance(false);
    }
  };

  // Calculate subtotal (sum of all items)
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum: any, item: any) => sum + item.price * item.quantity,
      0
    );
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
      (sum, discount) => sum + calculateDiscountAmount(discount),
      0
    );
    return subtotal + deliveryFee + shippingCost - discountAmount || 0;
  };

  // Handle discount selection/deselection
  const handleSelectDiscount = (discount: Discount) => {
    if (selectedDiscounts.some((d) => d.id === discount.id)) {
      setSelectedDiscounts(
        selectedDiscounts.filter((d) => d.id !== discount.id)
      );
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

    const itemIdsMap: Record<string, number> = {};
    cartItems.forEach((item: CartItem) => {
      itemIdsMap[item.id.toString()] = item.quantity;
    });
    console.log("Item IDs Map:", itemIdsMap);

    const orderData: OrderConfirmationDTO = {
      userEmail: user.email,
      address: userAddress,
      itemIdsMap,
      discountIds: selectedDiscounts.map((d) => d.id),
      summaryOrderPrice: {
        itemsTotalPrice: calculateSubtotal(),
        discountAmount: selectedDiscounts.reduce(
          (sum, discount) => sum + calculateDiscountAmount(discount),
          0
        ),
        deliveryAmount: deliveryFee,
        finalPrice: calculateFinalPrice(),
      },
      paymentMethod:
        selectedPaymentMethod === "online" ? "BANK_TRANSFER" : "CASH",
      paymentStatus: selectedPaymentMethod === "online" ? "PAID" : "UNPAID",
    };

    console.log("===== ORDER DATA GỬI LÊN =====");
    console.log(JSON.stringify(orderData, null, 2));
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
    deliveryMethod,
    isCalculatingDistance,
    calculationError,
    calculateSubtotal,
    calculateTotal,
    calculateFinalPrice,
    handleSubmitOrder,
    handleSelectDiscount,
    calculateDiscountAmount,
  };
};
