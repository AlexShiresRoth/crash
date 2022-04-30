import React, { useMemo, useState, useEffect } from "react";
import Image from "next/dist/client/image";
import { sections } from "./sections";
import style from "./StoreSection.module.scss";
import Link from "next/link";
import { connect, RootStateOrAny } from "react-redux";
import { fetchStoreItems } from "../../redux/actions/store";
import LoadingSpinner from "../reusablecomps/LoadingSpinner";

type Props = {
  shop: any;
  fetchStoreItems: () => void;
};

const StoreSection = ({ shop: { catalog }, fetchStoreItems }: Props) => {
  const section = sections.filter((section) => section.name === "merch")[0];
  const [merch, setMerch] = useState<Array<any>>([]);

  useMemo(() => {
    fetchStoreItems();
  }, [fetchStoreItems]);

  useEffect(() => {
    if (catalog.length > 0) {
      const matches = catalog.filter((item: any) => {
        return (
          item.handle === "greetings-from-nowhere-t-shirt" ||
          item.handle === "devils-t-shirt"
        );
      });

      setMerch(matches);
    }
  }, [catalog]);

  if (catalog.length === 0) {
    return <LoadingSpinner updateStyle={{ color: "#222", size: "1.5rem" }} />;
  }

  return (
    <section className={style.box}>
      <Link href={section.path}>Shop Merch</Link>
      <div className={style.content}>
        <div className={style.columns}>
          {merch.map((item: any, index: number) => {
            console.log(item);
            return (
              <div className={style.column} key={index}>
                <div className={style.top_border}></div>
                <Link href={`/merch/${item.id}`}>
                  <a className={style.img_container}>
                    {" "}
                    <Image
                      src={item.images[0]?.src || ""}
                      alt={item.title}
                      height={600}
                      width={600}
                    />
                  </a>
                </Link>
                <div className={style.item_title}>
                  <h2>{item.title}</h2>
                </div>
                <div className={style.bottom_border}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  shop: state.shop,
});

export default connect(mapStateToProps, { fetchStoreItems })(StoreSection);
