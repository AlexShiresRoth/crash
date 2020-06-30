import React from 'react';
import PropTypes from 'prop-types';
import style from './EventItem.module.scss';
import { format } from 'date-fns';
import { Icon } from '@iconify/react';
import bandsintownIcon from '@iconify/icons-simple-icons/bandsintown';
interface Props {
	event: any;
	index: number;
}
const EventItem = ({ event, index }: Props) => {
	const eventDate = new Date(event.datetime);
	const time = format(eventDate, 'PPPP p');
	return (
		<div className={style.item} key={index}>
			<div className={style.col}>
				<Icon icon={bandsintownIcon} />
			</div>
			<div className={style.col}>
				<p>
					<span>Date:</span> {time}
				</p>
			</div>
			<div className={style.col}>
				<p>
					<span>Venue:</span> {event.venue.name}
				</p>
			</div>
			<div className={style.col}>
				<p>
					<span>Location:</span> {event.venue.city}, {event.venue.region}
				</p>
			</div>
			<div className={style.col}>
				<a href={event.url} rel="noopener noreferrer" target="_blank">
					<button>Event Page</button>
				</a>
			</div>
		</div>
	);
};

EventItem.propTypes = {
	event: PropTypes.object,
	index: PropTypes.number,
};

export default EventItem;
