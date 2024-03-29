"use client";
import { Button } from "@/components/ui/button"
import { useGetAllCoursesQuery } from "@/redux/features/courses/courseApiSlice"
import Link from "next/link"
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const CoursesPage = () => {
    const { data: courses, isLoading } = useGetAllCoursesQuery();

    if(isLoading){
        return <p className='text-center p-5 animate-pulse font-semibold'>Loading....</p>
    }

    console.log(courses);
    


    return (
        <div className="p-6">
            <DataTable 
                columns={columns}
                data={courses || []}
            />
        </div>
    )
}

export default CoursesPage