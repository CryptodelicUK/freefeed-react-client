import React from 'react';
import { connect } from 'react-redux';
import { createPost, resetPostCreateForm, expandSendTo } from '../redux/action-creators';
import formatInvitation from '../utils/format-invitation';
import { joinPostData, joinCreatePostData, postActions } from './select-utils';

import CreatePost from './create-post';
import Feed from './feed';
import PaginatedView from './paginated-view';

const FeedHandler = (props) => {
  const createPostComponent = (
    <CreatePost
      createPostViewState={props.createPostViewState}
      sendTo={props.sendTo}
      user={props.user}
      isDirects={props.isDirects}
      createPost={props.createPost}
      resetPostCreateForm={props.resetPostCreateForm}
      expandSendTo={props.expandSendTo}
      createPostForm={props.createPostForm}
      addAttachmentResponse={props.addAttachmentResponse}
      removeAttachment={props.removeAttachment}
    />
  );

  return (
    <div className="box">
      <div className="box-header-timeline">
        {props.boxHeader}
      </div>
      <PaginatedView firstPageHead={createPostComponent} {...props}>
        <Feed {...props} />
      </PaginatedView>
      <div className="box-footer" />
    </div>);
};

function selectState(state) {
  const { authenticated, boxHeader, createPostViewState, timelines, user } = state;
  const visibleEntries = state.feedViewState.visibleEntries.map(joinPostData(state));
  const createPostForm = joinCreatePostData(state);
  const defaultFeed = state.routing.locationBeforeTransitions.query.to || user.username;
  const invitation = formatInvitation(state.routing.locationBeforeTransitions.query.invite);
  const sendTo = { ...state.sendTo, defaultFeed, invitation };
  const isDirects = state.routing.locationBeforeTransitions.pathname.indexOf('direct') !== -1;
  if (isDirects) {
    sendTo.expanded = true;
  }

  return { user, authenticated, visibleEntries, createPostViewState, createPostForm, timelines, boxHeader, sendTo, isDirects };
}

function selectActions(dispatch) {
  return {
    ...postActions(dispatch),
    createPost: (feeds, postText, attachmentIds, more) => dispatch(createPost(feeds, postText, attachmentIds, more)),
    resetPostCreateForm: (...args) => dispatch(resetPostCreateForm(...args)),
    expandSendTo: () => dispatch(expandSendTo())
  };
}

export default connect(selectState, selectActions)(FeedHandler);
