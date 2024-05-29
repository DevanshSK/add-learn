import { ICourse } from "@/redux/types";
import CourseCard from "./course-card";


interface CourseListProps{
    items: ICourse[];
}
const CoursesList = ({items}: CourseListProps) => {
    return (
        <div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <CourseCard
                key={item.id}
                id={item.id}
                title={item.course_name}
                description={item.description}
                imageUrl={item.img_url!}
                courseCode={item.course_code}
                teacher={item.teacher}
                category={item?.category}
                enrollments={item?.enrollments}
              />
            ))}
          </div>
          {items.length === 0 && (
            <div className="text-center text-sm text-muted-foreground mt-10">
              No courses found
            </div>
          )}
        </div>
      )
}

export default CoursesList