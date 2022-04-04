import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_TODOS = gql`
  query getTodos {
    todos {
      text
      id
      done
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation toggleTodo($id: uuid!, $done: Boolean!) {
    update_todos(where: { id: { _eq: $id } }, _set: { done: $done }) {
      returning {
        done
        id
        text
      }
    }
  }
`;

const CREATE_TODO = gql`
  mutation createTodo($text: String!) {
    insert_todos_one(object: { text: $text }) {
      text
      id
      done
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: uuid!) {
    delete_todos(where: { id: { _eq: $id } }) {
      returning {
        text
        id
        done
      }
    }
  }
`;

function App() {
  const [text, setText] = useState("");
  const { data, loading, error } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [createTodo] = useMutation(CREATE_TODO, {
    // onCompleted: () => setText(""),
  });
  const [deleteTodo] = useMutation(DELETE_TODO);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const handleToggleTodo = async (todo) => {
    let result = await toggleTodo({
      variables: { id: todo.id, done: !todo.done },
    }).then((rs) => {
      console.log(rs);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await createTodo({
      variables: { text },
      refetchQueries: [
        {
          query: GET_TODOS,
        },
      ],
    }).then((rs) => {
      console.log(rs);
    });
    setText("");
  };

  const handleDelete = async ({ id }) => {
    const isConfirm = window.confirm("Are you sure?");
    if (isConfirm) {
      let result = await deleteTodo({
        variables: { id },
        update: (cache) => {
          const prevData: any = cache.readQuery({ query: GET_TODOS });
          const newTodos = prevData.todos.filter((todo) => todo.id !== todo.id);
          cache.writeQuery({ query: GET_TODOS, data: { todos: newTodos } });
        },
      }).then((rs) => {
        console.log(rs);
      });
    } else return;
  };

  return (
    <>
      <div className="code flex flex-column items-center bg-purple white pa3 fl-1">
        <h2 className="f2-l">
          Graphql todo{" "}
          <span role="img" aria-label="Checkmark">
            X
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="mb3">
          <input
            className="pa2 f4 b--dashed"
            type="text"
            name="todo"
            placeholder="Enter todo"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button className="pa2 f4 bg-green white" type="submit">
            Submit
          </button>
        </form>

        <div className="flex items-center justify-center flex-column">
          {data.todos
            .map((item) => (
              <>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={item.id}
                  onDoubleClick={() => handleToggleTodo(item)}
                >
                  <span
                    className={`pointer list pa1 f3 ${item.done && "strike"}`}
                  >
                    {item.text}
                  </span>
                  <button className="bg-transparent bn f4">
                    <span className="red" onClick={() => handleDelete(item)}>
                      &times;
                    </span>
                  </button>
                </p>
              </>
            ))
            .sort()}
        </div>
      </div>
    </>
  );
}

export default App;
