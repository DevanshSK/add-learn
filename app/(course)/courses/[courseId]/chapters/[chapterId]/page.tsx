"use client";

import { Banner } from "@/components/banner";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { useGetCoursesChaptersQuery, useGetSingleChapterQuery } from "@/redux/features/chapters/chapterApiSlice";
import { useGetEnrollmentsQuery } from "@/redux/features/user/userApiSlice";
import { selectUser } from "@/redux/features/user/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import { Download, File } from "lucide-react";
import CourseEnrollButton from "./_components/course-enroll-button";
import { Button } from "@/components/ui/button";
import CourseProgressButton from "./_components/course-progress-button";


const ChapterIdPage = ({ params }: {
    params: { courseId: number; chapterId: number };
}) => {
    const {data: chapters = [], isLoading: isChaptersLoading} = useGetCoursesChaptersQuery(params.courseId);
    const {data: enrollments=[], isLoading: isEnrollmentLoading} = useGetEnrollmentsQuery();
    const user = useAppSelector(selectUser);

    if (isChaptersLoading || isEnrollmentLoading) {
        return <p className='text-center p-5 animate-pulse font-semibold'>Hang on tight, this may take a while....</p>
    }

    if(!chapters){
        redirect('/dashboard/search');
    }

    const isEnrolled = enrollments.some(enrollment => {
        return +enrollment.course_id === +params.courseId;
    });

    const sortedChapters = chapters.toSorted((a,b) => a.chapter_no - b.chapter_no);
    const currentChapterIndex = sortedChapters.findIndex((c: { id: string | number; }) => +c.id === +params.chapterId);

    let nextUrl : string;
    let isLastChapter : boolean = false;

    const nextChapterIndex = currentChapterIndex + 1 < sortedChapters.length ? currentChapterIndex+1 : -1;
    if(nextChapterIndex === -1){
      nextUrl = `/dashboard`;
      isLastChapter =  true;
    } else{
      const nextChapter = sortedChapters[nextChapterIndex];
      nextUrl = `/courses/${params.courseId}/chapters/${nextChapter.id}`; 
    }
    const currentChapter = sortedChapters[currentChapterIndex]
    // const nextChapterIndex = currentChapterIndex + 1 < sortedChapters.length ? currentChapterIndex+1 : -1;
    // const isLastChapter = currentChapterIndex+1 < sortedChapters.length;

    // console.log("Current Chapter",currentChapterIndex);
    // console.log("Current Chapter",currentChapter);
    console.log("Next chapter ",nextChapterIndex);
    console.log("Next URL",nextUrl);

    return (
        <div>
        {!isEnrolled && (
          <Banner
            variant="warning"
            label="You need to enroll into this course to watch this chapter."
          />
        )}
        <div className="flex flex-col max-w-4xl mx-auto pb-20">
          <div className="p-4">
            <VideoPlayer
              chapterId={params.chapterId}
              title={currentChapter.title}
              courseId={params.courseId}
              isLocked={!isEnrolled}
              videoUrl={currentChapter.video_url}
            />
          </div>
          <div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">
                {currentChapter.title}
              </h2>
              {isEnrolled ? (
                <CourseProgressButton
                  nextUrl={nextUrl}
                  isLastChapter={isLastChapter}
                />
              ) : (
                <CourseEnrollButton
                  courseId={params.courseId}
                />
              )}
            </div>
            <Separator />
            <div>
              <Preview value={currentChapter.description!} />
            </div>
            {!!currentChapter.resources_url && (
              <>
                <Separator />
                <div className="p-4">
                  {
                    <a 
                      href={currentChapter.resources_url}
                      target="_blank"
                      key={currentChapter.id}
                      className="flex items-center p-3 w-full bg-blue-200 border text-blue-700 rounded-md hover:underline"
                    >
                      <File />
                      <p className="line-clamp-1 ml-2">
                        {currentChapter.title} Attachment
                      </p>
                      <Download className="ml-auto" />
                    </a>
                  }
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
}

export default ChapterIdPage