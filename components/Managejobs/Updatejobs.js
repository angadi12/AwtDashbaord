import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip } from "@nextui-org/react";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const columns = [
  { name: "Title", uid: "title" },
  { name: "Opening Date", uid: "openingDate" },
  { name: "Closing Date", uid: "closingDate" },
  { name: "Actions", uid: "actions" },
];



export default function UpdateJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://awt-backend.onrender.com/api/awt/jobs/Get');
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


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://awt-backend.onrender.com/api/awt/jobs/Delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      const result = await response.json();
      if (result.success) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
        toast.success('Job deleted successfully');
      } else {
        throw new Error(result.error || 'Failed to delete job');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



  const renderCell = React.useCallback((job, columnKey) => {
    const cellValue = job[columnKey];

    switch (columnKey) {
      case "openingDate":
      case "closingDate":
        return <TableCell>{new Date(cellValue).toLocaleDateString()}</TableCell>;
      case "actions":
        return (
          <TableCell>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <MdRemoveRedEye />
                </span>
              </Tooltip>
              <Tooltip content="Edit ">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <MdEdit />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span onClick={() => handleDelete(job._id)} className="text-lg text-danger cursor-pointer active:opacity-50">
                  <MdDelete />
                </span>
              </Tooltip>
            </div>
          </TableCell>
        );
      default:
        return <TableCell>{cellValue}</TableCell>;
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (

    <>

    <Table aria-label="Jobs table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={jobs}>
        {(job) => (
          <TableRow key={job._id}>
            {(columnKey) => renderCell(job, columnKey)}
          </TableRow>
        )}
      </TableBody>
    </Table>
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
    </>
  );
}
