import React from "react";
import style from "./MusicSection.module.scss";
import { sections } from "./sections";
import { FaSpotify, FaApple } from "react-icons/fa";
const MusicSection = () => {
  const section = sections.filter((section) => section.name === "music")[0];
  return (
    <section className={style.box} key={section.id}>
      <div className={style.heading}>
        <p>listen On the streaming platform of your choosing</p>
      </div>
      <div className={style.grid}>
        <div className={style.embeds}>
          <div className={style.iframe_container}>
            <div className={style.col}>
              <a
                href="https://open.spotify.com/album/0wKgFy2OJQJ9P916R6cIg9"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaSpotify />
                Listen on Spotify
              </a>
            </div>

            <iframe
              src="https://open.spotify.com/embed/album/0wKgFy2OJQJ9P916R6cIg9"
              frameBorder="0"
              allowTransparency={true}
              allow="encrypted-media"
            ></iframe>
          </div>
          <div className={style.iframe_container}>
            <div className={style.col}>
              <a
                href="https://music.apple.com/us/album/a-town-named-nowhere-volume-i-ep/1572368115"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaApple />
                Listen on Apple Music
              </a>
            </div>
            <iframe
              title="apple music"
              allow="autoplay *; encrypted-media *;"
              frameBorder="0"
              style={{ overflow: "hidden", borderRadius: "0px" }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="https://embed.music.apple.com/us/album/a-town-named-nowhere-volume-i-ep/1572368115"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
