import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPush } from "../app/models/IPush";

export const pushAPI = createApi({
  reducerPath: 'pushAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://my-app-70669-default-rtdb.europe-west1.firebasedatabase.app'}),
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
          date: new Date().toDateString(),
        }
      }),
      invalidatesTags: ['Push']
    }),
    deletePush: build.mutation<IPush, IPush>({
      query: (push) => ({
        url: `/push/${push.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Push']
    })
  })
})