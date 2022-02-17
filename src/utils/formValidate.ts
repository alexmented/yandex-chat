const MOBILE_REGEXP: RegExp = /^((\+7|7|8)+([0-9]){10})$/g;
const PASSWORD_REGEXP: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
const EMAIL_REGEXP: RegExp = /^[^\s@]+@[^\s@]+$/g;

export const enum ValidationTypes {
    Phone='phone',
    Email = 'email',
    Password = 'password',
    Text = 'text'
}

const blurValidation = (input:HTMLInputElement) => {
	checkValidation(input);
};

const focusValidation = (input:HTMLInputElement) => {
	checkValidation(input, true);
};

const submitValidation = (e: Event, inputs:NodeListOf<HTMLInputElement>, action: Function) => {
	e.preventDefault();
	const inputValues = {} as Record<string, boolean | string>;
	Array.from(inputs).forEach(input => {
		if (!checkValidation(input)) {
			inputValues[input.name] = false;
		}
		else {
			inputValues[input.name] = input.value;
		}
	});
	if (Object.values(inputValues).includes(false)) {
		throw new Error("Заполните все поля")
	}
	else {
		action({...inputValues, display_name: inputValues.first_name});
	}
};

const errorToggle = (isValid: boolean, input: HTMLInputElement) => {
	if (!isValid) {
		input.closest('.inp__wrapper')!.nextElementSibling!.classList.remove('hidden');
	} else {
		input.closest('.inp__wrapper')!.nextElementSibling!.classList.add('hidden');
	}
};


const checkValidation = (input:HTMLInputElement, focus?: boolean) => {
	let isValid: boolean;
	switch (input.dataset.validation) {
		case ValidationTypes.Phone:
			isValid = (<HTMLInputElement>input).value.search(MOBILE_REGEXP) !== -1;
			if (focus && !input.value) {
				isValid = true
			}
			errorToggle(isValid, input);
			break;
		case ValidationTypes.Email:
			isValid = (<HTMLInputElement>input).value.search(EMAIL_REGEXP) !== -1;
			if (focus && !input.value) {
				isValid = true
			}
			errorToggle(isValid, input);
			break;
		case ValidationTypes.Text:
			isValid = (<HTMLInputElement>input).value.length > 2;
			if (focus && !input.value) {
				isValid = true
			}
			errorToggle(isValid, input);
			break;
		case ValidationTypes.Password:
			isValid = (<HTMLInputElement>input).value.search(PASSWORD_REGEXP) !== -1;
			if (focus && !input.value) {
				isValid = true
			}
			errorToggle(isValid, input);
			break;
		default:
			isValid = true;
	}

	return isValid;
};

export const formValidate = (action: Function) => {
	const form = document.querySelector('.frame__form');
	const inputs = document.querySelectorAll('input');
	if (form) {
		form.addEventListener('submit', e => submitValidation(e, inputs, action));
	}
	Array.from(inputs).forEach(input => {
		input.addEventListener('focus', () => focusValidation(input));
		input.addEventListener('blur', () => blurValidation(input));
	});
};
