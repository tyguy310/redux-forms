import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const {meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label for={field.name}>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title For Post"
          name="title"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          type="textbox"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link className="btn btn-secondary" to="/">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = "Enter a title!";
  }
  if(!values.categories) {
    errors.categories = "Enter a category!";
  }
  if(!values.content) {
    errors.content = "Enter some content!";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
