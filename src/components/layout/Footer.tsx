export default function Footer() {
  return (
    <footer
      className="py-8 px-6 text-center text-sm"
      style={{
        borderTop: "1px solid var(--border)",
        color: "var(--text-muted)",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} DonsNote. Built with{" "}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)" }}
        >
          Next.js
        </a>
        . Deployed on{" "}
        <a
          href="https://pages.github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)" }}
        >
          GitHub Pages
        </a>
        .
      </p>
    </footer>
  );
}
