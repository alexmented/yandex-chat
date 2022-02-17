import {IInputProps} from '../../../components/input/types';
import {ValidationTypes} from '../../../utils/formValidate';

export const inputField:IInputProps = {
    field: [
        {
            placeholder: 'Поиск',
            value: '',
            type: 'text',
            className: 'inp__search-chats',
            name: 'search',
            validation: ValidationTypes.Text,
        },
        {
            placeholder: 'Название чата',
            value: '',
            type: 'text',
            className: 'inp__create-chats',
            name: 'title',
            validation: ValidationTypes.Text,
        },
    ],
};

export const inputFieldSender:IInputProps = {
    field: [
        {
            value: '',
            type: 'text',
            className: 'chatsender__inp',
            name: 'sender',
            validation: ValidationTypes.Text,
        },
    ],
};
