
import { toast as notify } from "react-toastify";

export const toast = {
  success: (message: string) => notify.success(message),
  error: (message: string) => notify.error(message),
  warning: (message: string) => notify.warning(message),
  info: (message: string) => notify.info(message),
};
