import React from 'react';
import agent from '../../agent';
import { connect, useDispatch } from 'react-redux';
// import { DELETE_COMMENT } from '../../constants/actionTypes';
import { deleteComment } from '../../reducers/article';

// const mapDispatchToProps = dispatch => ({
//   onClick: (payload, commentId) =>
//     dispatch({ type: DELETE_COMMENT, payload, commentId })
// });

const DeleteButton = props => {
  const dispatch = useDispatch();
  const del = () => {
    const payload = agent.Comments.delete(props.slug, props.commentId);
    dispatch(deleteComment(payload, props.commentId));
  };

  if (props.show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del}></i>
      </span>
    );
  }
  return null;
};

export default DeleteButton;

// export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
