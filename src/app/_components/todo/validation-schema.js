import * as Yup from "yup";

export const todoValidation = Yup.object().shape({
    todoTitle: Yup.string().required("Todo title is required"),
    todoDescription: Yup.string().required("Todo description is required"),
});
