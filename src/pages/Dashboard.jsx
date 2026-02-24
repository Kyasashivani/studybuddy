import { useNavigate } from "react-router-dom";

export default function Dashboard(){

  const navigate = useNavigate();

  return(
    <div className="main-area">

      <h1>📚 StudyBuddy Learning Dashboard</h1>

      <div className="grid">

        {/* Courses Card */}
        <div className="dashboard-card"
        onClick={()=>navigate("/courses")}
        >
          <h2>🎓 Courses</h2>
          <p>Manage your study courses</p>
        </div>

        {/* Assignments Card */}
        <div className="dashboard-card"
        onClick={()=>navigate("/assignments")}
        >
          <h2>📝 Assignments</h2>
          <p>Track your learning assignments</p>
        </div>

      </div>

    </div>
  );
}