import { adminApi } from "../setup/AdminBaseApi";

export const adminAuthApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    AdminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "post",
        body: data,
      }),
    }),
    adminAuthMe: builder.query({
      query: () => ({
        url: "/auth",
        method: "get",
      }),
      providesTags: ["Auth"],
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "get",
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminAuthMeQuery,
  useAdminLogoutMutation,
} = adminAuthApi;
