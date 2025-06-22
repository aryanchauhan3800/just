import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';

  export const useGetProfile = () =>
    useQuery({
      queryKey: ['profile'],
      queryFn: ({ queryKey }) => {
        return userService.getProfile();
      },
      // Optional: you can enable keepPreviousData for pagination
    //   keepPreviousData: true,
    });

 