export function ChatStructureTemplate() {
	return `
    <section class='structure__wrapper {{className}}'>
        <div class='structure__list'>
            {{{leftElement}}}
        </div>
        <div class='structure__messages'>
            {{{rightElement}}}
        </div>
        {{{modal}}}
    </section>
`;
}
