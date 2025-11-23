import { adminApi } from "../setup/AdminBaseApi";

export const userManagementApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: "/users/",
        method: "get",
        params,
      }),
      providesTags: ["Users"],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/users/block/${id}`,
        method: "post",
      }),
      invalidatesTags: ["Users"],
    }),
    getUsersChartData: builder.query({
      query: (params) => ({
        url: `/users/chart`,
        method: "get",
        params,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useBlockUserMutation,
  useGetUsersChartDataQuery,
} = userManagementApi;
