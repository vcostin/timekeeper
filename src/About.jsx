import "./About.css";

const About = () => {
  return (
    <div className="About">
      <h1>About Schedule Manager</h1>
      <p>
        Schedule Manager is a web application designed to help you manage your
        schedules efficiently. With Schedule Manager, you can create, edit, and
        delete schedules with ease. The application provides a user-friendly
        interface and powerful features to keep your schedules organized.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Create new schedules with detailed information</li>
        <li>Edit existing schedules to update information</li>
        <li>Delete schedules that are no longer needed</li>
        <li>View a list of all schedules in a table-like format</li>
      </ul>
      <h2>Technologies Used</h2>
      <ul>
        <li>React: For building the user interface</li>
        <li>Express: For handling backend API requests</li>
        <li>Sequelize: For interacting with the database</li>
        <li>SQLite: For storing schedule data</li>
      </ul>
      <p>
        Schedule Manager is designed to be simple and intuitive, making it easy
        for anyone to manage their schedules effectively.
      </p>
    </div>
  );
};

export default About;
