import { userApi } from "../setup/userBaseApi";
const walletApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    walletCreateOrder: builder.mutation({
      query: (data) => ({
        url: "/wallet/create-order",
        method: "post",
        body: data,
      }),
    }),
    walletAddVerify: builder.mutation({
      query: (data) => ({
        url: "/wallet/add",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Wallet"],
    }),
    getWallet: builder.query({
      query: () => ({
        url: "/wallet/",
        method: "get",
      }),
      providesTags: ["Wallet"],
    }),
    getWalletTransactions: builder.query({
      query: (params) => ({
        url: "/wallet/transactions",
        method: "get",
        params,
      }),
      providesTags: ["Wallet"],
    }),
  }),
});

export const {
  useWalletAddVerifyMutation,
  useWalletCreateOrderMutation,
  useGetWalletQuery,
  useGetWalletTransactionsQuery,
} = walletApi;
