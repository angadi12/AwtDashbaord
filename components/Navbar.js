"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import Logo from "../public/Logo2.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Badge } from "@nextui-org/react";

const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [contactForms, setContactForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://awt-backend.onrender.com/api/awt/Contactus/Get")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          return a.status === "unread" ? -1 : b.status === "unread" ? 1 : 0;
        });
        setContactForms(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const fetchContactFormDetails = (id) => {
    setLoadingDetails(true);
    fetch(`https://awt-backend.onrender.com/api/awt/Contactus/Get/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSelectedForm(data);
        setLoadingDetails(false);
        onOpen();
        updateContactFormStatus(id, "read"); // Update status to read when opening the modal
      })
      .catch((error) => {
        setError(error);
        setLoadingDetails(false);
      });
  };

  const updateContactFormStatus = (id, status) => {
    fetch(`https://awt-backend.onrender.com/api/awt/Contactus/Update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }), // Status should be either 'read' or 'unread'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Status updated successfully:", data);
        // Update the local state to reflect the status change
        setContactForms((prevForms) =>
          prevForms.map((form) =>
            form._id === id ? { ...form, status } : form
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  // Count unread messages
  const unreadMessagesCount = contactForms.filter(
    (form) => form.status === "unread"
  ).length;

  return (
    <>
      <nav className="h-12 w-full flex p-1 lg:p-8 items-center justify-between sticky top-0 z-50 bg-white border-b-1 border-gray-200">
        <div>
          <Image src={Logo} className="object-contain h-10 w-32" alt="logo" />
        </div>

        <Sheet>
          <SheetTrigger>
            <div className="flex items-center gap-2 p-1">
              <Badge
                content={unreadMessagesCount}
                shape="circle"
                color="danger"
              >
                <IoNotificationsCircleOutline
                  size={30}
                  className="text-lg text-indigo-950"
                />
              </Badge>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Messages</SheetTitle>
              <SheetDescription className="overflow-scroll">
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error: {error.message}</div>
                ) : (
                  contactForms.map((form) => (
                    <SheetClose
                      key={form._id}
                      className={`flex justify-between items-center h-14 w-full px-4 m-1 rounded-sm ${
                        form.status === "read" ? "bg-white" : "bg-slate-200"
                      }`}
                    >
                      <div
                        onClick={() => fetchContactFormDetails(form._id)}
                        className="flex justify-between items-center   h-14 w-full "
                      >
                        <div className="flex items-center gap-2">
                          {form.status === "read" ? (
                            <HiOutlineMailOpen size={24} />
                          ) : (
                            <HiOutlineMail size={24} />
                          )}
                          <div className="flex flex-col justify-center items-start text-xs text-black">
                            <div className="text-tiny">{form.firstName}</div>
                            <p className="text-tiny text-justify">
                              {form.subject.length > 20
                                ? `${form.subject.slice(0, 20)}...`
                                : form.subject}
                            </p>
                          </div>
                        </div>
                        <div className="text-tiny">
                          {new Date(form.submittedAt).toLocaleString()}
                        </div>
                      </div>
                    </SheetClose>
                  ))
                )}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>

      <Modal
        backdrop="opaque"
        isDismissable={false}
        size="full"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
                Message Details
              </ModalHeader>
              <ModalBody>
                {loadingDetails ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error: {error.message}</div>
                ) : selectedForm ? (
                  <>
                    <p>
                      <strong>Name:</strong> {selectedForm.firstName}{" "}
                      {selectedForm.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedForm.email}
                    </p>
                    <p>
                      <strong>Subject:</strong> {selectedForm.subject}
                    </p>
                    <p>
                      <strong>Message:</strong> {selectedForm.message}
                    </p>
                    {selectedForm.contactDetails && (
                      <>
                        <p>
                          <strong>Phone:</strong>{" "}
                          {selectedForm.contactDetails.phone}
                        </p>
                        <p>
                          <strong>Address:</strong>{" "}
                          {selectedForm.contactDetails.address}
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <div>No details available</div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
