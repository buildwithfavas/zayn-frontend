import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./StoreSlices/uiSlice";
import userAuthSlice from "./StoreSlices/userAuthSlice";
import adminAuthSlice from "./StoreSlices/adminAuthSlice";
import { userApi } from "./Api/setup/userBaseApi";
import { adminApi } from "./Api/setup/AdminBaseApi";
import cartReducer from "./StoreSlices/cartSlice";
import orderReducer from "./StoreSlices/orderSlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const orderPersistConfig = {
  key: "order-v2",
  storage,
};

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    ui: uiReducer,
    userAuth: userAuthSlice,
    adminAuth: adminAuthSlice,
    cart: cartReducer,
    orderItems: persistReducer(orderPersistConfig, orderReducer),
  },
  middleware: (getDefault) => [
    ...getDefault(),
    userApi.middleware,
    adminApi.middleware,
  ],
});

export const persistor = persistStore(store);
