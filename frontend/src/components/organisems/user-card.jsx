import React from 'react';
import propTypes from 'prop-types';

function UserCard({title, body, footer, date}) {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-header">
          {title}
        </div>
        <div className="card-body">
          {body}
        </div>
        <div className="card-footer">
          {footer} - {date}
        </div>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  title: propTypes.string,
  body: propTypes.string,
  footer: propTypes.string,
  date: propTypes.any,
}

export default UserCard;
