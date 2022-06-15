import React from 'react';


const Card = ({ name, images }) => (
    <>
        <div className="card">
            <img src={images.small} alt={name} />
        </div>
    </>
);


export default Card;