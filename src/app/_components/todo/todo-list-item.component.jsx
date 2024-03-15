import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";

const TodoListItem = ({
    item,
    itemId,
    todoList,
    setTodoList,
    isCompletedScreen,
    completedTodoList,
    setCompletedTodoList,
}) => {
    const handleDeleteSingleTodo = (itemId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this todos?"
        );
        if (confirmDelete) {
            const updatedTodoAfterDelete = [...todoList];
            updatedTodoAfterDelete.splice(itemId, 1);

            localStorage.setItem(
                "storeTodoList",
                JSON.stringify(updatedTodoAfterDelete)
            );
            setTodoList(updatedTodoAfterDelete);
        }
    };
    const handleCompleteSingleTodo = (itemId) => {
        const confirmCompleted = window.confirm(
            "Are you sure you want to mark this todo as Completed?"
        );
        if (confirmCompleted) {
            let getCompletedTodos;

            setTodoList((prevTodoList) => {
                const updatedTodoList = [...prevTodoList];
                getCompletedTodos = updatedTodoList.splice(itemId, 1)[0];

                localStorage.setItem(
                    "storeTodoList",
                    JSON.stringify(updatedTodoList)
                );

                return updatedTodoList;
            });

            setCompletedTodoList((prevCompletedTodoList) => {
                const updatedCompletedTodoList = [
                    ...prevCompletedTodoList,
                    getCompletedTodos,
                ];

                localStorage.setItem(
                    "storeCompletedTodoList",
                    JSON.stringify(updatedCompletedTodoList)
                );

                return updatedCompletedTodoList;
            });
        }
    };

    return (
        <div className=" flex items-center justify-between bg-blue-500 p-4 my-4 w-full md:w-auto shadow-lg rounded-lg">
            <div>
                <h1 className="text-white font-semibold text-2xl md:text-3xl hover:text-blue-300 transition-colors duration-200">
                    {item.todoTitle}
                </h1>
                <p className="text-gray-200 text-sm md:text-base">
                    {item.todoDescription}
                </p>
            </div>
            {!isCompletedScreen && (
                <div>
                    <DeleteOutlineOutlinedIcon
                        className="text-white hover:text-red-600 duration-300 mx-2 text-[40px] cursor-pointer"
                        onClick={() => {
                            handleDeleteSingleTodo(itemId);
                        }}
                    />
                    <CheckIcon
                        className=" text-[40px] text-white hover:text-blue-900 duration-300 cursor-pointer"
                        onClick={() => {
                            handleCompleteSingleTodo(itemId);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default TodoListItem;
