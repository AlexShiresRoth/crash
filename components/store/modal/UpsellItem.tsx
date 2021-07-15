import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { addToCart } from "../../../redux/actions/store";
import { connect, RootStateOrAny } from "react-redux";
import LoadingSpinner from "../../reusablecomps/LoadingSpinner";
import { useEffect } from "react";

type Props = {
  style: any;
  index: number;
  item: any;
  addToCart: Function;
  shop: { loading: boolean };
};

const UpsellItem = ({
  style,
  index,
  item,
  addToCart,
  shop: { loading },
}: Props) => {
  const [isMobile, setMobile] = useState(window.innerWidth < 760);
  const [isTypesVisible, setVisibility] = useState<boolean>(false);

  const [selected, selectItem] = useState<any>({
    option: null,
    quantity: 1,
  });

  const onChange = (e: React.FormEvent<HTMLSelectElement>) =>
    selectItem({ option: e.currentTarget.value, quantity: 1 });

  const { option } = selected;

  const handleAddToCart = () => {
    if (!option) return;
    addToCart(selected);
    setVisibility(false);
  };

  const handleResize = (width: number) => setMobile(width < 760);

  useEffect(() => {
    window.addEventListener("resize", function () {
      return handleResize(this.innerWidth);
    });

    return window.removeEventListener("resize", function () {
      return handleResize(this.innerWidth);
    });
  }, []);

  return (
    <div className={style.item} key={index}>
      <div className={style.row}>
        <div className={style.img_container}>
          <Image
            src={item.images[0].src}
            height="100%"
            width="100%"
            alt={item.title}
          />
        </div>
        <p>
          {item.title.length > 22 && isMobile
            ? item.title.substring(0, 22)
            : item.title}
        </p>

        {isTypesVisible && (
          <div className={style.item_types}>
            <div className={style.heading}>
              <button
                className={style.close_select}
                onClick={(e) => setVisibility(false)}
              >
                X
              </button>
              <label>Select One:</label>
            </div>
            <select onChange={(e) => onChange(e)}>
              <option>Select</option>
              {item.variants.map((variant: any, index: number) => {
                console.log("variant.", variant);
                return (
                  <option key={index} value={variant.id}>
                    {variant.title}
                  </option>
                );
              })}
            </select>
            <button onClick={(e) => handleAddToCart()}>submit</button>
            <span className={style.arrow_down}></span>
          </div>
        )}

        <button onClick={(e) => setVisibility(true)}>Add To Cart</button>

        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

const mapStateProps = (state: RootStateOrAny) => ({
  shop: state.shop,
});

export default connect(mapStateProps, { addToCart })(UpsellItem);
