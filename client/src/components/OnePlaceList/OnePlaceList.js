import React from 'react';
import {Image, Panel} from "react-bootstrap";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import moment from 'moment';
import config from '../../config';
import notFound from '../../assets/images/not-found.jpeg';

const OnePlaceList = props => {
    console.log(props);
    let image = notFound;

    if (props.image) {
        image = config.apiUrl + '/uploads/' + props.image;
    }

    const formattedDate = moment(new Date).format('DD-MM-YYYY: HH-mm');

    return (
        <Panel>
            <Panel.Body>
                <Image
                    style={{width: '100px', marginRight: '10px'}}
                    src={image}
                    thumbnail
                />
                <Link to={'/places/' + props.id}>
                    {props.title}
                </Link>
                <div className="place_date">
                    {formattedDate}
                </div>
            </Panel.Body>
        </Panel>
    );
};

OnePlaceList.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
};

export default OnePlaceList;