const ADD_TODO      = 'ADD_TODO';
const REMOVE_TODO   = 'REMOVE_TODO';
const TOGGLE_TODO   = 'TOGGLE_TODO';
const RESET_TODOS   = 'RESET_TODOS';

function createStore(reducer) {
    let state       = [];
    const listeners = [];

    function dispatch(action) {
        console.log('Dispatching action', action);
        state = reducer(state, action);
        listeners.forEach(fn => fn());
    }

    function getState() {
        return state;
    }

    function subscribe(fn) {
        listeners.push(fn);
    }

    return { dispatch, getState, subscribe };
}

function reducer(state, action) {
    console.log('Inside the reducer with state ', state, 'and action', action);

    switch (action.type) {
        case ADD_TODO:
            return [...state, {
                id: state.length,
                title: action.title,
                completed: false
            }];

        case REMOVE_TODO:
            return state.filter(item => item.id !== action.id);

        case TOGGLE_TODO:
            return state.map(item => {
                if (item.id === action.id) {
                    item = {...item, completed: !item.completed};
                };

                return item;
            });

        case RESET_TODOS:
            return [];

        default:
            return state;
    }
}

function init() {
    // Use our own store implementation
    window.store = createStore(reducer);

    // Use the Redux lib store
    // window.store = window.Redux.createStore(reducer, []);

    // Use the Redux lib store with Redux DevTools Extension
    // window.store = window.Redux.createStore(reducer, [], window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    store.subscribe(render);
    attachEventHandlers(store);
}

function render() {
    const listElement     = document.getElementById('list');
    listElement.innerHTML = '';

    store.getState().forEach(item => {
        const itemElement = document.createElement('li');

        itemElement.innerHTML = `
            <li class="${item.completed ? 'completed' : ''}">
                <div class="view">
                    <input class="toggle" type="checkbox" onClick="toggleTodo(${item.id});" ${item.completed ? 'checked': ''}>
                    <label>${item.title}</label>
                    <button class="destroy" onClick="removeTodo(${item.id})"></button>
                </div>
            </li>
        `;

        listElement.appendChild(itemElement);
    });
}

function attachEventHandlers(store) {
    const formElement         = document.getElementById('form');
    const inputElement        = document.getElementById('input');
    const resetButtonElement  = document.getElementById('resetButton');

    inputElement.focus();

    formElement.addEventListener('submit', () => {
        if (inputElement.value) {
            store.dispatch({
                type: ADD_TODO,
                title: inputElement.value
            });
        }

        inputElement.value = '';
    });

    resetButtonElement.addEventListener('click', () => store.dispatch({
        type: RESET_TODOS
    }));
}

function toggleTodo(id) {
    store.dispatch({
        type: TOGGLE_TODO,
        id: id
    });
}

function removeTodo(id) {
    store.dispatch({
        type: REMOVE_TODO,
        id: id
    });
}

init();