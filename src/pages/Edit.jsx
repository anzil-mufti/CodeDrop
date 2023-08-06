import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { FaAsterisk, FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { databases, getCurrentUser } from "../helpers/appwrite";

const Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [codeDrop, setCodeDrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialCD, setInitialCD] = useState({});
  const [setFetchingCD] = useOutletContext();
  const [changed, setChanged] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();
  const editCodeDrop = async (e) => {
    e.preventDefault();
    setLoading(true);
    const promise = databases.updateDocument(
      "64ce4b1f184498131289",
     "64ce4b27947a60b741b5",
      id,
      {
        title,
        codeDrop,
        isPublic: isPublic,
      }
    );
    promise
      .then(() => {
        setFetchingCD(true);
        navigate("/" + id);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const fetchCD = async () => {
      const user = await getCurrentUser();
      const promise = databases.getDocument(
        "64ce4b1f184498131289",
     "64ce4b27947a60b741b5",
        id
      );
      promise
        .then((response) => {
          if (response.owner !== user.$id) {
            alert(
              "You can not edit this CodeDrop because it doesn't belong to you"
            );
            navigate("/");
          }
          setTitle(response.title);
          setCodeDrop(response.codeDrop);
          setIsPublic(response.isPublic);
          setInitialCD(response);
        })
        .catch((err) => alert(err));
    };
    fetchCD();
  }, [id, navigate]);

  useEffect(() => {
    if (
      title !== initialCD.title ||
      codeDrop !== initialCD.codeDrop ||
      isPublic !== initialCD.isPublic
    ) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [
    title,
    codeDrop,
    isPublic,
    initialCD.title,
    initialCD.codeDrop,
    initialCD.isPublic,
  ]);

  return (
    <form
      onSubmit={editCodeDrop}
      className="min-h-screen w-full flex flex-col p-4 py-16 lg:py-4 gap-4"
    >
      <h1 className="text-3xl">Edit a CodeDrop</h1>
      <div className="form-control gap-2">
        <label htmlFor="title" className="flex">
          Title <FaAsterisk size={8} className="mt-1" color="red" />
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input border-white bg-base-200 max-w-lg"
        />
      </div>
      <div className="form-control gap-2">
        <label htmlFor="codeDrop" className="flex">
          CodeDrop <FaAsterisk size={8} className="mt-1" color="red" />
        </label>
        <MDEditor
          value={codeDrop}
          onChange={setCodeDrop}
          preview="edit"
          height={400}
          visibleDragbar={false}
          id="codeDrop"
        />
      </div>
      <div className="form-control flex-row gap-2">
        <input
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          type="checkbox"
          id="publicToggle"
          className="toggle"
        />
        <label htmlFor="publicToggle">
          Do you want to make this CodeDrop public?
        </label>
      </div>
      <div className="grid grid-cols-2 max-w-xs gap-4">
        <button
          disabled={!changed}
          className={`btn btn-success ${loading ? "loading" : ""}`}
        >
          <FaSave />
          Update
        </button>
        <button onClick={() => navigate("/")} className="btn btn-warn">
          <TiCancel size={22} />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Edit;