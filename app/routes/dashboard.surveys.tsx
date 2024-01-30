import {Box, Card, Table} from "@mantine/core";
import SurveysListItem from "~/components/dashboard/surveys/SurveysListItem";

function DashboardSurveys() {
  return (
    <Card m={"1rem"} withBorder>
      <Table>
        <Table.Thead style={{
          backgroundColor: "#f5f5f5",
          borderColor: "#C6C6C6"
        }}>
            <Table.Tr>
              <Table.Th
              >Survey Name</Table.Th>
              <Table.Th>Survey Description</Table.Th>
              <Table.Th>Survey Status</Table.Th>
              <Table.Th>Survey Date</Table.Th>
              <Table.Th>Survey Link</Table.Th>
              <Table.Th>Survey Actions</Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Array.from({length: 10}).map((_, i) => (<SurveysListItem key={i}/>))}
        </Table.Tbody>
      </Table>
    </Card>
  )
}

export default DashboardSurveys;