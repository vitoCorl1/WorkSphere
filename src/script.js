document.getElementById("add-Worker-Button").addEventListener("click", () =>  workermodel.className = "show")
document.getElementById("close-model").addEventListener("click", () => workermodel.className = "hidden");
document.getElementById("cancel-model").addEventListener("click", () => workermodel.className = "hidden");


const workermodel = document.getElementById('crud-modal')

// addWorkerButton 