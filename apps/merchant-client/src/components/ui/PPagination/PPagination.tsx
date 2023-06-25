import classNames from 'classnames';
import React from 'react';

import './styles.scss';

interface PaginationProps {
    current: number;
    totalItems: number;
    pageItems?: number;
    pageRange?: number;
    onPageChange: (page: number) => void;
}

const PPagination: React.FC<PaginationProps> = ({
    current = 1,
    totalItems = 0,
    pageItems = 10,
    pageRange = 2,
    onPageChange = () => {},
}) => {
    const pages = Math.ceil(totalItems / pageItems);

    const ranges = {
        start: current - pageRange > 0 ? current - pageRange : 1,
        end: current + pageRange < pages ? current + pageRange : pages,
    };

    const range = Array.from({ length: ranges.end - ranges.start + 1 }).map(
        (_el, i) => ranges.start + i
    );

    const hasFirst = ranges.start !== 1;
    const hasLast = ranges.end < pages;
    const hasPrev = current - pageRange - 1 > 1;
    const hasNext = current + pageRange + 1 < pages;

    const change = (e: React.MouseEvent, page: number) => {
        e.stopPropagation();

        if (page === current) return undefined;

        onPageChange(page);
    };

    return (
        <div className="polus-ui polus-ui__pagination">
            <div className="polus-ui__pagination">
                {hasFirst && (
                    <div
                        className="polus-ui__pagination-item"
                        onClick={(event) => change(event, 1)}
                    >
                        1
                    </div>
                )}
                {hasPrev && (
                    <span className="polus-ui__pagination-item polus-ui__pagination-item--dots">
                        ...
                    </span>
                )}
                {range.map((page) => (
                    <div
                        className={classNames('polus-ui__pagination-item', {
                            'polus-ui__pagination-item--active':
                                current == page,
                        })}
                        key={page}
                        onClick={(event) => change(event, page)}
                    >
                        {page}
                    </div>
                ))}
                {hasNext && (
                    <span className="polus-ui__pagination-item polus-ui__pagination-item--dots">
                        ...
                    </span>
                )}
                {hasLast && (
                    <div
                        className="polus-ui__pagination-item"
                        onClick={(event) => change(event, pages)}
                    >
                        {pages}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PPagination;
