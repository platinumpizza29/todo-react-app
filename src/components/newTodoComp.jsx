import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../services/supabase";

export default function NewTodoComp() {
  const navigate = useNavigate();

  const { id } = useParams();

  const date1 = Date.now();
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState(false);
  const [user_id, setUserId] = useState("");
  var handleNewTask = async () => {
    try {
      var newTask = await supabase
        .from("todo")
        .insert([
          { user_id: id, todo: todo, date: date1, time: time, status: status },
        ]);
      console.log(newTask);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    var data = JSON.parse(sessionStorage.getItem("user_session"));
    if (data === null) {
      navigate("/login");
    } else {
      setUserId(id);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <label htmlFor="todo" className="mb-4">
        Todo
      </label>
      <input
        type="text"
        placeholder="Add New Task"
        className="input input-bordered w-full mb-4"
        onChange={(e) => setTodo(e.target.value)}
      />
      <div className="flex flex-row">
        {/* future implementations */}
        {/* <button className="btn btn-ghost">Select Date</button>
        <button className="btn btn-ghost">Select Time</button> */}
        <button className="btn btn-primary" onClick={handleNewTask}>
          Submit
        </button>
      </div>
    </div>
  );
}
