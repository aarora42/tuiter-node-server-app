import * as usersDao from "./users-dao.js";

let j_users;

const AuthController = (app) => {
    const register = (req, res) => {
        const username = req.body.username;
        const user = usersDao.findUserByUsername(username);
        if (user) {
          res.sendStatus(409);
          return;
        }
        const newUser = usersDao.createUser(req.body);
        // req.session["currentUser"] = newUser;
        j_users = newUser;
        res.json(newUser);
      };

      const login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = usersDao.findUserByCredentials(username, password);
        console.log(user)
        if (user) {
        //   req.session["currentUser"] = user;
        j_users = user;
          res.json(user);
        } else {
          //  console.log("hisd")
          res.sendStatus(404);
        }
      };

      const profile = (req, res) => {
        const currentUser = j_users;
        if (!currentUser) {
          res.sendStatus(404);
          return;
        }
        res.json(currentUser);
      };

      const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
      };

      const update   = (req, res) => {

 

        usersDao.updateUser(req.body._id, req.body)
        res.sendStatus(200);
        };

 

app.post("/api/users/register", register);
app.post("/api/users/login",    login);
app.post("/api/users/profile",  profile);
app.post("/api/users/logout",   logout);
app.put ("/api/users",          update);
};
export default AuthController;