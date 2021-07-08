import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import style from "./MusicItem.module.scss";
import { connect } from "react-redux";

interface Props {
  item: any;
  index: number;
  shop?: any;
}

const MusicItem = ({ item, index, shop: { loading } }: Props) => {
  const [titleVisibility, showTitle] = useState<boolean>(false);
  return !loading ? (
    <div className={style.music_item}>
      <Link href={`/merch/viewitem/${item.id}`}>
        <a
          onPointerEnter={() => showTitle(!titleVisibility)}
          onPointerLeave={() => showTitle(!titleVisibility)}
          className={style.link}
        >
          <div className={style.item} key={index}>
            <div className={style.img_container}>
              <img src={item.images[0].src} alt={item.title} />
            </div>
            {!titleVisibility ? (
              <div className={style.heading}>
                <p>{item.title}</p>
                <button>View</button>
              </div>
            ) : (
              <div className={style.heading_invisible}>
                <p>{item.title}</p>
                <button>View</button>
              </div>
            )}
          </div>
        </a>
      </Link>
    </div>
  ) : null;
};

MusicItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state: { shop: any }) => {
  return {
    shop: state.shop,
  };
};
export default connect(mapStateToProps, null)(MusicItem);
