// open and close model 
const modal = document.getElementById("crud-modal");
const experienceModal = document.getElementById("experience-modal");

const openBtn = document.getElementById("add-Worker-Button");
const openexperienceBtn = document.getElementById("experience");

const closeBtn = document.getElementById("close-model");
const closeExpModalBtn = document.getElementById("close-exp-modal");

const cancelBtn = document.getElementById("cancel-model");
const cancelExpBtn = document.getElementById("cancel-exp");

const show = el => el.classList.remove("hidden");
const hidde = el => el.classList.add("hidden");

openBtn.addEventListener("click", () => show(modal));
closeBtn.addEventListener("click", () => hidde(modal));
cancelBtn.addEventListener("click", () => hidde(modal));

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
const Workers = [
  {
    id: 23,
    name : "vito",
    role : "Technicien IT",
    email : "vito@gmai.com",
    phone : "03434734734",
    photo : "../img/manicon.png",
  }, {
    id: 24,
    name : "aymane",
    role : "Agent de sécurité",
    email : "hsdhsd@gmai.com",
    phone : "034333334734",
    photo : "../img/manicon.png",
  }, {
    id: 25,
    name : "hamza",
    role : "Manager",
    email : "hamza@gmai.com",
    phone : "0238438473",
    photo : "../img/manicon.png",
  }, {
    id: 24,
    name : "aymane",
    role : "Agent de sécurité",
    email : "hsdhsd@gmai.com",
    phone : "034333334734",
    photo : "../img/manicon.png",
  }, {
    id: 24,
    name : "aymane",
    role : "Agent de sécurité",
    email : "hsdhsd@gmai.com",
    phone : "034333334734",
    photo : "../img/manicon.png",
  }
]

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
    displayWorkerCard();  
  }
   
// add photo
photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
        photoPreview.src = reader.result
        console.log("ur image is : ", photoPreview.src);
        photoPreview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
});

const workersContainer = document.getElementById("workers-container");

const displayWorkerCard = () => {
  workersContainer.classList.remove("hidden")
  Workers.forEach(e => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="flex flex-row items-center gap-5 text-slate-800 gap-1">
          <img src="${e.photo}" alt="${e.name}" class="relative inline-block h-[38px] w-[38px] !rounded-full object-cover object-center" />
          <div>
              <h5 class="font-semibold text-slate-800">${e.name}</h5>
              <p class="text-xs uppercase font-bold text-slate-500">${e.role}</p>
          </div>
      </div>
    `
    workersContainer.append(card)
  })
}
displayWorkerCard();  

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

document.getElementById("cancel-worker-btn").addEventListener("click", () => workersModel.classList.add("hidden"))

const SalleSecurite = document.getElementById("Salle-de-securite");

document.getElementById("Salle-securite-btn").addEventListener("click", () => {
  // filter the hole object to only secritys
  const securite = Workers.filter(e => e.role == "Agent de sécurité");

  // creat displaying security list
  const securityWorkersList = document.createElement("div");
  securityWorkersList.className = "bg-white cursor-pointer";

  // empty the container for new data
  workerContairer.innerHTML = ``
  
  // displaying all available securitys
  securite.forEach(worker => {
  
  const securiteItem = document.createElement("div");
  securiteItem.className = "flex flex-row items-center gap-5 text-slate-800 cursor-pointer";
  
  securiteItem.innerHTML += `
    <img src="${worker.photo}" alt="${worker.name}" class="h-[38px] w-[38px] rounded-full object-cover" />
    <div>
      <h5 class="font-semibold text-slate-800">${worker.name}</h5>
      <p class="text-xs uppercase font-bold text-slate-500">${worker.role}</p>
    </div>
  `;

  // add the security i sho's in he's place
  securiteItem.addEventListener("click", () => {
    const securityContainer = document.getElementById("security-container");
 
    // securityContainer.innerHTML = ``;
    const securityCard = document.createElement("div");
    securityCard.className = "bg-white p-2 rounded";
    securityCard.innerHTML = `
      <div class="flex flex-row items-center gap-5 text-slate-800">
        <img src="${worker.photo}" alt="${worker.name}" class="h-[38px] w-[38px] rounded-full object-cover" />
        <div>
            <h5 class="font-semibold text-slate-800">${worker.name}</h5>
            <p class="text-xs uppercase font-bold text-slate-500">${worker.role}</p>
        </div>
      </div>
    `;

    securityContainer.append(securityCard);
    securityContainer.classList.remove("hidden");
    workersContainer.classList.add("hidden");
  });

  securityWorkersList.append(securiteItem);
});

  
  workerContairer.append(securityWorkersList);
  workersModel.classList.remove("hidden")
})


const ServerworkersModel = document.getElementById("workers-model");
const Serverworkerscontairer = document.getElementById("worker-contairer");
document.getElementById("server-room-btn").addEventListener("click", () => {
  // filter how hava acces to the server room
  const allowedServerRoles = ["Manager", "Nettoyage", "Technicien IT"];
  const ServerRoomAccesWorkers = Workers.filter(e => allowedServerRoles.includes(e.role));

  const ServerWorkersDisplay = document.createElement("div");
  ServerWorkersDisplay.className = "bg-white flex flex-row"
  ServerworkersModel.classList.remove("hidden");

  ServerRoomAccesWorkers.forEach(serverWorkers => {
    ServerWorkersDisplay.innerHTML = `
      <img src="${serverWorkers.photo}" alt="${serverWorkers.name}" class="h-[38px] w-[38px] rounded-full object-cover" />
      <div>
        <h5 class="font-semibold text-slate-800">${serverWorkers.name}</h5>
        <p class="text-xs uppercase font-bold text-slate-500">${serverWorkers.role}</p>
      </div>
    `  
  })
  Serverworkerscontairer.append(ServerWorkersDisplay);
})