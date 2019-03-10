import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            course: {},
            errors: {}
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentDidMount() {
      console.log("component did mount");
      this.props.actions.getCourse(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.course.id != nextProps.course.id) {
            //Necessary to populate form when existing course is loaded directly
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = Object.assign({}, this.state.course);
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    saveCourse(event) {
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        this.context.router.push('/courses');
    }

    render() {
        console.log("render...course");
        return (
            <CourseForm 
                allAuthors={this.props.authors}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                course={this.state.course}
                errors={this.state.errors}
            />
        );
    }
}

ManageCoursePage.propTypes = {
    course: React.PropTypes.object.isRequired,
    authors: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if (course) return course[0];//since filter returns an array, return first entry
    return null;
}
function mapStateToProps(state, ownProps) {
  console.log("mapStateToProps");
    const courseId = ownProps.params.id;// from the path '/course/:id'
    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
    if(courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }
    const authorsFormattedForDropDown = state.authors.map(author => {
        return {
            value : author.id,
            text: author.firstName + ' ' + author.lastName
        };
    });
    return {
        course : course,
        authors: authorsFormattedForDropDown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (ManageCoursePage);
