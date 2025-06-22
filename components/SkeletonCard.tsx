import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {

  return (
    <div className="flex-1 max-h-[100px] px-2 py-3 bg-white flex flex-col gap-y-4 rounded-md">

      <h3 className="text-sm flex gap-x-1 max-h-[16px] border-l-2 border-gray-300 pl-2 items-center">

        <Skeleton className="h-4 w-4 rounded-full" />

        <Skeleton className="h-4 w-32" />

      </h3>


      <div className="flex flex-col px-3 gap-y-1">

        <Skeleton className="h-6 w-20" />

        <Skeleton className="h-4 w-28" />

      </div>

    </div>
  )
}

export default SkeletonCard;
