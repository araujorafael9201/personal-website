import { Octokit } from "octokit";

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

export async function getRepos(n_of_repos: number = 10000) {
	const response = await octokit.request("GET /users/araujorafael9201/repos", {
		username: "araujorafael9201",
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});

	const repos = response.data
		.map((r) => {
			return {
				name: r.name,
				description: r.description,
				url: r.html_url,
				language: r.language,
			};
		})
		.slice(0, n_of_repos);

	return repos;
}

export async function getRepoNames() {
	const response = await octokit.request("GET /users/araujorafael9201/repos", {
		username: "araujorafael9201",
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});

	const repos = response.data.map((r) => r.name);

	return repos;
}

export async function getRepoInfo(name: string) {
	const response = await octokit.request("GET /repos/{owner}/{repo}", {
		owner: "araujorafael9201",
		repo: name,
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});

	const repo = {
		name: response.data.name,
		description: response.data.description,
		url: response.data.html_url,
		language: response.data.language,
	};

	return repo;
}
