import React from 'react';
import { NavLink } from 'react-router-dom';

const Topic = ({ topic }) => {

    return (
        <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
            <NavLink to={`topics/topic_posts/${topic.title}/${topic._id}`} className="topic-link">
                <div className="card">
                    <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                        <p className="mb-0">{topic.title.toUpperCase()}</p>
                        <span className="badge badge-info">12</span>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default Topic
