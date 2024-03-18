"use client";

import { useEffect, useState } from "react";
import TodoForm from "./todo-form.component";
import TodoListItem from "./todo-list-item.component";
import CommonModal from "../common/modal.component";
import { UserButton } from "@clerk/nextjs";

const ToDo = () => {
    const [todoList, setTodoList] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCompletedScreen, setIscompletedScreen] = useState(false);
    const [completedTodoList, setCompletedTodoList] = useState([]);

    const lastCompletedShowFirst = [...completedTodoList].reverse();

    const handleDeleteAllTodos = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete all todos?"
        );
        if (confirmDelete) {
            setIsDeleting(true);
            localStorage.removeItem("storeTodoList");
            setTodoList([]);

            setTimeout(() => {
                setIsDeleting(false);
            }, 300);
        }
    };

    useEffect(() => {
        const storedTodoData = localStorage.getItem("storeTodoList");
        const storedCompletedTodoData = localStorage.getItem(
            "storeCompletedTodoList"
        );
        if (storedTodoData) {
            try {
                const parsedTodoData = JSON.parse(storedTodoData);
                setTodoList(parsedTodoData);
            } catch (error) {
                setTodoList([]);
            }
        } else {
            setTodoList([]);
        }

        if (storedCompletedTodoData) {
            try {
                const parsedCompletedTodoData = JSON.parse(
                    storedCompletedTodoData
                );
                setCompletedTodoList(parsedCompletedTodoData);
            } catch (error) {
                setCompletedTodoList([]);
            }
        } else {
            setCompletedTodoList([]);
        }
    }, []);

    return (
        <div className="p-10 md:rounded-lg md:shadow-2xl flex flex-col mx-auto items-center bg-gray-100 w-full md:w-[60%] h-auto md:h-[85%]">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                    To Do APP
                </h1>

                <UserButton />
            </div>
            <div className="mb-6 w-full p-5">
                <CommonModal
                    modalTitle="Add Task"
                    modalElement={
                        <TodoForm
                            todoList={todoList}
                            setTodoList={setTodoList}
                        />
                    }
                />
            </div>

            <div className="w-full h-full overflow-y-auto">
                <div className="flex items-center  justify-between w-full p-4">
                    <div className="bg-gray-300">
                        <button
                            className={`p-3 ${
                                !isCompletedScreen && "text-white bg-blue-500"
                            }`}
                            onClick={() => setIscompletedScreen(false)}
                        >
                            To Do
                        </button>
                        <button
                            className={`p-3 ${
                                isCompletedScreen && "text-white bg-blue-500"
                            }`}
                            onClick={() => setIscompletedScreen(true)}
                        >
                            Completed
                        </button>
                    </div>
                    {!isCompletedScreen && (
                        <button
                            onClick={handleDeleteAllTodos}
                            disabled={todoList.length === 0}
                            className="bg-blue-500 md:w-auto hover:bg-blue-700 text-white px-4 py-2 font-bold md:py-4 md:px-8 transition-colors duration-300 tracking-wider mt-4 md:mt-0"
                        >
                            {isDeleting ? "Deleting..." : "  Delete All Todos"}
                        </button>
                    )}
                </div>

                {isCompletedScreen ? (
                    lastCompletedShowFirst.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-gray-500">
                            <p className="text-xl md:text-2xl font-bold mb-4">
                                No Completed Todo Tasks Yet
                            </p>
                            <p className="text-sm md:text-base">
                                Complete your first task
                            </p>
                        </div>
                    ) : (
                        lastCompletedShowFirst.map((item, index) => {
                            return (
                                <TodoListItem
                                    isCompletedScreen={isCompletedScreen}
                                    key={index}
                                    item={item}
                                    itemId={index}
                                    completedTodoList={completedTodoList}
                                    setCompletedTodoList={setCompletedTodoList}
                                />
                            );
                        })
                    )
                ) : todoList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-gray-500">
                        <p className="text-xl md:text-2xl font-bold mb-4">
                            No Todo Tasks Yet
                        </p>
                        <p className="text-sm md:text-base">
                            Add your first task to get started!
                        </p>
                    </div>
                ) : (
                    todoList.map((item, index) => {
                        return (
                            <TodoListItem
                                key={index}
                                item={item}
                                itemId={index}
                                todoList={todoList}
                                setTodoList={setTodoList}
                                completedTodoList={completedTodoList}
                                setCompletedTodoList={setCompletedTodoList}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ToDo;

//Comment
