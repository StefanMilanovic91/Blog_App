import React from 'react'

const Alert = ({alert}) => alert !== null && <div className="container mt-5">
                                                    <div className="row justify-content-center">
                                                        <div className="col-12 col-md-8">
                                                            <div className={`alert alert-${alert.class}`} role="alert">{alert.msg}</div>
                                                        </div>
                                                    </div>
                                                </div> 

export default Alert
