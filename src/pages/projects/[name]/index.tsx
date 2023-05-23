import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';

import { FaGlobe, FaCode } from 'react-icons/fa';

import { getRepoNames, getRepoFullInfo } from '../../../../utils';
import ProjectType from '../../../../types/ProjectType';

import styles from './index.module.css';


interface ProjectPageProps {
	repo: ProjectType
}

export default function ProjectPage(props: ProjectPageProps) {
	const { repo } = props;
	return (
		<div className={styles.container}>
			<div className={styles.header}>

				<h1 className={styles.title}>{repo.name}</h1>
				<div className={styles.headerLinks}>

					{
						repo.public_url != "" ?

							<a className={styles.link} href={repo.public_url} target="_blank"><FaGlobe /></a> :
							null
					}
					<a className={styles.link} href={repo.repo_url} target="_blank" ><FaCode /></a>
				</div>
			</div>
			<p className={styles.description}>{repo.description ? repo.description : "Sem Descrição"}</p>
			{repo.image != "" ?
				<Image className={styles.repoImage} width={1500} height={1500} src={`/image/${repo.image}`} alt="Repository Image" /> :
				null
			}
			<p className={styles.text}>{repo.text}</p>
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
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	let { name } = context.params;
	name = name.toString();

	const repo = await getRepoFullInfo(name);

	return {
		props: { repo },
		revalidate: 7 * 24 * 60 * 60, // Weekly
	}
}
