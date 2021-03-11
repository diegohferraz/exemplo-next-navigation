import { useRouter } from 'next/router'

import { getEventById } from '../../dummy-data'

import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'

const EventDetail = () => {
  const router = useRouter()

  const eventID = router.query.eventID
  const eventData = getEventById(eventID)

  if (!eventData) return <p>No event found!</p>

  return (
    <>
      <EventSummary title={eventData.title} />
      <EventLogistics
        date={eventData.date}
        address={eventData.location}
        image={eventData.image}
        imageAlt={eventData.title}
      />
      <EventContent>
        <p>{eventData.description}</p>
      </EventContent>
    </>
  )
}
 
export default EventDetail