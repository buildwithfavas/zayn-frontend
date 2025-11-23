export const axiosBaseQuery =
  ({ baseUrl, instance }) =>
  async ({ url, method, body, params }) => {
    try {
      const result = await instance({
        url: baseUrl + url,
        method,
        data: body,
        params,
      });
      return { data: result.data };
    } catch (error) {
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data?.message || error.message,
          errors: error.response?.data.errors,
        },
      };
    }
  };
