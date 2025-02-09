import React from 'react';

const SkeletonLoader = () => {
    return (
        <div>    
            <div className="flex flex-col gap-4 w-full">
                <div className="h-4 bg-gradient-to-r from-gray-700 to-blue-800 rounded w-5/6 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-blue-800 rounded w-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-blue-800 rounded w-3/4 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
