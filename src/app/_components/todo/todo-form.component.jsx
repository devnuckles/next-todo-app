"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { todoValidation } from "./validation-schema";
import { TextField } from "@mui/material";

const TodoForm = ({ todoList, setTodoList }) => {
    const initialValues = {
        todoTitle: "",
        todoDescription: "",
    };

    const handleSubmit = (values, actions) => {
        // Handle form submission here
        console.log(values);
        let updatedTodoList = [...todoList];
        updatedTodoList.push(values);
        setTodoList(updatedTodoList);

        localStorage.setItem("storeTodoList", JSON.stringify(updatedTodoList));

        setTimeout(() => {
            actions.setSubmitting(false);
            actions.resetForm();
        }, 500);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={todoValidation}
        >
            {({ isSubmitting, resetForm }) => (
                <Form className="flex flex-col md:flex-row items-center justify-center gap-4 p-4">
                    <div className="w-full md:w-1/2">
                        <Field
                            as={TextField}
                            type="text"
                            id="todoTitle"
                            name="todoTitle"
                            label="Todo Title"
                            multiline
                            variant="filled"
                            className="w-full"
                        />
                        <ErrorMessage
                            name="todoTitle"
                            component="p"
                            className="error text-red-600"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Field
                            as={TextField}
                            id="todoDescription"
                            name="todoDescription"
                            label="Todo Description"
                            multiline
                            maxRows={4}
                            variant="filled"
                            className="w-full"
                        />
                        <ErrorMessage
                            name="todoDescription"
                            component="div"
                            className="error text-red-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-4 px-8 rounded-md transition-colors duration-300 tracking-wider mt-4 md:mt-0 md:w-auto "
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding...." : "Add"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default TodoForm;
