import { GetStaticProps } from "next";

import Hero from "../../components/Hero";
import Projects from "../../components/Projects";

import { getRepos } from "../../utils";
import ProjectType from "../../types/ProjectType";

import styles from "./index.module.css";

type MainProps = {
	projects: ProjectType[];
};

export default function Main(props: MainProps) {
	return (
		<div className={styles.container}>
			<Hero />
			<Projects projects={props.projects} />
		</div>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const projects = await getRepos(6);
	return {
		props: {
			projects: projects,
			fallback: true,
			revalidate: 24 * 60 * 60, // 24 Hours
		},
	};
};
