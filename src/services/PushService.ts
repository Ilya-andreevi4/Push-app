import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPush } from "../app/models/IPush";

export const pushAPI = createApi({
  reducerPath: 'pushAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000'}),
  tagTypes:['Push'],
  endpoints: (build) => ({
    fetchAllPush: build.query<IPush[], number>({
      query: (limit = 10) => ({
        url: '/push',
        params: {
          _limit: limit
        }
      }),
      providesTags: result => ['Push']
    }),
    createPush: build.mutation<IPush, IPush>({
      query: ({idConfigs, message}) => ({
        url: '/push',
        method: 'POST',
        body: {
          idConfigs, 
          message, 
          date: new Date(),
        }
      }),
      invalidatesTags: ['Push']
    }),
    deletePush: build.mutation<IPush, IPush>({
      query: (config) => ({
        url: `/push/${config.idConfigs}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Push']
    })
  })
})