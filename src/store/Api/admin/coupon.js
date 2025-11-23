import { adminApi } from "../setup/AdminBaseApi";

const couponApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    addCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupon/",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
    getCoupons: builder.query({
      query: (params) => ({
        url: "/coupon/",
        method: "get",
        params,
      }),
      providesTags: ["Coupon"],
    }),
    editCoupon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/coupon/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
    toggleCouponStatus: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "patch",
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useAddCouponMutation,
  useGetCouponsQuery,
  useEditCouponMutation,
  useToggleCouponStatusMutation,
} = couponApi;
