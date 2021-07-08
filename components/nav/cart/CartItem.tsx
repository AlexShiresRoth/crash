import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./CartItem.module.scss";
import { updateLineItem } from "../../../redux/actions/store";
import { connect, RootStateOrAny } from "react-redux";
import { FaEdit, FaTimes } from "react-icons/fa";
import LoadingSpinner from "../../reusablecomps/LoadingSpinner";

interface Props {
  index: number;
  removeFromCart: (val: string, itemToRemove: any) => any;
  itemToRemove: any;
  item: any;
  updateLineItem: (val: any) => any;
  shop?: any;
}

const CartItem = ({
  index,
  removeFromCart,
  item,
  itemToRemove,
  updateLineItem,
  shop: { cart },
}: Props) => {
  const [data, setData] = useState({
    option: item.id,
    quantity: item.quantity,
  });

  const [processing, setProcessing] = useState(false);

  const { quantity } = data;
  const onChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setProcessing(true);
    //update local state
    setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    //dispatch api call
    updateLineItem({ ...data, [e.currentTarget.name]: e.currentTarget.value });
  };

  const [formVisible, toggleVisibility] = useState(false);

  useEffect(() => {
    setProcessing(false);
  }, [cart]);

  const spinnerStyles = {
    color: "#111",
    size: "1rem",
  };
  return (
    <div key={index} className={style.item}>
      <img src={item.variant.image.src} alt={item.title} />
      <div className={style.content}>
        <p>{item.title}</p>
        <p>
          Quantity:{" "}
          {processing ? (
            <LoadingSpinner updateStyle={spinnerStyles} />
          ) : (
            item.quantity
          )}
        </p>

        {formVisible && (
          <form>
            <select
              onChange={(e) => onChange(e)}
              className={style.select_box}
              name="quantity"
              value={quantity}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </form>
        )}
        {item.size !== null ? (
          <div className={style.sizes}>
            <p>Size/Type: {item.variant.title}</p>
          </div>
        ) : null}
      </div>
      <div className={style.btns}>
        <div className={style.update}>
          <button onClick={(e) => toggleVisibility(!formVisible)}>
            {formVisible ? (
              <>
                Hide <FaTimes />
              </>
            ) : (
              <>
                Update <FaEdit />
              </>
            )}
          </button>
        </div>
        <div className={style.remove}>
          <button onClick={(e) => removeFromCart(item.id, itemToRemove)}>
            Remove <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object,
};

const mapStateToProps = (state: RootStateOrAny) => ({
  shop: state.shop,
});

export default connect(mapStateToProps, { updateLineItem })(CartItem);
