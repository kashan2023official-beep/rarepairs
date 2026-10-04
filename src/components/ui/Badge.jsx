export default function Badge({ type, children }) {
  const styles = {
    available: "bg-available/10 text-available dark:bg-available-dark/10 dark:text-available-dark",
    sold: "bg-sold/10 text-sold dark:bg-sold-dark/10 dark:text-sold-dark",
    rare: "bg-rare/10 text-rare dark:bg-rare-dark/10 dark:text-rare-dark",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[type] || styles.available}`}>
      {children}
    </span>
  );
}
