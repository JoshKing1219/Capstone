import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rabbitHoleApi = createApi({
  reducerPath: "rabbitHoleApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),

  tagTypes: ["User"],
  endpoints: (builder) => ({
    getTheories: builder.query({
      query: () => "/api/theories",
    }),
    getTheory: builder.query({
      query: (id) => `/api/theories/${id}`,
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/api/auth/register",
        method: "POST",
        body,
      }),
      providesTags: ["User"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
      providesTags: ["User"],
    }),

    getUser: builder.query({
      query: (token) => ({
        url: "/api/auth/me",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["User"],
    }),

    updateReview: builder.mutation({
      query: ({ theory_id, id }) => ({
        url: `/api/theories/${theory_id}/reviews/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetTheoriesQuery,
  useGetTheoryQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
} = rabbitHoleApi;
