import './Timer.scoped.scss';
import { useTimer } from '../../../../../hooks/useTimer';

interface IFormTimerProps {
    expiresAt: string;
}
export const FormTimer: React.FC<IFormTimerProps> = ({ expiresAt }) => {
    const { timer } = useTimer(expiresAt);

    return (
        <div className="timer">
            <p className="timer__text">The invoice is active for {timer}</p>
        </div>
    );
};
