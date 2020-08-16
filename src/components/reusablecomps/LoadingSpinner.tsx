import React from 'react';
import style from './LoadingSpinner.module.scss';

interface Props {
	updateStyle: any;
}

const LoadingSpinner = ({ updateStyle }: any) => {
	return (
		<div
			className={style.spinner}
			style={
				updateStyle
					? {
							borderBottom: `3px solid ${updateStyle.color}`,
							borderTop: `3px solid ${updateStyle.color}`,
							height: `${updateStyle.size}`,
							width: `${updateStyle.size}`,
					  }
					: {}
			}
		></div>
	);
};

export default LoadingSpinner;
