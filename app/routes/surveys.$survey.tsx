import "survey-core/defaultV2.min.css";
import svyCore from "survey-core";
import svyUi from "survey-react-ui";

const {Model} = svyCore;
const {Survey} = svyUi

function Surveys() {
  const surveyJson = {
    elements: [{
      name: "FirstName",
      title: "Enter your first name:",
      type: "text"
    }, {
      name: "LastName",
      title: "Enter your last name:",
      type: "text"
    }]
  };
  const survey = new Model(surveyJson);
  return (
    <div style={{ height: "100vh"}}>
      <Survey model={survey}/>
    </div>
  );
}

export default Surveys;