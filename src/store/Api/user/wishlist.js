import { userApi } from "../setup/userBaseApi";

const wishlistApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist/",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    getWishlist: builder.query({
      query: () => ({
        url: "/wishlist/",
        method: "get",
      }),
      providesTags: ["wishlist"],
    }),
    removeFromWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} = wishlistApi;
