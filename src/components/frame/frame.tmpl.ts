export function FrameTemplate() {
	return `
<section class='frame {{className}}'>
    <div class='frame__wrapper'>
    {{{frameHeader}}}
    <form class='frame__form'>
        {{{inputFields}}}
        <div class='frame__buttons'>
            {{{buttons}}}
        </div>
    </form>
    </div>
</section>
    `;
}
