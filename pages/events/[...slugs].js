import { useRouter } from 'next/router'

import { getFilteredEvents } from '../../helpers/api-utils'

import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/results-title/results-title'

const FilteredEventsPage = ({ events, hasError, filterDate }) => {
  const router = useRouter()

  if (!events) return <p className='center'>Loading...</p>

  if (hasError) {
    return <p className='center'>Ivalid Filters</p>
  }

  if (!events || events.length === 0) return <p className='center'>No Events Found</p>

  const date = new Date(filterDate.year, filterDate.month - 1)
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { params } = context

  const filterData = params.slugs

  const filteredYear = +filterData[0]
  const filteredMonth = +filterData[1]

  if (
    isNaN(filteredYear) || 
    isNaN(filteredMonth) ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
      props: { hasError: true }
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth
  })

  return {
    props: {
      events: filteredEvents,
      filterDate: {
        year: filteredYear,
        month: filteredMonth
      }
    }
  }

}
 
export default FilteredEventsPage;