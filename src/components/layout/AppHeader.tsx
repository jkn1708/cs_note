import Link from "next/link";
import styles from "@/styles/layout.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/list", label: "Notes" },
  { href: "/tags", label: "Tags" },
];

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand}>
          CS Note
        </Link>
        <nav>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
