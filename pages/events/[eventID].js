import { getEventById, getFeaturedEvents } from '../../helpers/api-utils'

import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'

const EventDetail = ({ selectedEvent }) => {
  if (!selectedEvent) return <p>No event found...</p>

  return (
    <>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
    </>
  )
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents()

  const paths = events.map(event => ({ params: { eventID: event.id }}))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(context) {
  const eventID = context.params.eventID

  const event = await getEventById(eventID)

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  }
}
 
export default EventDetail