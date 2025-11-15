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
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photo-preview");

const Workers = []

// add worker
const addWorker = () => {
    const worker =  {
        id : Workers.length,
        name : Name.value.trim(),
        role : Role.value.trim(),
        email : Email.value.trim(),
        phone : phone.value.trim(),
        photo : photoPreview.src || null
    }
    Workers.push(worker)
    
}

// add photo
photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
        photoPreview.src = reader.result
        photoPreview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
});


const form = document.getElementById("worker-form");
document.getElementById("submit-worker").addEventListener("click", (e) =>{
    e.preventDefault();
    addWorker();
    modal.classList.add("hidden");
    form.reset()
    console.log(Workers);
})