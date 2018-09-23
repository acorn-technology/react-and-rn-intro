# Redux

Yay.

## Prerequisites

Good news! You barely have to install anything this time! It's the same prerequisites as the first session. So if you bring the same computer, you should be good to go. The only thing I ask you to do is to make sure that you have a *working* video player app. If you didn't have the time to finish the app from the React session, clone the repo here:
`https://github.com/appsupport-at-acorn/react-and-rn-intro` and navigate into `tutorial/redux/source/start/my-app`. Update your YouTube API-key in `app.js` and run `npm install` and `npm start`, just to see that the app is working.

## Redux from scratch

We will now implement Redux from scratch so that you will get a good understanding of the pattern and how the different plugins and binding libraries in the Redux ecosystem work under the hood. I'm encouraging you to think about the pattern and concepts we've been talking about and not just copy-pasting the code.

<br/>

<img src="images/data-flow3.png" height="300"/>

<br/>

There's one important statement to make here. React, like we discussed in the first session, has a virtual DOM that contains a clever diffing algorithm that optimizes repaints of the page based on when the state changes. Implementing Redux from scratch together with React would be very cumbersome, because we cannot call the `render()` function manually (the components would simply loose their state if we try to do that).

Instead, we'll just go plain vanilla in this first exercise. Unfortunately we cannot re-use the JSX components and HTML markup that we created last time, and for the sake of simplicity another domain has been chosen - the classical **TODO List**. I've prepared a pretty UI for you, no worries. Save [this](./source/solution/redux-from-scratch/index.html) file somewhere (location doesn't matter) and open it in your browser. Be aware that there will be no live-reload on that page so you'd have to hit F5 to see your changes.

Open the file in an editor of your choice.

Create a new empty file named `app.js` next to it.





TODOOOOO:

Our `app.js` should look like something like this:

    class App extends Component {

        constructor(props) {
            super(props);

            this.state = {
                videos: [],
                selectedVideo: null
            };

            this.videoSearch('acorntechnology');
        }

        // ...
    }

We can clearly see the App component's state defined here, but since we from now on will try to follow the Redux pattern, let's move it to where Redux stores its state - the *store*.

Create a function called `createStore()` with an empty state in it:

    createStore() {
        let state;
    }

Then, add a variable called store to our App component so that it looks like this:

    class App extends Component {
        store = {};

        constructor(props) {
        // ...
    }

Create the store in the constructor:

    this.store = this.createStore();

 Begin thinking a little bit about the *actions* we might need. What kind of interactions can the user currently perform in the app? Issuing new search queries to the YouTube API is one thing, so let's start with that.

Add the following
    export const SEARCH_YOUTUBE = 'SEARCH_YOUTUBE';


We would like to dispatch this action somehow, right? Let's add a dispatch function to our store.

    function dispatch(action) {
        console.log('Dispatching action', action);
    }

And call it in the `videoSearch()` function:

    this.store.dispatch(actions.SEARCH_YOUTUBE);

If you run the application by issuing `npm start` in the terminal, you should now get an error in the browser console saying:

    Cannot read property 'dispatch' of undefined

Our store doesn't expose it yet, so let it return an object containing the function, like this:

    return { dispatch };

***

Remember that an action is a plain JavaScript object containing the type of action and a payload. Right now it's just dispatching a string and not an object. An action could look like:

    {
        type: actions.SEARCH_YOUTUBE,
        payload: 'Funniest cat compilation ever made'
    }

Let's change the dispatch-call:

    this.store.dispatch({
        type: actions.SEARCH_YOUTUBE,
        searchTerm
    });

**NOTE:** Only writing `searchTerm` like above is a JavaScript shorthand for writing `searchTerm: searchTerm`.

Okay, look again in the console and you will see that we now receive the full object with the payload as well. Great!

We will need to add more methods to the store in just a little bit, but let's define the last concept of the Redux pattern: the *reducer*.

It's a function that takes the previous (or current) state and an action, and returns a new state. Easy peasy.

    reducer(state, action) {
        return state;
    }

The above reducer is perfectly valid. It is pure and will always return the same output no matter the input, but it doesn't do anything yet :-)

Let's elaborate:

    reducer(state, action) {
        console.log('Inside the reducer with state ', state, 'and action', action);

        switch (action.type) {
            case actions.SEARCH_YOUTUBE:
                return {...state, searchTerm: action.searchTerm };
            default:
                return state;
        }
    }

Pay attention to the spread-operator (...) above. It's the same thing as literally spreading out all elements (if used on an array) or properties (if used on an object). And if it is used with objects, properties can override each other just like we did with `searchTerm` above which left the rest of the state untouched. It's a quick way to re-use properties of an object instead of explicitly having to clone it to be able to return a new object (which our reducer must do). Some quick examples of the spread operator if you haven't seen it before:

    const a = [1,2];
    const b = [...a, 3]; // [1,2,3]

<br/>

    const a = {foo: 'foo', bar: 'bar'};
    const b = {...a, foo: 'haz'}; // {foo: 'haz', bar: 'bar'}

Every time a `SEARCH_YOUTUBE`-action is triggered, the state will be updated with the new `searchTerm`. Now, in order for the store to know how to update its state, it has to know about the reducer. Let's pass it just that.

    this.store = this.createStore(this.reducer);


Remember from the re-cap that our current data state of the app (the combined `this.state =`-assignments) could be described as the following?

    {
        searchTerm: '',
        videos: [],
        selectedVideo: null
    }

That's our initial state, let's pass that as well when creating the store:

    const initialState = {
        searchTerm: '',
        videos: [],
        selectedVideo: null
    };

    this.store = this.createStore(this.reducer, initialState);

Don't forget to update the beginning of `createStore` too:

    createStore(reducer, initialState) {
        let state = initialState;
        // ...
    }

Time to have a look in the console. You should see two logs, one from the dispatch call and one from when the reducer received the action together with the current state.

***

I know, there's nothing really exciting going on here yet. Patience my friends :-)

For debugging purposes, it would be good to see our current state object on the page while developing.

// TODO massa
TODO: At this point, we call `render()` manually. This will not work.

    Uncaught TypeError: Cannot read property 'state' of undefined

That's why there is an npm package for creating bindings between React and Redux.

React has its virtual DOM that is very good at optimizing repaints of the page based on what parts have changed.

***

One of our goals is to replace `setState()` with a call to  `store.dispatch()`.



## Using the Redux library and Redux DevTools Extension

Normally, you would install the the Redux lib through npm by running `npm install redux`, but for the sake of this demo, it's already linked from a CDN. If you look in `index.html` you can see a reference to `redux.min.js`, which will make it available on the `windows`-object, so we don't have to install anything!

You will now keep the actions and reducers that you wrote. The only thing that will change is `createStore()`. We will use Redux's `createStore()` instead of our own function.

Comment out your whole `createStore()`-function and replace the call to it with this:

window.Redux.createStore(reducer, initState);

Reload the page and you should now get...the same result! Should we be surprised? No. Redux is a tiny library landing at only 99 lines of code. But we have now seen that we could implement it ourseleves. Cool huh?

But what else does this lib do for us? The point is that it exposes some functionality for others to plug in to, as we will see in the next chapter.

### Redux DevTools Extension

Now that we're using Redux's `createStore()`, a browser extension called Redux DevTools Extension will know how to hook up to our store and provide a lot of nice features!

Install the extension by following the instructions using the first option for the browser you are running: https://github.com/zalmoxisus/redux-devtools-extension

In order for it to work when we're running without a server (i.e. using the file:///-protocol), you must configure the extension to allow such access:
https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/Troubleshooting.md#access-file-url-file

> NOTE: You might have to restart your browser for things to kick in.

If you now refresh your browser you should see a new section in the browser DevTools called *Redux*. However, it says `No store found`. We need to provide a third argument to `createStore()` that adds this stuff as an *enhancer*, which is something that is similar to middleware, but let's leave it there.

Again, change your `createStore()`-call to the following:

    window.Redux.createStore(reducer, initState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

As you will now see if you hit F5, you will be able to do lots of cool things here!

// TODO: Slider, import/export etc

<br/>

![alt text](images/redux-devtools.png)
![alt text](images/redux-devtools2.png)

## Using React with Redux

So far we haven't touched React. Why? Because it would be hard to write all the wiring needed from scratch. React has its own virtual DOM and `render()`-method that should not be called manually. And remember that Redux is a general pattern and has no relation to React, although they fit very good together as we will see in a while.

> Note that more intimidating concepts will be introduced here, but they are all React-Redux-specific.

Okay, let's finally get back to our video player app!

***

### Re-cap from the React session

In the app, we communicate via callbacks (props) between parent and child components in multiple levels:

The `App` component provide a prop called `onVideoSelect` to its child component `VideoList`, which is a callback setting the state as seen below:

    <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})}>

The `VideoList` component just passes this prop on to its child `VideoListItem`:

    <VideoListItem onVideoSelect={props.onVideoSelect}>

And then finally `VideoListItem` uses this callback each time an item is clicked:

    <li onClick={() => onVideoSelect(video)}>

In the video player app, we also have these lines:

    // [app.js]
    this.state = {
        videos: [],
        selectedVideo: null
    };

    // [search-bar.js]
    this.state = {searchTerm: ''};

That was our combined initial state!

Translated into a single plain JavaScript object, the above could be expressed as:

    {
        searchTerm: '',
        videos: [],
        selectedVideo: null
    }

In the Redux world, the above would be referred to as *data state*. Of course there are more things in the application that *could* be included in the state depending on how detailed one would like to be, but since it's often data that drives state, we will only consider this type of state in this app.

Okay, that was a little bit about the current status of the application. Now it's time to introduce Redux to it to get rid of these callbacks and also be able to use the Redux DevTools to track state changes over time!

***

### Install the official React bindings for Redux

Run

    npm install redux react-redux

Open the project in your editor.

// TODO

    <Provider />
    connect()
    mapStateToProps etc

***

You made it til' the end, good job mate! I hope that you feel that have learnt something and would like to explore React and Redux more in future.