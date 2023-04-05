import ProjectType from "../../../types/ProjectType";
import Project from "../Project";

import styles from "./ProjectList.module.css";

type ProjectListProps = {
	projects: ProjectType[];
};

export default function ProjectList(props: ProjectListProps) {
	const projects: ProjectType[] = props.projects;
	return (
		<div className={styles.projectGrid}>
			{projects.map((project: ProjectType) => (
				<Project data={project} />
			))}
		</div>
	);
}
