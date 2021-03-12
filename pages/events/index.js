import { getAllEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'

const Events = () => {
  const featuredEvents = getAllEvents()

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  )
}
 
export default Events