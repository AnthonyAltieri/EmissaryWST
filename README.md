# Team 1 Emissary

### Currently deployed on: 
https://team1-emissary.herokuapp.com/

### Staging site here:
https://cse112-1-staging.herokuapp.com/


## 1. Getting Started
**Emissary is a visitor check-in SaaS application targetted for small businesses.**
- Sign up your company for a business account and create your own personal employee account.
- Additional employees can be added to the same bussiness account through the second sign up screen.
- Create appointments through the "Appointments" page. Open up the Check-in mode by clicking on visitor section of the Welcome Screen in the upper right-hand corner.
- As visitors check-in, they will show up in the queue on the "Visitors" page. 
- If there is an appointment that matches their information, their appointment time will automatically be populated.

  
### 1.1 Technologies Used
1. **Node.js** (http://nodejs.org/)
2. **mLab** (https://www.mlab.com/)
3. **Babel** (https://babeljs.io/)
4. **React** (https://facebook.github.io/react/)
5. **Redux** (http://redux.js.org/)

### 1.2 Instructions
**Step 1:** Do a `git clone` on our project on **Github** (https://github.com/AnthonyAltieri/EmissaryWST/).

**Step 2:** Run `npm install` in the directory of the project to install the dependency for the backend.

**Step 3:** Run `npm install-frontend` to install the frontend dependencies

**Step 4:** Run `gulp test:server` to test the backend API.

**Prestep 5:** Run `gulp test:client-setup` to setup local e2e testing (ONLY DO THIS ONCE).

**Step 5:** Run `gulp test:client` to run e2e tests.

**Step 6:** Run `npm start` to start the application (Can be found at localhost:3000).
