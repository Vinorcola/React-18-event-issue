import { ReactNode, useEffect, useState } from "react"
import { render } from "react-dom"
import { createRoot } from "react-dom/client"

const ENABLE_NEW_REACT_18_ROOT = false

function App() {
    const [displayPopup, setDisplayPopup] = useState<boolean>(false)

    return (
        <div style={{ margin: 48 }}>
            <button
                type="button"
                onClick={(event) => {
                    event.preventDefault()

                    // The following line needs to be uncommented if using the new React 18 root.
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
    useEffect(() => {
        // We want the popup to close on a single click (left or right) anywhere on the page.

        function handleCloseByClick(event: Event) {
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

if (ENABLE_NEW_REACT_18_ROOT) {
    // New in React 18
    createRoot(document.getElementById("root") as HTMLDivElement).render(<App />)
} else {
    // React 17 and before
    render(<App />, document.getElementById("root") as HTMLDivElement)
}
