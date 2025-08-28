import './List.css'
import Item from './Item';
import { useTaskContext } from '../context/TaskContext';

export default function List() {
    const {tasks} = useTaskContext()
    return (
        <ul>
            {tasks.map(el =>
                <Item key={el.id} {...el}/>
            )}
        </ul>
    );
}