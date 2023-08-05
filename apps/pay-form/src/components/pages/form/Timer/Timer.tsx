import './Timer.scoped.scss';
import { useTimer } from '../../../../hooks/useTimer';

interface IFormTimerProps {
    expiresAt: string;
}
export const FormTimer = (props: IFormTimerProps) => {
    const { timer } = useTimer(props.expiresAt);
    return (
        <div className="timer">
            <p className="timer__text">The invoice is active for {timer}</p>
        </div>
    );
};
