import './profileHeader.scss';
import {Block} from '../../../utils/block';
import {renderTemplate} from '../../../utils/renderTemplate';
import {IProfileHeader} from './types';
import {ProfileHeaderTemplate} from './profileHeader.tmpl';

export class ProfileHeader extends Block {
	constructor(props: IProfileHeader) {
		super();
		this.props = props;
	}

	public render() {
		return renderTemplate(ProfileHeaderTemplate, this.props);
	}
}
