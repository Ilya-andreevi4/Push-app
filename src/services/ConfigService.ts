import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IConfig } from "../app/models/IConfig";

export const configAPI = createApi({
  reducerPath: 'postAPI',
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
      query: ({title, system}) => ({
        url: '/configs',
        method: 'POST',
        body: {title, system}
      }),
      invalidatesTags: ['Config']
    }),
    updateConfig: build.mutation<IConfig, IConfig>({
      query: (config) => ({
        url: `/configs/${config.id}`,
        method: 'PUT',
        body: config
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