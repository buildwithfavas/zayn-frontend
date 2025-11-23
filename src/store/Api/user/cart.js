import { userApi } from "../setup/userBaseApi";

const cartApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Cart", "wishlist"],
    }),
    getCartItems: builder.query({
      query: () => ({
        url: "/cart/",
        method: "get",
      }),
      providesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Cart"],
    }),
    editItemQuantity: builder.mutation({
      query: ({ id, params }) => ({
        url: `/cart/${id}`,
        method: "patch",
        params,
      }),
      invalidatesTags: ["Cart"],
    }),
    validateProduct: builder.mutation({
      query: (body) => ({
        url: "/cart/validate",
        method: "post",
        body,
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useEditItemQuantityMutation,
  useGetCartItemsQuery,
  useValidateProductMutation,
} = cartApi;
