# React 18 event issue

React version: `18.2.0`

## How to reproduce

### Working way using `ReactDOM.render`

1. Run the app (`npm start`), it will display a page with a button
2. Open the Javascript console (browser's dev tools) to see some logs that will appear (Note that you should see the React warning about using the deprecated ReactDOM.render function)
3. Click on the button, a popup shows
4. Click anywhere on the window, it will close the popup

### Not working way using `ReactDOM.createRoot`

1. Change the value of the `ENABLE_NEW_REACT_18_CREATEROOT` in file `src/index.tsx` to `true` (The page should reload)
2. Click the button, ... and nothing happens (well graphically at least, because in the console, we can see that the popup is closed right after opening)

## Quick fix

A quick fix is to uncomment the line `32` (`event.stopPropagation()`) to make it work again.

It looks like, with the new ReactDOM.createRoot function, that the popup rendering is done before the processing of the initial button's click event is even finished...

Alright, we are messing up with window event listener there. But that's because we want the popup to close on any click on the window. Maybe there is a better way for doing that properly?
