import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem, Spinner } from "@nextui-org/react";
import { Toaster, toast } from "react-hot-toast";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/awt/jobs/Get');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const result = await response.json();
        
        // Ensure the response data is an array
        if (!result.success || !Array.isArray(result.data)) {
          throw new Error('Invalid data format');
        }

        setJobs(result.data);
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
    <div className="mt-8 h-auto">
      <Toaster   toastOptions={{
    // Define default options
    className: '',
    duration: 1000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 1000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }} 
    
  />
      <Accordion className="" variant="splitted">
        {jobs.reverse().map((job) => (
          <AccordionItem key={job._id} aria-label={`Job ${job._id}`} title={<span className="uppercase">{job.title}</span>}>
            <div className="p-4">
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Package:</strong> {job.package} LPA</p>
              <p><strong>Openings:</strong> {job.openings}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Job Type:</strong> {job.jobType}</p>
              <p><strong>Job Mode:</strong> {job.jobMode}</p>
              <p><strong>Opening Date:</strong> {new Date(job.openingDate).toLocaleDateString()}</p>
              <p><strong>Closing Date:</strong> {new Date(job.closingDate).toLocaleDateString()}</p>
              <p><strong>Key Roles:</strong></p>
              <ul>
                {job.keyRoles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
              <p><strong>Responsibilities:</strong></p>
              <ul>
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
              <p><strong>Qualifications:</strong></p>
              <ul>
                {job.qualifications.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ul>
              <p><strong>Preferred Qualifications:</strong></p>
              <ul>
                {job.preferredQualifications.map((preQualification, index) => (
                  <li key={index}>{preQualification}</li>
                ))}
              </ul>
              <p><strong>Applicants Count:</strong> {job.applicantsCount}</p>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ViewJobs;
