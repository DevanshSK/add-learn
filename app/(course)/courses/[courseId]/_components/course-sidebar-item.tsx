import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarProps{
    label: string;
    id: number;
    courseId: number;
}

const CourseSidebarItem = ({
    label,
    id,
    courseId
}: CourseSidebarProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const Icon = PlayCircle;
    const isActive = pathname?.includes(id+"");

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    }
  return (
    <button onClick={onClick} type="button" className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-blue-600 hover:bg-blue-300/20",
        isActive && "text-blue-700 bg-blue-200/20 hover:bg-blue-200/20 hover:text-blue-700"
    )}>
        <div className="flex items-center gap-x-2 py-4">
            <Icon size={22} className={cn(
                "text-slate-500",
                isActive && "text-slate-700"
            )}/>
            {label}
        </div>
        <div className={cn(
            "ml-auto opacity-0 border-2 border-blue-700 h-full transition-all",
            isActive && "opacity-100"
        )} />
    </button>
  )
}

export default CourseSidebarItem