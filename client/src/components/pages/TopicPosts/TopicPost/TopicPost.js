import React from 'react'

const TopicPost = ({post}) => {
    return (
        <div className="col-12 mb-5  px-0">
            <div className="card">
                <div className="card-header">
                    {post.title}
                </div>
                <div className="card-body">
                    {post.content}
                </div>
                <div className="card-footer">
                    {post.comments[0]}
                </div>
            </div>
        </div>
    )
}

export default TopicPost
