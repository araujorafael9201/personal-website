import { Octokit } from "octokit";
import fs from 'fs'
import ProjectType from "../types/ProjectType";

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

export async function getRepos(n_of_repos: number = 10000): Promise<ProjectType[]> {
	const response = await octokit.request("GET /users/araujorafael9201/repos", {
		username: "araujorafael9201",
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});

	const repos = response.data
		.map((r): ProjectType => {
			return {
				name: r.name,
				description: r.description,
				repo_url: r.url,
				language: r.language,
				public_url: "",
				image: "",
				text: "",
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

export async function getRepoFullInfo(name: string) {
	// Github + projects.json
	const response = await octokit.request("GET /repos/{owner}/{repo}", {
		owner: "araujorafael9201",
		repo: name,
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});

	const extraInfo = JSON.parse(fs.readFileSync('projects.json', 'utf8'));

	let public_url: string;
	let image: string;
	let text: string;

	if (extraInfo[name] !== undefined) {
		public_url = extraInfo[name].url;
		image = extraInfo[name].image;
		text = extraInfo[name].text;
	} else {
		public_url = "";
		image = "";
		text = "";
	}

	const repo = {
		name: response.data.name,
		description: response.data.description,
		repo_url: response.data.html_url,
		language: response.data.language,
		public_url: public_url,
		image: image,
		text: text,
	};

	return repo;
}

