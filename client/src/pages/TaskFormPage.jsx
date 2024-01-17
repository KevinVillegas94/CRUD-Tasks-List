import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, deleteTask, getTask, updateTask } from "../api/Tasks.api";
import { toast } from "react-hot-toast";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Task updated", {
        position: "bottom-right",
        style: {
          background: "black",
          color: "#fff",
        },
      });
    } else {
      await createTask(data);
      toast.success("New Task Added", {
        position: "bottom-right",
        style: {
          background: "black",
          color: "#fff",
        },
      });
    }

    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const { data } = await getTask(params.id);
        setValue("title", data.title);
        setValue("description", data.description);
      }
    }
    loadTask();
  }, []);

  return (
    <div>

      <form onSubmit={onSubmit}>

        <input className="form-control mb-3" type="text" placeholder="Title"
          {...register('title', { required: true })}
        />
        {errors.title && <span>This field is requiered</span>}
        <textarea className="form-control mb-3" rows="3" placeholder="Description"
          {...register('description', { required: true })}
        ></textarea>
        {errors.title && <span>This field is requiered</span>}
        <select className="form-select mb-3" aria-label="Default select example">
          <option selected>Task status</option>
          <option value="1">Pending</option>
          <option value="2">In progress</option>
          <option value="3">Complete</option>
        </select>
        <div className="row">
          <div className="col">
            <div className="d-inline-flex">
              {params.id && <button type="submit" className="btn btn-danger" onClick={async () => {
                await deleteTask(params.id)
                toast.success("Task Delete", {
                  position: "bottom-right",
                  style: {
                    background: "black",
                    color: "#fff",
                  },
                });
                navigate('/tasks')
              }}>Delete</button>}
            </div>
          </div>
          <div className="col">
              <div className="d-flex justify-content-end mb-3">
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </div>
        </div>






      </form>
    </div>
  )
}
