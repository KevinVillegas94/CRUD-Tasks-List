import Select from 'react-select'
import { useEffect, useState } from "react";
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
  const [selectedOption, setSelectedOption] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      const res = await updateTask(params.id, data);
      console.log('actualizando datos: ', res)
      console.log('params data', data)
      toast.success("Task updated", {
        position: "bottom-right",
        style: {
          background: "black",
          color: "#fff",
        },
      });
    } else {
      await createTask(data);
      console.log('crear tarea:', data)
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
        //setValue("status",data.status);
      }
    }
    loadTask();
  }, []);

  const options = [
    { value: '1', label: 'Pending' },
    { value: '2', label: 'In progress' },
    { value: '3', label: 'Complete' }
  ]
  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    console.log(selected.value)
    setValue("status", selected.value);  // Aquí establecemos el valor del campo "status" en react-hook-form
    console.log()
  };


  return (
    <div>

      <form onSubmit={onSubmit}>

        <input className="form-control mb-3" type="text" placeholder="Title"
          {...register('title', { required: true })}
        />
        {errors.title && <span>This field is requiered</span>}

        <textarea className="form-control mb-3" rows="3" placeholder="Description"
          {...register('description' , { required: true })}
        ></textarea>
        {errors.title && <span>This field is requiered</span>}




        <Select className='mb-3'
          options={options}
          defaultValue={'Status Task'}
          value={selectedOption}
          onChange={handleSelectChange}
          //{...register('status', { required: true })}
        />



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
