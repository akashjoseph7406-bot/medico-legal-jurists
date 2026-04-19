// ================= CONFIG =================
import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

const PHONE = "918287424578";

// ================= AUTH SYSTEM =================
const AUTH_KEY = "userLoggedIn";

function isLoggedIn() {
    return localStorage.getItem(AUTH_KEY) === "true";
}

function setLogin() {
    localStorage.setItem(AUTH_KEY, "true");
}

// ================= LOGOUT (REAL FIREBASE LOGOUT) =================
function logoutUser() {

    signOut(auth)
        .then(() => {

            localStorage.removeItem(AUTH_KEY);

            alert("Logged out successfully!");

            updateAuthButtons();

            // 🔥 Redirect to login page (as you wanted)
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Logout error:", error);
            alert("Logout failed!");
        });
}

// ================= GO TO LOGIN =================
function goToLogin(e) {
    if (e) e.preventDefault();
    window.location.href = "login.html";
}

// ================= NAVBAR CONTROL =================
function updateAuthButtons() {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!loginBtn || !logoutBtn) return;

    if (isLoggedIn()) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
    } else {
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
    }
}

// ================= WHATSAPP =================
function openWhatsApp(message) {
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

// ================= ORDER =================
function orderNow(product) {
    openWhatsApp(`Hello, I want to buy: ${product}`);
}

// ================= ASSIGNMENT =================
function submitAssignment(event) {
    event.preventDefault();

    const topic = document.getElementById("topic")?.value.trim();
    const subject = document.getElementById("subject")?.value.trim();

    if (!topic || !subject) {
        alert("Please fill required fields!");
        return;
    }

    openWhatsApp(`📘 Assignment Order:
Topic: ${topic}
Subject: ${subject}`);
}

// ================= MEMORIAL =================
function submitMemorial(event) {
    event.preventDefault();

    const moot = document.getElementById("moot")?.value.trim();

    if (!moot) {
        alert("Please enter moot topic!");
        return;
    }

    openWhatsApp(`⚖️ Moot Memorial Request:
Topic: ${moot}`);
}

// ================= CONTACT =================
function contactForm(event) {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("emailContact")?.value.trim();
    const messageText = document.getElementById("message")?.value.trim();

    if (!name || !email || !messageText) {
        alert("Please fill all fields!");
        return;
    }

    openWhatsApp(`📩 Contact Request:
Name: ${name}
Email: ${email}
Message: ${messageText}`);
}

// ================= FILE UPLOAD =================
function uploadDocument() {
    window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLSeOQViM6cRC4Nf75fED7PDhwsjShNLlPA5QQ4TyiZfElK0CxA/viewform?usp=publish-editor",
        "_blank"
    );
}

// ================= OPEN PDF =================
function openPDF(file) {
    const encodedFile = encodeURIComponent(file);

    let viewerPath = "viewer.html?file=" + encodedFile;

    if (window.location.pathname.includes("/website/")) {
        viewerPath = "/website/viewer.html?file=" + encodedFile;
    }

    window.location.href = viewerPath;
}

// ================= PAYMENT =================
function payNow(product, amount) {

    if (!window.Razorpay) {
        alert("Payment system not loaded!");
        return;
    }

    const options = {
        key: "rzp_test_SezUfhk17j9vid",
        amount: amount * 100,
        currency: "INR",
        name: "Medico Legal Jurists",
        description: product,

        handler: function () {
            alert("✅ Payment Successful!");

            uploadDocument();

            openWhatsApp(`✅ Payment Done

Service: ${product}
Amount: ₹${amount}

I have completed the payment. Sharing details shortly.`);
        },

        theme: {
            color: "#800020"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", function () {

    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";

    updateAuthButtons();

    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", goToLogin);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            logoutUser();
        });
    }
});

// 🔄 Sync across tabs
window.addEventListener("storage", updateAuthButtons);