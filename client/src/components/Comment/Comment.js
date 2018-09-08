import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Comment = props => {

    const formattedDate = moment(new Date()).format('DD-MM-YYYY: HH-mm');

    return (
        <Fragment>
            <div className="comment-text">
                <p>{this.props.text}</p>
            </div>
            <div className="place_date">
                {formattedDate}
            </div>
        </Fragment>
    );
};

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default Comment;