import {InputTemplate} from './input.tmpl';
import './input.scss';
import {renderTemplate} from '../../utils/renderTemplate';
import {Block} from '../../utils/block';
import {IInputProps} from './types';

export class Input extends Block {
	constructor(props: IInputProps) {
		super();
		this.props = props;
	}

	public render() {
		return renderTemplate(InputTemplate, this.props);
	}
}
