import { userApi } from "../setup/userBaseApi";

export const userAuthApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "post",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/verify",
        method: "post",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/resend",
        method: "post",
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    forgotPassEmail: builder.mutation({
      query: (data) => ({
        url: "/password/forgot",
        method: "post",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/password/reset",
        method: "patch",
        body: data,
      }),
    }),
    authMe: builder.query({
      query: () => ({
        url: "/auth",
        method: "get",
      }),
      providesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "get",
      }),
      invalidatesTags: ["Auth"],
    }),
    sendMessage: builder.mutation({
      query: (body) => ({
        url: "/chat",
        method: "post",
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useUserLoginMutation,
  useForgotPassEmailMutation,
  useResetPasswordMutation,
  useAuthMeQuery,
  useLogoutMutation,
  useSendMessageMutation,
} = userAuthApi;
