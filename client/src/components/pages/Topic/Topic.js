import React, { useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';

const Topic = () => {

    const { id } = useParams();

    useEffect(() => {
        // fetch all topic posts from server
    })

    return (
        <div className="container">
            <div className="row">
                <h1 className="display-4 py-5 mb-5">Topic / {id}</h1>
            </div>
            <div className="row">
                <div className="col-12 mb-5  px-0">
                    <div className="card">
                        <div className="card-header">
                            Post Name
                        </div>
                        <div className="card-body">
                            Post Content
                        </div>
                        <div className="card-footer">
                            Post Comments
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-5  px-0">
                    <div className="card">
                        <div className="card-header">
                            Post Name
                        </div>
                        <div className="card-body">
                            Post Content
                        </div>
                        <div className="card-footer">
                            Post Comments
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-5  px-0">
                    <div className="card">
                        <div className="card-header">
                            Post Name
                        </div>
                        <div className="card-body">
                            Post Content
                        </div>
                        <div className="card-footer">
                            Post Comments
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-5  px-0">
                    <div className="card">
                        <div className="card-header">
                            Post Name
                        </div>
                        <div className="card-body">
                            Post Content
                        </div>
                        <div className="card-footer">
                            Post Comments
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-5  px-0">
                    <div className="card">
                        <div className="card-header">
                            Post Name
                        </div>
                        <div className="card-body">
                            Post Content
                        </div>
                        <div className="card-footer">
                            Post Comments
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topic
