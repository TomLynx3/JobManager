import { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import JobContext from "../../context/jobs/jobContext";

const Logout = (props) => {
  const authContext = useContext(AuthContext);
  const jobContext = useContext(JobContext);

  const { logout, isAuthenticated } = authContext;
  const { clearJobs } = jobContext;

  const onLogout = () => {
    logout();
    clearJobs();
  };
  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login");
    } else {
      onLogout();
    }
  });
  return null;
};

export default Logout;
