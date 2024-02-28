import superagent from "superagent"
import * as process from "process";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {Patient} from "fhir/r4";
import {Card, Text, Title} from "@mantine/core";

export const loader = async () => {
  const res = await superagent.get("emr.wellfitclinic.com/apis/default/fhir/Patient").set("Authorization", `Bearer ${process.env.EMR_TEST_TOKEN ?? ""}`)
  let data: Patient
  return json(res.body)
}

function DashboardPatients() {
  const data = useLoaderData<typeof loader>()
  return (
    <div>
      {
        data.entry.map(({resource}: { resource: Patient }) => {
          return (
            <Card withBorder m={"md"} key={resource.id}>
              <Text>
                {resource.name?.[0].given?.[0]} {resource.name?.[0].family}
              </Text>
              <Text>
                {resource.birthDate}
              </Text>
              <Text>
                {resource.id}
              </Text>
            </Card>
          )
        })
      }
    </div>
  )
}

export default DashboardPatients;