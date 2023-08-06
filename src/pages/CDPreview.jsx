import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";
import { FaEdit, FaGlobe, FaLink } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { databases, getCurrentUser } from "../helpers/appwrite";

const CDPreview = () => {
  const { id } = useParams();
  const [codeDrop, setCodeDrop] = useState({});
  const [isUserOwner, setIsUserOwner] = useState(false);
  const navigate = useNavigate();

  const deleteCodeDrop = () => {
    const isConfirm = confirm("Are you sure you want to delete?");
    if (!isConfirm) return;
    const promise = databases.deleteDocument(
     "64ce4b1f184498131289",
      "64ce4b27947a60b741b5",
      id
    );
    promise
      .then(() => {
        alert("CodeDrop deleted Successfully");
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    const fetchCD = async () => {
      const user = await getCurrentUser();
      const promise = databases.getDocument(
       "64ce4b1f184498131289" ,
        "64ce4b27947a60b741b5",
        id
      );
      promise
        .then((response) => {
          if (user && response.owner === user.$id) {
            setIsUserOwner(true);
          }
          if (response.owner !== user.$id && !response.isPublic === false) {
            navigate("/");
          }
          setCodeDrop(response);
        })
        .catch(() => {
          alert("Unable to find that document");
          navigate("/");
        });
    };
    fetchCD();
  }, [id, navigate]); //this will get triggered whenever there'll be the change in the id

  return (
    <div className="min-h-screen w-full flex flex-col p-4 py-16 lg:py-8 gap-4">
      <h1 className="text-3xl flex gap-2 items-end">
        <span>{codeDrop.title}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Private link copied to your clipboard");
          }}
          className="btn btn-ghost rounded-full btn-sm"
        >
          <FaLink />
        </button>
        {codeDrop.isPublic && (
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                "http://localhost:5173//public/" + id
              );
              alert("Public link copied to your clipboard");
            }}
            className="btn btn-ghost rounded-full btn-sm"
          >
            <FaGlobe />
          </button>
        )}
      </h1>
      <div className="div flex-1 bg-base-200 p-4 rounded-lg">
        <MDEditor.Markdown
          style={{ background: "transparent", fontSize: 24 }}
          source={codeDrop.codeDrop}
        />
      </div>
      {isUserOwner && (
        <div className="grid grid-cols-2 max-w-xs gap-4">
          <Link to={"/edit/" + id} className={`btn btn-info`}>
            <FaEdit />
            Edit
          </Link>
          <button onClick={deleteCodeDrop} className="btn btn-error">
            <MdDeleteForever size={20} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CDPreview;