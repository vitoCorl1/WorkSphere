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
        photo : photoPreview.src || "../img/manicon.png"
    }
    Workers.push(worker)
    displayWorkerCard(worker);   
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

const workersContainer = document.getElementById("workers-container");

const displayWorkerCard = (worker) => {
  const card = document.createElement("div");
  workersContainer.classList.remove("hidden")
  card.innerHTML = `
    <div class="flex flex-row items-center gap-5 text-slate-800">
        <img src="${worker.photo}" alt="${worker.name}" class="relative inline-block h-[38px] w-[38px] !rounded-full object-cover object-center" />
        <div>
            <h5 class="font-semibold text-slate-800">${worker.name}</h5>
            <p class="text-xs uppercase font-bold text-slate-500">${worker.role}</p>
        </div>
    </div>
  `
  workersContainer.append(card)
}

const form = document.getElementById("worker-form");
document.getElementById("submit-worker").addEventListener("click", (e) =>{
    e.preventDefault();
    addWorker();
    modal.classList.add("hidden");
    form.reset()
    photoPreview.classList.add("hidden");
    photoPreview.src = "../img/manicon.png"
    console.log(Workers);
})