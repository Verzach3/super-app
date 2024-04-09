import "survey-core/defaultV2.min.css";
import svyCore from "survey-core";
import svyUi from "survey-react-ui";
import {onboardQuestions} from "~/util/onboardQuestions";

const {Model} = svyCore;
const {Survey} = svyUi

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

function Surveys() {
  const survey = new Model(onboardQuestions);
  return (
    <div style={{height: "100vh", overflow: "hidden"}}>
      <Survey model={survey}/>
    </div>
  );
}

export default Surveys;