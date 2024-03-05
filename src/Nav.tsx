

import { useState, useEffect} from 'react';
// import MobileNav from './components/MobileNav';
import DesktopNav from './components/DesktopNav';
import MobileNav from './components/MobileNav';

export default function Nav(){
    // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     const button = event.currentTarget;
    //     const parent = button.parentElement;
    //     if (parent) {
    //       const siblings = Array.from(parent.children).filter(child => child !== button);
    //       siblings.forEach(sibling => sibling.classList.toggle('show'));
    //       parent.classList.toggle('show');
    //     }
    // }   
    // const [menuOpen, setMenuOpen] = useState(false);

    // const toggleMenu = () => {
    //     setMenuOpen(!menuOpen);
    // };
    const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);

    const updateMedia = () => {
      setDesktop(window.innerWidth > 650);
    };
    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
      });
    return (
        <>
        {isDesktop ? <DesktopNav/> : <MobileNav/>}
        
        </>
    )
}