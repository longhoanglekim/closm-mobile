import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationAsync";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  size: string;
  price: number;
  color: string;
  imageUrl?: string;
}

interface ContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
  variantList: any[];
  setVariantList: React.Dispatch<React.SetStateAction<any[]>>;
  // Cart related state and functions
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: string, color: string) => void;
  updateQuantity: (id: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
}

const StateContext = createContext<ContextType | undefined>(undefined);

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      "useStateContext must be used within a StateProvider"
    );
  }
  return context;
};

interface StateProviderProps {
  children: ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = 
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [variantList, setVariantList] = useState<any[]>([]); // Đã đầy đủ
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  // Load cart items from AsyncStorage when the component mounts
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('cartItems');
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.error('Failed to load cart items from storage', error);
      }
    };

    loadCartItems();
  }, []);

  // Save cart items to AsyncStorage whenever they change
  useEffect(() => {
    const saveCartItems = async () => {
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Failed to save cart items to storage', error);
      }
    };

    saveCartItems();
  }, [cartItems]);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? null)) // Nếu token là undefined, gán null
      .catch((error) => setError(error));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("🔔 Notification Received: ", notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          "🔔 Notification Response: ",
          JSON.stringify(response, null, 2),
          JSON.stringify(response.notification.request.content.data, null, 2)
        );
        // Handle the notification response here
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  // Cart operations
  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(i => 
        i.id === item.id && i.size === item.size && i.color === item.color
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, item];
      }
    });
  };
  
  const removeFromCart = (id: number, size: string, color: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === id && item.size === size && item.color === color)
      )
    );
  };
  
  const updateQuantity = (id: number, size: string, color: string, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.id === id && item.size === size && item.color === color) 
          ? {...item, quantity} 
          : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <StateContext.Provider
      value={{
        expoPushToken,
        notification,
        error,
        variantList,
        setVariantList,
        // Cart functionality
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </StateContext.Provider>
  );
};