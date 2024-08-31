import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from 'react-router-dom';


const Rooms = ({room,fromdate,todate}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  return (
    <div className='bs row' >
        <div className='col-md-4'>
            <img src={room.images[0]} alt="rooms images" className='smallimg'/>
        </div>
         <div className='col-md-7'>
            <h2>{room.name}</h2>
            <b>
            <p>Max count :{room.maxcount}</p>
            <p>phone number :{room.mobile}</p>
            <p>Type: {room.type}</p>
            </b>
            <div style={{float:"right"}}>
              {(fromdate && todate) &&
                            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                            <button className="btn btn-primary" >Book Now </button>
                            </Link>}
              <button className="btn btn-primary m-2" onClick={handleShow}>View Details</button>
            </div>
        </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Body>
        <Carousel prevLabel='' nextLabel=''>
          {
            room.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                className="d-block w-100 bigimg"
                src={image}
                alt="First slide"
                />
                <p>{room.description}</p>
              </Carousel.Item>
            ))
          }
    </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> 
    </div>
  )
}

export default Rooms;
