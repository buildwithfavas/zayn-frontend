import { adminApi } from "../setup/AdminBaseApi";

export const adminCategoryApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    CategoryAdd: builder.mutation({
      query: (data) => ({
        url: "/category/",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    getCategoriesByLevel: builder.query({
      query: ({ level, page = 1, perPage = 10, search = "", filter = "all" }) => ({
        url: `/category/${level}`,
        method: "get",
        params: { page, perPage, search, filter },
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 0, // Don't cache data, always fetch fresh
      refetchOnMountOrArgChange: true, // Always refetch when component mounts or args change
    }),
    getAllCategories: builder.query({
      query: (params) => ({
        url: `/category/`,
        method: "get",
        params,
      }),
      providesTags: ["Category"],
    }),
    blockCategory: builder.mutation({
      query: (id) => ({
        url: `/category/block/${id}`,
        method: "patch",
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Category"],
    }),
    editCategory: builder.mutation({
      query: (data) => ({
        url: `/category/edit/${data.id}`,
        method: "patch",
        body: data.data,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCategoryAddMutation,
  useGetAllCategoriesQuery,
  useBlockCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesByLevelQuery,
} = adminCategoryApi;
