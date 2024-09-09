import './App.css';
import { useState, useEffect } from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

function App() {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  const [error, setError] = useState(null);
  const [token, removeToken] = useCookies(['mytoken']);
  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`
      }
    })
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      return resp.json();
    })
    .then(resp => setArticles(resp))
    .catch(error => setError(error.message));
  }, [token]);

  const updatedInfo = (article) => {
    const new_article = articles.map(myarticle => {
      if (myarticle.id === article.id) {
        return article;
      } else {
        return myarticle;
      }
    });
    setArticles(new_article);
  };

  let navigate = useNavigate(); // useNavigate instead of useHistory

  useEffect(() => {
    if (!token['mytoken']) {
      navigate('/');
    }
  }, [token, navigate]);

  const editBtn = (article) => {
    setEditArticle(article);
  };

  const articleForm = () => {
    setEditArticle({title: '', description: ''});
  };

  const insertedInfo = (article) => {
    const new_article = [...articles, article];
    setArticles(new_article);
  };

  const delBtn = (article) => {
    const new_article = articles.filter(myarticle => myarticle.id !== article.id);
    setArticles(new_article);
  };

  const logoutBtn =() =>{
    removeToken(['mytoken'])
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h1>Django and React Js blog App</h1>
          <br />
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={articleForm}>Insert Article</button>
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={logoutBtn}>Logout</button>
        </div>
        {error ? <p className="error">Error: {error}</p> : null}
        <ArticleList articles={articles} editBtn={editBtn} delBtn={delBtn} />
        {editArticle ? <Form article={editArticle} updatedInfo={updatedInfo} insertedInfo={insertedInfo} /> : null}
      </div>
    </div>
  );
}

export default App;
