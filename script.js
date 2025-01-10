// JavaScript File: script.js

document.addEventListener("DOMContentLoaded", () => {
    const blocksPanel = document.querySelector(".blocks-panel");
    const canvasArea = document.querySelector(".canvas");

    // Enable dragging for blocks
    blocksPanel.querySelectorAll(".block").forEach(block => {
        block.setAttribute("draggable", "true");

        block.addEventListener("dragstart", event => {
            event.dataTransfer.setData("text/plain", block.textContent);
        });
    });

    // Enable drop on the canvas
    canvasArea.addEventListener("dragover", event => {
        event.preventDefault();
    });

    canvasArea.addEventListener("drop", event => {
        event.preventDefault();
        const blockContent = event.dataTransfer.getData("text/plain");
        

        // Create a new block element on the canvas:sa
        const newBlock = document.createElement("div");
        newBlock.textContent = blockContent;
        newBlock.className = "block";
        newBlock.style.position = "absolute";
        newBlock.style.left = `${event.offsetX}px`;
        newBlock.style.top = `${event.offsetY}px`;
        newBlock.setAttribute("draggable", "true");

        // Allow dragging of the new block within the canvas
        newBlock.addEventListener("dragstart", event => {
            event.dataTransfer.setData("text/plain", JSON.stringify({
                content: newBlock.textContent,
                left: event.offsetX,
                top: event.offsetY
            }));
        });

        canvasArea.appendChild(newBlock);
    });

    console.log("Drag and drop functionality initialized!");
});
