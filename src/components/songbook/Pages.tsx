import React from 'react';
// import PropTypes from 'prop-types';
import CloudinaryImage from '../reusablecomps/CloudinaryImage';
import { useState } from 'react';
import style from './Pages.module.scss';
import { useEffect } from 'react';

type Props = {
	images: any;
};

const Pages = ({ images }: Props) => {
	console.log(images);

	const [currentPages, setCurrent] = useState<number>(0);

	const [max, setMax] = useState<number>(0);

	const handlePageTurn = (current: number, ceil: number, direction: number) => {
		if (current > ceil - 1 && direction) return setCurrent(0);
		if (current < 1 && !direction) return setCurrent(ceil);
		return direction
			? setCurrent((prevIndex: number) => prevIndex + 1)
			: setCurrent((prevIndex: number) => prevIndex - 1);
	};

	useEffect(() => {
		if (images) setMax(images.length - 1);
	}, [images]);

	const imgsMap = images.map((img: { url: string; publicID: string }, index: number) => {
		return (
			<div className={style.image_container} key={index}>
				<CloudinaryImage image={img} />
			</div>
		);
	});
	console.log('current', currentPages);
	return (
		<>
			<div className={style.page_numbers}>
				{images.map((_: any, i: number) => {
					return (
						<button
							onClick={() => setCurrent(i)}
							className={style.page_select + ` ${currentPages === i ? style.active : ''}`}
						>
							{i + 1} - {i + 2}
						</button>
					);
				})}
			</div>
			<div className={style.pages_container}>
				<div className={style.back_btn}>
					<button onClick={() => handlePageTurn(currentPages, max, 0)}>Back</button>
				</div>
				<div className={style.pages}>
					{imgsMap[currentPages]} {currentPages < max ? imgsMap[currentPages + 1] : imgsMap[0]}
				</div>
				<div className={style.next_btn}>
					<button onClick={() => handlePageTurn(currentPages, max, 1)}>Next</button>
				</div>
			</div>
		</>
	);
};

Pages.propTypes = {};

export default Pages;
