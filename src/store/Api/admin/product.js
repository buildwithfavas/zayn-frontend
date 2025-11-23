import { adminApi } from "../setup/AdminBaseApi";

export const adminProductApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    productAdd: builder.mutation({
      query: (data) => ({
        url: "/products/",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getProducts: builder.query({
      query: (params) => ({
        url: `/products/`,
        params: params,
      }),
      providesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/products/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    unlistProduct: builder.mutation({
      query: (id) => ({
        url: `/products/unlist/${id}`,
        method: "patch",
      }),
      invalidatesTags: ["Product", "ProductById"],
    }),
    getVariants: builder.query({
      query: ({ id, params }) => ({
        url: `/products/variants/${id}`,
        method: "get",
        params,
      }),
      providesTags: ["Variants"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "get",
      }),
      providesTags: ["ProductById"],
    }),
    unlistVariant: builder.mutation({
      query: (id) => ({
        url: `/products/variants/unlist/${id}`,
        method: "patch",
      }),
      invalidatesTags: ["Variants", "ProductById"],
    }),
    editVariant: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/variants/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: ["Variants"],
    }),
    addVariant: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/variants/${id}`,
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Variants"],
    }),
    getSearchSuggestions: builder.query({
      query: (params) => ({
        url: "/products/search/suggestions",
        params,
      }),
    }),
    getPopularProducts: builder.query({
      query: (params) => ({
        url: "/products/popular",
        method: "get",
        params,
      }),
    }),
  }),
});

export const {
  useProductAddMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useUnlistProductMutation,
  useGetVariantsQuery,
  useGetProductByIdQuery,
  useUnlistVariantMutation,
  useEditVariantMutation,
  useAddVariantMutation,
  useGetSearchSuggestionsQuery,
  useGetPopularProductsQuery,
} = adminProductApi;
