/*import { Modal, Stack, TextInput, Button } from "@mantine/core";


  import { useEffect, useState } from "react";
  import { useCreateProject } from "../../../hooks/useProjects";
  
  type CreateNewProjectModalProps = {
    isOpen: boolean;
    close: () => void;
  };
  
  export const CreateNewProjectModal = ({
    isOpen,
    close,
  }: CreateNewProjectModalProps) => {
    const [formState, setFormState] = useState({
        name: "",
        description: "",
        type: "",
        user_id: 0,
    });
    const { mutate, isPending, error, reset } = useCreateProject(() => close());
    useEffect(() => {
      if (isOpen) {
        reset();
        setFormState({
            name: "",
            description: "",
            type: "",
            user_id: 0,
        });
      }
    }, [isOpen]);
    const onSaveClick = () => {
      mutate({ ...formState });
    };
    return (
      <Modal opened={isOpen} onClose={close} title="Create New Contact">
        <Stack>
          <SimpleGrid cols={2}>
            <TextInput
              withAsterisk
              value={formState.name}
              label="First name"
              placeholder="Enter first name"
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
            />
            <TextInput
              withAsterisk
              value={formState.description}
              label="Last name"
              placeholder="Enter last name"
              onChange={(e) =>
                setFormState({ ...formState, description: e.target.value })
              }
            />
          </SimpleGrid>
          <TextInput
            withAsterisk
            value={formState.type}
            label="Phone number"
            placeholder="Enter first name"
            onChange={(e) =>
              setFormState({ ...formState, type: e.target.value })
            }
          />
          <TextInput
            value={formState.user_id}
            label="Address"
            placeholder="Enter Adress"
            onChange={(e) =>
              setFormState({ ...formState, user_id: e.target.value })
            }
          />
          {error && (
            <Alert variant="light" color="red" title="Error creating contact">
              {error.message}
            </Alert>
          )}
          <Flex gap="sm" mx="auto">
            <Button
              onClick={() => close()}
              variant="light"
              style={{ alignSelf: "center" }}
            >
              Cancel
            </Button>
            <Button loading={isPending} onClick={onSaveClick}>
              Create
            </Button>
          </Flex>
        </Stack>
      </Modal>
    );
  };*/