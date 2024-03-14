import ToDo from "./_components/todo/todo.component";

export default function Home() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <ToDo className="md:bg-white md:shadow-lg rounded-lg p-8 w-full md:w-auto max-w-md" />
        </div>
    );
}
