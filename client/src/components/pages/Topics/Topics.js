import React from 'react';
import { NavLink } from 'react-router-dom'; 

const Topics = () => {
    return (


        <div className="container">
            <div className="row">
                <h1 className="display-4 py-5 mb-5">Popular Topics</h1>
            </div>
            <div className="row">
                <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                    <div className="card">
                        <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                            <NavLink to="topics/topic/technology">Technology</NavLink>
                            <span className="badge badge-info">12</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                    <div className="card">
                        <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                            <NavLink to="topics/topic/cars">Cars</NavLink>
                            <span className="badge badge-info">12</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                    <div className="card">
                        <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                            <NavLink to="topics/topic/culture">Culture</NavLink>
                            <span className="badge badge-info">12</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                    <div className="card">
                        <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                            <NavLink to="topics/topic/history">History</NavLink>
                            <span className="badge badge-info">12</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                    <div className="card">
                        <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                            <NavLink to="/topics/topic/mathematics">Mathematics</NavLink>
                            <span className="badge badge-info">12</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                    <div className="card">
                        <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                            <NavLink to="/topics/topic/science">Science</NavLink>
                            <span className="badge badge-info">12</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                    <div className="card">
                        <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                            <NavLink to="/topics/topic/corona">Corona</NavLink>
                            <span className="badge badge-info">112</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                    <div className="card">
                        <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                            <NavLink to="/topics/topic/other">Other</NavLink>
                            <span className="badge badge-info">212</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topics
