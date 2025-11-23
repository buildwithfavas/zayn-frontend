import { adminApi } from "../setup/AdminBaseApi";

export const sizeApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    addSize: builder.mutation({
      query: (data) => ({
        url: "/size/",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Size"],
    }),
    getSizes: builder.query({
      query: () => ({
        url: "/size/",
        method: "get",
      }),
      providesTags: ["Size"],
    }),
    blockSize: builder.mutation({
      query: (id) => ({
        url: `/size/block/${id}`,
        method: "post",
      }),
      invalidatesTags: ["Size"],
    }),
    editSize: builder.mutation({
      query: (id) => ({
        url: `/size/edit/${id}`,
        method: "post",
      }),
      invalidatesTags: ["Size"],
    }),
  }),
});

export const {
  useAddSizeMutation,
  useGetSizesQuery,
  useBlockSizeMutation,
  useEditSizeMutation,
} = sizeApi;
