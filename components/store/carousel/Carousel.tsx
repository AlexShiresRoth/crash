import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "./Carousel.module.scss";
import Image from "next/image";
import LoadingSpinner from "../../reusablecomps/LoadingSpinner";

interface Props {
  shop?: any;
}

const Carousel = ({ shop: { images, loading } }: Props) => {
  const [moreImgs, addImgs] = useState<Array<any>>([]);

  useEffect(() => {
    //dupe array to create image slider
    const handleImageLoading = () => {
      let max = 4;
      while (max > 0) {
        addImgs((prevState) =>
          [...prevState, images.map((img: any) => img[0])].flat()
        );
        max--;
      }
    };
    if (images.length > 0) handleImageLoading();
  }, [images]);

  if (loading || images.length === 0) {
    return (
      <div className={style.loading_block}>
        <LoadingSpinner updateStyle={{ color: "#222", size: "1.5rem" }} />
      </div>
    );
  }

  return (
    <div className={style.carousel}>
      <div className={style.left_over}></div>
      <div className={style.images}>
        {moreImgs.map((img: any, i: number) => {
          return (
            <div className={style.img_container} key={i}>
              <Image
                src={img}
                alt={img}
                height={400}
                width={400}
                objectFit="contain"
              />
            </div>
          );
        })}
      </div>
      <div className={style.right_over}></div>
    </div>
  );
};

Carousel.propTypes = {
  shop: PropTypes.object,
};

const mapStateToProps = (state: any) => {
  return {
    shop: state.shop,
  };
};

export default connect(mapStateToProps, null)(Carousel);
