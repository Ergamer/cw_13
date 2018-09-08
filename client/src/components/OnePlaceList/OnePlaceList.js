import React from 'react';
import {Image, Panel} from "react-bootstrap";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import moment from 'moment';
import config from '../../config';
import notFound from '../../assets/images/not-found.jpeg';
import {FaTrash} from "react-icons/fa/index";

class OnePlaceList extends React.Component {


    handleDeleteClick = (e) => {
        e.preventDefault();
        this.props.onDelete(this.props.id);
    };

    render() {
        const {image, title, id} = this.props;
        const imageToShow = image ? config.apiUrl + '/uploads/' + image : notFound;
        const formattedDate = moment(new Date()).format('DD-MM-YYYY: HH-mm');

        return (
            <Panel>
                <Panel.Body>
                    <Image
                        style={{width: '100px', marginRight: '10px'}}
                        src={imageToShow}
                        thumbnail
                    />
                    <Link to={'/places/' + id}>
                        {title}
                    </Link>
                    <div className="place_date">
                        {formattedDate}
                    </div>
                    <div className="news_actions">
                        <a htmlFor="file" onClick={this.handleDeleteClick}><FaTrash/></a>
                    </div>
                </Panel.Body>
            </Panel>
        )
    }
}

OnePlaceList.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
};

export default OnePlaceList;