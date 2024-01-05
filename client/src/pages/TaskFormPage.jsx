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
                <input type="text" placeholder="Title" 
                {...register('title', {required: true})}
                />
                {errors.title && <span>This field is requiered</span>}
                <textarea rows="3" placeholder="Description"
                {...register('description', {required: true})}
                ></textarea>
                {errors.title && <span>This field is requiered</span>}
                <input type="checkbox" />
                <button>Save</button>
            </form>
            {params.id && <button onClick={async () => {
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
    )
}
