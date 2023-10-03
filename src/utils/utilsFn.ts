export const removeBodyLeftPadding = () => {
  document.body.style.paddingLeft = "0px";
};

export const fullName = (first_name: string, last_name: string) => {
  return [first_name, last_name].join(" ");
};

export const handleOpen = (
  setter: (value: React.SetStateAction<boolean>) => void
) => setter(true);

export const handleClose = (
  setter: (value: React.SetStateAction<boolean>) => void
) => setter(false);

export const getChurchInfo = (): {name: string, id: number} => {
  return JSON.parse(localStorage.getItem("church_info")!) || 0;
};
export const removeChurchId = () => {
  localStorage.removeItem("church_id");
};
