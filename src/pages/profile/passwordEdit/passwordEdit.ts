import {Button} from '../../../components/button/button';
import {Block} from '../../../utils/block';
import {Input} from '../../../components/input/input';
import {inputPasswodFields} from '../mocks/mocks';
import {renderTemplate} from '../../../utils/renderTemplate';
import {FrameTemplate} from '../../../components/frame/frame.tmpl';
import {user} from '../../../api/userApi';
import {router} from '../../../index';
import {formValidate} from '../../../utils/formValidate';
import {IFrameProps} from "../../../components/frame/types";

const action = (data: IFrameProps) => {
    user.changePassword({data}).then(() => router().go('/settings')).catch(console.log)
}

const callback = () => {
    const buttonEdit = document.querySelector('.btn__back');
    if (buttonEdit) {
        buttonEdit!.addEventListener('click', () => router().back())
    }
    formValidate(action);
}

const buttonsEdit = () => [
    new Button({title: 'Сохранить', className: 'btn__save', type: 'submit'}).render(),
    new Button({title: 'Назад', className: 'btn__violet btn__back', type: 'button'}).render(),
].join('');

export class PasswordEdit extends Block {
    constructor() {
        super('main', {
            callback
        });
    }

    public render() {
        return renderTemplate(FrameTemplate, {
            inputFields: new Input(inputPasswodFields).render(),
            buttons: buttonsEdit(),
            className: 'frame__edit'
        });
    }
}
