import Link from "next/link";
import styles from "./404.module.css";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Essa Página não Existe!</h1>
      <Link className={styles.goBack} href="/">
        Voltar para o início
      </Link>
    </div>
  );
}
