import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rabbitHoleApi = createApi({
  reducerPath: "rabbitHoleApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),

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
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetTheoriesQuery, useGetTheoryQuery, useRegisterMutation, useLoginMutation } =
  rabbitHoleApi;
