import styles from "./Tabs.module.css";

type TabsProps = {
  activeTab: "search" | "rated";
  onChange: (tab: "search" | "rated") => void;
};

export default function Tabs({ activeTab, onChange }: TabsProps) {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.tab} ${activeTab === "search" ? styles.active : ""}`}
        onClick={() => onChange("search")}
      >
        Search
      </button>
      <button
        className={`${styles.tab} ${activeTab === "rated" ? styles.active : ""}`}
        onClick={() => onChange("rated")}
      >
        Rated
      </button>
    </div>
  );
}
