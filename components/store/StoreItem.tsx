import React from "react";
import PropTypes from "prop-types";
import style from "./StoreItem.module.scss";
import { connect } from "react-redux";
import Link from "next/link";
import Image from "next/image";

interface Props {
  item: any;
  index: number;
  shop?: any;
}

const StoreItem = ({ item, index, shop: { loading } }: Props) => {
  return !loading ? (
    <div className={style.item} key={index}>
      <div className={style.img_container}>
        <Link href={`/shop/${item.id}`}>
          <a>
            <Image
              src={item.images[0].src}
              alt={item.title}
              height={300}
              width={400}
              quality={59}
              blurDataURL="https://res.cloudinary.com/snackmanproductions/image/upload/c_scale,q_45,w_985/v1603506986/crash/Untitled_Artwork_ri6ybz.png"
              placeholder="blur"
            />
          </a>
        </Link>
      </div>
      <div className={style.heading}>
        <p>{item.title}</p>
      </div>

      <div className={style.price}>
        <p>
          <span>Price:</span>
          {"$" + item.variants[0].price}
        </p>
      </div>
      <div className={style.actions}>
        <Link href={`/shop/${item.id}`}>
          <a>View</a>
        </Link>
      </div>
    </div>
  ) : null;
};

StoreItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state: { shop: any }) => {
  return {
    shop: state.shop,
  };
};

export default connect(mapStateToProps, null)(StoreItem);
