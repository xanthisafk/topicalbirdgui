import { API_BASE_URL } from "../../../topicalbirdconfig";

const UserInfo = ({ user, self }) => {
  return (
    <div className="user-info-card">
      <div className="user-icon-container">
        {user.icon && <img className="user-icon" src={`${API_BASE_URL}${user.icon}`} alt={`${user.handle}'s icon`} />}
      </div>
      <h2>{user.displayName}</h2> 
      <div className="user-title-container">
        <span>u/{user.handle}</span>  
        { !user.isAdmin ? "" : <img src="/admin_icon.svg" width={25} height={25} alt="The user is an admin." title="User is an admin of Topicalbird." />}
      </div>
      
      
      <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      {self && <a className="settings-link" href="/auth/settings">User settings</a>}
    </div>
  );
};

export default UserInfo;
