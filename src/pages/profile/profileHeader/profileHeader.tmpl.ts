export function ProfileHeaderTemplate() {
	return `
		<form method='post' enctype='multipart/form-data' class='form__avatar'>
			<div class='profile__wrapper'>
				<div class='profile__photo'>
					<input name='file' type='file' name='file' id='input__file' class='input input__file' accept='.jpg, .jpeg, .png'>
				   <label for='input__file' class='input__file-button'>
					  <img src='{{link}}' alt='фото'/>  
				   </label>
				</div>
				<p class='profile__name'>{{name}}</p>
			</div>
        </form>
`;
}
