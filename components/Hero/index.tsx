import Link from "next/link";
import { FaCaretDown } from "react-icons/fa";
import styles from "./hero.module.css";

export default function Hero() {
	return (
		<div className={styles.container}>
			<div className={styles.textgroup}>
				<h1 className={styles.title}>Rafael Araújo</h1>
				<p className={styles.subtitle}>Software Developer</p>
			</div>
			<Link
				className={styles.goToProjects}
				style={{ textDecoration: "none", color: "#eee" }}
				href="#projects"
				scroll={false}
			>
				<h1 className={styles.goToProjectsText}>Meus Projetos</h1>
				<FaCaretDown />
			</Link>
		</div>
	);
}
