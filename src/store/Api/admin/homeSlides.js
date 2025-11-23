import { adminApi } from "../setup/AdminBaseApi";

export const homeSlidesApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    addHomeSlides: builder.mutation({
      query: (data) => ({
        url: "/homeSlides/",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["HomeSlides"],
    }),
    getHomeSlides: builder.query({
      query: (params) => ({
        url: "/homeSlides/",
        method: "get",
        params,
      }),
      providesTags: ["HomeSlides"],
    }),
    editHomeSlide: builder.mutation({
      query: ({ id, data }) => ({
        url: `/homeSlides/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: ["HomeSlides"],
    }),
    homeSlidesToggleBlock: builder.mutation({
      query: (id) => ({
        url: `/homeSlides/block/${id}`,
        method: "patch",
      }),
      invalidatesTags: ["HomeSlides"],
    }),
  }),
});

export const {
  useAddHomeSlidesMutation,
  useGetHomeSlidesQuery,
  useEditHomeSlideMutation,
  useHomeSlidesToggleBlockMutation,
} = homeSlidesApi;
