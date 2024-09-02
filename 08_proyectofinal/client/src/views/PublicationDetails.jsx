import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../config/constants";
import { Spinner } from "react-bootstrap";

const PublicationDetails = () => {
  const { id } = useParams();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${ENDPOINT.publications}/${id}`)
      .then(({ data }) => {
        setPublication(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching publication details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!publication) {
    return <p>Publication not found</p>;
  }

  return (
    <div className="py-5">
      <h1>{publication.title}</h1>
      <img
        src={publication.img_url}
        alt={publication.title}
        className="img-fluid"
      />
      <p>{publication.description}</p>
      <p>Status: {publication.status}</p>
    </div>
  );
};

export default PublicationDetails;
