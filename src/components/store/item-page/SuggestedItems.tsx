import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './SuggestedItems.module.scss';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { fetchStoreItems } from '../../../actions/store';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Props {
	store?: any;
	fetchStoreItems: () => any;
}

interface RouteParams {
	id: string;
	history: any;
}

type AllProps = Props & RouteComponentProps<RouteParams>;

const SuggestedItems = ({ store: { catalog, loading }, fetchStoreItems, match: { params }, history }: AllProps) => {
	useEffect(() => {
		fetchStoreItems();
	}, [fetchStoreItems]);

	const [visible, setVisibility] = useState(false);

	// const [gridSize, setGridSize] = useState(0);
	// const [scrollAmount, setScrollAmt] = useState(0);

	const gridRef = useRef<HTMLDivElement>(null);
	const scrollingObject = useRef<HTMLDivElement>(null);

	const goToItem = (item: any) => {
		return history.push(`/merch/viewitem/${item.id}`);
	};

	const suggests = catalog
		.filter((catItem: any) => {
			return catItem.id !== params.id;
		})
		.map((item: any, i: number) => {
			return (
				<div className={style.item} key={i} onClick={(e) => goToItem(item)}>
					<div className={style.overlay}></div>
					<div className={style.img_container}>
						<img src={item.images[0].src} alt={item.title} />
					</div>
					<div className={style.item_desc}>
						<h3>{item.title}</h3>
						<p>Price: ${item.variants[0].price}</p>
						<Link to={`/merch/viewitem/${item.id}`}>
							<button>View</button>
						</Link>
					</div>
				</div>
			);
		});

	// const handleGridSize = () => {
	// 	setGridSize((prevWidth) =>
	// 		gridRef.current !== null ? gridRef.current.getBoundingClientRect().width : prevWidth
	// 	);
	// };

	// useEffect(() => {
	// 	if (!loading) {
	// 		handleGridSize();

	// 		return;
	// 	}
	// }, [loading]);

	// useEffect(() => {
	// 	if (!loading) {
	// 		window.addEventListener('resize', handleGridSize);
	// 	}

	// 	return () => window.removeEventListener('resize', handleGridSize);
	// });

	// useEffect(() => {
	// 	if (scrollingObject.current !== null && !loading && scrollingObject.current.scrollWidth) {
	// 		setScrollAmt(scrollingObject.current.scrollWidth);
	// 		console.log(scrollingObject.current.scrollWidth / gridSize);
	// 	}
	// }, [gridSize, loading]);

	//TODO need to complete this
	// const scrollSection = (direction: string, scrollPX: number) => {
	// 	if (scrollAmount && scrollingObject.current !== null) {
	// 		if (direction === 'right') {
	// 			return (scrollingObject.current.style.transform = `translate3d(${-scrollPX}px,0, 0)`);
	// 		}
	// 		if (direction === 'left') {
	// 			return (scrollingObject.current.style.transform = `translate3d(${scrollPX}px,0, 0)`);
	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	setInterval(() => {
	// 		scrollSection('right', scrollAmount);
	// 	}, 5000);

	// 	return () => clearInterval();
	// });

	return !loading ? (
		<div
			className={style.container}
			onPointerEnter={() => setVisibility(!visible)}
			onPointerLeave={() => setVisibility(!visible)}
		>
			<div className={style.inner}>
				<div className={style.column}>
					<div className={style.suggested_heading}>
						<h2>You may also like</h2>
					</div>
					<div className={style.items} ref={gridRef}>
						<div className={style.items_container}>
							<FaChevronLeft
								className={`${style.arrow_left}  ${visible ? style.visible : ''}`}
								// onPointerDown={(e) => scrollSection('left', scrollAmount)}
							/>
							<div className={style.grid} ref={scrollingObject}>
								{suggests}
							</div>
							<FaChevronRight
								className={`${style.arrow_right}  ${visible ? style.visible : ''}`}
								// onPointerDown={(e) => scrollSection('right', scrollAmount)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<LoadingSpinner />
	);
};

SuggestedItems.propTypes = {
	store: PropTypes.object,
};

const mapStateToProps = (state: any) => ({
	store: state.store,
});

export default connect(mapStateToProps, { fetchStoreItems })(withRouter(SuggestedItems));
