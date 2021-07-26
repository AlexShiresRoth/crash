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
          height="100%"
          width="100%"
          quality="70"
          alt="Crash the Calm Logo"
        />
      </div>
      <div className={style.actions}>
        <Link href="/music">Listen</Link>
        <span>|</span>
        <Link href="/Videos">Watch</Link>
        <span>|</span>
        <Link href="/merch">Support</Link>
      </div>
      <a
        className={style.call_to_action}
        href="http://open.spotify.com/artist/4z0T4u61g7AUCjxoygPCAT"
        rel="noopener noreferrer"
        target="_blank"
      >
        Follow On Spotify <FaSpotify />
      </a>
    </header>
  );
};
