import React, { useEffect, useState } from "react";
import style from "./Item.module.scss";
import { connect, RootStateOrAny } from "react-redux";
import { findStoreItem } from "../../../redux/actions/store";
import { addToCart, removeFromCart } from "../../../redux/actions/store";
import LoadingSpinner from "../../reusablecomps/LoadingSpinner";
import StoreAlert from "../alerts/StoreAlert";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import ReactGA from "react-ga";
import { metaEvent } from "../../../functions/metaEvent";

//NEED to configure types better, THIS IS LAME LOL
//NEED TO REFACTOR CODE, SO CONFUSING
interface Props {
  shop: {
    loading: boolean;
    foundItem: any | null;
    cart: Array<any | null>;
    musicVendor: any;
    loadingStoreItem: boolean;
    checkout: any;
  };
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
  //query id for item
  const { query } = useRouter();
  //handle item image gallery
  const [currentImg, setImg] = useState<number>(0);
  //loading state for add to cart
  //for some reason loading state does not change
  const [loadingAddToCart, loadAddToCart] = useState<boolean>(false);

  const [selectedItem, selectItem] = useState<{
    option: null | string;
    quantity: number;
  }>({
    option: null,
    quantity: 1,
  });

  const { option, quantity } = selectedItem;
  //Handle alerting user if adding cart to item fails
  const [alerted, setAlert] = useState<{
    sizeError: boolean;
    status: string;
  }>({
    sizeError: false,
    status: "",
  });

  const { sizeError, status } = alerted;

  const handleTrackingCode = (option: string) => {
    //GOOGLE ANALYTICS
    ReactGA.event({
      action: "addToCart",
      category: "User",
      label: foundItem.title,
    });

    //handle meta api request
    metaEvent({
      event_name: "AddToCart",
      event_source_url: window.location.href,
      emailHash: null,
      phoneHash: null,
      content_name: foundItem.title,
      value: parseFloat(foundItem.variants[0].price),
      content_ids: [option],
    });
  };

  const onChange = (e: React.FormEvent<HTMLSelectElement>) =>
    selectItem({
      ...selectedItem,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleAddToCart = async () => {
    try {
      loadAddToCart(true);
      console.log("processing add", loadingAddToCart);
      //if no option is chosen short out function
      if (!option || option === "Choose Type") {
        //short out on error;
        loadAddToCart(false);
        /////////////////
        return setAlert({
          sizeError: true,
          status:
            foundItem.vendor && foundItem.vendor.toLowerCase() === musicVendor
              ? "Please choose a type"
              : "Please choose a size",
        });
      }

      await addToCart(selectedItem);
      //short out loading on success
      loadAddToCart(false);
      //pass tracking data to api
      handleTrackingCode(option);
    } catch (error) {
      console.error(error);

      loadAddToCart(false);
      /////////////////
      return setAlert({
        sizeError: true,
        status: "An unknown error has occurred",
      });
    }
  };

  const onSubmit: (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => void = async (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();

    await handleAddToCart();
  };

  useEffect(() => {
    if (query.id) findStoreItem(query.id);
  }, [query.id, findStoreItem]);

  useEffect(() => {
    if (option !== null) setAlert({ sizeError: false, status: "" });
  }, [option]);

  useEffect(() => {
    if (sizeError) {
      setTimeout(() => {
        setAlert({ sizeError: false, status: "" });
      }, 5000);
    }
  }, [sizeError]);

  useEffect(() => {
    //scroll to top of page on new item load
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, [query.id]);

  console.log("query", query);

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
                : "/shop"
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
                <LoadingSpinner updateStyle={{ size: "1rem", color: "#222" }} />
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
                {[1, 2, 3, 4, 5].map((value: number) => {
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
                {loadingAddToCart ? (
                  <LoadingSpinner
                    updateStyle={{ size: "1.5rem", color: "#222" }}
                  />
                ) : (
                  <button onSubmit={(e) => onSubmit(e)}>Add To Cart</button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={style.container}>
      <div className={style.inner}>
        <LoadingSpinner updateStyle={{ size: "1rem", color: "#222" }} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  shop: state.shop,
  alerts: state.alerts,
});

export default connect(mapStateToProps, {
  findStoreItem,
  addToCart,
  removeFromCart,
})(Item);
