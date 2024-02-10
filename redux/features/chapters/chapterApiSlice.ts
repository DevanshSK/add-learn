import { createApi } from "@reduxjs/toolkit/query/react";
import FormData from "form-data";
import { IChapterResponse, ICourseGetResponse, ICourseResponse } from "@/redux/types";
import baseQuery from "@/redux/services/apiSlice";

export const chapterApi = createApi({
    reducerPath: "chapterApi",
    baseQuery: baseQuery,
    tagTypes: ["Chapters"],
    endpoints: (builder) => ({
        createChapter: builder.mutation<IChapterResponse, {courseId: number; chapter: FormData}>({
            query: ({courseId, chapter}) => ({
                url: `/chapter/course/${courseId}/create`,
                method: "POST",
                body: chapter,
                formData: true
            }),
            invalidatesTags: [{ type: "Chapters", id: "LIST" }],
        }),
        getCoursesChapters: builder.query<IChapterResponse[], number>({
            query: (courseId) => `/chapter/course/${courseId}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => {
                            return {
                                type: 'Chapters' as const,
                                id,
                            }
                        }),
                        { type: 'Chapters', id: 'LIST' },
                    ]
                    : [{ type: 'Chapters', id: 'LIST' }],

        }),
        updateChapter: builder.mutation<IChapterResponse, { courseId: number, chapterId: number, chapter: FormData }>({
            query: ({ courseId, chapterId, chapter }) => ({
                url: `/chapter/course/${courseId}/update/${chapterId}`,
                method: "PATCH",
                body: chapter,
                formData: true
            }),
            invalidatesTags: (result, error, {chapterId}) => result ?
                [
                    { type: "Chapters", chapterId },
                    { type: "Chapters", id: "LIST" }
                ] :
                [   { type: "Chapters", id: "LIST" }   ],
        }),
    })
})

export const { useCreateChapterMutation, useGetCoursesChaptersQuery, useUpdateChapterMutation } = chapterApi;