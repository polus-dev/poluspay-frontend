import type { SelectOption } from 'libs/ui/src/index';

import { useState } from 'react';

import {
    PButton,
    PInput,
    PTabs,
    PPagination,
    PSelect,
    PDropdown,
    PSwitch,
    PLabel,
} from 'libs/ui/src/index';

import { ReactComponent as IconCross } from './assets/icons/cross.svg';
import { ReactComponent as IconLoading } from './assets/icons/loading.svg';

export const App: React.FC = () => {
    const [value, setValue] = useState<string>('');

    const [current, setCurrent] = useState<number>(1);
    const limit = 5;
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const itemsPaginated = items.slice(
        (current - 1) * limit,
        (current - 1) * limit + limit
    );
    const onPageChange = (value: number) => {
        setCurrent(value);
    };

    const tabs = [
        { id: 'blyat', text: 'Blyat' },
        { id: 'syka', text: 'Syka' },
        { id: 'nahyi', text: 'Nahyi' },
    ];
    const [tab, setTab] = useState(tabs[0]);

    const options = [
        { id: 'hyeta', text: 'Hyeta' },
        { id: 'neHyeta', text: 'Ne Hyeta' },
    ];
    const [selected, setSelected] = useState<SelectOption[]>([options[0]]);

    const [switchV, setSwitchV] = useState(false);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    backgroundColor: 'black',
                }}
            >
                <div style={{ width: '100%', maxWidth: '320px' }}>
                    <PButton
                        wide
                        size="lg"
                        children={'text'}
                        onClick={() => console.log('click')}
                    />
                    <div style={{ marginTop: '50px' }}>
                        <PInput
                            value={value}
                            placeholder="Write anything"
                            align="center"
                            prepend={
                                <IconLoading
                                    style={{
                                        width: '20px',
                                        height: 'auto',
                                        fill: 'white',
                                    }}
                                />
                            }
                            append={
                                <IconCross
                                    style={{
                                        width: '20px',
                                        height: 'auto',
                                        stroke: 'white',
                                    }}
                                />
                            }
                            onInput={(value) => setValue(value.toString())}
                        />
                    </div>
                    <div style={{ marginTop: '50px' }}>
                        {itemsPaginated.map((item) => (
                            <div
                                key={item}
                                style={{
                                    width: '100%',
                                    marginBottom: '4px',
                                    height: '20px',
                                }}
                            >
                                {item}
                            </div>
                        ))}
                        <PPagination
                            current={current}
                            totalItems={items.length}
                            pageItems={limit}
                            onPageChange={(value) => onPageChange(value)}
                        />
                    </div>
                    <div style={{ marginTop: '50px' }}>
                        <PTabs
                            active={tab}
                            items={tabs}
                            onChange={(item) => setTab(item)}
                        />
                        <div style={{ marginTop: '15px' }}>
                            {tab.id === 'blyat' && <div>{tab.id} content</div>}
                            {tab.id === 'syka' && <div>{tab.id} content</div>}
                            {tab.id === 'nahyi' && <div>{tab.id} content</div>}
                        </div>
                    </div>
                    <div style={{ marginTop: '50px' }}>
                        <PSelect
                            active={selected}
                            options={options}
                            onInput={(value) => setSelected(value)}
                        />
                    </div>
                    <div style={{ marginTop: '50px' }}>
                        <PDropdown
                            handler={<p>Dropdown handler</p>}
                            content={
                                <div>
                                    <p>Dropdown content</p>
                                    <p>Dropdown content</p>
                                    <p>Dropdown content</p>
                                    <p>Dropdown content</p>
                                    <p>Dropdown content</p>
                                    <p>Dropdown content</p>
                                </div>
                            }
                            align={'right'}
                        />
                    </div>
                    <div style={{ marginTop: '50px' }}>
                        <PSwitch
                            value={switchV}
                            onChange={(value) => setSwitchV(value)}
                        />
                    </div>
                </div>
            </div>
            <PLabel
                visible
                status="warning"
                title="Congratulations!"
                description="You successfully created a merchant"
            />
        </>
    );
};
