import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import EpkComponent from '../epk/EpkComponent';

const Epk = () => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 100);
	}, []);
	return (
		<Layout>
			<EpkComponent />
		</Layout>
	);
};

export default Epk;
