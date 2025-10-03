import styles from "@/styles/layout.module.css";

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p>
          © {new Date().getFullYear()} CS Note. Crafted for continuous learning.
        </p>
      </div>
    </footer>
  );
}
