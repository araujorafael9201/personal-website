import { GetStaticProps } from "next";
import { Octokit } from "octokit";

import ProjectList from "../../../components/Projects/ProjectList";
import ProjectType from "../../../types/ProjectType";

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
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const response = await octokit.request("GET /users/araujorafael9201/repos", {
    username: "araujorafael9201",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const projects = response.data.map((p) => {
    return {
      name: p.name,
      description: p.description,
      url: p.html_url,
      language: p.language,
    };
  });
  return {
    props: {
      projects: projects,
      fallback: true,
      revalidate: 60 * 60 * 24, // 24 hours
    },
  };
};
