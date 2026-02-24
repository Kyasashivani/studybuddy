import { useEffect, useState } from "react";
import API from "../api/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [notes, setNotes] = useState([]);
  const [summary, setSummary] = useState("");
  const [externalInfo, setExternalInfo] = useState(null);
  const [loadingExternal, setLoadingExternal] = useState(false);

  // Load courses from backend
  useEffect(() => {
    API.get("/courses").then(res => setCourses(res.data));
  }, []);

  // Load notes when a course is selected
  const selectCourse = (course) => {
    setSelectedCourse(course);
    setSummary(""); // clear summary
    API.get(`/notes/course/${course.id}`).then(res => setNotes(res.data));
  };

  // Summarize note using AI
  const summarizeNote = (text) => {
    API.post("/ai/summarize", { text }).then(res => setSummary(res.data.summary));
  };

  // Fetch external course info (Wikipedia, W3Schools, MDN)
  const fetchExternalInfo = (courseName) => {
    setLoadingExternal(true);
    setExternalInfo(null);
    API.post("/ai/external-info", { query: courseName })
      .then(res => setExternalInfo(res.data.results))
      .catch(() => setExternalInfo({ error: "Could not fetch external info" }))
      .finally(() => setLoadingExternal(false));
  };

  return (
    <div className="main-area">
      <h1>📚 StudyBuddy Courses</h1>

      {/* Courses list */}
      <div className="grid">
        {courses.map(course => (
          <div
            key={course.id}
            className="course-card"
            onClick={() => selectCourse(course)}
            style={{ cursor: "pointer" }}
          >
            <h3>{course.name}</h3>
          </div>
        ))}
      </div>

      {/* Notes Section */}
      {selectedCourse && (
        <div className="notes-section">
          <h2>📝 Notes: {selectedCourse.name}</h2>

          {notes.map(n => (
            <div className="card" key={n.id}>
              <h3>{n.title}</h3>
              <p>{n.content}</p>
              <button onClick={() => summarizeNote(n.content)}>✨ Summarize</button>
            </div>
          ))}

          <div style={{ marginTop: 12 }}>
            <button onClick={() => fetchExternalInfo(selectedCourse.name)} disabled={loadingExternal}>
              {loadingExternal ? "Fetching..." : "🔎 Fetch Course Info"}
            </button>
          </div>

          {/* Show AI Summary */}
          {summary && (
            <div className="card ai-panel">
              <h3>🧠 AI Summary</h3>
              <p>{summary}</p>
            </div>
          )}

          {externalInfo && (
            <div className="card ai-panel">
              <h3>🌐 External Info</h3>
              {externalInfo.error && <p>{externalInfo.error}</p>}
              {!externalInfo.error && Object.keys(externalInfo).map(src => (
                <div key={src} style={{ marginBottom: 10 }}>
                  <strong>{src}:</strong>
                  <p>{externalInfo[src]}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}