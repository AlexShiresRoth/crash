import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import style from './SuggestedItems.module.scss';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';
import Link from 'next/link';
import { fetchStoreItems } from '../../../redux/actions/store';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';

interface Props {
	shop?: any;
	fetchStoreItems: () => any;
}

const SuggestedItems = ({ shop: { catalog, loading }, fetchStoreItems }: Props) => {
	const router = useRouter();

	useEffect(() => {
		fetchStoreItems();
	}, [fetchStoreItems]);

	const [visible, setVisibility] = useState(false);
	const [index, setIndex] = useState(0);
	const [max, setMax] = useState(0);
	const [maxScrollWidth, setMaxScrollWidth] = useState<number>(0);
	const [gridSize, setGridSize] = useState(0);
	const [scrollAmount, setScrollAmt] = useState(0);
	const gridRef = useRef<HTMLDivElement>(null);
	const scrollingObject = useRef<HTMLDivElement>(null);
	let time = useRef<any>();

	const goToItem = (item: any) => {
		return router.push(`/merch/${item.id}`);
	};

	const suggests = catalog
		.filter((catItem: any) => {
			return catItem.id !== router.query.id;
		})
		.map((item: any, i: number) => {
			return (
				<div className={style.item} key={i} onClick={(e) => goToItem(item)}>
					<div className={style.overlay}></div>
					<div className={style.img_container}>
						<Image src={item.images[0].src} alt={item.title} height={'100%'} width={'100%'} />
					</div>
					<div className={style.item_desc}>
						<h3>{item.title}</h3>
						<p>Price: ${item.variants[0].price}</p>
						<Link href={`/merch/viewitem/${item.id}`}>
							<a>
								<button>View</button>
							</a>
						</Link>
					</div>
				</div>
			);
		});

	const handleGridSize = () => {
		setGridSize((prevWidth) =>
			gridRef.current !== null ? gridRef.current.getBoundingClientRect().width : prevWidth
		);
	};

	useEffect(() => {
		if (gridRef.current !== null && catalog) {
			handleGridSize();
		}
	}, [gridRef, catalog]);

	useEffect(() => {
		if (!loading && catalog) {
			window.addEventListener('resize', handleGridSize);
		}
		return () => window.removeEventListener('resize', handleGridSize);
	});

	useEffect(() => {
		if (scrollingObject.current !== null && catalog && gridRef.current !== null) {
			setMax(Math.round(scrollingObject.current.scrollWidth / gridSize));
			setMaxScrollWidth(scrollingObject.current.scrollWidth);
			console.log(Math.round(scrollingObject.current.scrollWidth / gridSize));
		}
	}, [gridSize, loading, catalog, gridRef]);

	const scrollController = (value: number) => {
		console.log(scrollAmount, -maxScrollWidth);

		switch (value) {
			case 0:
				if (scrollAmount >= 0 - gridSize) {
					console.log('min ascroll reached', -maxScrollWidth);
					setIndex(max);
					setScrollAmt(-maxScrollWidth + gridSize);
					return;
				} else {
					setIndex((prevIndex: number) => prevIndex - 1);
					setScrollAmt((prevAmt: number) => prevAmt + gridSize);
				}
				return;
			case 1:
				if (scrollAmount <= -maxScrollWidth + gridSize) {
					console.log('max ascroll reached');
					setIndex(0);
					setScrollAmt(0);
					return;
				} else {
					setIndex((prevIndex: number) => prevIndex + 1);
					setScrollAmt((prevAmt: number) => prevAmt - gridSize);
				}
				return;
			default:
				return;
		}
	};

	useEffect(() => {
		const scrollSection = () => {
			if (scrollingObject.current !== null) {
				return (scrollingObject.current.style.transform = `translate3d(${scrollAmount}px,0, 0)`);
			}
		};
		scrollSection();
	}, [index, scrollAmount]);

	//infinite loop carousel
	useEffect(() => {
		time.current = setTimeout(() => {
			if (scrollAmount <= -maxScrollWidth + gridSize) {
				console.log('max ascroll reached');
				setIndex(0);
				setScrollAmt(0);
				return;
			} else {
				setIndex((prevIndex: number) => prevIndex + 1);
				setScrollAmt((prevAmt: number) => prevAmt - gridSize);
			}
		}, 7000);

		//if user is hovering element don't scroll
		if (visible) {
			return clearTimeout(time.current);
		}
		return () => clearTimeout(time.current);
	}, [scrollAmount, maxScrollWidth, gridSize, visible]);
	return !loading ? (
		<div
			className={style.container}
			onPointerEnter={() => {
				setVisibility(true);
			}}
			onPointerLeave={() => setVisibility(false)}
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
								onPointerDown={(e) => scrollController(0)}
							/>
							<div
								className={style.grid}
								ref={scrollingObject}
								style={{
									gridTemplateColumns: `repeat(${suggests.length}, 1fr)`,
								}}
							>
								{suggests}
							</div>
							<FaChevronRight
								className={`${style.arrow_right}  ${visible ? style.visible : ''}`}
								onPointerDown={(e) => scrollController(1)}
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

const mapStateToProps = (state: any) => ({
	shop: state.shop,
});

export default connect(mapStateToProps, { fetchStoreItems })(SuggestedItems);
