import React from 'react';
import { sections } from './sections';
import style from './StoreSection.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

interface Props {
	youtube?: any;
}

const StoreSection = () => {
	const section = sections.filter((section) => section.name === 'store')[0];

	return (
		<section className={style.box}>
			<Link to={section.path}>Shop Merch</Link>
			<div className={style.container}>
				<img
					src={`https://res.cloudinary.com/snackmanproductions/image/upload/c_scale,q_64,w_966/v1593471982/crash/ctc-longsleeveheart-mockup_agc99r.png`}
					alt="merch"
				/>
				<img
					src={`https://res.cloudinary.com/snackmanproductions/image/upload/c_scale,q_65,w_1413/v1593472008/crash/CD-mockup-nobg_jmyojh.png`}
					alt="merch"
				/>
				<img
					src={`https://res.cloudinary.com/snackmanproductions/image/upload/c_scale,q_67,w_1036/v1593473180/crash/ctc-pullover-mockups_co3w0z.png`}
					alt="merch"
				/>
			</div>
		</section>
	);
};

const mapStateToProps = (state: any) => {
	return {
		youtube: state.youtube,
	};
};

export default connect(mapStateToProps, null)(StoreSection);
