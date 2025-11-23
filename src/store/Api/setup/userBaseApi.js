import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBase";
import userInstance from "./Instances/userInstance";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/api/user",
    instance: userInstance,
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
  tagTypes: [
    "Auth",
    "Addresses",
    "Cart",
    "Users",
    "Orders",
    "Order",
    "wishlist",
    "Coupons",
    "Wallet",
  ],
});
