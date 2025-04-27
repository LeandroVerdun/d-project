// src/utils/createAdmin.js

const defaultAvatars = [
  "/img/avatar1.png",
  "/img/avatar2.png",
  "/img/avatar3.png"
];

export function createAdminIfNeeded() {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const adminExists = existingUsers.some(user => user.username === "Chisato");

  if (!adminExists) {
    const adminUser = {
      firstName: "Chisato",
      lastName: "Nishikigi",
      username: "Chisato",
      email: "Chisato@gmail.com",
      phone: "1234567890",
      password: "1234",
      confirmPassword: "1234",
      cardNumber: "1111 2222 3333 4444",
      expirationDate: "12/25",
      securityCode: "123",
      avatar: defaultAvatars[0],
    };

    existingUsers.push(adminUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    console.log("✅ Usuario administrador creado automáticamente");
  }
}
