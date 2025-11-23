import { adminApi } from "../setup/AdminBaseApi";

const offerApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryOffers: builder.query({
      query: (params) => ({
        url: "/offers/category",
        method: "get",
        params,
      }),
      providesTags: ["Category_Offers"],
    }),
    addCategoryOffers: builder.mutation({
      query: (data) => ({
        url: "/offers/category",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Category_Offers"],
    }),
    toggleCategoryOfferStatus: builder.mutation({
      query: (id) => ({
        url: `/offers/category/status/${id}`,
        method: "patch",
      }),
      invalidatesTags: ["Category_Offers"],
    }),
    editCategoryOffer: builder.mutation({
      query: ({ id, data }) => ({
        url: `/offers/category/${id}`,
        method: "patch",
        body: data,
      }),
      invalidatesTags: ["Category_Offers"],
    }),
    getGlobalOffers: builder.query({
      query: (params) => ({
        url: "/offers/",
        method: "get",
        params,
      }),
      providesTags: ["Global_offer"],
    }),
    addGlobalOffers: builder.mutation({
      query: (data) => ({
        url: "/offers/",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Global_offer"],
    }),
    editGlobalOffer: builder.mutation({
      query: ({ id, data }) => ({
        url: `/offers/${id}`,
        method: "patch",
        body: data,
      }),
      invalidatesTags: ["Global_offer"],
    }),
    toggleGlobalOfferStatus: builder.mutation({
      query: (id) => ({
        url: `/offers/status/${id}`,
        method: "patch",
      }),
      invalidatesTags: ["Global_offer"],
    }),
    addProductOffer: builder.mutation({
      query: (data) => ({
        url: "/offers/product",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetCategoryOffersQuery,
  useAddCategoryOffersMutation,
  useToggleCategoryOfferStatusMutation,
  useEditCategoryOfferMutation,
  useGetGlobalOffersQuery,
  useAddGlobalOffersMutation,
  useToggleGlobalOfferStatusMutation,
  useEditGlobalOfferMutation,
  useAddProductOfferMutation,
} = offerApi;
