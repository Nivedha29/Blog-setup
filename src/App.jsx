import { Routes, Route, Link } from 'react-router-dom';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">My Blog</Link>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;