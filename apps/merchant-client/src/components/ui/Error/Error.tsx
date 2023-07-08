import classNames from 'classnames';

import './Error.scoped.scss';

interface ErrorProps {
    title?: string;
    height?: number;
    borderRadius?: number;
    hasBackground?: boolean;
    largeTitle?: boolean;
}

export const ErrorBlock: React.FC<ErrorProps> = ({
    title = 'No records found',
    height,
    borderRadius,
    hasBackground = true,
    largeTitle,
}) => {
    return (
        <div
            className={classNames({
                error: true,
                'error--background': hasBackground,
            })}
            style={{
                height: height ? `${height}px` : undefined,
                borderRadius: borderRadius ? `${borderRadius}px` : undefined,
            }}
        >
            <div className="error__inner">
                <p
                    className={classNames({
                        'error__inner-title': true,
                        'error__inner-title--large': largeTitle,
                    })}
                >
                    {title}
                </p>
            </div>
        </div>
    );
};
