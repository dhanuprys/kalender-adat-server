import React from 'react';

export function BaseLayout({ children }) {
    return (
        <div className="h-[100vh] w-[100vw] flex flex-col">
            <div className="bg-blue-500 p-4"></div>
            <div className="flex-1">{children}</div>
        </div>
    );
}
