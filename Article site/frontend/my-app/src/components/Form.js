import React, {useState, useEffect} from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'

function Form(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [token] = useCookies(['mytoken']);

    useEffect(()=>  {
        setTitle(props.article.title)
        setDescription(props.article.description)
    }, [props.article])

    const updateArticle = () =>{
        APIService.updateArticle(props.article.id, {title, description}, token['mytoken'])
        .then(resp => props.updatedInfo(resp))
    }
    
    const insertArticle = ()=>{
        APIService.InsertArticle({title, description}, token['mytoken'])
        .then(resp => props.insertedInfo(resp))
    }


  return (
    <div>
    {props.article ? (
        <div className='mb-3'>
        <label htmlFor="title" className='form-label'>Title</label>
        <input type="text" id="title" placeholder='Please enter the title' className="form-control"
        value={title} onChange={e => setTitle(e.target.value)}/>

        
        
        <label htmlFor="description" className='form-label'>Description</label>
        <textarea id="description" placeholder='Please enter the description' rows="5" className="form-control"
        value={description} onChange={e => setDescription(e.target.value)}
        ></textarea>

        <br/>

        {props.article.id?  <button onClick = {updateArticle} className='btn btn-success'>Update Article</button>
        :  <button onClick = {insertArticle} className='btn btn-success'>Insert Article</button>}
       

        </div>

    ): null}
    </div>
  )
}

export default Form