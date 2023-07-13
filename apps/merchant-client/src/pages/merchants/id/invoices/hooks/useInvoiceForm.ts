import { useForm } from 'react-hook-form';
import { InvoiceForm } from './form.interface';

export const useInvoiceForm = () => {
    const { handleSubmit, watch, register, formState, setValue } =
        useForm<InvoiceForm>();
    return {
        handleSubmit,
        watch,
        register,
        formState,
        setValue,
    };
};
