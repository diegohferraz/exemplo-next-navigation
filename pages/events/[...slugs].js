import { useRouter } from 'next/router'

import {getFilteredEvents} from '../../dummy-data'

import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/results-title/results-title'

const FilteredEventsPage = () => {
  const router = useRouter()

  const filterData = router.query.slugs

  if (!filterData) return <p className='center'>Loading...</p>

  const filteredYear = +filterData[0]
  const filteredMonth = +filterData[1]

  if (
    isNaN(filteredYear) || 
    isNaN(filteredMonth) ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return <p className='center'>Ivalid Filters</p>
  }

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth
  })

  if (!filteredEvents || filteredEvents.length === 0) return <p className='center'>No Events Found</p>

  const date = new Date(filteredYear, filteredMonth - 1)
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  )
}
 
export default FilteredEventsPage;