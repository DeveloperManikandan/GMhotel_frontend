import React from 'react';
import {motion} from 'framer-motion';

const HomeScreen = () => {
  function gotoLogin(){
    window.location.href = "/login";
  }
  return (
    <div className='row landing'>
        <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }} className='col-md-12 topics '>
            <h2 style={{color:'white',fontSize:'150px'}} className='hotelname'>GMhotel</h2>
            <h1 className='text-center' style={{color:'white'}}>Welcomes you guy's</h1>
            <button className='btn btn-primary st' onClick={gotoLogin}>Get Started</button>
        </motion.div>
    </div>
  )
}

export default HomeScreen;
