import { Suspense } from 'react';
import OTPVerification from '@/components/auth-components/OTPVerification';

const OTPPageLoading = () => (
    <div className="auth_page_container">
        <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mb-4"></div>
            <div className="flex gap-2 justify-center mt-2 mb-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-12 h-12 bg-gray-300 rounded"></div>
                ))}
            </div>
            <div className="h-12 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-12 bg-gray-300 rounded w-full mb-8"></div>
        </div>
    </div>
);

const Page = () => {
    return (
        <Suspense fallback={<OTPPageLoading />}>
            <OTPVerification />
        </Suspense>
    );
};

export default Page;