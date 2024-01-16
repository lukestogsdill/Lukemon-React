import React, { useState, useEffect } from 'react'
import './css/PostFight.css'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'
import '../components/css/pokeTypes.css'
import { LukeCard } from '../components/lukeCard'
import { Pagination } from '../components/pagination'
import { FilterBox } from '../components/filterBox'

function PostFight(props) {
  props.setSelected("home")
  const [feed, setFeed] = useState({
    posts: [],
    total_pages: 1,
    current_page: 1,
    total_posts: 1,
  })
  const [filter, setFilter] = useState(['Date'])
  const [perPage, setPerPage] = useState([10])
  const [page, setPage] = useState(1)
  const teamData = []
  const filterOptions = [ 'Date', 'Value' ]
  const perPageOptions = [ 1, 3, 5 ]

  useEffect(() => {
      getPlayerTeam()
  },[])

  useEffect(() => {
    getFeed(page, perPage, filter)
  },[page, perPage, filter])

  const MomentAgo = ({ storedTime }) => {
    const [timeDifference, setTimeDifference] = useState('');

    useEffect(() => {
      const calculateTimeDifference = () => {
        const storedDateTime = new Date(storedTime);
        const currentTime = new Date();

        const timeDiffInSeconds = Math.floor((currentTime - storedDateTime) / 1000);

        if (timeDiffInSeconds < 60) {
          setTimeDifference('moments ago');
        } else if (timeDiffInSeconds < 3600) {
          const minutes = Math.floor(timeDiffInSeconds / 60);
          setTimeDifference(`${minutes} minute${minutes === 1 ? '' : 's'} ago`);
        } else if (timeDiffInSeconds < 86400) {
          const hours = Math.floor(timeDiffInSeconds / 3600);
          setTimeDifference(`${hours} hour${hours === 1 ? '' : 's'} ago`);
        } else if (timeDiffInSeconds < 2592000) {
          const days = Math.floor(timeDiffInSeconds / 86400);
          setTimeDifference(`${days} day${days === 1 ? '' : 's'} ago`);
        } else if (timeDiffInSeconds < 31104000) {
          const months = Math.floor(timeDiffInSeconds / 2592000);
          setTimeDifference(`${months} month${months === 1 ? '' : 's'} ago`);
        } else {
          const years = Math.floor(timeDiffInSeconds / 31104000);
          setTimeDifference(`${years} year${years === 1 ? '' : 's'} ago`);
        }
      };
      calculateTimeDifference();
    }, [storedTime]);

    return <small>{timeDifference}</small>
  };

  const getFeed = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getFeed?page=${page}&per_page=${perPage}&filter=${filter}`
      )
      const data = await response.json()
      setFeed(data)
    } catch (error) {
      console.error('Error fetching feed:', error)
    }
    console.log('tt')
    console.log(feed)
  }

  const getPlayerTeam = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getPlayerTeam`, {
      headers: {
        Authorization: `Bearer ${props.token}`,
      }
    })
    const data = await response.json()
    for (let i = 0; i < data.length; i++) {
      teamData[data[i]['onTeam']] = data[i]
    }
    props.setTeam(teamData)
  }

  const handleFilterSelect = (selectedOption) => {
    console.log(`Selected option: ${selectedOption}`)
    setFilter(selectedOption)
  }

  const handlePerPage = (selectedOption) => {
    setPerPage(selectedOption)
  }

  return (
    <div className='postTree'>
      <div className='teamDisplay'>
        {props.team.map((poke) => {
          return (
            <>
              <LukeCard poke={poke} />
            </>
          )
        })}
      </div>
        <Pagination feed={feed} setPage={setPage} />
        <FilterBox options={filterOptions} onSelect={handleFilterSelect} />
        <FilterBox options={perPageOptions} onSelect={handlePerPage} />
      <div className='postContainer'>
        {feed.posts.map((feed) => {
          return (
            <div className='postedFight'>
              <div className='profileContainer'>
                <div className='profilePic'
                  style={{
                    backgroundImage: `url(${feed.user_img})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '50px'
                  }} />

                <h2>{feed.username}</h2>
              </div>
              <h4>{feed.caption}</h4>
              <ul>
                {feed.team_urls.map((urls) => {
                  return (
                    <img className='team_urls' src={urls} />
                  )
                })}
              </ul>
              <p className='team_value'><FontAwesomeIcon icon={faSackDollar} /> {feed.team_value}</p>
              <p><MomentAgo storedTime={feed.date_created} /></p>
              <Link to={`/lukefight/?id=${feed.user_id}&value=${feed.team_value}&bankerName=${feed.username}`} className='fightBtn'>
                <div>FIGHT!</div>
              </Link>
            </div>
          )
        })}
      </div>
      <Pagination feed={feed} getFeed={getFeed} />
    </div>
  )
}

export default PostFight
