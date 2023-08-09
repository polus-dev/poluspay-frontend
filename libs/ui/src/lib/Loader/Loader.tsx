import { ReactComponent as IconLoading } from '../assets/icons/loading.svg';

import classNames from 'classnames';

import './Loader.scoped.scss';

interface LoaderProps {
    height?: number;
    borderRadius?: number;
    hasBackground?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
    height,
    borderRadius,
    hasBackground,
}) => {
    return (
        <div
            className={classNames({
                loader: true,
                'loader--background': hasBackground,
            })}
            style={{
                height: height ? `${height}px` : undefined,
                borderRadius: borderRadius ? `${borderRadius}px` : undefined,
            }}
        >
            <IconLoading className="loader__icon" />
        </div>
    );
};
