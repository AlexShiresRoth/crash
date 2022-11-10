import React from "react";
import style from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";

export const Header = () => {
  const logo =
    "https://res.cloudinary.com/snackmanproductions/image/upload/v1592331145/crash/CTC_Logo_Export_n4ra8j.png";
  return (
    <header className={style.header}>
      <div className={style.img_container}>
        <Image
          src={logo}
          height="300px"
          width="500px"
          quality="80"
          alt="Crash the Calm Logo"
        />
      </div>
      <div className={style.actions}>
        <Link href="/music">Listen</Link>
        <span>|</span>
        <Link href="/Videos">Watch</Link>
        <span>|</span>
        <Link href="/shop">Support</Link>
      </div>

      <a
        className={style.call_to_action}
        href="https://open.spotify.com/artist/4z0T4u61g7AUCjxoygPCAT?si=GlY_XhoKTMGYDl2OwSIRMw&dl_branch=1"
        rel="noopener noreferrer"
        target="_blank"
      >
        Listen On Spotify <FaSpotify />
      </a>
      <iframe
        src="https://open.spotify.com/follow/1/?uri=spotify:artist:4z0T4u61g7AUCjxoygPCAT?si=GlY_XhoKTMGYDl2OwSIRMw&dl_branch=1&size=basic&theme=light"
        width="150"
        height="25"
        scrolling="no"
        frameBorder="0"
        style={{ border: "none", overflow: "hidden" }}

      ></iframe>
    </header>
  );
};
