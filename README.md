# CS222 Project Team 74

# **HandyHelper**
HandyHelper is a web-based platform that connects requesters with handymen, allowing users to post service requests, browse handyman profiles, and directly contact them. Requesters can create job listings with descriptions, prices, and locations, while handymen can search for jobs by specialty and location. Handymen can update their profiles with additional details and specialties, while both parties can manage personal details and upload profile pictures. The platform specifically targets students, offering affordable labor through peer-to-peer connections.

## **Key Features**
- Job posting with descriptions, prices, and locations
- Profile browsing with search and filter options
- Direct communication between requesters and handymen
- Rating and review system
- Student-focused platform offering affordable labor

## **Technical Architecture**
The HandyHelper app uses React.js for the frontend, Django for backend logic and CRUD operations, and SQLite for data storage. It integrates MapTiler and MapLibre GL JS for geolocation services, displaying job locations and handling address lookups, with the browser hosting the platform and facilitating API communication.


## **Prerequisites**
Ensure you have the following installed on your system:
1. **Node.js and npm**
2. **Python 3.x**
3. **SQLite**
4. **Git**

## **Installation (Pulled from GitHub)**

### 1. Clone the Repository
```bash
git clone https://github.com/CS222-UIUC/project-team-74
cd your-repo
```

### 2. Run the Server for the Backend (Django)
```bash
cd backend
python manage.py runserver
```

### 3. Run the Server for the Frontend (React.js)
```bash
cd ../frontend
npm run dev
```

### 4. Linting instructions (Please run before committing)
```bash
# Check for Linting Issues
npm run lint

# Automatically Fix Linting Issues
npm run lint:fix
```

## **Installation (from Scratch)**

### 1. Setup Backend (Django)
```bash
pip install django
django-admin startproject backend
cd backend
python manage.py runserver
```

### 2. Setup Frontend (React.js)
```bash
npx create-react-app frontend
cd frontend
npm run dev
```

### 3. Linting instructions (Please run before committing)
```bash
# Check for Linting Issues
npm run lint

# Automatically Fix Linting Issues
npm run lint:fix
```

## **Group members and Their Roles**
- `Bose Pramuanpornsatid (bp17)`: Frontend and Backend
- `Taz Vongpatarakul (nv21)`: Backend
- `Pitupoom Soontornthanon (as242)`: Frontend
- `Matupoom Soontornthanon (ms201)`: Frontend

