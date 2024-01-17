import { Link } from 'react-router-dom'

export function Navigation() {
    return (
        <div className="row">
            <div className="col">
                <Link className="text-white fs-1 fw-bold text-decoration-none" to="/tasks">Task App</Link>
            </div>
            <div className="col d-flex p-2 justify-content-end">
                <button type="button" className="btn btn-primary btn-sm">
                    <Link className="text-white text-decoration-none" to="/tasks-crate">create task</Link>
                </button>
            </div>
        </div>
    )
}