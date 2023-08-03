import { useState } from 'react';

import { ProgressBar } from '../../ui/ProgressBar/ProgressBar';
import { FormButton } from './Button/Button';
import { FormSelect } from './Select/Select';
import { FormTimer } from './Timer/Timer';
import { FormWarning } from './Warning/Warning';
import { FormHeader } from './Header/Header';
import { FormFooter } from './Footer/Footer';
import { FormNativePayment } from './Native/Native';
import { FormCurrencies } from './Currencies/Currencies';
import { FormProcessBlock } from './ProcessBlock/Process';
import { FormError } from './Error/Error';

import classNames from 'classnames';

import './Form.scoped.scss';

type FormStage = 'default' | 'native' | 'process';

export const Form: React.FC = () => {
    const [stage, setStage] = useState<FormStage>('default');

    const ok = true;

    return (
        <div
            className={classNames({
                form: true,
                'form--error': !ok,
            })}
        >
            {ok ? (
                <>
                    <div className="form__header">
                        <FormHeader />
                    </div>
                    <div className="form__progress">
                        <ProgressBar value={70} />
                    </div>
                    {stage === 'default' ? (
                        <>
                            <div className="form__select">
                                <FormSelect
                                    item={{ image: '', text: '' }}
                                    onClick={() => console.log('open modal')}
                                />
                            </div>
                            <div className="form__currencies">
                                <FormCurrencies />
                            </div>
                            <div className="form__timer">
                                <FormTimer />
                            </div>
                        </>
                    ) : stage === 'native' ? (
                        <>
                            <div className="form__native">
                                <FormNativePayment />
                            </div>
                            <div className="form__warning">
                                <FormWarning name="dai" amount={123123123} />
                            </div>
                        </>
                    ) : (
                        stage === 'process' && (
                            <div className="form__process">
                                <FormProcessBlock />
                            </div>
                        )
                    )}
                    <div className="form__footer">
                        <div className="form__footer-button">
                            <FormButton
                                onClick={() => console.log('handle click')}
                            />
                        </div>
                        <div className="form__footer-inner">
                            <FormFooter />
                        </div>
                    </div>
                    {/* add modals currency & blockchain selector */}
                </>
            ) : (
                <FormError />
            )}
        </div>
    );
};
