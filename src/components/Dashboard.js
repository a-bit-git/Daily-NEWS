import React, { useState, useEffect } from 'react';
import Cards from './Cards';

function Dashboard() {
  const [newslist, setNewslist] = useState([]);
  const [category, setCategory] = useState('business');
  const [currentPage, setCurrentPage] = useState(1);
  //   const articlesPerPage = 6;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const articlesPerPage = 6;

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value.toLowerCase();
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const fetchData = async (category) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=100&apikey=210842294c360991fd6070417be2a679`);
      const data = await response.json();

      if (data.articles && Array.isArray(data.articles)) {
        setNewslist(data.articles);
      } else {
        throw new Error(data.message || 'Invalid data');
      }
    } catch (err) {
      setError(err.message);
      setNewslist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {fetchData(category)}, [category]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = newslist.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(newslist.length / articlesPerPage);

  const renderShimmer = () => {
    return Array.from({ length: articlesPerPage }).map((_, index) => (
      <div key={index} className="cards shimmer-card">
        <div className="newsimg shimmer" />
        <div className="title shimmer" style={{ height: '20px', marginTop: '10px' }} />
        <div className="detail">
          <div className="shimmer" style={{ width: '40%', height: '15px' }} />
          <div className="shimmer" style={{ width: '40%', height: '15px' }} />
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="filter">
        <label className="category-label">Select NEWS Category ➤</label>
        <select className="category-selector" onChange={handleCategoryChange} value={category}>
          <option value="general">General</option>
          <option value="world">World</option>
          <option value="nation">Nation</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="entertainment">Entertainment</option>
          <option value="sports">Sports</option>
          <option value="science">Science</option>
          <option value="health">Health</option>
        </select>
      </div>

      <div className="dashboard">
        {loading && renderShimmer()}
        {error && <p>Error: {error}</p>}
        {!loading && !error && currentArticles.length === 0 && <p>No articles available.</p>}
        {!loading && !error &&
          currentArticles
            .filter(article => article.image)
            .map((article, index) => (
              <Cards
                key={index}
                title={article.title}
                image={article.image}
                name={article.source.name}
                publishedAt={article.publishedAt}
                url={article.url}
              />
            ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} className={currentPage === index + 1 ? 'active' : ''} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Dashboard;