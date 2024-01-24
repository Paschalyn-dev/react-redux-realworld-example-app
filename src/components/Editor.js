import ListErrors from './ListErrors';
import React, { useEffect } from 'react';
import agent from '../../redux-toolkit-example/agent';
import { connect, useDispatch, useSelector } from 'react-redux';
// import {
//   ADD_TAG,
//   EDITOR_PAGE_LOADED,
//   REMOVE_TAG,
//   ARTICLE_SUBMITTED,
//   EDITOR_PAGE_UNLOADED,
//   UPDATE_FIELD_EDITOR
// } from '../constants/actionTypes';
import { addTag, editorPageLoaded, editorPageUnloaded, articleSubmitted, updateFieldEditor, removeTag} from '../reducers/editor';

// const mapStateToProps = state => ({
//   ...state.editor
// });

// const mapDispatchToProps = dispatch => ({
//   onAddTag: () =>
//     dispatch({ type: ADD_TAG }),
//   onLoad: payload =>
//     dispatch({ type: EDITOR_PAGE_LOADED, payload }),
//   onRemoveTag: tag =>
//     dispatch({ type: REMOVE_TAG, tag }),
//   onSubmit: payload =>
//     dispatch({ type: ARTICLE_SUBMITTED, payload }),
//   onUnload: payload =>
//     dispatch({ type: EDITOR_PAGE_UNLOADED }),
//   onUpdateField: (key, value) =>
//     dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
// });

export default function Editor () {
  const editor = useSelector((state) => ({...state.editor}));
  const dispatch = useDispatch();
    const updateFieldEvent =
      key => ev => dispatch(updateFieldEditor(key, ev.target.value));
    const changeTitle = updateFieldEvent('title');
    const changeDescription = updateFieldEvent('description');
    const changeBody = updateFieldEvent('body');
    const changeTagInput = updateFieldEvent('tagInput');

    const watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        dispatch(addTag());
      }
    };

    const removeTagHandler = tag => () => {
      dispatch(removeTag(tag));
    };

    const submitForm = ev => {
      ev.preventDefault();
      const article = {
        title: editor.title,
        description: editor.description,
        body: editor.body,
        tagList: editor.tagList
      };

      const slug = { slug: editor.articleSlug };
      const promise = editor.articleSlug ?
        agent.Articles.update(Object.assign(article, slug)) :
        agent.Articles.create(article);

      dispatch(articleSubmitted(promise));
    };

  useEffect(() => {
    if (editor.match.params.slug !== editor.match.params.slug) {
      if (editor.match.params.slug) {
        dispatch(editorPageUnloaded());
        return dispatch(editorPageLoaded(agent.Articles.get(editor.match.params.slug)));
      }
      dispatch(editorPageLoaded(null));
    }
  },[editor]) 

  useEffect(() => {
    if (editor.match.params.slug) {
      return dispatch(editorPageLoaded(agent.Articles.get(editor.match.params.slug)));
    }
    dispatch(editorPageLoaded(null));
  },[]) 

  // componentWillUnmount() {
  //   dispatch(editorPageUnloaded());
  // }
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={editor.errors}></ListErrors>

              <form>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Article Title"
                      value={editor.title}
                      onChange={changeTitle} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="What's this article about?"
                      value={editor.description}
                      onChange={changeDescription} />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={editor.body}
                      onChange={changeBody}>
                    </textarea>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      value={editor.tagInput}
                      onChange={changeTagInput}
                      onKeyUp={watchForEnter} />

                    <div className="tag-list">
                      {
                        (editor.tagList || []).map(tag => {
                          return (
                            <span className="tag-default tag-pill" key={tag}>
                              <i  className="ion-close-round"
                                  onClick={() => removeTagHandler(tag)}>
                              </i>
                              {tag}
                            </span>
                          );
                        })
                      }
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={editor.inProgress}
                    onClick={submitForm}>
                    Publish Article
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
}

// export default connect(mapStateToProps, mapDispatchToProps(dispatch))(Editor);
