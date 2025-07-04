# 🩸 Blood Bank Management System

A full-stack, cloud-deployable Blood Bank Management System that allows the public to register as donors or request blood, while providing an admin interface to manage donors, requests, and blood stock efficiently.

---

## 📌 Project Objective

To build a responsive, public-facing web application that digitizes the process of blood donation and request handling. This project demonstrates the use of cloud services (AWS), RESTful architecture, and modern web development best practices.

---

## 🧠 System Architecture

+------------------+ +------------------------+
| Web Browser | HTTP | CloudFront (CDN) |
| (Frontend) +---------->+ + S3 (Static Hosting) |
+------------------+ +-----------+------------+
|
v
+-----------------------+
| EC2 (Node.js API) |
| Express.js Backend |
+-----------+-----------+
|
v
+-----------------------+
| Amazon RDS (MySQL DB) |
+-----------------------+

---

## 🛠 Tech Stack

| Layer         | Technology                    |
|---------------|-------------------------------|
| Frontend      | HTML, Tailwind CSS, JavaScript |
| Backend       | Node.js, Express.js           |
| Database      | MySQL (Amazon RDS)            |
| Cloud Hosting | AWS S3, EC2, CloudFront       |
| Communication | REST APIs, CORS               |
| Environment   | `.env`, `env.js`              |

---

## 🔄 Features & Process Flow

### 🔹 Donor Module
- Public form (`donate.html`) for donor registration
- Submits data to backend via `POST /donors/register`
- Updates blood stock automatically

### 🔹 Blood Request Module
- Public form (`request.html`) for requesting blood
- Submits data to `POST /requests` (default status: Pending)

### 🔹 Admin Module
- Admin login (`login.html`)
- Admin dashboard (`dashboard.html`) features:
  - View/Delete donors
  - View/Approve/Reject requests
  - Manually update blood stock

---

## 🚀 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/blood-bank-system.git
cd blood-bank-system
2. Set up MySQL Database
bash
Copy
Edit
cd database
mysql -u root -p < setup-database.sql
3. Configure Backend
bash
Copy
Edit
cd backend
cp .env.example .env
# Edit .env with DB credentials:
# DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT
🌱 Future Enhancements
Donor login with history

SMS/email notifications for request approvals

Blood availability map integration

Export reports (CSV/PDF)

Admin role management
