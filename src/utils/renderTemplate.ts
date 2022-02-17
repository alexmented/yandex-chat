import * as Handlebars from 'handlebars';

export const renderTemplate = (tmpl: Function, context: object) => {
	const compiled_template = Handlebars.compile(tmpl());
	return compiled_template(context);
};
