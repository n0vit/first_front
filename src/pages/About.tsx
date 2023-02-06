import React, {useEffect} from 'react';
import "../styles/PageGrid.css"
import "../styles/About.css"

import {useActions} from "../hooks/UseActions";



const About = () => {
    useEffect(
        ()=>
        {
            // check_login()
        }
    )

    return (
        <div className="page_grid">
            <div className="actions">
                Here smt actions
            </div>
            <div className="content">
                <div className="title">
                    <div className="title__h">Our Values</div>
             <div className="title__p">Collaborating with Allnodes, both on a partnership level or a customer level means believing in what we are passionate about and siding with our core values. We invite you to discover what makes us tick and what we care about the most.
             </div>
                </div>
                    <div className='cards'>
                            <img className="cards__image" src="https://www.allnodes.com/8d9d01c1eb85f4259103.png" alt=""/>

                    <div className="cards__header">Growing together
                        through an alliance </div>
                    <div className="cards__text">We strongly believe in the power of relationships. Connecting and working closely with different blockchain sectors is extremely important for us. It allows us to release our full potential, expand our scale, and grow our community inside and outside the company. The only way for the crypto industry will reach mass adoption is when we unite and work together.</div>
                </div>
</div>
        </div>
    );
};

export default About;
