// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBjKkhbuYYJ99jgJNk4-nvsGJ5A19SyGjE",
    authDomain: "rayfinda.firebaseapp.com",
    projectId: "rayfinda",
    storageBucket: "rayfinda.firebasestorage.app",
    messagingSenderId: "965704722440",
    appId: "1:965704722440:web:c8ec257d085b1dde4649bd",
    measurementId: "G-FJV1QHGSBC"
  };

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function showCategory(category) {
    const catalog = document.getElementById("catalog");
    catalog.innerHTML = "";

    db.collection("products").where("category", "==", category).get().then(snapshot => {
        snapshot.forEach(doc => {
            const product = doc.data();
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>${product.price}</p>
                <button>Add to cart</button>
            `;
            catalog.appendChild(productElement);
        });
    }).catch(error => {
        console.error("Error fetching products: ", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    showCategory('necklace'); // Default tampilkan kategori necklace
});
