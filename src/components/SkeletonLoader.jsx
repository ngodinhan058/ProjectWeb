import React from 'react';

const SkeletonLoader = ({ count }) => {
    const skeletonItems = Array.from({ length: count }, (_, index) => (
        <div key={index} className="skeleton-loader">
            {/* Tạo hiệu ứng skeleton ở đây */}
            <div className="skeleton-image"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-price"></div>
        </div>
    ));

    return <>{skeletonItems}</>;
};

export default SkeletonLoader;
