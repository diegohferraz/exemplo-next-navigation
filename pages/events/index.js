import { useRouter } from 'next/router'
import { getAllEvents } from '../../dummy-data'

import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'

const Events = () => {
  const router = useRouter()
  const featuredEvents = getAllEvents()

  function findEventesHandler(year, month) {
    router.push(`/events/${year}/${month}`)
  }

  return (
    <div>
      <EventsSearch onSearch={findEventesHandler} />
      <EventList items={featuredEvents} />
    </div>
  )
}
 
export default Events