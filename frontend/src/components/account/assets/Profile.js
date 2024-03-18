import { NavLink } from "react-router-dom";
import Loader from "../../layout/loader/Loader";
import { useSelector } from "react-redux";
import TimeAndDate from "../../layout/time/TimeAndDate";

export const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  return (
    <>
      {loading ? (
        <Loader />
      ) : user ? (
        <>
          <div id="profile-page" className="profile-containor">
            <div className="prof-cont-row">
              <div style={{marginTop:10}} className="user-profile-area col-md-4">
                <div className="user-prf-e">
                  <div className="profile-img">
                    <img
                      src={
                        user && user.avatar && user.avatar.url
                          ? `http://localhost:8000/${user.avatar.url}`
                          : "/icon.png"
                      }
                      alt="User Avatar"
                    />
                  </div>
                  <p>
                    <NavLink to={"/account/me/update"}>Update Profile</NavLink>
                  </p>
                </div>
              </div>
              <div style={{marginTop:10}} className="ot-det col-md-8">
                <div className="userDetails">
                  <p >
                    <b>Name</b> <br/>
                    <span>{user.name}</span>
                  </p>
                  <p>
                    <b>Email </b> <br/>
                    <span>{user.email}</span>
                  </p>
                  <p>
                    <b>Joinig Date </b> <br/>
                    <span> <TimeAndDate time={user && user.date} /> </span>
                  </p>
                </div>

                <p>
                  <NavLink to={"/account/password/update"}>
                    Password update
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Data not found</p>
        </>
      )}
    </>
  );
};
