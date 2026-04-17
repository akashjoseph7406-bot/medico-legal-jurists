// ================= CONFIG =================
const PHONE = "918287424578";

// ================= WHATSAPP HELPER =================
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

    const topic = document.getElementById("topic").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const focus = document.getElementById("focus").value.trim();
    const type = document.getElementById("type").value;

    if (!topic || !subject) {
        alert("Please fill required fields!");
        return;
    }

    const message = `📘 Assignment Order:
Topic: ${topic}
Subject: ${subject}
Focus: ${focus}
Type: ${type}`;

    openWhatsApp(message);
}

// ================= MEMORIAL =================
function submitMemorial(event) {
    event.preventDefault();

    const moot = document.getElementById("moot").value.trim();
    const court = document.getElementById("court").value.trim();
    const side = document.getElementById("side").value;
    const urgency = document.getElementById("urgency").value;

    if (!moot) {
        alert("Please enter moot topic!");
        return;
    }

    const message = `⚖️ Moot Memorial Request:
Topic: ${moot}
Court: ${court}
Side: ${side}
Urgency: ${urgency}`;

    openWhatsApp(message);
}

// ================= CONTACT =================
function contactForm(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("emailContact").value.trim();
    const messageText = document.getElementById("message").value.trim();

    if (!name || !email || !messageText) {
        alert("Please fill all fields!");
        return;
    }

    const message = `📩 Contact Request:
Name: ${name}
Email: ${email}
Message: ${messageText}`;

    openWhatsApp(message);
}

// ================= PAYMENT =================
function payNow(product, amount) {

    if (!window.Razorpay) {
        alert("Payment system not loaded!");
        return;
    }

    const options = {
        key: "YOUR_KEY_ID", // 🔑 Replace with Razorpay key
        amount: amount * 100,
        currency: "INR",
        name: "Medico-Legal Juris",
        description: product,

        handler: function () {
            alert("Payment Successful!");

            localStorage.setItem("lastPurchase", product);

            openWhatsApp(`✅ Payment Done for: ${product}`);
        },

        theme: {
            color: "#800020"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
}

// ================= LOGIN =================
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "admin@gmail.com" && password === "1234") {

        localStorage.setItem("loggedIn", "true");

        alert("Login Successful!");

        const redirectPage = sessionStorage.getItem("redirectAfterLogin") || "index.html";
        sessionStorage.removeItem("redirectAfterLogin");

        window.location.href = redirectPage;

    } else {
        alert("Invalid Credentials");
    }
}

// ================= LOGOUT =================
function logout() {
    localStorage.removeItem("loggedIn");
    alert("Logged out!");
    window.location.href = "login.html";
}

// ================= LOADER =================
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
});