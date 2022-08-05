const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");

const saltRounds = 10;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.get("/todos", async (req, res) => {
  try {
    console.log("get todooooos", req);
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/todo", async (req, res) => {
  try {
    const { username, description, email, status } = req.body;

    const sql = `INSERT INTO todo (username, description, email, status) VALUES ('${username}', '${description}', '${email}', '${status}') RETURNING *`;
    const newTodo = await pool.query(sql);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/todo", async (req, res) => {
  try {
    const { id } = req.body;
    let sql;

    if (req.body.description) {
      sql = `UPDATE todo SET description = '${req.body.description}', edited = true WHERE todo_id = ${id} RETURNING *`;
    } else {
      sql = `UPDATE todo SET status = '${req.body.status}', edited = true WHERE todo_id = ${id} RETURNING *`;
    }

    const newTodo = await pool.query(sql);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted successfully");
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
      pool.query(
        "INSERT INTO users (username, password) VALUES($1, $2)",
        [username, hash],
        (err, res) => {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  } catch (err) {
    console.error(err.message);
  }
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("token doesnt exist");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.send({ auth: false, message: "You failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
app.get("/isUserAuth", verifyJWT, async (req, res) => {
  try {
    res.send({ auth: true, message: "authenticated!" });
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
      (error, result) => {
        if (error) {
          res.send(error);
        }
        if (result.rowCount > 0) {
          bcrypt.compare(
            password,
            result.rows[0].password,
            (error, response) => {
              if (response) {
                const id = result.rows[0].user_id;
                const token = jwt.sign({ id }, "jwtSecret", {
                  expiresIn: 100,
                });
                req.session.user = result;
                res.send({
                  auth: true,
                  token: token,
                  user: result.rows[0].username,
                  message: "You successfully logged in!",
                });
              } else {
                res.send({
                  auth: false,
                  message: "Wrong username or password",
                });
              }
            }
          );
        } else {
          res.send({ auth: false, message: "User does not exist" });
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
