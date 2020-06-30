import React, { useEffect, useState, useRef } from 'react';
import style from './TourSection.module.scss';
import { fetchEvents } from '../../actions/events';
import { connect } from 'react-redux';
import EventItem from './EventItem';
import LoadingSpinner from '../reusablecomps/LoadingSpinner';

interface Props {
	fetchEvents: () => any;
	events: any;
}

const TourSections = ({ fetchEvents, events: { events } }: Props) => {
	useEffect(() => {
		fetchEvents();
	}, [fetchEvents]);

	const tourRef = useRef<HTMLDivElement>(null);

	const [allEvents, toggleEvents] = useState<boolean>(false);

	const eventArray = events.slice(0, allEvents ? events.length : 10).map((event: any, i: number) => {
		return <EventItem event={event} key={i} index={i} />;
	});

	const [loading, setLoading] = useState<boolean>(false);

	const handleToggleEvents = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			toggleEvents(!allEvents);
			// window.scroll({ top: tourRef.current?.offsetTop, behavior: 'smooth' });
		}, 1000);
	};

	return (
		<section className={style.box}>
			<div className={style.heading} ref={tourRef}>
				<h2>Tour</h2>
			</div>

			<div className={style.events_container}>{eventArray}</div>
			{!loading ? (
				<button onClick={() => handleToggleEvents()}>
					{allEvents ? 'Reduce Tour Display' : 'Show More Dates'}
				</button>
			) : (
				<LoadingSpinner />
			)}
		</section>
	);
};

const mapStateToProps = (state: any) => {
	return {
		events: state.events,
	};
};

export default connect(mapStateToProps, { fetchEvents })(TourSections);
