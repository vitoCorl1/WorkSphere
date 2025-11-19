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


// ======= Add Worker =======
const addWorker = () => {
  const experience = [{
    years: yearsExp.value.trim(),
    skills: skillsExp.value.trim(),
    companies: companiesExp.value.trim()
  }];

  const worker = {
    id: Workers.length + 1,
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

const displayWorkerCard = () => {
  workersContainer.innerHTML = "";  
  workersContainer.classList.remove("hidden");

  Workers.forEach(e => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="flex flex-row items-center gap-5 text-slate-800">
        <img src="${e.photo}" class="h-[38px] w-[38px] rounded-full object-cover"/>
        <div>
            <h5 class="font-semibold">${e.name}</h5>
            <p class="text-xs uppercase font-bold text-slate-500">${e.role}</p>
        </div>
      </div>
    `;
    workersContainer.append(card);
  });
};
displayWorkerCard();


// Submit Worker
const form = document.getElementById("worker-form");

document.getElementById("submit-worker").addEventListener("click", e => {
  e.preventDefault();
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

const showWorkersByRole = (allowedRoles) => {
  show(workersModel);
  workerContairer.innerHTML = "";

  const filtered = Workers.filter(w => allowedRoles.includes(w.role));
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
    workerContairer.append(item);
  });
};

// ======= Specific Rooms =======
document.getElementById("Salle-securite-btn").addEventListener("click", () => {
  showWorkersByRole(["Agent de sécurité", "Nettoyage"]);
});

document.getElementById("server-room-btn").addEventListener("click", () => {
  showWorkersByRole(["Manager", "Nettoyage", "Technicien IT"]);
});

document.getElementById("archive-room-btn").addEventListener("click", () => {
  showWorkersByRole(["Technicien IT", "Manager"]);
});

document.getElementById("Staff-room-btn").addEventListener("click", () => {
  showWorkersByRole(["Nettoyage", "other", "Manager"]);
});

document.getElementById("conference-room-btn").addEventListener("click", () => {
  showWorkersByRole(["Nettoyage", "other", "Manager"]);
});

document.getElementById("reseption-room-btn").addEventListener("click", () => {
  showWorkersByRole(["Réceptionnistes", "Nettoyage", "Manager"]);
});

