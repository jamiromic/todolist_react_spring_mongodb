import React from "react";
import { Link } from "react-router-dom";

function ButtonElement(props) {
    const { text, onClick, url, bgcolor, color, width, id, type } = props;

    const style = {
        width: width,
        backgroundColor: bgcolor,
        color: color,
        display: 'inline-block',
        fontSize: '1rem',
        padding: '0.5rem 0.75rem',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,.2)',
        alignSelf: 'center',
        textAlign: 'center',
        margin: '1.5rem',
        textDecoration: 'none'
    };


    return (
        <Link style={style} id={id} onClick={onClick} type={type} to={url}>{text}</Link>
    );
}

export default ButtonElement;