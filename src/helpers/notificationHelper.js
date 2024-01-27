import { showNotification } from "@mantine/notifications";

export const successNotification = (msg) => {
  showNotification({
    title: "Success",
    color: "green",
    message: msg,
  });
};

export const failureNotification = (msg) => {
  showNotification({
    title: "Failure",
    color: "red",
    message: msg,
  });
};
