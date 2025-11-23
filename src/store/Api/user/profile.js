import { userApi } from "../setup/userBaseApi";

export const profileApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    changeImage: builder.mutation({
      query: (data) => ({
        url: "/edit/image",
        method: "put",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url: "/edit",
        method: "put",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    emailChangeOtp: builder.mutation({
      query: (data) => ({
        url: "/edit/email/otp",
        method: "post",
        body: data,
      }),
    }),
    emailChangeOtpResend: builder.mutation({
      query: (data) => ({
        url: "/edit/email/otp/resend",
        method: "post",
        body: data,
      }),
    }),
    emailChangeVerify: builder.mutation({
      query: (data) => ({
        url: "/edit/email/verify",
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const {
  useChangeImageMutation,
  useEditProfileMutation,
  useEmailChangeOtpMutation,
  useEmailChangeOtpResendMutation,
  useEmailChangeVerifyMutation,
} = profileApi;
