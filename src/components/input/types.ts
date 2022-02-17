import {ValidationTypes} from '../../utils/formValidate';

export interface IInputProps {
    field: IFieldProps[];
}

interface IFieldProps {
    className?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    name?: string;
    error?: boolean
    errorText?: string;
    validation: ValidationTypes;
}
