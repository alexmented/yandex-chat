import {FrameTemplate} from './frame.tmpl';
import './frame.scss';
import {renderTemplate} from '../../utils/renderTemplate';
import {Block} from '../../utils/block';
import {IFrameProps} from './types';

export class Frame extends Block {
	constructor(props: IFrameProps) {
		super();
		this.props = props;
	}

	public render() {
		return renderTemplate(FrameTemplate, this.props);
	}
}
