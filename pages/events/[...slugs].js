import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

// import { getFilteredEvents } from '../../helpers/api-utils'

import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/results-title/results-title'

const FilteredEventsPage = ({ events, hasError, filterDate }) => {
  const [loadedEvents, setLoadedEvents ] = useState()
  const router = useRouter()
  const filterData = router.query.slugs

  const { data, error } = useSWR('https://estudos-dd8db.firebaseio.com/events.json')

  useEffect(() => {
    if (data) {
      const events = []

      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        })
      }

      setLoadedEvents(events)
    }
  }, [data])

  if (!loadedEvents) return <p className='center'>Loading...</p>

  const filteredYear = +filterData[0]
  const filteredMonth = +filterData[1]

  if (
    isNaN(filteredYear) || 
    isNaN(filteredMonth) ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12 ||
    error
  ) return <p className='center'>Ivalid Filters</p>

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === filteredYear && eventDate.getMonth() === filteredMonth - 1;
  });


  if (!filteredEvents || filteredEvents.length === 0) return <p className='center'>No Events Found</p>

  const date = new Date(filteredYear, filteredMonth - 1)
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  )
}

// export async function getServerSideProps(context) {
//   const { params } = context

//   const filterData = params.slugs

//   const filteredYear = +filterData[0]
//   const filteredMonth = +filterData[1]

//   if (
//     isNaN(filteredYear) || 
//     isNaN(filteredMonth) ||
//     filteredYear < 2021 ||
//     filteredMonth < 1 ||
//     filteredMonth > 12
//   ) {
//     return {
//       props: { hasError: true }
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: filteredYear,
//     month: filteredMonth
//   })

//   return {
//     props: {
//       events: filteredEvents,
//       filterDate: {
//         year: filteredYear,
//         month: filteredMonth
//       }
//     }
//   }

// }
 
export default FilteredEventsPage;