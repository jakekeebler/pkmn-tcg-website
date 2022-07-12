import React from 'react';
import ModalImage from 'react-modal-image';


const Card = ({ name, images }) => (
    <>
        <div className="card">
            <ModalImage small={images.small} alt={name} large={images.large} />
        </div>
    </>
);


export default Card;