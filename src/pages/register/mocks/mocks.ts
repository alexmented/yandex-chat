import {IInputProps} from '../../../components/input/types';
import {ValidationTypes} from '../../../utils/formValidate';

export const inputFields:IInputProps = {
    field: [
        {
            placeholder: 'Почта',
            type: 'email',
            errorText: 'Укажите email',
            name: 'email',
            className: 'inp__email-register',
            validation: ValidationTypes.Email,
        },
        {
            placeholder: 'Логин',
            type: 'text',
            errorText: 'Укажите логин',
            name: 'login',
            className: 'inp__login-register',
            validation: ValidationTypes.Text,
        },
        {
            placeholder: 'Имя',
            type: 'text',
            errorText: 'Укажите имя',
            name: 'first_name',
            className: 'inp__name-register',
            validation: ValidationTypes.Text,
        },
        {
            placeholder: 'Фамилия',
            type: 'text',
            errorText: 'Укажите фамилию',
            name: 'second_name',
            className: 'inp__surname-register',
            validation: ValidationTypes.Text,
        },
        {
            placeholder: 'Телефон',
            type: 'tel',
            errorText: 'Укажите телефон',
            name: 'phone',
            className: 'inp__tel-register',
            validation: ValidationTypes.Phone,
        },
        {
            placeholder: 'Пароль',
            type: 'password',
            errorText: 'Укажите Пароль',
            name: 'password',
            className: 'inp__password-register',
            validation: ValidationTypes.Password,
        }
    ],
};
