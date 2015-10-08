import React from 'react'
import {preventDefault} from '../utils'

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {disabled: true}
  }

  createPost() {
    this.props.createPost(this.refs.postText.value)
    this.refs.postText.value = ''
    this.setState({disabled: true})
  }

  checkCreatPostAvailability(e) {
    this.setState({disabled: e.target.value === ''})
  }

  render() {
    return (
      <div className='create-post p-timeline-post-create'>
        <div className='p-create-post-view'>
          <textarea className='edit-post-area'
                    ref='postText'
                    rows='2'
                    data-autosize-on='true'
                    onChange={this.checkCreatPostAvailability.bind(this)} />
        </div>
          <div className='row'>
            <div className='pull-right'>

              {this.props.createPostViewState.isPending ? (
                <span className="throbber">
                  <img width="16" height="16" src='/assets/images/throbber.gif'/>
                </span>
              ) : false}

              <button className='btn btn-default btn-xs p-create-post-action'
                      onClick={preventDefault(_ => this.createPost())}
                      disabled={this.state.disabled || this.props.createPostViewState.isPending}>Post</button>
            </div>
          </div>

          {this.props.createPostViewState.isError ? (
            <div className='create-post-error'>
              {this.props.createPostViewState.errorString}
            </div>
          ) : false}
      </div>
    )
  }
}
