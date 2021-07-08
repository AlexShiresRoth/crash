import React from "react";
import PropTypes from "prop-types";
import style from "./EventItem.module.scss";
import { format } from "date-fns";
interface Props {
  event: any;
  index: number;
}
const EventItem = ({ event, index }: Props) => {
  const eventDate = new Date(event.datetime);
  const time = format(eventDate, "iii, MMM d");

  return (
    <div className={style.item} key={index}>
      <div className={style.col}>
        <h2>{time.toUpperCase()}</h2>
      </div>
      <div className={style.col}>
        <p>{event.venue.name}</p>
      </div>
      <div className={style.col}>
        <p>
          {event.venue.city}, {event.venue.region}
        </p>
      </div>
      <div className={style.col}>
        <a href={event.url} rel="noopener noreferrer" target="_blank">
          <button>Event Page</button>
        </a>
        {event.offers.length > 0 ? (
          event.offers.map((offer: any, i: number) => {
            return (
              <a
                href={offer.url}
                rel="noopener noreferrer"
                target="_blank"
                key={i}
              >
                <button>{offer.type}</button>
              </a>
            );
          })
        ) : (
          <a
            href={event.url + "&trigger=notify_me"}
            rel="noopener noreferrer"
            target="_blank"
          >
            <button>Notify Me</button>
          </a>
        )}
      </div>
    </div>
  );
};

EventItem.propTypes = {
  event: PropTypes.object,
  index: PropTypes.number,
};

export default EventItem;
