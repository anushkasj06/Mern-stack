let deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (!confirm("Are you sure you want to delete this chat?")) {
            e.preventDefault();
        }
        
    });
});
