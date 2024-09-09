import React from 'react';
import APIService from '../APIService';
import { useCookies } from 'react-cookie';

function ArticleList(props) {
  const [token] = useCookies(['mytoken']);

    const editBtn = (article) => {
      props.editBtn(article);
    };

    const delBtn = (article) => {
      APIService.DeleteArticle(article.id, token[`mytoken`])
      .then(() => props.delBtn(article));
    };

    return (
      <div>
        {props.articles && props.articles.map(article => {
          return (
            <div key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <div className='row'>
                <div className="col-md-1">
                  <button className="btn btn-primary" onClick={() => editBtn(article)}>Update</button>
                </div>
                <div className='col'>
                  <button className="btn btn-danger" onClick={() => delBtn(article)}>Delete</button>
                </div>
              </div>
              <hr className="hrclass"/>
            </div>
          );
        })}
      </div>
    );
  }

export default ArticleList;
