document.addEventListener("DOMContentLoaded", () => {
    const blocksPanel = document.querySelector(".scrollable-blocks");
    const clearAllBtn = document.getElementById("clear-all-btn");
    const canvasArea = document.querySelector(".canvas");

    // Clear all blocks when the button is clicked
    clearAllBtn.addEventListener("click", () => {
        while (canvasArea.firstChild) {
            canvasArea.removeChild(canvasArea.firstChild);
        }
    });

    // Enable dragging for blocks
    blocksPanel.querySelectorAll(".block").forEach(block => {
        block.setAttribute("draggable", "true");

        block.addEventListener("dragstart", event => {
            event.dataTransfer.setData("text/plain", block.textContent);
        });
    });

    // Enable drop on the canvas
    canvasArea.addEventListener("dragover", event => {
        event.preventDefault(); // Allow drop by preventing the default behavior
    });

    canvasArea.addEventListener("drop", event => {
        event.preventDefault();
        const blockContent = event.dataTransfer.getData("text/plain");

        const newBlock = createBlock(blockContent, event.offsetX, event.offsetY);
        canvasArea.appendChild(newBlock);
    });

    console.log("Drag, drop, move, and context menu functionality initialized!");

    // Function to create a block
    function createBlock(content, x, y) {
        const block = document.createElement("div");
        block.textContent = content;
        block.className = "block";
        block.style.position = "absolute";
        block.style.left = `${x}px`;
        block.style.top = `${y}px`;
        block.setAttribute("draggable", "true");

        // Enable dragging
        let offsetX, offsetY;
        block.addEventListener("mousedown", (e) => {
            offsetX = e.clientX - block.offsetLeft;
            offsetY = e.clientY - block.offsetTop;
            e.preventDefault();

            const moveBlock = (e) => {
                block.style.left = `${e.clientX - offsetX}px`;
                block.style.top = `${e.clientY - offsetY}px`;
            };

            document.addEventListener("mousemove", moveBlock);

            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", moveBlock);
            });
        });

        // Add context menu for delete and clone
        block.addEventListener("contextmenu", (e) => {
            e.preventDefault(); // Prevent the default right-click menu

            // Create the custom context menu
            const menu = document.createElement("div");
            menu.className = "context-menu";
            menu.style.position = "absolute";
            menu.style.left = `${e.pageX}px`;
            menu.style.top = `${e.pageY}px`;

            // Add menu options (e.g., Delete and Clone)
            const deleteOption = document.createElement("div");
            deleteOption.textContent = "Delete";
            deleteOption.addEventListener("click", () => {
                block.remove();
                menu.remove(); // Remove the menu after selection
            });

            const cloneOption = document.createElement("div");
            cloneOption.textContent = "Clone";
            cloneOption.addEventListener("click", () => {
                const clonedBlock = createBlock(
                    block.textContent,
                    parseInt(block.style.left) + 20, // Offset position slightly
                    parseInt(block.style.top) + 20
                );
                canvasArea.appendChild(clonedBlock);
                menu.remove(); // Remove the menu after selection
            });

            // Append options to the menu
            menu.appendChild(deleteOption);
            menu.appendChild(cloneOption);

            // Append the menu to the document
            document.body.appendChild(menu);

            // Remove the menu when clicking anywhere else
            document.addEventListener("click", () => {
                menu.remove();
            }, { once: true });
        });

        return block;
    }
});
