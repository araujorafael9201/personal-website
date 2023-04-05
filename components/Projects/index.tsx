import Link from "next/link";

import ProjectList from "./ProjectList";
import ProjectType from "../../types/ProjectType";

type ProjectsProps = {
	projects: ProjectType[];
};

import styles from "./projects.module.css";

export default function Projects(props: ProjectsProps) {
	const projects: ProjectType[] = props.projects;
	return (
		<div id="projects" className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>Projetos</h1>
				<Link className={styles.seeAll} href="/projects">
					Ver todos
				</Link>
			</div>
			<ProjectList projects={projects} />
		</div>
	);
}
