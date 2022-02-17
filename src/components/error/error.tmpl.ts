export function ErrorTemplate() {
	return `
        <section class='error__wrapper'>
             <p class='error__num'>{{error_num}}</p>
             <p class='error__message'>{{message}}</p>
             <div class='error__btn'>
                {{{button}}}
             </div>
        </section>
`;
}
