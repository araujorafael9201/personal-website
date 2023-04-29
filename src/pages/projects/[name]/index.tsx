import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import { getRepoNames, getRepoInfo } from '../../../../db';
import ProjectType from '../../../../types/ProjectType';


interface ProjectPageProps {
	repo: ProjectType
}

export default function ProjectPage(props: ProjectPageProps) {
	const { repo } = props;
	return (
		<div className="container">
			<h1>{repo.name}</h1>
			<a href={repo.url}>Ver código fonte</a>
			<p>{repo.description ? repo.description : "Sem Descrição"}</p>
			<h2>Tecnologias</h2>
			<p>{repo.language}</p>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const repoNames = await getRepoNames();
	const paths = []
	repoNames.forEach((name: String) => {
		paths.push({
			params: {
				name
			}
		})
	})

	return {
		paths,
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	let { name } = context.params;
	name = name.toString();

	const repo = await getRepoInfo(name);

	return {
		props: { repo },
		revalidate: 7 * 24 * 60 * 60, // Weekly
	}
}
