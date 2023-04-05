import { GetStaticProps } from "next";
import { Octokit } from "octokit";

import Hero from "../../components/Hero";
import Projects from "../../components/Projects";

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
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const response = await octokit.request("GET /users/araujorafael9201/repos", {
    username: "araujorafael9201",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const projects = response.data
    .map((p) => {
      return {
        name: p.name,
        description: p.description,
        url: p.html_url,
        language: p.language,
      };
    })
    .slice(0, 4);
  return {
    props: {
      projects: projects,
      fallback: true,
      revalidate: 24 * 60 * 60, // 24 Hours
    },
  };
};
