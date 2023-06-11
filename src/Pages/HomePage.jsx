import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewTodoComp from "../components/newTodoComp";
import supabase from "../services/supabase";

export default function HomePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [todos, setTodos] = useState([]);

  var handleLogout = async () => {
    sessionStorage.removeItem("user_session");
    navigate("/login");
  };

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("todo")
        .select("todo")
        .eq("user_id", id);

      if (error) {
        throw error;
      }

      setTodos(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("user_session") === null) {
      navigate("/login");
    }

    fetchData();

    supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todo" },
        (payload) => {
          console.log("Change received!", payload);
          setTodos((prevTodos) => [...prevTodos, payload.new["todo"]]);
          fetchData();
        }
      )
      .subscribe();
  }, []);

  return (
    <div className="bg-custom-18181f text-white overflow-auto">
      <div className="" id="nav">
        <div className="navbar bg-custom-#272732">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-2xl tracking-widest">
              Todo
            </a>
          </div>
          <div className="flex-none gap-2">
            <div className="form-control">
              <button className="btn btn-outline btn-primary ">Calender</button>
            </div>
            <div className="dropdown dropdown-end text-black">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="profile.png" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 md:mx-48 xl:mx-96">
        <div className="h-screen p-4" id="todo">
          <h1 className="tracking-widest text-3xl font-bold">Todos</h1>
          <button
            className="btn btn-block btn-primary mt-4 text-white"
            onClick={() => window.my_modal_1.showModal()}
          >
            Add Task!
          </button>
          <div className="h-screen mt-4 " id="all todos">
            {todos.map((value, index) => (
              <div
                className="card bg-custom-#272732 shadow-xl my-4 "
                key={index}
              >
                <div className="card-body">
                  <h1 className="card-title">{value.todo}</h1>
                </div>
              </div>
            ))}
          </div>

          <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
              <NewTodoComp />
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
}
