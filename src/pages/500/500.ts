import {Button} from '../../components/button/button';
import '../../components/error/error.scss';
import './500.scss';
import {Block} from '../../utils/block';
import {renderTemplate} from '../../utils/renderTemplate';
import {ErrorTemplate} from '../../components/error/error.tmpl';

export class Error500 extends Block {
    constructor() {
        super('main', {
            error_num: '500',
            message: 'Технические работы',
            button: new Button({title: 'На главную', className: 'btn__transparent'}).render()
        });
    }

    public render() {
        return renderTemplate(ErrorTemplate, this.props);
    }
}
