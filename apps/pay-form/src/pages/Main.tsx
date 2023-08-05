import { FormPage } from './form/Form';
import { Form } from '../components/pages/form/Form';
import { useParams } from 'react-router';

export const MainPage = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <FormPage>
            <Form id={id!} />
        </FormPage>
    );
};
