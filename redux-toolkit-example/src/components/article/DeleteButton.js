import React from 'react';
import agent from '../../agent';
import { deleteComment } from '../../redux-toolkit/reducers/article';
import { useDispatch } from 'react-redux';

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