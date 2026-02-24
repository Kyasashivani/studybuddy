export default function Layout({ children }) {
  return (
    <div>

      <div className="sidebar">
        Sidebar Menu
      </div>

      <div className="main-area">
        {children}
      </div>

    </div>
  );
}