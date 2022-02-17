import {IInputProps} from '../../../components/input/types';
import {ValidationTypes} from '../../../utils/formValidate';
export const inputFields:IInputProps = {
    field: [
        {
            placeholder: 'Логин',
            type: 'text',
            errorText: 'Укажите Логин',
            name: 'login',
            className: 'inp__login-login',
            validation: ValidationTypes.Text,
        },
        {
            placeholder: 'Пароль',
            type: 'password',
            errorText: 'Укажите Пароль',
            name: 'password',
            className: 'inp__password-login',
            validation: ValidationTypes.Password,
        },
    ],
};
