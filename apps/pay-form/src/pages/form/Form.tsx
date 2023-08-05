import { useState } from 'react';
import { useParams } from 'react-router';

import { Loader } from '@poluspay-frontend/ui';
import { Form } from '../../components/pages/form/Form';
import { FormError } from '../../components/pages/form/states/Error/Error';
import { FormProcessing } from '../../components/pages/form/states/Processing/Processing';
import { FormSuccess } from '../../components/pages/form/states/Success/Success';

import classNames from 'classnames';

import './Form.scoped.scss';

type FormStatus = 'default' | 'loading' | 'success' | 'in_progress';

interface IFormPageProps {
    error?: boolean;
    errorMessage?: string;
}

export const FormPage: React.FC<IFormPageProps> = ({ error, errorMessage }) => {
    const { id } = useParams<{ id: string }>();

    const [status, setStatus] = useState<FormStatus>('default');

    return (
        <div className="form-page">
            <div
                className={classNames({
                    'form-page__form': true,
                    'form-page__form--error': error,
                    [`form-page__form--${status}`]: status !== 'default',
                })}
            >
                {error ? (
                    <FormError message={errorMessage} />
                ) : status === 'default' ? (
                    <Form id={id!} />
                ) : status === 'loading' ? (
                    <Loader height={280} />
                ) : status === 'success' ? (
                    <FormSuccess />
                ) : (
                    status === 'in_progress' && <FormProcessing />
                )}
            </div>
        </div>
    );
};
