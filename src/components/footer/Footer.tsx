import React from 'react';
import style from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { TiSocialFacebook, TiSocialYoutube, TiSocialTwitter, TiSocialInstagram } from 'react-icons/ti';
import { FaSpotify, FaApple, FaBandcamp } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className={style.footer}>
			<div className={style.logo}>
				<Link to="/">
					<img
						src={`https://res.cloudinary.com/snackmanproductions/image/upload/v1590510319/crash/Crash_the_Calm-white_tatrui.png`}
						alt="Crash the Calm Logo"
					/>
				</Link>
			</div>
			<div className={style.col}>
				<h3>Contact</h3>
				<a href="mailto:crashthecalm@gmail.com">Booking</a>
				<a href="!#">Press</a>
				<a href="!#">Request A Show</a>
			</div>
			<div className={style.col}>
				<h3>Site</h3>
				<Link to="/music">music</Link>
				<Link to="/videos">videos</Link>
				<Link to="/interviews">interviews</Link>
				<Link to="/tour">tour</Link>
				<Link to="/store">store</Link>
				<Link to="/about">about</Link>
			</div>
			<div className={style.col}>
				<h3>Social</h3>
				<div className={style.social}>
					<a href=" http://facebook.com/crashthecalmband" rel="noopener noreferrer" target="_blank">
						<TiSocialFacebook />
					</a>
					<a
						href="http://youtube.com/channel/UCAEhEbQ5bgCoyCDWczfmuyA"
						rel="noopener noreferrer"
						target="_blank"
					>
						<TiSocialYoutube />
					</a>
					<a href="http://twitter.com/crashthecalm" rel="noopener noreferrer" target="_blank">
						<TiSocialTwitter />
					</a>
					<a href="http://instagram.com/crashthecalmny" rel="noopener noreferrer" target="_blank">
						<TiSocialInstagram />
					</a>
					<a
						href="http://open.spotify.com/artist/4z0T4u61g7AUCjxoygPCAT"
						rel="noopener noreferrer"
						target="_blank"
					>
						<FaSpotify />
					</a>
					<a
						href="http://music.apple.com/us/artist/crash-the-calm/1060887213"
						rel="noopener noreferrer"
						target="_blank"
					>
						<FaApple />
					</a>
					<a href=" http://crashthecalm.bandcamp.com/	" rel="noopener noreferrer" target="_blank">
						<FaBandcamp />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
