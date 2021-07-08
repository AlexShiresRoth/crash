import React from "react";
import { sections } from "./sections";
import style from "./StoreSection.module.scss";
import Link from "next/link";

const StoreSection = () => {
  const section = sections.filter((section) => section.name === "merch")[0];

  return (
    <section className={style.box}>
      {/* <div className={style.border_bottom}></div> */}
      {/* <div className={style.border_top}></div> */}
      <Link href={section.path}>Shop Merch</Link>
      <div className={style.container}></div>
    </section>
  );
};

export default StoreSection;
