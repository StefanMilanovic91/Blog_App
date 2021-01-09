import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Topics = ({isAuth, loading, name}) => {

    let title = <Fragment><span className="text-danger">Hello Dear Guest,</span> please log in for a full user expirience.</Fragment>;

    let addTopic = <Fragment>

                        <div className="Topics__add-new-topics">
                            <div className="row mt-5 mb-3">
                                <h3 className="ml-3">Add New Topic</h3>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-8">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Name of the New Topic" />
                                    </div>
                                    <button className="btn btn-outline-info d-block mr-auto">Add Topic</button>
                                </div>
                            </div>
                        </div>
                </Fragment>

    

    return (

        <div className="Page Topics">
            <div className="container">
                <div className="row justify-content-center flex-column">
                    <h1 className="display-4 pt-5 ml-3 mb-4">Popular Topics</h1>
                    <p className="mb-5 pb-5 ml-3">{isAuth && !loading ? <Fragment> <span className="text-danger">Hello {name},</span> let's blog...</Fragment> : title}</p>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                        <NavLink to="topics/topic/technology" className="topic-link">
                            <div className="card">
                                <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                                    <p className="mb-0">Technology</p>
                                    <span className="badge badge-info">12</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                        <NavLink to="topics/topic/technology" className="topic-link">
                            <div className="card">
                                <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                                    <p className="mb-0">Cars</p>
                                    <span className="badge badge-info">12</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                        <NavLink to="topics/topic/technology" className="topic-link">
                            <div className="card">
                                <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                                    <p className="mb-0">Culture</p>
                                    <span className="badge badge-info">12</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                        <NavLink to="topics/topic/technology" className="topic-link">
                            <div className="card">
                                <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                                    <p className="mb-0">History</p>
                                    <span className="badge badge-info">12</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                        <NavLink to="topics/topic/technology" className="topic-link">
                            <div className="card">
                                <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                                    <p className="mb-0">Mathematics</p>
                                    <span className="badge badge-info">12</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                        <NavLink to="topics/topic/technology" className="topic-link">
                            <div className="card">
                                <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                                    <p className="mb-0">Science</p>
                                    <span className="badge badge-info">12</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                        <NavLink to="topics/topic/technology" className="topic-link">
                            <div className="card">
                                <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                                    <p className="mb-0">Corona</p>
                                    <span className="badge badge-info">12</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                        <NavLink to="topics/topic/technology" className="topic-link">
                            <div className="card">
                                <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                                    <p className="mb-0">Other</p>
                                    <span className="badge badge-info">12</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
                {isAuth && !loading && addTopic}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuthenticated,
        loading: state.authReducer.loading,
        name: state.authReducer.user
    }
}

export default connect(mapStateToProps)(Topics)
