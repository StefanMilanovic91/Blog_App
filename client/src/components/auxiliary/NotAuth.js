import { connect } from "react-redux";

const NotAuth = ({ isAuth, loading, children }) => !isAuth && !loading && children




const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuthenticated,
        loading: state.authReducer.loading
    }
}

export default connect(mapStateToProps)(NotAuth);