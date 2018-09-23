const ADD_TODO      = 'ADD_TODO';
const REMOVE_TODO   = 'REMOVE_TODO';
const TOGGLE_TODO   = 'TOGGLE_TODO';
const RESET_TODOS   = 'RESET_TODOS';

function reducer(state, action) {
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
                    item.completed = !item.completed;
                };

                return item;
            });

        case RESET_TODOS:
            return [];

        default:
            return state;
    }
}

const initState = [];
const store = createStore(reducer, initState
// const store = window.Redux.createStore(reducer, initState
// ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function createStore(reducer, initState) {
    let state       = initState;
    const listeners = [];

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener(this));
    }

    function subscribe(listener) {
        listeners.push(listener);
    }

    return { getState, dispatch, subscribe };
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

// TODO: Move? Works with window.Redux?
store.subscribe(render);

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

function attachEventHandlers(store) {
    const formElement         = document.getElementById('form');
    const inputElement        = document.getElementById('input');
    const resetButtonElement  = document.getElementById('resetButton');

    inputElement.focus();

    form.addEventListener('submit', () => {
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

attachEventHandlers(store);
