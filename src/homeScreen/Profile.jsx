import React, { useEffect, useState } from 'react';
import { Tabs,Tag } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Swal from 'sweetalert2';

const Profile = () => {
    const userdetails = JSON.parse(localStorage.getItem('currentUser'));
    useEffect(() => {
        if (!userdetails) {
            window.location.href = '/login';
        }
    }, [userdetails]);


    const items = [
        {
            key: '1',
            label: 'Profile Details',
            children: (
                <div className='fs-4'>
                    <h1>My profile</h1>
                    <br />
                    <h1>Username: {userdetails.name}</h1>
                    <h1>Email: {userdetails.email}</h1>
                    <h1>isAdmin: {userdetails.isAdmin ? 'Yes' : 'No'}</h1>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Booking Details',
            children: <BookingDetails />,
        },
    ];

    return (
        <div className='m-5 mt-3'>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
};

export default Profile;

export function BookingDetails(){
    const [bookings, setBookings] = useState([]);
const [loading, setLoading] = useState(false);
const userdetails = JSON.parse(localStorage.getItem('currentUser'));
    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.post('https://gmhotel.onrender.com/api/bookings/getbookingsbyuserid', {userid:userdetails._id});
                const roomData = response.data;
                console.log(roomData);
                
                setBookings(roomData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching room details:', error);
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, []); 

    async function cancelbooking(bookingid,roomid) {
        try {
            setLoading(true);
            const response = await axios.post('https://gmhotel.onrender.com/api/bookings/cancelbooking', {bookingid,roomid});
            const roomData = response.data;
            setLoading(false);
            Swal.fire("Congratulation..",'Your room cancelled Successfully','success').then(
                () => {
                  window.location.reload();
                });
        } catch (error) {
            console.error('Error fetching room details:', error);
            setLoading(false);
            Swal.fire("Oops...",'something went wrong','error');
        }
    }

    return (
        <div className='row'>
            <div className='col-md-12'>
                {loading && <Loader />}
                {bookings.map((booking, index) => (
                    <div key={index} className='bs'>
                        <h1>Room Name: {booking.room}</h1>
                        <p><b>Check-in Date:</b> {booking.fromdate}</p>
                        <p><b>Check-out Date</b>: {booking.todate}</p>
                        <p><b>Amount:</b> {booking.totalamount}</p>
                        <p><b>Room Status:</b> {booking.status === 'booked' ?<Tag color="green">Confirmed</Tag> :<Tag color="red">Cancelled</Tag> }</p>
                        {
                            (booking.status==='booked')
                         &&(<div className="text-right" style={{textAlign:'right'}}>
                            <button className="btn btn-primary"
                            onClick={() => cancelbooking(booking._id,booking.roomid)}>Cancel booking</button>
                        </div>)}
                    </div>
                ))}
            </div>
        </div>
    )
};