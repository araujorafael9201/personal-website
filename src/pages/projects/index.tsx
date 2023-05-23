import { GetStaticProps } from "next";

import ProjectList from "../../../components/Projects/ProjectList";
import ProjectType from "../../../types/ProjectType";

import { getRepos } from "../../../utils";
import styles from "./Projects.module.css";

type ProjectProps = {
	projects: ProjectType[];
};

export default function Projects(props: ProjectProps) {
	const projects: ProjectType[] = props.projects;
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.title}>Meus Projetos</h1>
				<ProjectList projects={projects} />
			</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const projects = await getRepos();

	return {
		props: {
			projects: projects,
			fallback: true,
			revalidate: 60 * 60 * 24, // 24 hours
		},
	};
};
