import React from 'react';

const Loading = () => {
    return (
        <div className="fixed flex items-center justify-center top-0 right-0 bottom-0 left-0 z-20 bg-gray-900/10">
            <div className="w-20 h-20 rounded-full border-8 border-x-blue-light border-b-blue-light border-t-gray-middle animate-spin" />
        </div>
    );
};

export default Loading;
