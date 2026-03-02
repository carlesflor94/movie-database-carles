"use client";

import { Tabs } from "antd";
import { useRouter, usePathname } from "next/navigation";
import styles from "../page.module.css";

export default function RatedPage() {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = pathname.includes("/rated") ? "rated" : "search";

  return (
    <main className={styles.container}>
      <Tabs
        centered
        activeKey={activeTab}
        onChange={(key) => {
          if (key === "search") router.push("/");
        }}
        items={[
          { key: "search", label: "Search" },
          { key: "rated", label: "Rated" },
        ]}
      />
      <h2>Rated movies by user</h2>
    </main>
  );
}
