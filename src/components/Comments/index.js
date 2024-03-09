import {v4} from 'uuid'

import {Component} from 'react'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentList: [],
    isLiked: false,
  }

  deleteComment = commentId => {
    const {commentList} = this.state
    this.setState({
      commentList: commentList.filter(comment => comment.id !== commentId),
    })
  }

  toogleIsLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentList} = this.state

    return commentList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentsDetails={eachComment}
        toogleIsLiked={this.toogleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput, isLiked} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeCommentInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  render() {
    const {nameInput, commentInput, commentList} = this.state
    return (
      <div className="bg-container">
        <h1 className="main-heading">Comments</h1>
        <p className="main-heading">Say Something about 4.0 technology</p>
        <form onSubmit={this.onAddComment}>
          <div className="flex-container">
            <div>
              <input
                type="text"
                className="input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <div>
                <textarea
                  rows="8"
                  cols="50"
                  className="text-area"
                  placeholder="Your Comments"
                  value={commentInput}
                  onChange={this.onChangeCommentInput}
                ></textarea>
              </div>
              <button className="button" type="submit">
                Add Comment
              </button>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
                className="comments-image"
              />
            </div>
          </div>
          <hr className="horizontal-line" />
        </form>
        <div className="flex-container-2">
          <div className="comment-count-box">{commentList.length}</div>
          <div>
            <p className="paragraph">Comments</p>
          </div>
        </div>
        <ul>{this.renderCommentsList()}</ul>
      </div>
    )
  }
}

export default Comments
