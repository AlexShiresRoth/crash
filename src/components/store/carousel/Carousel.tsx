import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';
import style from './Carousel.module.scss';

interface Props {
	store?: any;
}

const Carousel = ({ store: { images, loading } }: Props) => {
	const [moreImgs, addImgs] = useState<Array<any>>([]);

	useEffect(() => {
		const handleImageLoading = () => {
			let max = 4;
			while (max > 0) {
				addImgs((prevState) => [...prevState, images.objects].flat());
				max--;
			}
		};
		if (images.objects) handleImageLoading();
	}, [images]);

	return !loading && images.objects ? (
		<div className={style.carousel}>
			<div className={style.left_over}></div>
			<div className={style.images}>
				{moreImgs.map((img: any, i: number) => {
					return <img src={img.image_data.url} alt={img.image_data.url} key={i} />;
				})}
			</div>
			<div className={style.right_over}></div>
		</div>
	) : (
		<LoadingSpinner />
	);
};

Carousel.propTypes = {
	store: PropTypes.object,
};

const mapStateToProps = (state: any) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(Carousel);
