import React, { useState } from 'react';
import agent from '../../agent';
import { useDispatch } from 'react-redux';
import {addComment} from "../../redux-toolkit/reducers/article";

function CommentInput(props) {
    const dispatch = useDispatch();
    const [state, setState] = useState({
      body: ''
    });

    const setBody = ev => {
      setState((prev) => ({ ...prev, body: ev.target.value }));
    };

    const createComment = ev => {
      ev.preventDefault();
      const payload = agent.Comments.create(props.slug,
        { body: state.body });
      setState((prev) => ({ ...prev, body: '' }));
      dispatch(addComment(payload));
    };

    return (
      <form className="card comment-form" onSubmit={createComment}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Write a comment..."
            value={state.body}
            onChange={setBody}
            rows="3">
          </textarea>
        </div>
        <div className="card-footer">
          <img
            src={props.currentUser.image}
            className="comment-author-img"
            alt={props.currentUser.username} />
          <button
            className="btn btn-sm btn-primary"
            type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
}

export default CommentInput;