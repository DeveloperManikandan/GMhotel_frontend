
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';

const BookingScreen = ({ match }) => {
  const { roomid,fromdate,todate} = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState([]);
  const totaldays = moment(todate.toString()).diff(moment(fromdate.toString()), 'days')+1;
  const username = JSON.parse(localStorage.getItem('currentUser')).name;
  const [totalamount, setTotalamount] = useState(0); 

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.post('https://gmhotel.onrender.com/api/rooms/getroombyid', {
          roomid: roomid,
        });
        const roomData = response.data;
        setRoom(roomData);
        setTotalamount(totaldays * roomData.rent); // Calculate totalamount after room data is set
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room details:', error);
        setError(error);
        setLoading(false);
      }
    };
  
    fetchRoomDetails();
  }, [roomid, totaldays]);
  

  async function onToken(token){
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    };
    
    try {
      setLoading(true);
      const response = await axios.post('https://gmhotel.onrender.com/api/bookings/bookroom', bookingDetails);
      setLoading(false);
      Swal.fire("Congratulation..",'Your room Booked Successfully','success').then(
        () => {
          window.location.href = '/profile';
        });
    } catch (error) {
      setLoading(false);
      Swal.fire("Oopss..",'Something went wrong','error');
    }
    
  }

  return (
    loading ? <Loader /> : !room.name ? <Error /> :
      <div className='m-5'>
        <div className='row justify-content-center mt-5 bs'>
          <div className='col-md-6'>
            <p>Room Name: {room.name}</p>
            <img src={room.images[0]} alt="" className='bigimg' />
          </div>
          <div className='col-md-6'>
            <div style={{ textAlign: 'right' }}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>Name : {username}</p>
                <p>From Date : {fromdate}</p>
                <p>To Date : {todate}</p>
                <p>Max Count : {room.maxcount}</p>
              </b>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h1>Amount</h1>
              <hr />
              <b>
                <p>Total days : {totaldays}</p>
                <p>Rent per day : {room.rent}</p>
                <p>Total Amount : {totalamount}</p>
              </b>
            </div>
            <div style={{ float: 'right' }}>
              
              <StripeCheckout
              amount={totalamount * 100}
        token={onToken}
        currency='INR'
        stripeKey="pk_test_51Psg41CsGAlJLD7F2wyv9MhGTJQYGLyq1Cp9P2vCxa5k1b5s6CW6zlrE45ACDtDqKdQ7HsLQghH4sBJOHXIwoptZ00c9Bnf63Z" >
          <button className="btn btn-primary" >Pay now</button>
          </StripeCheckout>
            </div>
          </div>
        </div>
      </div>
  );
}

export default BookingScreen
