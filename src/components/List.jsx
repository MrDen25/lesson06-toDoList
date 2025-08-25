import './List.css'
import Item from './Item';

export default function List({ tasks,toggleStatus,dellTask,editTask}) {
    return (
        <ul>
            {tasks.map(el =>
                <Item key={el.id} {...el} toggleStatus={toggleStatus} dellTask={dellTask} editTask={editTask}/>
            )}
        </ul>
    );
}