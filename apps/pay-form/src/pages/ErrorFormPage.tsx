import {FormPage} from "./form/Form";
import {FormError} from "../components/pages/form/Error/Error";

interface ErrorFormPageProps {
    message?: string
}
export const ErrorFormPage = (props: ErrorFormPageProps) => {
   return <FormPage isError><FormError message={props.message}/></FormPage>
}
