import userLogOut from "../../helpers/api/auth"

const LogOutPopup = () => {
    return (
        <div>
            <p>Do you really want to log out?</p>
            <button onClick={userLogOut}>Yes</button> <button>No</button>
        </div>
    )
}

export default LogOutPopup;