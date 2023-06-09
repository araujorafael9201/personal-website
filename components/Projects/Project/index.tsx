import Link from "next/link";
import styles from "./Project.module.css";

import ProjectType from "../../../types/ProjectType";

type ProjectProps = {
	data: ProjectType;
};

export default function Project(props: ProjectProps) {
	const project = props.data;
	return (
		<Link className={styles.link} href={`/projects/${project.name}`}>
			<div className={styles.projectBox}>
				<h2 className={styles.projectTitle}>{project.name}</h2>
				<p className={styles.projectDescription}>
					{project.description ? project.description : "Sem descrição"}
				</p>
				<div className={styles.techStack}>
					<p>{project.language}</p>
				</div>
			</div>
		</Link>
	);
}
