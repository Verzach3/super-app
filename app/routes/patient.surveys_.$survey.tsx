import "survey-core/defaultV2.min.css";
import svyCore from "survey-core";
import svyUi from "survey-react-ui";
import {LoaderFunctionArgs, json, ActionFunctionArgs} from "@remix-run/node";
import {createServerClient} from "~/util/supabase.server";
import {useLoaderData, useNavigate, useSubmit} from "@remix-run/react";
import {useCallback, useEffect, useState} from "react";
import {Container, Title, Text} from "@mantine/core";
import {useInterval} from "@mantine/hooks";

const {Model} = svyCore;
const {Survey} = svyUi

export async function action({request, params}: ActionFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient({request, response});
  console.log("Action Called")
  console.log("Params" + params);
  const formData = await request.formData();
  const formDataObj = Object.fromEntries(formData.entries());
  console.log(formDataObj);
  const {data, error} = await supabase.auth.getSession();
  if (error || !data.session) {
    return json(
      {error: "No session found", status: 401},
      {
        status: 401
      }
    );
  }
  if (!params["survey"]) {
    return json(
      {error: "No survey found", status: 404},
      {
        status: 404
      }
    );
  }
  const {error: error2} = await supabase.from("surveys_answers").insert(
    {
      survey: params["survey"],
      respondent: data.session.user.id,
      answer: JSON.stringify(formDataObj)
    }
  );
  if (error2) {
    return json(
      {error: "Error saving survey", status: 500},
      {
        status: 500
      }
    );
  }

  return null
}

export async function loader({request, params}: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient({request, response});
  const session = await supabase.auth.getSession();
  if (!session || !session.data) {
    return json(
      {error: "No session found", status: 401},
      {
        status: 401
      }
    );
  }
  if (!params["survey"]) {
    return json(
      {error: "No survey found", status: 404},
      {
        status: 404
      }
    );
  }
  const {data: survey, error} = await supabase.from("surveys").select("*").eq("id", params["survey"]).single();

  if (error) {
    return json(
      {error: "Error getting survey", status: 500},
      {
        status: 500
      }
    );
  }

  return json(
    {survey: survey},
    {
      headers: response.headers
    }
  );
}

function Surveys() {
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const submit = useSubmit();
  const surveyComplete = useCallback((result: svyCore.Model) => {
    console.log("Survey results: " + JSON.stringify(result.data, null, 3));
    submit(result.data, {method: "post"})
    setSurveyCompleted(true);
  }, [])
  const surveyData = useLoaderData<typeof loader>();
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds >= 5) {
      navigate("/patient/surveys");
    }
  }, [seconds]);

  useEffect(() => {
    if (surveyCompleted) {
      interval.start()
    }
    return interval.stop
  }, [surveyCompleted]);

  if ("error" in surveyData) {
    console.log(surveyData.error, surveyData.status);
    return <div>{surveyData.error}</div>;
  }

  const survey = new Model(surveyData.survey.json);
  survey.onComplete.add(surveyComplete)
  if (surveyCompleted) {
    return (
      <Container>
        <Title>Survey Completed</Title>
        <Text>Thank you for completing the survey</Text>
        <Text>Redirecting to surveys in {5 - seconds} seconds</Text>
      </Container>
    )
  }

  return (
    <div style={{height: "100%"}}>
      <Survey model={survey}/>
    </div>
  );
}

export default Surveys;