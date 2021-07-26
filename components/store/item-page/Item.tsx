import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./Item.module.scss";
import { connect } from "react-redux";
import { findStoreItem } from "../../../redux/actions/store";
import { addToCart, removeFromCart } from "../../../redux/actions/store";
import LoadingSpinner from "../../reusablecomps/LoadingSpinner";
import StoreAlert from "../alerts/StoreAlert";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";

interface Props {
  shop?: any;
  match?: any;
  findStoreItem: (id: any) => any;
  addToCart: (val: any) => any;
  removeFromCart: (val: any, id: string) => any;
  alerts?: any;
}

const Item = ({
  shop: { loading, foundItem, cart, musicVendor, loadingStoreItem, checkout },
  findStoreItem,
  addToCart,
  alerts,
}: Props) => {
  const { query } = useRouter();
  const [currentImg, setImg] = useState<number>(0);

  useEffect(() => {
    //scroll to top of page on new item load
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, [query.id]);

  useEffect(() => {
    if (query.id) findStoreItem(query.id);
  }, [query.id, findStoreItem]);

  const [selectedItem, selectItem] = useState<any>({
    option: null,
    quantity: 1,
  });

  const maxQuantity = 5;

  const { option, quantity } = selectedItem;
  //Handle alerting user if adding cart to item fails
  const [alerted, setAlert] = useState({
    sizeError: false,
    status: "",
  });

  const { sizeError, status } = alerted;

  const onChange = (e: React.FormEvent<HTMLSelectElement>) =>
    selectItem({
      ...selectedItem,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  useEffect(() => {
    if (option !== "") setAlert({ sizeError: false, status: "" });
  }, [option]);

  const handleAddToCart = () => {
    return option
      ? addToCart(selectedItem)
      : setAlert({
          sizeError: true,
          status:
            foundItem.vendor && foundItem.vendor.toLowerCase() === musicVendor
              ? "Please choose a type"
              : "Please choose a size",
        });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddToCart();
  };

  useEffect(() => {
    if (sizeError) {
      setTimeout(() => {
        setAlert({ sizeError: false, status: "" });
      }, 5000);
    }
  }, [sizeError]);

  const handleArrayFromNumberAmount = () => {
    const array = [];

    for (let i = 0; i < maxQuantity; i++) {
      array.push(i + 1);
    }
    return array;
  };
  console.log("whats an item", foundItem);

  return !loading && foundItem ? (
    <div className={style.container}>
      <div className={style.inner}>
        <div className={style.bread_crumbs}>
          <Link href={`/Main`}>Home</Link>
          <p>\</p>
          <Link
            href={
              foundItem.vendor && foundItem.vendor.toLowerCase() === musicVendor
                ? "/music"
                : "/merch"
            }
          >
            Store
          </Link>
          <p>\</p>
          <Link href={window.location}>
            <a className={style.active}>{foundItem.title}</a>
          </Link>
        </div>
        <div className={style.item}>
          <div className={style.col}>
            <div className={style.other_imgs}>
              {foundItem.images.map((img: any, i: number) => {
                return (
                  <div className={style.small_img_container} key={i}>
                    <Image
                      src={img.src}
                      alt={img.src}
                      height={`100%`}
                      width={`100%`}
                      quality={65}
                      blurDataURL="https://res.cloudinary.com/snackmanproductions/image/upload/c_scale,q_45,w_985/v1603506986/crash/Untitled_Artwork_ri6ybz.png"
                      placeholder="blur"
                      onClick={() => setImg(i)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.col}>
            <div className={style.image_container}>
              {loadingStoreItem ? (
                <LoadingSpinner />
              ) : (
                <Image
                  src={foundItem.images[currentImg].src}
                  alt={foundItem.title}
                  height={700}
                  width={700}
                  quality={59}
                  blurDataURL="https://res.cloudinary.com/snackmanproductions/image/upload/c_scale,q_45,w_985/v1603506986/crash/Untitled_Artwork_ri6ybz.png"
                  placeholder="blur"
                />
              )}
            </div>
          </div>
          <div className={style.col}>
            <div className={style.item_desc}>
              <div className={style.item_heading}>
                <h1>{foundItem.title}</h1>
                <p>
                  Price: $
                  {option &&
                  foundItem.variants.filter(
                    (variant: any) => variant.id === option
                  ).length > 0
                    ? foundItem.variants.filter((variant: any) => {
                        return variant.id === option;
                      })[0].price
                    : foundItem.variants[0].price}
                </p>
              </div>
              <h3>{foundItem.description}</h3>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
              <label>Select Quantity</label>
              <select
                onChange={(e) => onChange(e)}
                className={style.select_box}
                name="quantity"
                value={quantity}
              >
                {handleArrayFromNumberAmount().map((value: number) => {
                  return (
                    <option value={`${value}`} key={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
              {sizeError ? (
                <StoreAlert status={status} type={"danger"} />
              ) : null}
              {alerts.length > 0 ? (
                <StoreAlert status={alerts[0].msg} type={alerts[0].alertType} />
              ) : null}
              <label>Select Type</label>
              <select
                onChange={(e) => onChange(e)}
                style={sizeError ? { border: "2px solid #8f2b2bb0" } : {}}
                className={style.select_box}
                name="option"
              >
                <option>Choose Type</option>
                {foundItem.variants.map((variant: any, i: number) => {
                  return variant.available ? (
                    <option key={i} value={variant.id}>
                      {variant.title}
                    </option>
                  ) : (
                    <option key={i}>{variant.title}: Out of Stock</option>
                  );
                })}
              </select>
              <div className={style.btn_row}>
                {cart.length > 0 ? (
                  <div className={style.checkout_box}>
                    <a href={`${checkout.webUrl}`}>Checkout Now</a>
                  </div>
                ) : (
                  <></>
                )}
                <button onSubmit={(e) => onSubmit(e)}>Add To Cart</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={style.container}>
      <div className={style.inner}>
        <LoadingSpinner />
      </div>
    </div>
  );
};

Item.propTypes = {
  shop: PropTypes.object,
};

const mapStateToProps = (state: any) => ({
  shop: state.shop,
  alerts: state.alerts,
});

export default connect(mapStateToProps, {
  findStoreItem,
  addToCart,
  removeFromCart,
})(Item);
