const show = el => el.classList.remove("hidden");
const hide = el => el.classList.add("hidden");

// Main Modals
const modal = document.getElementById("crud-modal");
const experienceModal = document.getElementById("experience-modal");

const openBtn = document.getElementById("add-Worker-Button");
const openexperienceBtn = document.getElementById("experience");

const closeBtn = document.getElementById("close-model");
const closeExpModalBtn = document.getElementById("close-exp-modal");

const cancelBtn = document.getElementById("cancel-model");
const cancelExpBtn = document.getElementById("cancel-exp");

// Open/Close main modal
openBtn.addEventListener("click", () => show(modal));
closeBtn.addEventListener("click", () => hide(modal));
cancelBtn.addEventListener("click", () => hide(modal));
modal.addEventListener("click", e => e.target === modal && hide(modal));

// Open Experience modal
openexperienceBtn.addEventListener("click", () => {
  hide(modal);
  show(experienceModal);
});

// Close Experience modal
const closeExp = () => { hide(experienceModal); show(modal); }
closeExpModalBtn.addEventListener("click", closeExp);
cancelExpBtn.addEventListener("click", closeExp);
experienceModal.addEventListener("click", e => e.target === experienceModal && closeExp());


// ======= Worker Data =======
const Name = document.getElementById("name");
const Role = document.querySelector("select");
const Email = document.getElementById("Email");
const phone = document.getElementById("phone");
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photo-preview");
const input = document.getElementById("")

// Experience inputs
const yearsExp = document.getElementById("years-exp");
const skillsExp = document.getElementById("skills-exp");
const companiesExp = document.getElementById("companies-exp");

const Workers = [
  { id: 23, name: "vito", role: "Technicien IT", email: "vito@gmai.com", phone: "03434734734", photo: "../img/manicon.png"},
  { id: 24, name: "aymane", role: "Agent de sécurité", email: "hsdhsd@gmai.com", phone: "034333334734", photo: "../img/manicon.png"},
  { id: 25, name: "hamza", role: "Manager", email: "hamza@gmai.com", phone: "0238438473", photo: "../img/manicon.png"},
  { id: 26, name: "samira", role: "Réceptionnistes", email: "hsdhsd@gmai.com", phone: "034333334734", photo: "../img/manicon.png"},
  { id: 27, name: "somia", role: "Nettoyage", email: "hsdhsd@gmai.com", phone: "034333334734", photo: "../img/manicon.png"},
];

// ======= INLINE VALIDATION SYSTEM =======

function showError(input, message, errorId) {
  const errorEl = document.getElementById(errorId);
  input.classList.add("text-red-500","border-red-500", "focus:border-red-500");
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}


const errorName = document.getElementById('error-name'); 
const errorEmail = document.getElementById('error-email');

function validateForm() {
  let valid = true;

  

  if (Name.value.trim().length < 3) {
    errorName.style.display = 'block';
  } else if (Name.value.trim().length > 10){
    errorName.style.display = 'block';
  }


  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email.value.trim())) {
    errorEmail.style.display = 'block';    
  }

  if (!/^[0-9]{8,15}$/.test(phone.value.trim())) {
    showError(phone, "Phone must contain 8-15 digits.", "error-phone");
    valid = false;
  }

  if (Role.value.trim() === "") {
    showError(Role, "Please select a role.", "error-role");
    valid = false;
  }

  return valid;
}


// ===== EXPERIENCE MODAL VALIDATION =====
function validateExperience() {
  let valid = true;

  clearError(yearsExp, "error-years");
  clearError(skillsExp, "error-skills");

  if (yearsExp.value.trim() === "" || yearsExp.value < 0) {
    showError(yearsExp, "Years must be a positive number.", "error-years");
    valid = false;
  }

  if (skillsExp.value.trim().length < 2) {
    showError(skillsExp, "Skills field cannot be empty.", "error-skills");
    valid = false;
  }

  return valid;
}

// Name.addEventListener("input", () => clearError(Name, "error-name"));
// Email.addEventListener("input", () => clearError(Email, "error-email"));
// phone.addEventListener("input", () => clearError(phone, "error-phone"));
// Role.addEventListener("change", () => clearError(Role, "error-role"));

// yearsExp.addEventListener("input", () => clearError(yearsExp, "error-years"));
// skillsExp.addEventListener("input", () => clearError(skillsExp, "error-skills"));


// ======= Add Worker =======
const addWorker = () => {
  const experience = [{
    years: yearsExp.value.trim(),
    skills: skillsExp.value.trim(),
    companies: companiesExp.value.trim()
  }];

  const worker = {
    id: Date.now(),
    name: Name.value.trim(),
    role: Role.value.trim(),
    email: Email.value.trim(),
    phone: phone.value.trim(),
    photo: photoPreview.src || "../img/manicon.png",
    exp: experience
  };

  Workers.push(worker);
  displayWorkerCard();
};

// Photo Preview
photoInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    photoPreview.src = reader.result;
    photoPreview.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
});


// ======= Workers Display =======
const workersContainer = document.getElementById("workers-container");

let assignedWorkers = [];

const displayWorkerCard = () => {
  // console.log(assignedWorkers);
  workersContainer.innerHTML = "";  
  workersContainer.classList.remove("hidden");

  const workersAvailable = Workers.filter(e => !assignedWorkers.includes(e.id));

  workersAvailable.forEach((e, i) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="flex flex-row items-center gap-2 text-slate-800">
        <img src="${e.photo}" class="h-[38px] w-[38px] rounded-full object-cover"/>
        <div>
            <h5 class="font-semibold">${e.name}</h5>
            <p class="text-xs font-bold text-slate-500">${e.role}</p>
        </div>
        <button
          class="deleteBtn ml-auto px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition cursor-pointer">
          <img src="../img/icons8-garbage-48.png" class="w-5" alt="">
        </button>
      </div>
    `;
      card.querySelector(".deleteBtn").addEventListener("click", () => {
      Workers.splice(i, 1);
      displayWorkerCard();
    })
    workersContainer.append(card);
  });
};
displayWorkerCard();


// Submit Worker
const form = document.getElementById("worker-form");

document.getElementById("submit-worker").addEventListener("click", e => {
  e.preventDefault();
  if (!validateForm()) return;
  addWorker();
  hide(modal);
  form.reset();
  photoPreview.classList.add("hidden");
  photoPreview.src = "../img/manicon.png";
});


// Submit Experience
document.getElementById("submit-exp").addEventListener("click", e => {
  e.preventDefault();
  addWorker();
  hide(modal);
  hide(experienceModal);
  form.reset();
});


// ======= Generic Worker Filter Function =======
const workersModel = document.getElementById("workers-model");
const workerContairer = document.getElementById("worker-contairer");

document.getElementById("cancel-worker-btn").addEventListener("click", () => hide(workersModel));
workersModel.addEventListener("click", e => e.target === workersModel && hide(workersModel));

let selectedWorker = null; 


const showWorkersByRole = (allowedRoles) => {
  show(workersModel);
  workerContairer.innerHTML = "";

  const filtered = Workers.filter(w => allowedRoles.includes(w.role) && !assignedWorkers.includes(w.id));

  filtered.forEach(worker => {
    const item = document.createElement("div");
    item.className = "bg-white flex flex-row items-center gap-4 cursor-pointer";
    item.innerHTML = `
        <img src="${worker.photo}" class="h-[38px] w-[38px] rounded-full object-cover"/>
        <div>
          <h5 class="font-semibold">${worker.name}</h5>
          <p class="text-xs uppercase font-bold text-slate-500">${worker.role}</p>
        </div>
    `;
    item.onclick = () => {
      selectWorker(worker);
    } 
    workerContairer.append(item);
  });
};


const selectWorker = (worker) => {
  if (assignedWorkers.includes(worker.id)) return;
  assignedWorkers.push(worker.id);
  addWorkerToRoom(worker, currentRoomContainer);
  workerContairer.innerHTML = "";
  // updateSidebarUI();
  hide(workersModel);
};


const Reception = document.getElementById("Reception");
function addWorkerToRoom(worker, container) {
    const div = document.createElement("div");
    div.className = "p-2 bg-white rounded flex items-center gap-2";

    div.innerHTML = `
        <img src="${worker.photo}" class="h-[38px] w-[38px] rounded-full"/>
        <div>
            <h3 class="font-bold">${worker.name}</h3>
            <p class="text-xs uppercase text-slate-600">${worker.role}</p>
        </div>
        <button
          class="deleteBtn ml-auto px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition cursor-pointer">
          <img src="../img/icons8-garbage-48.png" class="w-5" alt="">
        </button>
    `;

    div.querySelector(".deleteBtn").addEventListener("click", () => {
      assignedWorkers = assignedWorkers.filter(id => id !== worker.id);
      workersAvailable = assignedWorkers;
      displayWorkerCard();
      div.remove();
    });
    // Reception.className += "bg-withe/40"

  container.appendChild(div);
  container.classList.remove("hidden");
  displayWorkerCard()
}



const reseptionRoomContainer = document.getElementById("reseption-room-container");
const conferenceRoomContainer = document.getElementById("conference-room-container");
const StaffRoomContainer = document.getElementById("Staff-room-container");
const archiveRoomContainer = document.getElementById("archive-room-container");
const serverRoomContainer = document.getElementById("server-room-container");
const securityRoomContainer = document.getElementById("security-room-container");


// ======= Specific Rooms =======
let currentRoomContainer = null;
document.getElementById("Salle-securite-btn").addEventListener("click", () => {
    currentRoomContainer = securityRoomContainer;
    showWorkersByRole(["Agent de sécurité", "Nettoyage"]);
});

document.getElementById("server-room-btn").addEventListener("click", () => {
  currentRoomContainer = serverRoomContainer;
  showWorkersByRole(["Manager", "Nettoyage", "Technicien IT"]);
});

document.getElementById("archive-room-btn").addEventListener("click", () => {
  currentRoomContainer = archiveRoomContainer;
  showWorkersByRole(["Technicien IT", "Manager"]);
});

document.getElementById("Staff-room-btn").addEventListener("click", () => {
  currentRoomContainer = StaffRoomContainer;
  showWorkersByRole(["Nettoyage", "other", "Manager"]);
});

document.getElementById("conference-room-btn").addEventListener("click", () => {
  currentRoomContainer = conferenceRoomContainer;
  // console.log("comferonce")
  showWorkersByRole(["Nettoyage", "other", "Manager"], reseptionRoomContainer);
});

let secWorkers = 0;
document.getElementById("reseption-room-btn").addEventListener("click", () => {
  if(secWorkers < 2){
    currentRoomContainer = reseptionRoomContainer;
    showWorkersByRole(["Réceptionnistes", "Nettoyage", "Manager"]);
  }else{
    alert("to much worker in security reseption")
  }
});