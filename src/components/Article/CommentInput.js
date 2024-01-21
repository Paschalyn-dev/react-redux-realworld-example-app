import React, { useState } from 'react';
import agent from '../../agent';
import { connect, useDispatch } from 'react-redux';
// import { ADD_COMMENT } from '../../constants/actionTypes';
import { addComment } from '../../reducers/article';

// const mapDispatchToProps = dispatch => ({
//   onSubmit: payload =>
//     dispatch({ type: ADD_COMMENT, payload })
// });

export default function CommentInput(props) {
  // this.state = {
    //   body: ''
    // };
    const dispatch = useDispatch();
    const [body, setBody] = useState((ev) => {body: ev.target.value})

    // this.setBody = ev => {
    //   this.setState({ body: ev.target.value });
    // };

    function createComment (ev) {
      ev.preventDefault();
      const payload = agent.Comments.create(this.props.slug,
        { body: body });
      setBody({ body: '' });
      dispatch(addComment(payload));
    };

    return (
      <form className="card comment-form" onSubmit={createComment}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Write a comment..."
            value={body}
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

// export default connect(() => ({}), mapDispatchToProps)(CommentInput);
