import React, { useState } from 'react';
import { useEffect } from 'react';
import { loadSongBook } from '../../redux/actions/cloudinary';
import { connect, RootStateOrAny } from 'react-redux';
import style from './BookComponent.module.scss';
import Pages from './Pages';

type Props = {
	loadSongBook: any;
	cloudinary: {
		songbook: Array<any>;
		loadingSongBook: boolean;
	};
};

const BookComponent = ({ loadSongBook, cloudinary: { songbook, loadingSongBook } }: Props) => {
	const [images, setImages] = useState<Array<any>>([]);

	useEffect(() => {
		loadSongBook();
	}, [loadSongBook]);

	useEffect(() => {
		if (songbook) {
			setImages(songbook);
		}
	}, [songbook]);

	if (loadingSongBook) {
		return <p>Loading..</p>;
	}

	return (
		<section className={style.container}>
			<div className={style.inner}>
				<div className={style.heading}>
					<h2>A Town Named Nowhere Songbook</h2>
					<p>Pages</p>
				</div>

				<Pages images={images} />
			</div>
		</section>
	);
};

BookComponent.propTypes = {};

const mapStateToProps = (state: RootStateOrAny) => ({
	cloudinary: state.cloudinary,
});

export default connect(mapStateToProps, { loadSongBook })(BookComponent);
