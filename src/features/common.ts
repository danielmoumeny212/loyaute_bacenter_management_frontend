
export const pending = (state: any) => {
  state.status = "loading";
  state.isLoading = true;
};

export const success = (state: any) => {
  state.status = "succeeded";
  state.isLoading = false;
};

export const rejected = (state: any, action: any) => {
  state.status = "failed";
  state.isLoading = false;
  state.error = action.error.message;
};