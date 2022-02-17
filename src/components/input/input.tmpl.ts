export function InputTemplate() {
	return `
        {{#each field}}
        <div class='inp__outer'>
        	<label for='{{this.name}}'>{{this.placeholder}}</label>
			<div class='inp__wrapper'>
				<input class='inp {{this.className}}' type='{{this.type}}' name='{{this.name}}' value='{{this.value}}' data-validation='{{this.validation}}'>
			</div>
			<div class='inp__error hidden'>{{this.errorText}}</div>
        </div>
        {{/each}}
`;
}
