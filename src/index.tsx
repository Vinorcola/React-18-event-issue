import { ReactNode, useEffect, useState } from "react"
import { render } from "react-dom"
import { createRoot } from "react-dom/client"

// This switches between ReactDOM.render (if false) and ReactDOM.createRoot (if true). See end of the file.
const ENABLE_NEW_REACT_18_CREATEROOT = true

// This memorize the latest event fires from the button.
let currentEvent: Event|null = null

// A global click listenenr on window.
window.addEventListener("click", (event) => {
    console.log(
        `Global click handler: %c${event === currentEvent ? "Same event": "Different event"}`,
        event === currentEvent ? "color: #00aa00" : "color: #dd0000",
    )
})

function App() {
    const [displayPopup, setDisplayPopup] = useState<boolean>(false)

    return (
        <div style={{ margin: 48 }}>
            <button
                type="button"
                onClick={(event) => {
                    console.log("Button click handler (React)")
                    currentEvent = event.nativeEvent
                    event.preventDefault()

                    // The following line needs to be uncommented if using the new React 18 createRoot (Quick fix?).
                    // event.stopPropagation()

                    setDisplayPopup(true)
                    console.log("Opening popup")
                }}
            >
                Display the popup, please
            </button>
            {displayPopup && (
                <Popup
                    onClose={() => {
                        setDisplayPopup(false)
                        console.log("Closing popup")
                    }}
                >
                    <p>Popup content here</p>
                </Popup>
            )}
        </div>
    )
}

// Below is the component displaying a popup.

interface PopupProps {
    onClose: () => void
    children: ReactNode
}

function Popup(props: PopupProps) {
    console.log("Rendering Popup")

    useEffect(() => {
        // We want the popup to close on a single click (left or right) anywhere on the page. FOr that purpose, we had
        // an event listener on the window to catch clicks from everywhere.

        function handleCloseByClick(event: Event) {
            console.log(
                `Popup click handler: %c${event === currentEvent ? "Same event": "Different event"}`,
                event === currentEvent ? "color: #00aa00" : "color: #dd0000",
            )
            event.preventDefault()
            props.onClose()
        }

        window.addEventListener("click", handleCloseByClick)
        window.addEventListener("contextmenu", handleCloseByClick)

        return () => {
            window.removeEventListener("click", handleCloseByClick)
            window.removeEventListener("contextmenu", handleCloseByClick)
        }
    }, [])

    return (
        <div
            style={{
                position: "absolute",
                top: 68,
                left: 100,
                width: 300,
                minHeight: "2em",
                backgroundColor: "#e6e6e6",
                border: "1px solid #9b9b9b",
                zIndex: 1,
            }}
        >
            {props.children}
        </div>
    )
}

if (ENABLE_NEW_REACT_18_CREATEROOT) {
    // New in React 18
    createRoot(document.getElementById("root") as HTMLDivElement).render(<App />)
} else {
    // React 17 and before
    render(<App />, document.getElementById("root") as HTMLDivElement)
}
