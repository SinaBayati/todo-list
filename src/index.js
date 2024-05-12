import './styles.css';
import createInitialDATA from './createInitialDATA.js';
import { removeTodo, addTodo } from './todoAddRemove.js';

const DATA = createInitialDATA();
localStorage.setItem("DATA",JSON.stringify(DATA));

