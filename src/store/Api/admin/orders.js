import { adminApi } from "../setup/AdminBaseApi";

const adminOrderApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    adminGetOrders: builder.query({
      query: (params) => ({
        url: "/orders/",
        method: "get",
        params,
      }),
      providesTags: ["Orders"],
    }),
    getOrdersByItems: builder.query({
      query: (params) => ({
        url: "/orders/items",
        method: "get",
        params,
      }),
      providesTags: ["OrdersByItems"],
    }),
    getItemsByOrderId: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "get",
      }),
      providesTags: ["OrderItems"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "patch",
        body: data,
      }),
      invalidatesTags: ["OrderItems", "Orders", "OrderItem"],
    }),
    getOrderItemById: builder.query({
      query: (id) => ({
        url: `/orders/items/${id}`,
        method: "get",
      }),
      providesTags: ["OrderItem"],
    }),
    approveReturn: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/return/approve`,
        method: "patch",
      }),
      invalidatesTags: ["OrderItems", "Orders", "OrderItem"],
    }),
    rejectReturn: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/return/reject`,
        method: "patch",
      }),
      invalidatesTags: ["OrderItems", "Orders", "OrderItem"],
    }),
    getReturnRequests: builder.query({
      query: (params) => ({
        url: "/orders/return/requests",
        method: "get",
        params,
      }),
      providesTags: ["ReturnRequests"],
    }),
    getSalesReport: builder.query({
      query: (params) => ({
        url: "/orders/report",
        method: "get",
        params,
      }),
      providesTags: ["Report"],
    }),
    getTopSellingProducts: builder.query({
      query: (params) => ({
        url: "/orders/top/products",
        method: "get",
        params,
      }),
      providesTags: ["TopProducts"],
    }),
    getTopSellingCategories: builder.query({
      query: (params) => ({
        url: "/orders/top/categories",
        method: "get",
        params,
      }),
      providesTags: ["TopCategories"],
    }),
    getTopSellingBrands: builder.query({
      query: (params) => ({
        url: "/orders/top/brands",
        method: "get",
        params,
      }),
      providesTags: ["TopBrands"],
    }),
    getSalesChart: builder.query({
      query: (params) => ({
        url: "/orders/report/chart/sales",
        method: "get",
        params,
      }),
    }),
    getRevenueChart: builder.query({
      query: (params) => ({
        url: "/orders/report/chart/revenue",
        method: "get",
        params,
      }),
    }),
    getStatusChart: builder.query({
      query: (params) => ({
        url: "/orders/report/chart/statuses",
        method: "get",
        params,
      }),
    }),
  }),
});

export const {
  useAdminGetOrdersQuery,
  useGetItemsByOrderIdQuery,
  useUpdateStatusMutation,
  useGetOrdersByItemsQuery,
  useGetOrderItemByIdQuery,
  useApproveReturnMutation,
  useRejectReturnMutation,
  useGetReturnRequestsQuery,
  useGetSalesReportQuery,
  useGetTopSellingProductsQuery,
  useGetTopSellingCategoriesQuery,
  useGetTopSellingBrandsQuery,
  useGetSalesChartQuery,
  useGetRevenueChartQuery,
  useGetStatusChartQuery,
} = adminOrderApi;
