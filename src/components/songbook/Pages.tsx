import React from 'react';
import PropTypes from 'prop-types';
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

	// const handlePageTurn = (current, ceil) => {};

	useEffect(() => {
		if (images) setMax(images.length - 1);
	}, [images]);

	const imgsMap = images.map((img: { url: string; publicID: string }) => {
		return <CloudinaryImage image={img} />;
	});
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
			<div className={style.pages}>
				{imgsMap[currentPages]} {imgsMap[currentPages + 1]}
			</div>
		</>
	);
};

Pages.propTypes = {};

export default Pages;
