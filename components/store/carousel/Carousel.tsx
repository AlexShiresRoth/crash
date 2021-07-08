import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "./Carousel.module.scss";

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

  return !loading && images.length > 0 ? (
    <div className={style.carousel}>
      <div className={style.left_over}></div>
      <div className={style.images}>
        {moreImgs.map((img: any, i: number) => {
          return <img src={img} alt={img} key={i} />;
        })}
      </div>
      <div className={style.right_over}></div>
    </div>
  ) : (
    <div className={style.loading_block}>
      <p>Loading Images...</p>
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
