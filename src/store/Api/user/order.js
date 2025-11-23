import { userApi } from "../setup/userBaseApi";

const orderApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Orders", "Cart", "wishlist"],
    }),
    getOrders: builder.query({
      query: (params) => ({
        url: "/orders",
        method: "get",
        params,
      }),
      providesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "get",
      }),
      providesTags: ["Order"],
    }),
    cancelOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/cancel/${id}`,
        method: "patch",
        body: data,
      }),
      invalidatesTags: ["Orders", "Order", "Wallet"],
    }),
    returnOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/return/${id}`,
        method: "patch",
        body: data,
      }),
      invalidatesTags: ["Orders", "Order", "Wallet"],
    }),
    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}/review`,
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    getReviews: builder.query({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "get",
      }),
    }),
    razorPayCreateOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/razorpay/create-order",
        method: "post",
        body: data,
      }),
    }),
    razorpayVerify: builder.mutation({
      query: (data) => ({
        url: "/orders/razorpay/verify",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Orders", "Cart", "wishlist"],
    }),
    orderWithWallet: builder.mutation({
      query: (data) => ({
        url: "/orders/wallet",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Orders", "Cart", "wishlist"],
    }),
    getFailedOrder: builder.query({
      query: (id) => ({
        url: `/orders/failed/${id}`,
        method: "get",
      }),
    }),
    retryFiledOrderWithCod: builder.mutation({
      query: (data) => ({
        url: "/orders/failed/retry",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Orders", "Order"],
    }),
    retryFiledOrderWithRazorpay: builder.mutation({
      query: (data) => ({
        url: "/orders/failed/retry/razorpay",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Order", "Orders"],
    }),
    retryFiledOrderWithWallet: builder.mutation({
      query: (data) => ({
        url: "/orders/failed/retry/wallet",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Orders", "Order"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useReturnOrderMutation,
  useAddReviewMutation,
  useGetReviewsQuery,
  useRazorPayCreateOrderMutation,
  useRazorpayVerifyMutation,
  useOrderWithWalletMutation,
  useGetFailedOrderQuery,
  useRetryFiledOrderWithCodMutation,
  useRetryFiledOrderWithRazorpayMutation,
  useRetryFiledOrderWithWalletMutation,
} = orderApi;
