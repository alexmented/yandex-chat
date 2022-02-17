import {ErrorTemplate} from './error.tmpl';
import './error.scss';
import {renderTemplate} from '../../utils/renderTemplate';
import {Block} from '../../utils/block';
import {IErrorProps} from './types';

export class Error extends Block {
	constructor(props: IErrorProps) {
		super();
		this.props = props;
	}

	public render() {
		return renderTemplate(ErrorTemplate, this.props);
	}
}
