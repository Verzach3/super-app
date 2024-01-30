import {Menu, Table} from "@mantine/core";

import {useDisclosure} from "@mantine/hooks";

function SurveysListItem() {
  const [opened, {open, close}] = useDisclosure(false)
  return (
    <>
      <Menu trigger={"click"}/>
    <Table.Tr onContextMenu={(e) => {
      e.preventDefault()
      open()
    }}>
      <Table.Td>Survey Name</Table.Td>
      <Table.Td>Survey Description</Table.Td>
      <Table.Td>Survey Status</Table.Td>
      <Table.Td>Survey Date</Table.Td>
      <Table.Td>Survey Link</Table.Td>
      <Table.Td>Survey Actions</Table.Td>
    </Table.Tr>
    </>
  )
}

export default SurveysListItem;