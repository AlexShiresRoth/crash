import React, { useState } from "react";
import style from "./EmailSignup.module.scss";
import { emailSignup } from "../../redux/actions/email";
import { connect } from "react-redux";
import Alert from "../alerts/Alert";
import LoadingSpinner from "../reusablecomps/LoadingSpinner";
import Image from "next/image";

interface Props {
  emailSignup: (val: any) => any;
  alerts?: any;
}

const EmailSignup = ({ emailSignup, alerts }: Props) => {
  const logo =
    "https://res.cloudinary.com/snackmanproductions/image/upload/v1590510319/crash/Crash_the_Calm-white_tatrui.png";

  const [data, setData] = useState<{ email: string }>({
    email: "",
  });
  const [loading, setLoading] = useState<any>(false);

  const [loaderStyle, setStyle] = useState<any>({
    color: "#fff",
    height: "2rem",
  });

  const { email } = data;

  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
    setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const request = await emailSignup(data);

      console.log("email req", request);
      setLoading(false);
      setData({ email: "" });
    } catch (error) {
      console.error(error);
      setLoading(false);
      setData({ email: "" });
    }
  };

  return (
    <section className={style.box}>
      <div className={style.container}>
        <div className={style.img_container}>
          <Image
            src={logo}
            height={"100%"}
            width={"100%"}
            alt="Crash the Calm Logo"
          />
        </div>
        <h2>Get in on exclusive content.</h2>
        {alerts.length > 0 ? <Alert /> : null}
        <form onSubmit={(e) => onSubmit(e)}>
          <div className={style.input_row}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              placeholder="Enter your email"
              required={true}
            />
            {!loading ? (
              <button onSubmit={(e) => onSubmit(e)}>Join</button>
            ) : (
              <LoadingSpinner updateStyle={loaderStyle} />
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, { emailSignup })(EmailSignup);
