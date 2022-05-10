import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IConfig } from "../app/models/IConfig";

export const configAPI = createApi({
  reducerPath: 'configAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000'}),
  tagTypes:['Config'],
  endpoints: (build) => ({
    fetchAllConfigs: build.query<IConfig[], number>({
      query: (limit = 5) => ({
        url: '/configs',
        params: {
          _limit: limit
        }
      }),
      providesTags: result => ['Config']
    }),
    createConfig: build.mutation<IConfig, IConfig>({
      query: (config) => ({
        url: '/configs',
        method: 'POST',
        title: config,
        system: config
      }),
      invalidatesTags: ['Config']
    }),
    updateConfig: build.mutation<IConfig, IConfig>({
      query: (config) => ({
        url: `/configs/${config.id}`,
        method: 'PUT',
        title: config,
        system: config
      }),
      invalidatesTags: ['Config']
    }),
    deleteConfig: build.mutation<IConfig, IConfig>({
      query: (config) => ({
        url: `/configs/${config.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Config']
    })
})
})