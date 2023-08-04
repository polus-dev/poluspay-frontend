import { Form } from '../../components/pages/form/Form';

import './Form.scoped.scss';
import {FormError} from "../../components/pages/form/Error/Error";
import {useParams} from "react-router";
import {isValidUUID} from "../../../../../tools/isValidUUID";

interface IFormPageProps {
    errorMessages?: string;
    uuid?: string;
}

export const FormPage= (props: IFormPageProps) => {
    const {id} = useParams<{id: string}>();
    const isValidId = isValidUUID(id!);
    return (
        <div className="form-page">
            {props.errorMessages || !isValidId ? <FormError  message={props.errorMessages || 'invalid uuid'} /> : <Form id={id!} /> }
        </div>
    );
};
