import { userApi } from "../setup/userBaseApi";

export const addressApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (data) => ({
        url: "/address/",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Addresses"],
    }),
    getAddresses: builder.query({
      query: () => ({
        url: "/address",
        method: "get",
      }),
      providesTags: ["Addresses"],
    }),
    editAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/address/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: ["Addresses"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/address/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Addresses"],
    }),
  }),
});

export const {
  useAddAddressMutation,
  useGetAddressesQuery,
  useEditAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
