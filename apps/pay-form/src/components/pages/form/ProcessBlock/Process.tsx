import type { InvoiceStatus } from './ProcessItem/ProcessItem';

import { ProcessBlockItem } from './ProcessItem/ProcessItem';

import './Process.scoped.scss';
import { useAppSelector } from '../../../../store/hooks';

interface ProcessBlockProps {
    onRetry: (startStage: number) => void;
}

export const FormProcessBlock = (props: ProcessBlockProps) => {
    const stages = useAppSelector((state) => state.transaction.stages);
    return (
        <div className="process">
            {stages.map((stage, i) => (
                <div className="process__item" key={i}>
                    <ProcessBlockItem
                        status={stage.status}
                        text={stage.statusText}
                        onRetry={() => props.onRetry(i)}
                    />
                </div>
            ))}
        </div>
    );
};
