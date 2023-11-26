const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </div>
);

const Total = ({ parts }) => (
  <p>
    <b>total of {parts.reduce((a, c) => a + c.exercises, 0)} exercises</b>
  </p>
);

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;
