import styles from "./Tabs.module.css";

type TabsProps = {
  activeTab: "search" | "rated";
  onChange: (tab: "search" | "rated") => void;
};

export default function Tabs({ activeTab, onChange }: TabsProps) {
  return (
    <div className={styles.container}>
      <button
        className={activeTab === "search" ? "tab active" : "tab"}
        onClick={() => onChange("search")}
      >
        Search
      </button>
      <button
        className={activeTab === "rated" ? "tab active" : "tab"}
        onClick={() => onChange("rated")}
      >
        Rated
      </button>
    </div>
  );
}
