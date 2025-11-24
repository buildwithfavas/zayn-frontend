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
      query: ({ level, params = "" }) => ({
        url: `/category/${level}`,
        method: "get",
        params,
      }),
      providesTags: ["Category"],
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
