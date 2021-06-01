import { useRouter } from 'next/router'
import { getAllEvents } from '../../helpers/api-utils'

import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'

const Events = ({ events }) => {
  const router = useRouter()

  function findEventesHandler(year, month) {
    router.push(`/events/${year}/${month}`)
  }

  return (
    <div>
      <EventsSearch onSearch={findEventesHandler} />
      <EventList items={events} />
    </div>
  )
}

export async function getStaticProps() {
  const events = await getAllEvents()

  return {
    props: {
      events
    },
    revalidate: 60
  }

}
 
export default Events