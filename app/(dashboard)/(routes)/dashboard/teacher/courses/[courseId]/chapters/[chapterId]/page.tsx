"use client";

import { IconBadge } from "@/components/icon-badge";
import { useGetSingleChapterQuery } from "@/redux/features/chapters/chapterApiSlice";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterTitleForm from "./_components/chapter-title-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";

const ChapterIdPage = ({params}: {
    params: {
        courseId: number; chapterId: number;
    }
} ) => {
    const { data: chapter, isLoading: isChapterLoading } = useGetSingleChapterQuery(params.chapterId);

    if(isChapterLoading) {
        return <p className='text-center p-5 animate-pulse font-semibold'>Loading....</p>
    }

    if(!chapter){
        return redirect("/");
    }

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.video_url,
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `${completedFields}/${totalFields}`;


    return ( 
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <Link 
                        href={`/dashboard/teacher/courses/${params.courseId}`}
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2"/>
                        Back to course setup
                    </Link>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">Chapter Creation</h1>
                            <span className="text-sm text-slate-700 ">Complete all fields {completionText}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className="text-xl">Customize your chapter</h2>
                        </div>
                        <ChapterTitleForm 
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId} 
                        />
                        <ChapterDescriptionForm 
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId} 
                        />
                    </div>
                </div>


            </div>

        </div>
     );
}
 
export default ChapterIdPage;