import { Skeleton } from '@/components/ui/skeleton';
import { AppColumn } from '@/types/inventory-types';
import { GridValidRowModel } from '@mui/x-data-grid';


function SkeletonTable<T extends GridValidRowModel>({
  columns,
  rowHeight = 60,
  headerHeight = 50,
  customRowCount = 5,
}: {
  columns: AppColumn<T>[];
  rowHeight?: number;
  headerHeight?: number;
  customRowCount?: number;
}) {
  return (

    <div className="w-full h-full border border-gray-200 rounded-md">


      {/* Header */}
      <div
        className="flex border-b border-gray-200 bg-gray-50"
        style={{ height: headerHeight }}>
        {columns.map((col, index) => (
          <div
            key={index}
            className="flex-1 px-4 py-2 flex items-center"
          >
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>



      {/* Skeleton Rows */}
      {Array.from({ length: customRowCount }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex border-b border-gray-100 hover:bg-gray-50"
          style={{ height: rowHeight }}
        >
          {columns.map((col, colIndex) => (
            <div
              key={colIndex}
              className="flex-1 px-4 py-2 flex items-center"
            >
              <Skeleton
                className="h-4"
                style={{
                  width: `${Math.random() * 40 + 60}%` // Random width between 60-100%
                }}
              />
            </div>
          ))}
        </div>
      ))}

    </div>

  );
}


export default SkeletonTable;