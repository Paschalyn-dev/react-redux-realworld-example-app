import React from 'react';
import agent from '../../redux-toolkit-example/agent';
// import { connect } from 'react-redux';
// import { SET_PAGE } from '../constants/actionTypes';
import { useDispatch } from 'react-redux';

// const mapDispatchToProps = dispatch => ({
//   onSetPage: (page, payload) =>
//     dispatch({ type: SET_PAGE, page, payload })
// });

const ListPagination = props => {
  const dispatch = useDispatch();
  if (props.articlesCount <= 10) {
    return null;
  }
  
  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  const setPage = page => {
    if(props.pager) {
      dispatch(setPage(page, props.pager(page)));
    }else {
      dispatch(setPage(page, agent.Articles.all(page)));
    }
  };

  return (
    <nav>
      <ul className="pagination">

        {
          range.map(v => {
            const isCurrent = v === props.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              setPage(v);
            };
            return (
              <li
                className={ isCurrent ? 'page-item active' : 'page-item' }
                onClick={onClick}
                key={v.toString()}>
                <a className="page-link" href="">{v + 1}</a>
              </li>
            );
          })
        }

      </ul>
    </nav>
  );
};

export default ListPagination;

// export default connect(() => ({}), mapDispatchToProps)(ListPagination);
