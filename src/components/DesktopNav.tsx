import {Link} from "react-router-dom"
import React, {useState, useEffect} from 'react';
import './DesktopNav.css'

export default function DesktopNav() {
    // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     const button = event.currentTarget;
    //     const parent = button.parentElement;
    //     if (parent) {
    //       const siblings = Array.from(parent.children).filter(child => child !== button);
    //       siblings.forEach(sibling => sibling.classList.toggle('show'));
    //       parent.classList.toggle('show');
    //     }
    // }   
    // type PrayerTimes = {
    //     Fajr: string;
    //     Dhuhr: string;
    //     Asr: string;
    //     Maghrib: string;
    //     Isha: string;
    //     Sunrise: string
    //     // Add other prayer times properties here if needed
    // }
    // const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(); // State to store the fetched prayer times
    // const today: Date = new Date();
    // const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    // const todayDate: string = today.toLocaleDateString('en-GB', options).replace(/\//g, '-');
    // // Function to fetch prayer times using the API
    // const fetchPrayerTimes = async () => {
    //     try {
    //         const response = await fetch(`https://api.aladhan.com/v1/timingsByAddress?address=Muslim Welfare House of Leicester, Leicester, UK&method=2&${todayDate}`); // Replace 'API_ENDPOINT_URL' with the actual API endpoint
    //         const data = await response.json();
    //         console.log(data);
    //         setPrayerTimes(data.data.timings); // Assuming the API response contains 'timings' object
    //     } catch (error) {
    //         console.error('Error fetching prayer times:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchPrayerTimes(); // Fetch prayer times when the component mounts
    // }, []);
    return (
        <>
        <nav id="top" className='nav'>
        
            <Link to={"/"} className="logo">LOGO</Link>
            <div className="navGroup">
                <Link to={"/search"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="purple" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </Link>
                <Link to={"/cart"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="purple" className="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                </Link>
            </div>
        
        </nav>       
        <nav className='nav' id='bottom'>
                    <ul className="nav-links" id='bottomLinks'>
                        <li>
                            
                            <Link className='links' to={"/Campaigns"}>Campaigns</Link>
                        </li>
                        <li>
                        
                            <Link className='links' to={"/Lessons"}>Lessons</Link>
                        </li>
                        <li>
                        
                            <Link className='links' to={"/Contact"}>Contact</Link>
                        </li>
                        <li>
                        
                            <Link className='links' to={"/EventBooking"}>Room-Hire</Link>
                        </li>
                        <li>
                        
                            <Link className='links' to={"/Lectures"}>Lectures</Link>
                        </li>
                        <li>
                        
                            <Link className='links' to={"/Services"}>Services</Link>
                        </li>
                    </ul>
        </nav>
        </>
    )
}