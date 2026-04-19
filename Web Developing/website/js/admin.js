import { db } from "../firebase.js";
import { auth } from "../firebase.js";

import {
    collection,
    onSnapshot,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

const tableBody = document.querySelector("#ordersTable tbody");

const ADMIN_EMAIL = "akashjoseph7406@gmail.com";

// ================= ADMIN PROTECTION =================
onAuthStateChanged(auth, (user) => {

    if (!user || user.email !== ADMIN_EMAIL) {
        alert("Access Denied!");
        window.location.href = "login.html";
        return;
    }

    loadOrders();
});

// ================= LOAD ORDERS (REAL-TIME) =================
function loadOrders() {

    tableBody.innerHTML = `
        <tr>
            <td colspan="4" style="text-align:center;">Loading...</td>
        </tr>
    `;

    onSnapshot(collection(db, "orders"), (snapshot) => {

        tableBody.innerHTML = "";

        if (snapshot.empty) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center;">No orders found</td>
                </tr>
            `;
            return;
        }

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${data.service || "N/A"}</td>
                <td>₹${data.amount || 0}</td>
                <td>${data.paymentId || "N/A"}</td>
                <td>
                    <select data-id="${docSnap.id}">
                        <option value="Pending" ${data.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Completed" ${data.status === "Completed" ? "selected" : ""}>Completed</option>
                    </select>
                </td>
            `;

            tableBody.appendChild(row);
        });

        attachStatusListeners();
    });
}

// ================= UPDATE STATUS =================
function attachStatusListeners() {

    document.querySelectorAll("select[data-id]").forEach((select) => {

        select.onchange = async function () {

            const id = this.dataset.id;
            const newStatus = this.value;

            try {
                this.disabled = true;

                await updateDoc(doc(db, "orders", id), {
                    status: newStatus
                });

                // 🔥 Better UX (no alert spam)
                this.style.border = "2px solid lightgreen";

                setTimeout(() => {
                    this.style.border = "";
                }, 1500);

            } catch (error) {
                console.error("Error updating status:", error);
                alert("Failed to update status");
            } finally {
                this.disabled = false;
            }
        };
    });
}