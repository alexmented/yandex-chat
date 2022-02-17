import {ChatSearchTemplate} from './chatSearch.tmpl';
import './chatSearch.scss';
import {renderTemplate} from '../../../utils/renderTemplate';
import {Block} from '../../../utils/block';
import {IChatSearchProps} from './types';

export class ChatSearch extends Block {
	constructor(props: IChatSearchProps) {
		super();
		this.props = props;
	}

	public render() {
		return renderTemplate(ChatSearchTemplate, this.props);
	}
}
