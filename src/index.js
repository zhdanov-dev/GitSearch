let repositories = [];

const search = document.getElementsByClassName('icon')[0];
const input = document.getElementsByClassName('input')[0];

search.addEventListener('click', e => searchRepositories(e));
input.addEventListener('keypress', e => {
	if (e.key === 'Enter') searchRepositories(e);
});

const searchRepositories = async e => {
	let repoField = document.getElementsByClassName('search__repositories')[0];
	let loader = `<div class="spinner center">
		<div class="spinner-blade"></div>
		<div class="spinner-blade"></div>
		<div class="spinner-blade"></div>
		<div class="spinner-blade"></div>
		<div class="spinner-blade"></div>
		<div class="spinner-blade"></div>
		<div class="spinner-blade"></div>
		<div class="spinner-blade"></div>
		<div class="spinner-blade"></div>
		<div class="spinner-blade"></div>
		<div class="spinner-blade"></div>
		<div class="spinner-blade"></div>
	</div>`;
	repoField.innerHTML = loader;
	e.preventDefault();
	const name = document.getElementsByClassName('input')[0];

	if (!name.value) {
		name.classList.toggle('alert');
	} else {
		name.classList.remove('alert');
		await fetch(
			`https://api.github.com/search/repositories?q=${name.value}%20in%3Aname`
		)
			.then(response => response.json())
			.then(data => (repositories = data.items.slice(0, 10)));
		addRepositories();
	}
};

const addRepositories = () => {
	let repoField = document.getElementsByClassName('search__repositories')[0];
	let repo = '';
	if (repositories.length === 0) {
		repo += `<div class="no__results">
					<p>ничего не найдено...</з>
				</div>`;
		repoField.innerHTML = repo;
	} else {
		repositories.forEach(repos => {
			repo += `<div class="repository">
					<div class="reposytory__head">
						<a href="${repos.html_url}" target="_blank" class="head__name">${repos.name}</a>
						<span class="head__user">${repos.owner.login}</span>
					</div>
					<p class="repository__id">Id: ${repos.id}</p>
					<p class="repository__fullname">Full name: ${repos.full_name}/js</p>
				</div>`;
		});
		repoField.innerHTML = repo;
	}

};
