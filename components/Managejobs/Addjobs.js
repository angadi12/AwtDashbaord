"use client";
import React, { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "@nextui-org/react";

function Addjobs() {
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openings, setOpenings] = useState("");
  const [packageSelected, setPackageSelected] = useState();
  const [jobType, setJobType] = useState(new Set([]));
  const [jobMode, setJobMode] = useState(new Set([]));
  const [keyRoles, setKeyRoles] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [preferredQualifications, setPreferredQualifications] = useState("");
  const [location, setLocation] = useState(new Set([]));
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const packages = [
    { label: "3 LPA", key: "3" },
    { label: "5 LPA", key: "5" },
    { label: "6 LPA", key: "6" },
    { label: "7 LPA", key: "7" },
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

  const validateFields = () => {
    const newErrors = {};

    if (!jobTitle) newErrors.jobTitle = "Job title is required";
    if (!description) newErrors.description = "Description is required";
    if (!openings || isNaN(openings))
      newErrors.openings = "Openings must be a valid number";
    if (!packageSelected)
      newErrors.packageSelected = "Package is required";
    if (jobType.size === 0) newErrors.jobType = "Job type is required";
    if (jobMode.size === 0) newErrors.jobMode = "Job mode is required";
    if (!keyRoles) newErrors.keyRoles = "Key roles are required";
    if (!responsibilities)
      newErrors.responsibilities = "Requirements are required";
    if (!qualifications)
      newErrors.qualifications = "Qualifications are required";
    if (!preferredQualifications)
      newErrors.preferredQualifications =
        "Preferred qualifications are required";
    if (location.size === 0) newErrors.location = "Location is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    setLoading(true);


    const jobData = {
      title: jobTitle,
      description: description,
      openings: parseInt(openings, 10),
      package:packageSelected,
      jobType: Array.from(jobType).join(", "),
      jobMode: Array.from(jobMode).join(", "),
      keyRoles: keyRoles.split("\n"),
      responsibilities: responsibilities.split("\n"),
      qualifications: qualifications.split("\n"),
      preferredQualifications: preferredQualifications.split("\n"),
      location: Array.from(location).join(", "),
      openingDate: date.from,
      closingDate: date.to,
    };

    console.log(jobData);

    try {
      const response = await fetch(
        "https://awt-backend.onrender.com/api/awt/jobs/Create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobData),
        }
      );

      if (response.ok) {
        toast.success("Job added successfully");
        setJobTitle('');
        setDescription('');
        setOpenings('');
        setPackageSelected(new Set([]));
        setLocation(new Set([]));
        setJobType(new Set([]));
        setJobMode(new Set([]));
        setKeyRoles('');
        setResponsibilities('');
        setQualifications('');
        setPreferredQualifications('');
        setDate({ from: new Date(), to: addDays(new Date(), 20) });
      } else {
        toast.error("Failed to add job");
      }
    } catch (error) {
      console.error("Error adding job:", error);
      toast.error("An error occurred while adding the job");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-auto bg-white p-2 rounded-sm">
      <h6 className="text-lg font-bold text-indigo-950">ADD JOB</h6>
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
          {/* <Select
            radius="sm"
            items={packages}
            variant="bordered"
            label="Package"
            placeholder="Select Package"
            labelPlacement="outside"
            size="md"
            selectedKeys={packageSelected}
            onSelectionChange={setPackageSelected}
           
            className=""
          >
            {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
          </Select> */}
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
            {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
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
            {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
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
          <div className="">
            <p className="text-sm text-gray-800 mb-2">
              OpeningDate - ClosingDate
            </p>
            <div className={cn("grid gap-2")}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-center h-9 text-left font-normal ring-2 rounded-md ring-gray-300",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <FaCalendarAlt className="mr-2 h-4 w-4 " />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Open date - Close Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto  p-0  " align="center">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    modifiersClassNames={{
                      selected: "bg-[#FF7143] text-white hover:bg-[#FF7143]",
                      today: "bg-[#FF7143] text-white",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
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
            {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
          </Select>
        </div>
        <div className="flex justify-center items-center">
          <Button
            className="bg-[#FF7143] text-white text-center rounded-md p-1 w-60"
            onClick={handleSubmit}
          >
            {loading ? (
              <Spinner
                color="default"
                labelColor="foreground"
              />
            ) : (
              "Add Details"
            )}
          </Button>
        </div>
      </div>

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
    </div>
  );
}

export default Addjobs;
