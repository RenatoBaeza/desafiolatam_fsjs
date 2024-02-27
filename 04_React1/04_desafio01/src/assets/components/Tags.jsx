/* eslint-disable react/prop-types */
import Badge from 'react-bootstrap/Badge';

const Tags = ({text, bgcolor}) => {
    return <Badge bg={bgcolor}>{text}</Badge>;
};
export default Tags;