export function ProfileInformationTemplate() {
	return `
  <div class='profile__information'>
        {{#each info}}
        <div class='profile__info-container'>
            <div class='profile__title'>
                {{this.title}}
            </div>
            <div class='profile__value'>
                {{this.value}}
            </div>
        </div>
        {{/each}}
  </div>
`;
}
