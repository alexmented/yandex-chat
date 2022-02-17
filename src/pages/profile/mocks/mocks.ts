import {IInputProps} from '../../../components/input/types';
import {ValidationTypes} from '../../../utils/formValidate';
import {IUserDataProps} from "../types";

export const profileInformation = (userData: IUserDataProps) => ({
    info: [
        {
            title: 'Почта',
            value: userData.email,
        },
        {
            title: 'Логин',
            value: userData.login,
        },
        {
            title: 'Имя',
            value: userData.first_name,
        },
        {
            title: 'Фамилия',
            value: userData.second_name,
        },
        {
            title: 'Телефон',
            value: userData.phone,
        },
    ],
});

export const inputFields = (userData: IUserDataProps) => ({
    field: [
        {
            placeholder: 'Почта',
            type: 'email',
            errorText: 'Укажите email',
            className: 'inp__email-profile',
            name: 'email',
            value: userData.email,
            validation: ValidationTypes.Email,
        },
        {
            placeholder: 'Логин',
            type: 'text',
            errorText: 'Укажите логин',
            className: 'inp__login-profile',
            name: 'login',
            value: userData.login,
            validation: ValidationTypes.Text,
        },
        {
            placeholder: 'Имя',
            type: 'text',
            errorText: 'Укажите имя',
            className: 'inp__name-profile',
            name: 'first_name',
            value: userData.first_name,
            validation: ValidationTypes.Text,
        },
        {
            placeholder: 'Фамилия',
            type: 'text',
            errorText: 'Укажите фамилию',
            className: 'inp__surname-profile',
            name: 'second_name',
            value: userData.second_name,
            validation: ValidationTypes.Text,
        },
        {
            placeholder: 'Телефон',
            type: 'tel',
            errorText: 'Укажите телефон',
            className: 'inp__tel-profile',
            name: 'phone',
            value: userData.phone,
            validation: ValidationTypes.Phone,
        },
    ],
});

export const inputPasswodFields:IInputProps = {
    field: [
        {
            placeholder: 'Старый пароль',
            type: 'password',
            errorText: 'Укажите верный пароль',
            className: 'inp__password-old',
            name: 'oldPassword',
            value: '',
            validation: ValidationTypes.Password,
        },
        {
            placeholder: 'Новый пароль',
            type: 'password',
            errorText: 'Укажите верный пароль',
            className: 'inp__password-new',
            name: 'newPassword',
            value: '',
            validation: ValidationTypes.Password,
        },
    ],
};
