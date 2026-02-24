import { useState } from "react";

export default function CourseCard({ course, deleteCourse }) {
  const [assignment, setAssignment] = useState("");

  const addAssignment = () => {
    if (!assignment) return;
    course.assignments.push(assignment);
    setAssignment("");
  };

  return (
    <div className="card">
      <h3>{course.name}</h3>

      <button
        className="danger-btn"
        onClick={deleteCourse}
        style={{ marginBottom: "10px" }}
      >
        Delete
      </button>

      <div className="flex">
        <input
          className="input"
          placeholder="New assignment"
          value={assignment}
          onChange={(e) => setAssignment(e.target.value)}
        />
        <button className="primary-btn" onClick={addAssignment}>
          Add
        </button>
      </div>

      {course.assignments.map((a, index) => (
        <div key={index} className="card" style={{ marginTop: "10px" }}>
          {a}
        </div>
      ))}
    </div>
  );
}