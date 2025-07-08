import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`https://realworld.habsida.net/api/articles/${slug}`);
        setArticle(res.data.article);
      } catch {
        setError('Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return null;

  return (
    <div className="container">
      <div className="article-detail">
        <h1 className="article-title">{article.title}</h1>
        <p className="article-description">{article.description || 'No description available.'}</p>
        <div className="article-meta">
          <img className="author-avatar" src={article.author.image} alt={article.author.username} />
          <div>
            <span className="author-name">{article.author.username}</span>
            <span className="article-date">{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <ReactMarkdown>{article.body || 'No content available.'}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ArticleDetail;