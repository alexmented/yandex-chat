import {ProfileInformationTemplate} from './profileInformation.tmpl';
import './profileInformation.scss';
import {renderTemplate} from '../../../utils/renderTemplate';
import {Block} from '../../../utils/block';
import {IProfileInformationProps} from './types';

export class ProfileInformation extends Block {
	constructor(props: IProfileInformationProps) {
		super();
		this.props = props;
	}

	public render() {
		return renderTemplate(ProfileInformationTemplate, this.props);
	}
}
