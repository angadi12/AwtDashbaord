import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Input,
  Textarea,
  Select,
  SelectItem,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const columns = [
  { name: "Title", uid: "title" },
  { name: "Opening Date", uid: "openingDate" },
  { name: "Closing Date", uid: "closingDate" },
  { name: "Actions", uid: "actions" },
];

const locations = [
  { label: "Hyderabad", key: "Hyderabad" },
  { label: "Bangalore", key: "Bangalore" },
  { label: "UK", key: "UK" },
];

const jobTypes = [
  { label: "Full-Time", key: "Full-Time" },
  { label: "Part-Time", key: "Part-Time" },
  { label: "Intern", key: "Intern" },
  { label: "Contract", key: "Contract" },
  { label: "Temporary", key: "Temporary" },
];

const jobModes = [
  { label: "On-Site", key: "On-Site" },
  { label: "Remote", key: "Remote" },
  { label: "Hybrid", key: "Hybrid" },
];

export default function UpdateJobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [error, setError] = useState(null);
  const [jobid, Setjobid] = useState();
  const [opendeletemodal, Setopendeletemodal] = useState(false);
  const [openupdatemodal, Setopenupdatemodal] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openings, setOpenings] = useState("");
  const [location, setLocation] = useState("");
  const [packageSelected, setPackageSelected] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobMode, setJobMode] = useState("");
  const [keyRoles, setKeyRoles] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [preferredQualifications, setPreferredQualifications] = useState("");

  // useEffect(() => {
  //   if (jobs) {
  //     setJobTitle(jobs.title || '');
  //     setDescription(jobs.description || '');
  //     setOpenings(jobs.openings || '');
  //     setLocation(jobs.location || '');
  //     setPackageSelected(jobs.package || '');
  //     setJobType(jobs.jobType || '');
  //     setJobMode(jobs.jobMode || '');
  //     setKeyRoles(jobs.keyRoles || '');
  //     setResponsibilities(jobs.responsibilities || '');
  //     setPreferredQualifications(jobs.preferredQualifications || '');
  //     setQualifications(jobs.qualifications || '');
  //   }
  // }, [jobs, openupdatemodal]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://awt-backend.onrender.com/api/awt/jobs/Get"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const result = await response.json();

        // Ensure the response data is an array
        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid data format");
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

  // useEffect(() => {
  //   const fetchJobsbyid = async (jobid) => {
  //     try {
  //       const response = await fetch(
  //         ` https://awt-backend.onrender.com/api/awt/jobs/Get/${jobid}`
  //       );
  //       if (!response.success) {
  //         throw new Error("Failed to fetch jobs");
  //       }
  //       const result = await response.json();
  //       if (result.success) {
  //         setJobTitle(result.data.title || "");
  //         setDescription(result.data.description || "");
  //         setOpenings(result.data.openings || "");
  //         setLocation(result.data.location || "");
  //         setPackageSelected(result.data.package || "");
  //         setJobType(result.data.jobType || "");
  //         setJobMode(result.data.jobMode || "");
  //         setKeyRoles(result.data.keyRoles || "");
  //         setResponsibilities(result.data.responsibilities || "");
  //         setPreferredQualifications(result.data.preferredQualifications || "");
  //         setQualifications(result.data.qualifications || "");
  //       }

  //       setJobs(result.data);
  //     } catch (error) {
  //      console.log(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchJobsbyid(jobid);
  // }, [openupdatemodal,jobid]);

  useEffect(() => {
    const fetchJobsbyid = async (jobid) => {
      try {
        if (!jobid) {
          throw new Error("Job ID is undefined");
        }
        console.log("Fetching job with ID:", jobid);

        const response = await fetch(
          `https://awt-backend.onrender.com/api/awt/jobs/Get/${jobid}`
        );
        const result = await response.json();

        if (!result.success) {
          throw new Error("Failed to fetch jobs");
        }

        setJobTitle(result.data.title || "");
        setDescription(result.data.description || "");
        setOpenings(result.data.openings || "");
        // setLocation(result.data.location || "");
        setPackageSelected(result.data.package || "");
        // setJobType(result.data.jobType || "");
        // setJobMode(result.data.jobMode || "");
        setKeyRoles(result.data.keyRoles || "");
        setResponsibilities(result.data.responsibilities || "");
        setPreferredQualifications(result.data.preferredQualifications || "");
        setQualifications(result.data.qualifications || "");
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Call fetchJobsbyid here with a valid jobid
    fetchJobsbyid(jobid); // Ensure `jobid` is correctly defined before calling
  }, [jobid]); // Ensur

  const handleDelete = async (id) => {
    setLoading3(true)
    try {
      const response = await fetch(
        `https://awt-backend.onrender.com/api/awt/jobs/Delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      const result = await response.json();
      if (result.success) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
        setTimeout(() => {
          Setopendeletemodal(false);
          Setjobid("");
          setLoading3(false)
        }, 1000);
      } else {
        throw new Error(result.error || "Failed to delete job");
        setLoading3(false)

      }
    } catch (error) {
      toast.error(error.message);
      setLoading3(false)

    }
  };

  const openmodal = (id) => {
    Setopendeletemodal(!opendeletemodal);
    Setjobid(id);
  };

  const handleUpdate = async (id) => {
    if (!id) {
      toast.error("Job ID is required for update.");
      return;
    }
    if (!jobType) {
      toast.error("Job Type is required.");
      return;
    }
    if (!jobMode) {
      toast.error("Job Mode is required.");
      return;
    }
    if (!location) {
      toast.error("Location is required.");
      return;
    }
    setLoading2(true);
    try {
      const response = await fetch(
        `https://awt-backend.onrender.com/api/awt/jobs/Update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: jobTitle,
            description,
            openings,
            package: packageSelected,
            jobType: jobType.currentKey,
            jobMode: jobMode.currentKey,
            keyRoles,
            location: location.currentKey,
            responsibilities,
            qualifications,
            preferredQualifications,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update job");
      const result = await response.json();
      if (result.success) {
        toast.success("Job updated successfully");
        Setopenupdatemodal(false);
        setLoading2(false);
      } else throw new Error(result.error || "Failed to update job");
    } catch (error) {
      toast.error(error.message);
      setLoading2(false);
    }
  };

  const renderCell = React.useCallback((job, columnKey) => {
    const cellValue = job[columnKey];

    switch (columnKey) {
      case "openingDate":
      case "closingDate":
        return (
          <TableCell>{new Date(cellValue).toLocaleDateString()}</TableCell>
        );
      case "actions":
        return (
          <TableCell>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit ">
                <span
                  onClick={() => {
                    Setopenupdatemodal(!openupdatemodal), Setjobid(job._id);
                  }}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <MdEdit />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span
                  onClick={() => openmodal(job._id)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
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
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
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


      <Modal
        backdrop="opaque"
        isOpen={opendeletemodal}
        onOpenChange={Setopendeletemodal}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirm</ModalHeader>
              <ModalBody> Are you sure you want to delete this job?</ModalBody>
              <ModalFooter>
                <Button
                  className="text-[#FF7143] ring-1 ring-[#FF7143] bg-white text-center rounded-md p-1 w-32"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                isLoading={loading3}
                  onPress={() => handleDelete(jobid)}
                  className="bg-[#FF7143] text-white text-center rounded-md p-1 w-32"
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        backdrop="transparent"
        isOpen={openupdatemodal}
        size="4xl"
        scrollBehavior={"inside"}
        onOpenChange={Setopenupdatemodal}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Job Details
              </ModalHeader>
              <ModalBody>
                {" "}
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                      radius="sm"
                      type="text"
                      label="Job title"
                      placeholder="Title"
                      labelPlacement="outside"
                      variant="bordered"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                    <Textarea
                      maxRows={1}
                      radius="sm"
                      type="text"
                      label="Description"
                      placeholder="Description"
                      labelPlacement="outside"
                      variant="bordered"
                      value={description}
                      // onChange={(e) => setDescription(e.target.value)}
                      onValueChange={setDescription}
                    />
                  </div>
                  <div className="flex w-full items-center flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                      radius="sm"
                      type="number"
                      label="openings"
                      placeholder="Total Openings"
                      labelPlacement="outside"
                      variant="bordered"
                      value={openings}
                      onChange={(e) => setOpenings(e.target.value)}
                    />
                    <Input
                      radius="sm"
                      type="number"
                      label="Package"
                      placeholder="Package"
                      labelPlacement="outside"
                      variant="bordered"
                      value={packageSelected}
                      onChange={(e) => setPackageSelected(e.target.value)}
                    />
                  </div>
                  <div className="flex w-full items-center flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Select
                      radius="sm"
                      items={jobTypes}
                      variant="bordered"
                      label="Job Type"
                      placeholder="Select Job Type"
                      labelPlacement="outside"
                      size="md"
                      selectedKeys={jobType}
                      onSelectionChange={setJobType}
                      className=""
                    >
                      {(item) => (
                        <SelectItem key={item.value}>{item.label}</SelectItem>
                      )}
                    </Select>
                    <Select
                      radius="sm"
                      items={jobModes}
                      variant="bordered"
                      label="Job Mode"
                      placeholder="Select Job Mode"
                      labelPlacement="outside"
                      size="md"
                      selectedKeys={jobMode}
                      onSelectionChange={setJobMode}
                      className=""
                    >
                      {(item) => (
                        <SelectItem key={item.value}>{item.label}</SelectItem>
                      )}
                    </Select>
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Textarea
                      maxRows={4}
                      radius="sm"
                      label="Key Roles"
                      placeholder="Enter key roles"
                      labelPlacement="outside"
                      variant="bordered"
                      value={keyRoles}
                      // onChange={(e) => setKeyRoles(e.target.value)}
                      onValueChange={setKeyRoles}
                    />
                    <Textarea
                      radius="sm"
                      maxRows={4}
                      label="Requirement(optional)"
                      placeholder="Enter Requirement"
                      labelPlacement="outside"
                      variant="bordered"
                      value={responsibilities}
                      // onChange={(e) => setResponsibilities(e.target.value)}
                      onValueChange={setResponsibilities}
                    />
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Textarea
                      maxRows={4}
                      radius="sm"
                      label="Qualifications"
                      placeholder="Enter qualifications"
                      labelPlacement="outside"
                      variant="bordered"
                      value={qualifications}
                      // onChange={(e) => setQualifications(e.target.value)}
                      onValueChange={setQualifications}
                    />
                    <Textarea
                      maxRows={4}
                      radius="sm"
                      label="Add Skills"
                      placeholder="Enter Skills"
                      labelPlacement="outside"
                      variant="bordered"
                      value={preferredQualifications}
                      // onChange={(e) => setPreferredQualifications(e.target.value)}
                      onValueChange={setPreferredQualifications}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 place-content-between items-center justify-between">
                    <Select
                      radius="sm"
                      items={locations}
                      variant="bordered"
                      label="Locations"
                      placeholder="Select Locations"
                      labelPlacement="outside"
                      size="md"
                      selectedKeys={location}
                      onSelectionChange={setLocation}
                      className=""
                    >
                      {(item) => (
                        <SelectItem key={item.value}>{item.label}</SelectItem>
                      )}
                    </Select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center w-full">
                <Button
                  isLoading={loading2}
                  className="bg-[#FF7143] text-white text-center rounded-md p-1 w-60"
                  onPress={() => handleUpdate(jobid)}
                >
                  Update Details
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

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
}
