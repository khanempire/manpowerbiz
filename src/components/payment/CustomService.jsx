import { TextInput, Group, ActionIcon, Box, Text, Button, Code, Stack } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";

function CustomService(props) {
  const form = props.form;
  const fields = form.values.customServices.map((item, index) => (
    <Group
      key={item.key}
      sx={{
        "& .mantine-InputWrapper-error": {
          position: "absolute",
        },
      }}
      mt={6}
    >
      <TextInput placeholder="Service Name" style={{ flex: 1 }} withAsterisk {...form.getInputProps(`customServices.${index}.name`)} />
      <TextInput type="number" placeholder="0" withAsterisk style={{ flex: 1 }} {...form.getInputProps(`customServices.${index}.amount`)} />
      <ActionIcon color="red" onClick={() => form.removeListItem("customServices", index)}>
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  return (
    <Stack
      style={{
        display: "flex",
        justifyItems: "between",
      }}
      maw={500}
      justify={"between"}
    >
      {fields.length > 0 ? (
        <Group>
          <Text fw={500} size="md" style={{ flex: 1 }}>
            Service Name
          </Text>
          <Text fw={500} size="md" style={{ flex: 1 }}>
            Price
          </Text>
          <div
            style={{
              width: "1.7rem",
            }}
          ></div>
        </Group>
      ) : null}

      {fields}

      <Group justify="center" mt="md">
        <Button
          onClick={() => {
            form.insertListItem("customServices", { name: "", active: false, key: randomId() });
          }}
        >
          Add Extra Services
        </Button>
      </Group>

      {/* <Text size="sm" fw={500} mt="md">
        Form values:
      </Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code> */}
    </Stack>
  );
}

export default CustomService;
