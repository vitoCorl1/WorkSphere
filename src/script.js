// open and close model 
const modal = document.getElementById("crud-modal");
const experienceModal = document.getElementById("experience-modal");

const openBtn = document.getElementById("add-Worker-Button");
const openexperienceBtn = document.getElementById("experience");

const closeBtn = document.getElementById("close-model");
const closeExpModalBtn = document.getElementById("close-exp-modal");

const cancelBtn = document.getElementById("cancel-model");
const cancelExpBtn = document.getElementById("cancel-exp");

openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));

modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
});

openexperienceBtn.addEventListener("click", () => {
  experienceModal.classList.remove("hidden");
  modal.classList.add("hidden")
});

closeExpModalBtn.addEventListener("click", () => {
  experienceModal.classList.add("hidden");
  modal.classList.remove("hidden");
})


cancelExpBtn.addEventListener("click", () => {
  experienceModal.classList.add("hidden");
  modal.classList.remove("hidden");
})

experienceModal.addEventListener("click", (e) => {
    if (e.target === experienceModal){
      experienceModal.classList.add("hidden");
      modal.classList.remove("hidden");
    } 
});

// add new player
const Name = document.getElementById("name");
const Role = document.querySelector("select");
const Email = document.getElementById("Email");
const phone = document.getElementById("phone");
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photo-preview");

// woeker experiance
const yearsExp = document.getElementById("years-exp");
const skillsExp = document.getElementById("skills-exp");
const companiesExp = document.getElementById("companies-exp");

// workers storing object
const Workers = []

// add worker
const addWorker = () => {
  const experience = []
    const worker =  {
      id : Workers.length,
      name : Name.value.trim(),
      role : Role.value.trim(),
      email : Email.value.trim(),
      phone : phone.value.trim(),
      photo : photoPreview.src || "../img/manicon.png",
      exp: experience
    }
    const exp = {
      years :  yearsExp.value.trim(),
      skills : skillsExp.value.trim(), 
      companies : companiesExp.value.trim()
    }
    experience.push(exp);
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

const experienceForm = document.getElementById("experience-form");
document.getElementById("submit-exp").addEventListener("click", (e) => {
  e.preventDefault();
  addWorker();
  modal.classList.add("hidden");
  experienceModal.classList.add("hidden");
  form.reset();
  console.log(Workers);
});

// manuplating data displaying
const SalleConference = document.getElementById("Salle-de-conference");
const conferenceSalleBtn = document.getElementById("conference-salle-btn");
const workersModel = document.getElementById("workers-model");
const workerContairer = document.getElementById("worker-contairer");

workersModel.addEventListener("click", (e) => {
  if(e.target == workersModel) workersModel.classList.add("hidden")
})

conferenceSalleBtn.addEventListener("click", () => {
  workerContairer.innerHTML = ``;
  const comfworkersList = document.createElement("div");
  comfworkersList.className = "bg-white";
  
  Workers.map(worker => {
    comfworkersList.innerHTML += `
    <div class="flex flex-row items-center gap-5 text-slate-800">
    <img src="${worker.photo}" alt="${worker.name}" class="relative inline-block h-[38px] w-[38px] !rounded-full object-cover object-center" />
    <div>
    <h5 class="font-semibold text-slate-800">${worker.name}</h5>
    <p class="text-xs uppercase font-bold text-slate-500">${worker.role}</p>
    </div>
    </div>
    `
  })
  workersModel.classList.remove("hidden");
  if(Workers.length == 0) workersModel.classList.add("hidden");
  workerContairer.append(comfworkersList);
})


const SalleSecurite = document.getElementById("Salle-de-securite");
document.getElementById("Salle-securite-btn").addEventListener("click", () => {
  const securite = Workers.filter(e => e.role == "Agent de sécurité");
  console.log("security", securite);
  const securityWorkersList = document.createElement("div");
  securityWorkersList.className = "bg-white";

  workerContairer.innerHTML = ``;

  securite.forEach(worker => {
    securityWorkersList.innerHTML += `
      <div class="flex flex-row items-center gap-5 text-slate-800">
      <img src="${worker.photo}" alt="${worker.name}" class="relative inline-block h-[38px] w-[38px] !rounded-full object-cover object-center" />
      <div>
      <h5 class="font-semibold text-slate-800">${worker.name}</h5>
      <p class="text-xs uppercase font-bold text-slate-500">${worker.role}</p>
      </div>
      </div>
    `
  })

  // securityWorkersList.addEventListener("click", () => {
  //   const securityContainer = document.getElementById("security-container");
  //   const security = document.createElement()
  // })
  workersModel.classList.remove("hidden")
  workerContairer.append(securityWorkersList);
})