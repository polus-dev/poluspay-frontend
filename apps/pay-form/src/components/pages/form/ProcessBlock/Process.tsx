import type { InvoiceStatus } from './ProcessItem/ProcessItem';

import { ProcessBlockItem } from './ProcessItem/ProcessItem';

import './Process.scoped.scss';

export const FormProcessBlock: React.FC = () => {
    const data: { id: number; status: InvoiceStatus; text: string }[] = [
        { id: 1, status: 'success', text: 'Approve tokens' },
        { id: 2, status: 'failure', text: 'Sign message' },
        { id: 3, status: 'loading', text: 'Hyeta ebanaya' },
        { id: 4, status: 'pending', text: 'Syka 3alypa blyat' },
    ];

    return (
        <div className="process">
            {data.map((el) => (
                <div className="process__item" key={el.id}>
                    <ProcessBlockItem
                        status={el.status}
                        text={el.text}
                        onRetry={() => {}}
                    />
                </div>
            ))}
        </div>
    );
};
