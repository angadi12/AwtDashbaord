import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem, Button, Spinner } from "@nextui-org/react";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

const Applicantdetails = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://awt-backend.onrender.com/api/awt/Application/Get"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const result = await response.json();

        // Ensure the response data is an array
        if (!result) {
          throw new Error("error while fetching data");
        }

        setJobs(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Accordion className="" variant="splitted">
        {jobs.map((job) => (
          <AccordionItem
            key={job._id}
            aria-label={`Job ${job._id}`}
            title={
              <span className="uppercase">
                {job.personalDetails?.firstName}&nbsp;
                {job.personalDetails?.lastName}
              </span>
            }
          >
            <div className="p-4">
              <p>
                <strong>First Name:</strong> {job.personalDetails.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {job.personalDetails.lastName}
              </p>
              <p>
                <strong>Phone no:</strong> {job.personalDetails.phone}
              </p>
              <p>
                <strong>Email:</strong> {job.personalDetails.email}
              </p>
              <p>
                <strong>Message</strong> {job.message}
              </p>
              <p>
                <strong>Status:</strong> {job.status}
              </p>
              <p>
                <strong>Date Applied:</strong>{" "}
                {new Date(job.dateApplied).toLocaleDateString()}
              </p>
              <div className="py-2 flex items-center gap-4">
                  <Button onPress={()=>window.location.href=job.cvUrl} className="bg-[#FF7143] text-white">
                    Download CV
                  </Button>
              

                <a href={job.coverLetterFileUrl} download="Cover_Letter.pdf">
                  <Button className="bg-[#FF7143] text-white">
                    Download Cover Letter
                  </Button>
                </a>
              </div>
            </div>
          </AccordionItem>
        ))}
      </Accordion>

      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 1000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
};

export default Applicantdetails;
