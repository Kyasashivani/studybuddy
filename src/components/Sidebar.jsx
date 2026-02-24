import { Link } from "react-router-dom";

export default function Sidebar(){

return (
<div className="sidebar">

<h2>📚 StudyBuddy</h2>

<Link to="/">Dashboard</Link>
<Link to="/courses">Courses</Link>
<Link to="/assignments">Assignments</Link>
<Link to="/register">Register</Link>

</div>
);
}