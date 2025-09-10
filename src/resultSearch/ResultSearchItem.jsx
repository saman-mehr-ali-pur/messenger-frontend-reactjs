import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from '../assets/avatar.svg';
const styles = {
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        cursor: 'pointer',
        borderBottom: '1px solid #eee',
        transition: 'background 0.2s',
        borderRadius: '10px',
    },
    itemHover: {
        background: '#f5f5f5',
    },
    avatar: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: '12px',
        border: '1px solid #ddd',
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
    },
    name: {
        fontWeight: 600,
        color: '#222',
        marginBottom: '2px',
    },
    description: {
        fontSize: '13px',
        color: '#888',
    },
};

const ResultSearchItem = ({ avatar, name, description, onClickHandel }) => {
    const [hover, setHover] = React.useState(false);

    return (
        <div
            style={{
                ...styles.item,
                ...(hover ? styles.itemHover : {}),
            }}
            onMouseDown={onClickHandel} 
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
        
            {avatar && Array.isArray(avatar) && avatar.length > 0
        ? <img
            src={avatar[0]}
            alt="avatar"
            style={styles.avatar}
        />
        : <img
            src={defaultAvatar}
            alt="avatar"
            style={styles.avatar}
        /> }
            <div style={styles.info}>
                <div style={styles.name}>{name}</div>
                {description && (
                    <div style={styles.description}>{description}</div>
                )}
            </div>
        </div>
    );
};

ResultSearchItem.propTypes = {
    avatar: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    onClick: PropTypes.func,
};

ResultSearchItem.defaultProps = {
    description: '',
    onClick: () => {},
};

export default ResultSearchItem;