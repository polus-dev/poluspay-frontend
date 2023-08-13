import {ReactComponent as IconLoading} from '../assets/icons/loading.svg';

import classNames from 'classnames';

import './Loader.scoped.scss';
import {useAppDispatch} from "../../../../../apps/pay-form/src/store/hooks";
import {useEffect} from "react";
import {
  setSmartLineStatus,
  SmartLineStatus
} from "../../../../../apps/pay-form/src/store/features/smartLine/smartLineSlice";

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
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSmartLineStatus(SmartLineStatus.LOADING))
  }, []);

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
