import { API_URL_FROM_CONTENT_URL, GUI_DEFAULT_IMAGES, NAVIGATION_PAGES } from '@/config';
import React from 'react'

import "@/styles/pages/nests/nest-card.css";
import { Link } from 'react-router-dom';

const NestCard = ({ nest, mod }) => {
    const {
        icon, description, displayName, title
    } = nest;
    console.log(nest, mod)
    return (
        <Link className='nest-card'
        to={NAVIGATION_PAGES.nests.title(title)}
        viewTransition={true}
        >
            <img
                className='nest-icon'
                src={API_URL_FROM_CONTENT_URL(icon)}
                alt={`${title}'s icon`}
            />
            <div className="nest-stack">
                <div className='nest-title-container'>
                    <small>n/{title}</small>
                    { mod && <img src={GUI_DEFAULT_IMAGES.modIcon.image} alt={GUI_DEFAULT_IMAGES.modIcon.alt} />}
                </div>
                <span>{displayName}</span>
                <p>{description}</p>
            </div>
            
        </Link>
    )
}

export default NestCard