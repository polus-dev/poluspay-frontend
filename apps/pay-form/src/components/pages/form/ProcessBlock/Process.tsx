import type { InvoiceStatus } from './ProcessItem/ProcessItem';

import { ProcessBlockItem } from './ProcessItem/ProcessItem';

import './Process.scoped.scss';
import {useAppSelector} from "../../../../store/hooks";

interface ProcessBlockProps {
    onRetry: (startStage: number) => void;
}

export const FormProcessBlock = (props: ProcessBlockProps) => {
    const data: { id: number; status: InvoiceStatus; text: string }[] = [
        { id: 1, status: 'success', text: 'Approve tokens' },
        { id: 2, status: 'failure', text: 'Sign message' },
        { id: 3, status: 'loading', text: 'Hyeta ebanaya' },
        { id: 4, status: 'pending', text: 'Syka 3alypa blyat' },
    ];

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
