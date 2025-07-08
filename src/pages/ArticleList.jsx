import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const limit = 5;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`https://realworld.habsida.net/api/articles?limit=${limit}&offset=${page * limit}`);
        setArticles(res.data.articles);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1 className="heading">Recent Articles</h1>
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article.slug} className="article-item">
            <Link to={`/articles/${article.slug}`} className="article-link">
              <div className="article-header">
                <div className="author-info">
                  
                  <div>
                    <span className="author-name">{article.author.username}</span>
                    <span className="article-date">{new Date(article.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <h2 className="article-title">{article.title}</h2>
              </div>
              <p className="article-description">{article.description || 'No description available.'}</p>
              <div className="tag-list">
                {article.tagList.map((tag) => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default ArticleList;