import axios from 'axios'
import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'
import { ENDPOINT } from '../config/constants'
import PublicationCard from '../components/PublicationCard'
const publications = [
  {
    user_id: 101,
    publication_id: 1,
    creation_timestamp: '2024-08-28T14:30:00Z',
    title: 'Exploring New York',
    description: 'My travel experiences in New York City',
    img_url: 'https://cdn.mos.cms.futurecdn.net/rDubZBD2ryyFooKzbeRu9G.jpg',
    status: 'published'
  },
  {
    user_id: 102,
    publication_id: 2,
    creation_timestamp: '2024-08-27T10:15:00Z',
    title: 'Gourmet Adventures',
    description: 'A deep dive into unique food spots',
    img_url: 'https://cdn.mos.cms.futurecdn.net/rDubZBD2ryyFooKzbeRu9G.jpg',
    status: 'draft'
  },
  {
    user_id: 103,
    publication_id: 3,
    creation_timestamp: '2024-08-26T08:45:00Z',
    title: 'Art in San Francisco',
    description: 'A journey through the citys art scene',
    img_url: 'https://cdn.mos.cms.futurecdn.net/rDubZBD2ryyFooKzbeRu9G.jpg',
    status: 'published'
  },
  {
    user_id: 104,
    publication_id: 4,
    creation_timestamp: '2024-08-25T12:00:00Z',
    title: 'Tech Innovations',
    description: 'Latest developments in the tech world',
    img_url: 'https://cdn.mos.cms.futurecdn.net/rDubZBD2ryyFooKzbeRu9G.jpg',
    status: 'pending_review'
  },
  {
    user_id: 101,
    publication_id: 5,
    creation_timestamp: '2024-08-24T16:30:00Z',
    title: 'Wine Tasting Tips',
    description: 'An expert guide to tasting wine',
    img_url: 'https://cdn.mos.cms.futurecdn.net/rDubZBD2ryyFooKzbeRu9G.jpg',
    status: 'published'
  },
  {
    user_id: 105,
    publication_id: 6,
    creation_timestamp: '2024-08-23T09:00:00Z',
    title: 'Mountain Hiking',
    description: 'Best trails for beginners',
    img_url: 'https://cdn.mos.cms.futurecdn.net/rDubZBD2ryyFooKzbeRu9G.jpg',
    status: 'archived'
  }
]

const Home = () => {
  const { setDeveloper } = useContext(Context)

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data: [user] }) => setDeveloper({ ...user }))
        .catch(() => {
          window.sessionStorage.removeItem('token')
          setDeveloper(null)
        })
    }
  }

  useEffect(getDeveloperData, [])

  return (
    <div className='py-5'>
      <h1>Bienvenido a <span className='fw-bold'>⭐Starstruck</span></h1>
      <h4>¡Compra y vende tu estrella aquí!</h4>

      <div className='d-flex flex-wrap justify-content-center'>
        {publications.map(publication => (<PublicationCard key={publication.publication_id} publication={publication}/>))}
      </div>
    </div>
  )
}

export default Home
