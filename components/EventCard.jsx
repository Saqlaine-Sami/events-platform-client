import Link from "next/link";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import { formatDate } from "@/lib/format";

export default function EventCard({ event }) {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-md h-full">
      <figure className="h-48 w-full">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div>
          <span className="badge badge-primary">{event.eventType}</span>
        </div>
        <h3 className="card-title line-clamp-1">{event.title}</h3>
        <p className="flex items-center gap-2 text-sm">
          <FaLocationDot className="text-primary shrink-0" />
          <span className="line-clamp-1">{event.location}</span>
        </p>
        <p className="flex items-center gap-2 text-sm">
          <FaCalendarDays className="text-primary shrink-0" />
          {formatDate(event.date)}
        </p>
        <div className="card-actions mt-auto pt-2">
          <Link href={`/events/${event._id}`} className="btn btn-primary w-full">
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
}