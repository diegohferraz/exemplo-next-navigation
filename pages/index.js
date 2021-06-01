import { getFeaturedEvents } from '../helpers/api-utils'
import EventList from '../components/events/event-list'

const HomePage = ({ events }) => {
  return (
    <div>
      <EventList items={events} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      events: featuredEvents
    }
  }
}
 
export default HomePage