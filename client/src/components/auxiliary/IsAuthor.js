import { connect } from 'react-redux'

const IsAuth = ({ userID, contentAuthorID, children }) => userID === contentAuthorID && children


const mapStateToProps = state => {
    return {
        userID: state.authReducer.user !== null && state.authReducer.user.id
    }
}

export default connect(mapStateToProps)(IsAuth);
