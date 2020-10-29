import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './MusicItem.module.scss';
import { connect } from 'react-redux';

interface Props {
	item: any;
	index: number;
	store?: any;
}

const MusicItem = ({ item, index, store: { loading } }: Props) => {
	const [titleVisibility, showTitle] = useState<boolean>(false);
	return !loading ? (
		<Link
			to={`/merch/viewitem/${item.id}`}
			onPointerEnter={() => showTitle(!titleVisibility)}
			onPointerLeave={() => showTitle(!titleVisibility)}
		>
			<div className={style.item} key={index}>
				<div className={style.img_container}>
					<img src={item.images[0].src} alt={item.title} />
				</div>
				{!titleVisibility ? (
					<div className={style.heading}>
						<p>{item.title}</p>
						<button>View</button>
					</div>
				) : (
					<div className={style.heading_invisible}>
						<p>{item.title}</p>
						<button>View</button>
					</div>
				)}
			</div>
		</Link>
	) : null;
};

MusicItem.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number.isRequired,
};

const mapStateToProps = (state: { store: any }) => {
	return {
		store: state.store,
	};
};
export default connect(mapStateToProps, null)(MusicItem);
