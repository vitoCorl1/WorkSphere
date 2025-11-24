const show = el => el.classList.remove("hidden");
const hide = el => el.classList.add("hidden");

// Main Modals
const modal = document.getElementById("crud-modal");
const experienceModal = document.getElementById("experience-modal");

const openBtn = document.getElementById("add-Worker-Button");

const closeBtn = document.getElementById("close-model");

const cancelBtn = document.getElementById("cancel-model");
const cancelExpBtn = document.getElementById("cancel-exp");

const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");


// Open/Close main modal
openBtn.addEventListener("click", () => show(modal));
closeBtn.addEventListener("click", () => hide(modal));
cancelBtn.addEventListener("click", () => hide(modal));
modal.addEventListener("click", e => e.target === modal && hide(modal));

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

function syncDates() {
  companiesExp.value = `${startDate.value} - ${endDate.value}`;
}

startDate.addEventListener("change", syncDates);
endDate.addEventListener("change", syncDates);


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

// ======= Add Worker =======
const addWorker = () => {
  const worker = {
    id: Date.now(),
    name: Name.value.trim(),
    role: Role.value.trim(),
    email: Email.value.trim(),
    phone: phone.value.trim(),
    photo: photoPreview.src || "../img/manicon.png",
    exp: tempExperiences
  };

  Workers.push(worker);
  displayWorkerCard();

  tempExperiences = [];
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
      card.addEventListener("click", () => openWorkerDetails(e));

      card.querySelector(".deleteBtn").addEventListener("click", () => {
      Workers.splice(i, 1);
      displayWorkerCard();
    })
    workersContainer.append(card);
  });
};
displayWorkerCard();


const detailsModal = document.getElementById("worker-details-modal");
const detailsContent = document.getElementById("worker-details-content");
const closeDetails = document.getElementById("close-details");

function openWorkerDetails(worker) {
    let expHTML = "";

    if (worker.exp && worker.exp.length > 0) {
        expHTML = worker.exp.map(e => `
            <div class="border rounded p-3 bg-neutral-secondary-medium">
                <p><strong>Entreprise:</strong> ${e.entreprise || "N/A"}</p>
                <p><strong>Post occupé:</strong> ${e.post || "N/A"}</p>
                <p><strong>Début:</strong> ${e.start || "N/A"}</p>
                <p><strong>Fin:</strong> ${e.end || "N/A"}</p>
            </div>
        `).join("");
    } else {
        expHTML = `<p class="text-sm text-gray-500">No experiences added.</p>`;
    }

    detailsContent.innerHTML = `
        <div class="flex items-center gap-4">
            <img src="${worker.photo}" class="w-20 h-20 rounded-full object-cover" />
            <div>
                <h3 class="text-lg font-bold">${worker.name}</h3>
                <p class="text-sm">${worker.role}</p>
            </div>
        </div>

        <div>
            <p><strong>Email:</strong> ${worker.email}</p>
            <p><strong>Phone:</strong> ${worker.phone}</p>
        </div>

        <div>
            <h4 class="text-md font-semibold mb-2">Experience</h4>
            ${expHTML}
        </div>
    `;

    detailsModal.classList.remove("hidden");
}

// Close modal
closeDetails.addEventListener("click", () => {
    detailsModal.classList.add("hidden");
});

detailsModal.addEventListener("click", e => {
    if (e.target === detailsModal) detailsModal.classList.add("hidden");
});


// Submit Worker
const form = document.getElementById("worker-form");

document.getElementById("submit-worker").addEventListener("click", e => {
  e.preventDefault();
  
  if (!validateForm()) return;

  // Collect experiences from experience blocks
  const blocks = document.querySelectorAll("#experience-list > div");
  const experiences = Array.from(blocks).map(block => ({
    entreprise: block.querySelector(".exp-entreprise").value.trim(),
    post: block.querySelector(".exp-post").value.trim(),
    start: block.querySelector(".exp-start").value,
    end: block.querySelector(".exp-end").value
  }));

  const worker = {
    id: Date.now(),
    name: Name.value.trim(),
    role: Role.value.trim(),
    email: Email.value.trim(),
    phone: phone.value.trim(),
    photo: photoPreview.src || "../img/manicon.png",
    exp: experiences
  };

  Workers.push(worker);
  displayWorkerCard();

  // Reset everything
  tempExperiences = [];
  document.getElementById("experience-list").innerHTML = "";
  hide(modal);
  form.reset();
  photoPreview.classList.add("hidden");
  photoPreview.src = "../img/manicon.png";
});

let tempExperiences = [];

document.getElementById("submit-exp").addEventListener("click", e => {
  e.preventDefault();

  const blocks = document.querySelectorAll("#experience-list > div");

  blocks.forEach(block => {
    const exp = {
      entreprise: block.querySelector(".exp-entreprise").value.trim(),
      post: block.querySelector(".exp-post").value.trim(),
      start: block.querySelector(".exp-start").value,
      end: block.querySelector(".exp-end").value
    };

    tempExperiences.push(exp);
  });

  hide(experienceModal);

  // Clear the list for next time
  document.getElementById("experience-list").innerHTML = "";
});



cancelExpBtn.addEventListener("click", () => hide(experienceModal));

// ======= Generic Worker Filter Function =======
const workersModel = document.getElementById("workers-model");
const workerContairer = document.getElementById("worker-contairer");

document.getElementById("cancel-worker-btn").addEventListener("click", () => hide(workersModel));
workersModel.addEventListener("click", e => e.target === workersModel && hide(workersModel));

// let selectedWorker = null; 


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
  let roomId = currentRoomContainer.id;

  if (assignedWorkers.includes(worker.id)) return;
  assignedWorkers.push(worker.id);

  if (roomData[roomId].workers.includes(worker.id)) return;
  roomData[roomId].workers.push(worker.id);

  addWorkerToRoom(worker, currentRoomContainer);
  workerContairer.innerHTML = "";
  hide(workersModel);
};


const Reception = document.getElementById("Reception");
const SalleDeReseption = document.getElementById("Salle-de-Reseption");

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
  
    const parent = container.parentElement;
    div.querySelector(".deleteBtn").addEventListener("click", () => {
      let roomId = container.id;
      
      roomData[roomId].workers = roomData[roomId].workers.filter(id => id !== worker.id);
      
      assignedWorkers = assignedWorkers.filter(id => id !== worker.id);
      
      if(assignedWorkers.length === 0) parent.classList.add("bg-red-400/50")

      workersAvailable = assignedWorkers;

      div.remove();
      displayWorkerCard();
    });
  parent.classList.remove("bg-red-400/50")
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

const roomData = {
  "reseption-room-container": { workers: [], limit: 2 },
  "conference-room-container": { workers: [], limit: 6 },
  "Staff-room-container": { workers: [], limit: 2 },
  "archive-room-container": { workers: [], limit: 2 },
  "server-room-container": { workers: [], limit: 2 },
  "security-room-container": { workers: [], limit: 2 },
};


// ======= Specific Rooms =======
let currentRoomContainer = null;
document.getElementById("Salle-securite-btn").addEventListener("click", () => {
  let room = "security-room-container";
  
  if (roomData[room].workers.length >= roomData[room].limit) return alert("Max worker reached in security room");

  currentRoomContainer = securityRoomContainer;
  showWorkersByRole(["Réceptionnistes", "Nettoyage", "Manager", "Agent de sécurité"]);
});

document.getElementById("server-room-btn").addEventListener("click", () => {
  let room = "server-room-container";
  if(roomData[room].workers.length >= roomData[room].limit) return alert("Max worker reached in server room");

  currentRoomContainer = serverRoomContainer;
  showWorkersByRole(["Manager", "Nettoyage", "Technicien IT"]);
});

document.getElementById("archive-room-btn").addEventListener("click", () => {
  let room = "archive-room-container";

  if(roomData[room].workers.length >= roomData[room].limit) return alert("Max worker reached in server room"); 
  currentRoomContainer = archiveRoomContainer;
  showWorkersByRole(["Technicien IT", "Manager"]);
});

document.getElementById("Staff-room-btn").addEventListener("click", () => {
  let room = "Staff-room-container";
  if(roomData[room].workers.length >= roomData[room].limit) return alert("Max worker reached in server room"); 
  currentRoomContainer = StaffRoomContainer;
  showWorkersByRole(["Nettoyage", "other", "Manager"]);
});

document.getElementById("conference-room-btn").addEventListener("click", () => {
  let room = "conference-room-container";

  if(roomData[room].workers.length >= roomData[room].limit) return alert("Max worker reached in server room"); 

  currentRoomContainer = conferenceRoomContainer;
  showWorkersByRole(["Nettoyage", "other", "Manager"], reseptionRoomContainer);
});

document.getElementById("reseption-room-btn").addEventListener("click", () => {
  let room = "reseption-room-container";

  if(roomData[room].workers.length >= roomData[room].limit) return alert("Max worker reached in server room");

  currentRoomContainer = reseptionRoomContainer;
  showWorkersByRole(["Réceptionnistes", "Nettoyage", "Manager"]);
});

 function createExperienceBlock() {
    const wrapper = document.createElement("div");
    const experienceList = document.getElementById('experience-list');
    wrapper.className = "p-4 border rounded-lg bg-neutral-secondary-medium";

    wrapper.innerHTML = `
        <div class="grid gap-4">

            <!-- Entreprise -->
            <div>
                <label class="block mb-1 text-sm font-medium">Entreprise</label>
                <input type="text" class="exp-entreprise w-full px-3 py-2 rounded border" placeholder="Nom de l'entreprise">
            </div>

            <!-- Post -->
            <div>
                <label class="block mb-1 text-sm font-medium">Post occupé</label>
                <input type="text" class="exp-post w-full px-3 py-2 rounded border" placeholder="Post occupé">
            </div>

            <!-- Dates -->
            <div>
                <label class="block mb-1 text-sm font-medium">Dates</label>
                <div class="grid grid-cols-2 gap-2">
                    <input type="date" class="exp-start px-3 py-2 rounded border">
                    <input type="date" class="exp-end px-3 py-2 rounded border">
                </div>
            </div>
        </div>
    `;

    experienceList.appendChild(wrapper);
}
const addExpBtn = document.getElementById('add-exp-btn');
addExpBtn.addEventListener("click", () => {
    createExperienceBlock();
});