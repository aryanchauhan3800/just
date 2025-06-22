import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboardService';

  

    export const useGetDashboardAttributes = (filters) =>
      useQuery({
        queryKey: ['dashboard/attributes', filters],
        // queryFn:  dashboardService.getAttributes,
        queryFn: ({ queryKey }) => {
          const [_key, filterParams] = queryKey as [string, any];
          return dashboardService.getAttributes(filterParams);
        },
        // Optional: you can enable keepPreviousData for pagination
      //   keepPreviousData: true,
      });
    
      export const useGetSalesExpenseGraph = (filters) =>
        useQuery({
          queryKey: ['dashboard/salesExpenseGraph', filters],
          // queryFn:  dashboardService.getAttributes,
          queryFn: ({ queryKey }) => {
            const [_key, filterParams] = queryKey as [string, any];
            return dashboardService.getSalesExpenseGraph(filterParams);
          },
          // Optional: you can enable keepPreviousData for pagination
        //   keepPreviousData: true,
        });

        export const useGetExpensePieChart = (filters) =>
          useQuery({
            queryKey: ['dashboard/expensePieChart', filters],
            // queryFn:  dashboardService.getAttributes,
            queryFn: ({ queryKey }) => {
              const [_key, filterParams] = queryKey as [string, any];
              return dashboardService.getExpensePieChart(filterParams);
            },
            // Optional: you can enable keepPreviousData for pagination
          //   keepPreviousData: true,
          });
        
      