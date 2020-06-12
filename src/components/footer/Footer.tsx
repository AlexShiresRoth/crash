import React from 'react';
import PropTypes from 'prop-types';
import style from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { TiSocialFacebook, TiSocialYoutube, TiSocialTwitter, TiSocialInstagram } from 'react-icons/ti';
const Footer = () => {
	return (
		<footer className={style.footer}>
			<div className={style.logo}>
				<Link to="/">
					<img
						src={`https://res.cloudinary.com/snackmanproductions/image/upload/v1590510319/crash/Crash_the_Calm-white_tatrui.png`}
						alt="Crash the Calm Logo"
					/>
					Crash The Calm
				</Link>
			</div>
			<div className={style.col}>
				<h3>Contact</h3>
				<a href="mailto:crashthecalm@gmail.com">Booking</a>
				<a>Press</a>
				<a>Request A Show</a>
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
				<div>
					<a>
						<TiSocialFacebook />
					</a>
					<a>
						<TiSocialYoutube />
					</a>
					<a>
						<TiSocialTwitter />
					</a>
					<a>
						<TiSocialInstagram />
					</a>
				</div>
			</div>
		</footer>
	);
};

Footer.propTypes = {};

export default Footer;
