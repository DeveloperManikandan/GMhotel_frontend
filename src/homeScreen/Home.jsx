import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rooms from '../components/Rooms';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';

const Home = () => {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromdate, setFromdate] = useState(null);
  const [todate, setTodate] = useState(null);
  const [duplicaterooms, setDuplicaterooms] = useState([]);
  const [searchKey,setSearchKey] = useState('');
  const [type,setType] = useState('all');

  useEffect(() => {
    setLoading(true);
    axios.get('https://gmhotel.onrender.com/api/rooms/getallrooms')
      .then(response => {
        setRooms(response.data);
        setDuplicaterooms(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        console.error(error);
        setLoading(false);
      });
  }, []);

  function filterByDate(dates) {
    const from = dates[0].format('YYYY-MM-DD');
    const to = dates[1].format('YYYY-MM-DD');
    setFromdate(from);
    setTodate(to);
    const temprooms = duplicaterooms.filter(room => {
      let availability = true;

      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          const isBetweenStart = moment(dates[0].format('YYYY-MM-DD')).isBetween(booking.fromdate, booking.todate, undefined, '[]');
          const isBetweenEnd = moment(dates[1].format('YYYY-MM-DD')).isBetween(booking.fromdate, booking.todate, undefined, '[]');

          if (isBetweenStart || isBetweenEnd ||
            dates[0].format('YYYY-MM-DD') === booking.fromdate ||
            dates[0].format('YYYY-MM-DD') === booking.todate ||
            dates[1].format('YYYY-MM-DD') === booking.fromdate ||
            dates[1].format('YYYY-MM-DD') === booking.todate) {
            availability = false;
            break;
          }
        }
      }

      return availability || room.currentbookings.length === 0;
    });

    setRooms(temprooms);
  }

  function filterBySearch(){
    const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchKey.toLowerCase()));
    setRooms (temprooms);
    }
    function filterByType(e){
      if(e!=='all')
      {
      setType(e);
      const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase());
      setRooms (temprooms);
      }
      else{
        setRooms(duplicaterooms);
      }
      }

  return (
    loading ? <Loader /> : error ? <Error /> : (
      <div className='container'>
        <div className='row mt-5 bs'>
          <div className='col-md-3'>
            <RangePicker onChange={filterByDate} format="YYYY-MM-DD" />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control " placeholder='search rooms' 
            value={searchKey} onChange={e => setSearchKey(e.target.value)} onKeyUp={filterBySearch}/>
          </div>
          <div className="col-md-4">
            <select className="form-control" value={type} onChange={e => filterByType(e.target.value)}>
              <option value="all">All</option>
              <option value="single">Single</option>
              <option value="family">Family</option>
            </select>
          </div>
        </div>
        <div className='row justify-content-center mt-5'>
          {
            rooms.map((room, index) => {
              return (
                <div className='col-md-9' key={index}>
                  <Rooms room={room} fromdate={fromdate} todate={todate} />
                </div>
              );
            })
          }
        </div>
      </div >
    )
  );
};

export default Home;
