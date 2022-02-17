import {ButtonTemplate} from './button.tmpl';
import './button.scss';
import {renderTemplate} from '../../utils/renderTemplate';
import {Block} from '../../utils/block';
import {IButtonProps} from './types';

export class Button extends Block {
	constructor(props: IButtonProps) {
		super('div', props);
	}

	render() {
		return renderTemplate(ButtonTemplate, this.props);
	}
}

