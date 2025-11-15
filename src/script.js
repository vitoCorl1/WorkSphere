// open and close model 
const modal = document.getElementById("crud-modal");
const openBtn = document.getElementById("add-Worker-Button");
const closeBtn = document.getElementById("close-model");
const cancelBtn = document.getElementById("cancel-model");

openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
});

// add new player
// workers storing object
const Name = document.getElementById("name");
const Role = document.querySelector("select");
const Email = document.getElementById("Email");
const phone = document.getElementById("phone");

const Workers = []
const addWorker = () => {
    console.log("hi")
    const worker =  {
        id : Workers.length,
        name : Name.value.trim(),
        role : Role.value.trim(),
        email : Email.value.trim(),
        phone : phone.value.trim()
    }
    Workers.push(worker)
}

const form = document.getElementById("worker-form");
document.getElementById("submit-worker").addEventListener("click", (e) =>{
    e.preventDefault();
    addWorker();
    modal.classList.add("hidden");
    form.reset()
    console.log(Workers);
})