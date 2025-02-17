// this timeline component is for show visualization of events here we show the event in timeline way
// Importing React library
import React from 'react';
import './Timeline.css';
import gun from '../assets/gun.png'
import tornado from '../assets/tornado.png'
import tsunami from '../assets/tsunami.png'
import volcano from '../assets/volcano.png'
import human from '../assets/human.png'
import alert from '../assets/alert.png'
import bomb from '../assets/bomb.webp'
import m16 from '../assets/m16.webp'
import fight from '../assets/fight.webp'
import news from '../assets/news.webp'
import timenews from '../assets/timenews.png'
// importing few imagees that related to topic of the timeline  
function chooseImage(event) {// this  function for randomly choose an image for an  relevant event
  
  let images = [m16,alert,bomb,gun,human,m16,news,fight,m16,news,volcano,tsunami,timenews]
  let randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}
// this Function to calculate and return a color based on event 
function redByStrength(i) {
  let r = 240
  let g = ((Math.min(10,i*2) - 0) * (165 - 0)) / (10 - 0)
  let b = 0
  return `rgb(${r},${g},${b})`
}

const Timeline = ({ events,isNightMode }) => {
  return (
    <div className='my-[2rem] w-full  no-scrollbar overflow-x-scroll overflow-y-visible '>
      <div className='timeline-container flex flex-row lg:w-full px-[1rem] overflow-x-scroll scrollbar' style={{
      }}>

      {events.map((event, index) => (
        <div key={event.id} className='py-[.5rem] h-[800px] w-[200px] flex items-center  no-scrollbar  relative'
        style={{
        }}>
          {/*<div className="timeline-dot"></div> */}
        
            <div className={`block  w-[150px] h-[50px] mx-[3px]`} style={{
              background: redByStrength(index)
            }}>
             
             <div className='h-[215px] w-[4px]  block ' style={{
              left: '25%',
              background: isNightMode ? 'whitesmoke' : 'black',
              zIndex:9999,
              transform: index % 2 === 0 ? 'translateX(70px) translateY(-190px)' : 'translateY(25px) translateX(70px) '
             }}/>

              <div className='h-[20px] w-[20px] rounded-full border-[3px]  block ' style={{
                zIndex:100,
              border: isNightMode ? '1px solid whitesmoke' : '1px solid black',
              transform: index % 2 === 0 ? 'translateX(62px) translateY(-200px)' : 'translateY(-200px) translateX(63px) '
             }}/>



              <div className='h-[20px] text-black w-[20px] relative  block ' style={{
                zIndex:9999,
              transform: index % 2 === 0 ? 'translateX(64px) translateY(-100px)' : 'translateY(-350px) translateX(63px) '
             }}/>
             <p className='absolute overflow-y-scroll max-h-[270px] no-scrollbar max-w-[170px]' style={{
              top: index % 2 === 0 ? '450px' : '100px',
              color: isNightMode ? 'whitesmoke' : 'black'
             }}>
              <p className='font-bold text-[24px]'>{new Date(event.start).toLocaleDateString()}</p>
                {event.description}
              </p>
             
              </div>

              <div className='h-[120px] grid place-items-center w-[120px] block absolute ' style={{
              background: redByStrength(index),
              borderRadius:'50%',
              left:'50%',
              transform: index % 2 === 0 ? 'translateX(-62px) translateY(-200px)' : 'translateY(235px) translateX(-60px) '
             }}>



              <img className='w-[60px]' src={chooseImage(event)} alt="none"/>
              </div>
             

          {/*<div className="timeline-content text-[black] min-h-[400px]">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {new Date(event.start).toLocaleDateString()}</p>
            <p className='max-h-[200px] overflow-scroll no-scrollbar'>{event.description}</p>
          </div>*/}
        </div>
      ))}
    </div>
    </div>

  );
};
// Exporting the Timeline component for use in other parts of the application
export default Timeline;
