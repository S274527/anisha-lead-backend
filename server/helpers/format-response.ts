import * as CONSTANTS from "../constants";

const { RESPONSES } = CONSTANTS;
export default (message, data, error = false) => ({
    error: !!error,
    message: message || (error ? RESPONSES.common500 : "Success"),
    data,
});
