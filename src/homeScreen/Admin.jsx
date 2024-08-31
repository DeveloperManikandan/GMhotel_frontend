import React, { useState, useEffect } from 'react';
import { Tabs, Tag } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Swal from 'sweetalert2';

const Admin = () => {

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('currentUser')).isAdmin) {
            window.location.href = '/home';
        }
    }, [])


    const items = [
        {
            key: '1',
            label: 'Rooms Details',
            children: <RoomDetails />,
        },
        {
            key: '2',
            label: 'Booking Details',
            children: <BookingDetails />,
        },
        {
            key: '3',
            label: 'User Details',
            children: <UserDetails />,
        },
        {
            key: '4',
            label: 'Add Rooms',
            children: <AddRoom />,
        },
    ];

    return (
        <div className='m-5 mt-3'>
            <h2 style={{ marginTop: '30px' }}><b style={{ fontSize: '30px' }}>ADMIN PANEL</b></h2>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}

export default Admin;

export function BookingDetails() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://gmhotel.onrender.com/api/bookings/getallbookings');
                const roomData = response.data;
                setBookings(roomData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching room details:', error);
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                {loading && <Loader />}
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th>Room Name</th>
                            <th>Check-in Date</th>
                            <th>Check-out Date</th>
                            <th>Amount</th>
                            <th>Room Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index} className='bs'>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.totalamount}</td>
                                <td>{booking.status === 'booked' ? <Tag color="green">Confirmed</Tag> : <Tag color="red">Cancelled</Tag>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export function RoomDetails() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://gmhotel.onrender.com/api/rooms/getallrooms');
                const roomData = response.data;
                setRooms(roomData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching room details:', error);
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                {loading && <Loader />}
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th>Room Id</th>
                            <th>Room Name</th>
                            <th>Room Type</th>
                            <th>Max Count</th>
                            <th>Mobile No</th>
                            <th>Rent per day</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room, index) => (
                            <tr key={index}>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.maxcount}</td>
                                <td>{room.mobile}</td>
                                <td>{room.rent}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export function UserDetails() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://gmhotel.onrender.com/api/user/getuser');
                const roomData = response.data;
                setUsers(roomData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching room details:', error);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                {loading && <Loader />}
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>is Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export function AddRoom() {
    const [roomName, setRoomName] = useState('');
    const [maxcount, setMaxcount] = useState('');
    const [mobile, setMobile] = useState('');
    const [rent, setRent] = useState('');
    const [images1, setImages1] = useState('');
    const [images2, setImages2] = useState('');
    const [images3, setImages3] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    async function addRoom() {
        const roomDetails = {
            name :roomName,
            maxcount :maxcount,
            mobile:mobile,
            rent,
            images: [images1, images2, images3],
            currentbookings: [],
            type,
            description
        };
        try {
            setLoading(true);
            const response =await(await axios.post('https://gmhotel.onrender.com/api/rooms/addroom', roomDetails)).date;
            setRoomName('');
        setMaxcount('');
        setMobile('');
        setRent('');
        setImages1('');
        setImages2('');
        setImages3('');
        setType('');
        setDescription('');
            setLoading(false);
            Swal.fire("Congratulation",'Room added successfully','success').then(window.location.reload());
        } catch (error) {
            console.error('Error adding room details:', error);
            Swal.fire("Oopss..",'Something went wrong','error');
            setLoading(false);
        }
        
    }

    return (
        <div className='row'>
            {loading && <Loader />} {/* Conditionally render Loader */}
            <div className='col-md-5'>
                <input type="text" className='form-control' placeholder='Room Name'
                    value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                <input type="text" className='form-control' placeholder='Max Count'
                    value={maxcount} onChange={(e) => setMaxcount(e.target.value)} />
                <input type="text" className='form-control' placeholder='Mobile Number'
                    value={mobile} onChange={(e) => setMobile(e.target.value)} />
                <input type="text" className='form-control' placeholder='Rent per Day'
                    value={rent} onChange={(e) => setRent(e.target.value)} />
                <input type="text" className='form-control' placeholder='Description'
                    value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className='col-md-5'>
                <input type="text" className='form-control' placeholder='Type'
                    value={type} onChange={(e) => setType(e.target.value)} />
                <input type="text" className='form-control' placeholder='Image URL 1'
                    value={images1} onChange={(e) => setImages1(e.target.value)} />
                <input type="text" className='form-control' placeholder='Image URL 2'
                    value={images2} onChange={(e) => setImages2(e.target.value)} />
                <input type="text" className='form-control' placeholder='Image URL 3'
                    value={images3} onChange={(e) => setImages3(e.target.value)} />
                <div className='mt-3' style={{ textAlign: 'right' }}>
                    <button type="submit" className='btn btn-primary' onClick={addRoom}>Add Room</button>
                </div>
            </div>
        </div>
    );
}
