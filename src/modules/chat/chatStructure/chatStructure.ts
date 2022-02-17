import './chatStructure.scss';
import {ChatStructureTemplate} from './chatStructure.tmpl';
import {renderTemplate} from '../../../utils/renderTemplate';
import {Block} from '../../../utils/block';
import {IChatStructureProps} from './types';

export class ChatStructure extends Block {
	constructor(props: IChatStructureProps) {
		super();
		this.props = props;
	}

	public render() {
		return renderTemplate(ChatStructureTemplate, this.props);
	}
}
