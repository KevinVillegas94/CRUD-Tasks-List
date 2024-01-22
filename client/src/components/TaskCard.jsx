import { useNavigate } from "react-router-dom";


export function TaskCard({ task }) {

    const navigate = useNavigate()

    return (
        <div onClick={() => {
            navigate(`/tasks/${task.id}`)
        }}>

            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-10">
                        <div className="card-body">
                            <h5 className="card-title text-uppercase text-white">{task.title}</h5>
                            <p className="card-text">{task.description}</p>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <p>{task.status}</p>



                        <div className="estado d-flex justify-content-center p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-slash-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-circle-half" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}





