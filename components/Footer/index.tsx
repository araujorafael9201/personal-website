import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

import styles from "./Footer.module.css";

export default function Footer() {
	return (
		<div className={styles.footerDiv}>
			<small className={styles.footerText}>Um projeto de Rafael Araújo</small>
			<div className={styles.contact}>
				<a
					className={styles.contactItem}
					href="https://github.com/araujorafael9201"
				>
					<FaGithub />
				</a>
				<a
					className={styles.contactItem}
					href="https://www.linkedin.com/in/rafael-ara%C3%BAjo-a04271189/"
				>
					<FaLinkedin />
				</a>
				<a
					className={styles.contactItem}
					href="https://www.instagram.com/rafaelaraujo13_/"
				>
					<FaInstagram />
				</a>
			</div>
		</div>
	);
}
