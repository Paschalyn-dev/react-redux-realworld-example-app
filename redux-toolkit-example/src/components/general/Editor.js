import ListErrors from './ListErrors';
import React, { useEffect } from 'react';
import agent from '../../agent';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTag, articleSubmitted, editorPageLoaded, editorPageUnloaded, removeTag, updateFieldEditor } from '../../redux-toolkit/reducers/editor';


function Editor({ nextProps }) {
    const editor = useSelector(state => ({...state.editor}));
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
    if (editor.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        dispatch(editorPageUnloaded());
        return dispatch(editorPageUnloaded(agent.Articles.get(editor.match.params.slug)));
      }
      dispatch(editorPageLoaded(null));
    }
  }, [nextProps])

  useEffect(() => {
    if (editor.match.params.slug) {
        return dispatch(editorPageLoaded(agent.Articles.get(editor.match.params.slug)));
    }
    dispatch(editorPageLoaded(null));
  },[]) 

  useEffect(() => {
    return() => dispatch(editorPageUnloaded())
  }, [])

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

export default Editor;