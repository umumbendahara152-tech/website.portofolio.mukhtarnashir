// Tombol dark/light mode
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    toggle.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
});

// Tombol "Latar Belakang" ke #about
const viewWorkBtn = document.getElementById('viewWorkBtn');
viewWorkBtn.addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

// Highlight menu aktif saat scroll
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
    const fromTop = window.scrollY + 100;
    navLinks.forEach(link => {
        const section = document.querySelector(link.hash);
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
// ===== PROJECT MANAGEMENT =====
const projectList = document.getElementById("projectList");
const addBtn = document.getElementById("addProjectBtn");
const updateBtn = document.getElementById("updateProjectBtn");

let projects = JSON.parse(localStorage.getItem("projects")) || [];
let editIndex = null;

// Fungsi render project ke layar
function renderProjects() {
    projectList.innerHTML = "";
    projects.forEach((p, index) => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div class="project-content">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="tech-icons">
          ${p.technologies.map(t => `<span>${t}</span>`).join("")}
        </div>
        <button class="project-btn" onclick="window.open('${p.link}', '_blank')">View</button>
        <div style="margin-top:10px;">
          <button class="action-btn" onclick="editProject(${index})">✏️ Edit</button>
          <button class="action-btn" onclick="deleteProject(${index})">🗑️ Delete</button>
        </div>
      </div>
    `;
        projectList.appendChild(card);
    });
    localStorage.setItem("projects", JSON.stringify(projects));
}

// Tambah project baru
addBtn.addEventListener("click", () => {
    const title = document.getElementById("projectTitle").value.trim();
    const desc = document.getElementById("projectDesc").value.trim();
    const tech = document.getElementById("projectTech").value.trim().split(",");
    const img = document.getElementById("projectImg").value.trim() || "https://via.placeholder.com/600x400";
    const link = document.getElementById("projectLink").value.trim();

    if (!title || !desc) {
        alert("Title and description are required!");
        return;
    }

    projects.push({
        title,
        description: desc,
        technologies: tech,
        image: img,
        link
    });

    clearForm();
    renderProjects();
});

// Edit project
function editProject(index) {
    const p = projects[index];
    document.getElementById("projectTitle").value = p.title;
    document.getElementById("projectDesc").value = p.description;
    document.getElementById("projectTech").value = p.technologies.join(",");
    document.getElementById("projectImg").value = p.image;
    document.getElementById("projectLink").value = p.link;

    editIndex = index;
    addBtn.style.display = "none";
    updateBtn.style.display = "inline-block";
}

// Update project
updateBtn.addEventListener("click", () => {
    if (editIndex === null) return;
    const title = document.getElementById("projectTitle").value.trim();
    const desc = document.getElementById("projectDesc").value.trim();
    const tech = document.getElementById("projectTech").value.trim().split(",");
    const img = document.getElementById("projectImg").value.trim();
    const link = document.getElementById("projectLink").value.trim();

    projects[editIndex] = {
        title,
        description: desc,
        technologies: tech,
        image: img,
        link
    };

    editIndex = null;
    updateBtn.style.display = "none";
    addBtn.style.display = "inline-block";
    clearForm();
    renderProjects();
});

// Hapus project
function deleteProject(index) {
    if (confirm("Are you sure you want to delete this project?")) {
        projects.splice(index, 1);
        renderProjects();
    }
}

// Hapus isi form
function clearForm() {
    document.getElementById("projectTitle").value = "";
    document.getElementById("projectDesc").value = "";
    document.getElementById("projectTech").value = "";
    document.getElementById("projectImg").value = "";
    document.getElementById("projectLink").value = "";
}

// Render awal
renderProjects();
// ===== CONTACT FORM =====
const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill out all fields before sending.");
        return;
    }

    // Simulasi pengiriman (kamu bisa integrasikan EmailJS atau API backend)
    sendBtn.innerText = "Sending...";
    sendBtn.disabled = true;

    setTimeout(() => {
        alert(`Thanks ${name}! Your message has been sent successfully.`);
        contactForm.reset();
        sendBtn.innerText = "Send Message";
        sendBtn.disabled = false;
    }, 1500);
});

// ====== TELEGRAM CONFIG ======
const botToken = "8343050065:AAFyQdtUMNA_IP8tIfh9Q75aeb_dHzeBf28"; // Ganti dengan token kamu
const chatId = "5061136899"; // ID Telegram kamu

// ====== CONTACT FORM ======
const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill out all fields before sending.");
        return;
    }

    const textMessage = `📩 *New Message from Portfolio Website*\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`;

    sendBtn.innerText = "Sending...";
    sendBtn.disabled = true;

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: textMessage,
                parse_mode: "Markdown"
            }),
        });

        if (response.ok) {
            alert("Message successfully sent to Telegram ✅");
            contactForm.reset();
        } else {
            alert("Failed to send message ❌");
        }
    } catch (error) {
        console.error(error);
        alert("Error connecting to Telegram API.");
    }

    sendBtn.innerText = "Send Message";
    sendBtn.disabled = false;
});

// Reveal on scroll
window.addEventListener("scroll", reveal);
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
