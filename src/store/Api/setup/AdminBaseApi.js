import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBase";
import adminInstance from "./Instances/adminInstance";
export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8000/api/admin",
    instance: adminInstance,
  }),
  endpoints: () => ({}),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: [
    "Auth",
    "Product",
    "ProductById",
    "Variants",
    "Category",
    "Size",
    "Cart",
    "Orders",
    "Users",
    "HomeSlides",
    "OrderItems",
    "OrdersByItems",
    "OrderItem",
    "ReturnRequests",
    "Category_Offers",
    "Global_offer",
    "Coupon",
    "Report",
    "TopProducts",
    "TopCategories",
    "TopBrands",
  ],
});
