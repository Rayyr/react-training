# 📘 Student Management System 

A modern **Student Management System** built with React that allows administrators to manage student records efficiently with a clean UI and optimized performance.

---
 
## 🚀 Features

### 👨‍🎓 Student Management (CRUD operations)
- Add new students  
- Update existing student details  
- Delete students  
- View student list in a responsive layout
- Single user session (student or admin) at a time using LocalStorage
---

### 📄 Data Handling
- Full **CRUD operations** (Create, Read, Update, Delete)  
- API integration using Axios , Fetch
  
---

### 🔍 UI & UX
- Responsive card/grid layout  
- Client-side Pagination  
- Toast notifications for feedback  
- Form validation using React Hook Form + Yup

---

### ⚡ Performance Optimizations
- `useMemo` for memoizing computed values  
- `useCallback` for stable function references  
- Reduced unnecessary re-renders using `React.Memo`

---

### 🛡️ Error Handling
- Global error handling using **Error Boundaries**
- Inline feedback within forms

---

### 🔐 State & Control
- UI blocking during async operations (`isBlocked`)  
- Controlled and validated forms  
- Sync between UI state and backend data

---

### 🧭 Routing
- Client-side routing using `React Router , useNavigate , Link`
- Clean navigation structure
- Single page react application

---

### 📊 Additional Features
- Role-based UI (Admin / Student roles) (1 - many )
- Protected Routes based to RPAC

---

 ## 🛠️ Tech Stack

- **Frontend:** React.js 19.2
- **Routing:** React Router  
- **Forms:** React Hook Form + Yup  
- **HTTP Client:** Axios  
- **UI Library:** Material UI (MUI) and other packages . 
- **Notifications:** React Toastify
- **Mock Backend:** JSON Server 
- **Package Manager:** npm
- **Code formattor:** prettier
- **Code linting:**:eslint
  
---


## 🔐 Environment Variables (.env)

This project uses environment variables to manage configuration like API URLs.
add the following :
```bash
REACT_APP_API_URL=http://localhost:api_port
```
---

## ▶️ Running the Project

Follow these steps to run the application locally:

```bash
git clone https://github.com/your-username/student-system.git
cd student-system
```

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Setup Environment Variables
```bash
REACT_APP_API_URL=http://localhost:api_port
```

### 3️⃣ Start JSON Server (Mock Backend)
```bash
npx json-server --watch server/db.json --port api_port
```

### 4️⃣ Start React App
```bash
npm start
```
---

## 🚀 Deployment

---
### 🌐 Live Demo

- **Frontend (Vercel):**  
  [App](https://react-training-mauve.vercel.app/)

- **Backend (Render):**  
 [Backend](https://back-end-yp7x.onrender.com)
---
### ⚠️ Notes

- The frontend is deployed on **Vercel**  
- The backend API is deployed on **Render**  
- Make sure the frontend `.env` is pointing to the deployed backend:

```env
REACT_APP_API_URL=deplyed_backend
```

There is noly 1 admin as follow :
<img width="1271" height="892" alt="image" src="https://github.com/user-attachments/assets/52a7fbd2-df82-49ce-8943-de3a775d4626" />

---
