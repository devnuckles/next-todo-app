import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";

const TodoListItem = ({ item, itemId, todoList, setTodoList }) => {
    const handleDeleteSingleTodo = (itemId) => {
        const updatedTodoAfterDelete = [...todoList];
        updatedTodoAfterDelete.splice(itemId, 1);

        localStorage.setItem(
            "storeTodoList",
            JSON.stringify(updatedTodoAfterDelete)
        );
        setTodoList(updatedTodoAfterDelete);
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
            <div>
                <DeleteOutlineOutlinedIcon
                    className="text-white hover:text-red-600 duration-300 mx-2 text-[40px] cursor-pointer"
                    onClick={() => {
                        handleDeleteSingleTodo(itemId);
                    }}
                />
                <CheckIcon className=" text-[40px]" color="success" />
            </div>
        </div>
    );
};

export default TodoListItem;
