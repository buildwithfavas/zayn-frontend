import { userApi } from "../setup/userBaseApi";

const couponApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getCouponsForUser: builder.query({
      query: (params) => ({
        url: "/coupon/",
        method: "get",
        params,
      }),
      providesTags: ["Coupons"],
    }),
    applyCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupon/apply",
        method: "post",
        body: data,
      }),
    }),
    removeAppliedCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupon/remove",
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCouponsForUserQuery,
  useApplyCouponMutation,
  useRemoveAppliedCouponMutation,
} = couponApi;
