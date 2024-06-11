import { useState, useMemo } from "react";
import Cookies from "js-cookie";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const Addblogs = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Viewimage, Setviewimage] = useState("");
  const token = Cookies.get("Token");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    tags: "",
    image: null,
  });

  console.log(formData);

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: files ? files[0] : value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
      setLogoMemoized(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const setLogoMemoized = useMemo(() => {
    return (file) => {
      if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          Setviewimage(reader.result);
        });
        reader.readAsDataURL(file);
      }
    };
  }, []);

  // const setLogoMemoized = useMemo(() => {
  //   return (file) => {
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.addEventListener("load", () => {
  //         Setviewimage(reader.result);
  //       });
  //       reader.readAsDataURL(file);
  //     }
  //   };
  // }, []);

  const validateForm = () => {
    const { title, description, content, image } = formData;
    if (!title || !description || !content || !image) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await fetch(
        "https://awt-backend.onrender.com/api/awt/blogs/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create blog");
      }
      const responseData = await response.json();
      toast.success("Blog created successfully");
      console.log("Blog created successfully:", responseData);
    } catch (error) {
      console.error("Error creating blog:", error.message);
      toast.error("Error creating blog: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            radius="sm"
            type="text"
            label="Title"
            placeholder="Title"
            labelPlacement="outside"
            variant="bordered"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <Input
            radius="sm"
            type="text"
            labelPlacement="outside"
            label="Tag"
            placeholder="Tags(comma separated)"
            variant="bordered"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full items-center flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Textarea
            maxRows={4}
            radius="sm"
            type="number"
            label="Content"
            placeholder="Content"
            labelPlacement="outside"
            variant="bordered"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex w-full items-center flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Textarea
            maxRows={4}
            radius="sm"
            variant="bordered"
            type="text"
            label="Description"
            placeholder="Description"
            labelPlacement="outside"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4  justify-start items-center p-4 rounded-md h-24 border-1 border-dashed border-[#FF7143]">
          <Button className="md:w-60 w-40  bg-[#FF7143] text-white font-medium rounded-md">
            <label htmlFor="fileInputQRimage">Upload image</label>
            <input
              type="file"
              id="fileInputQRimage"
              style={{ display: "none" }}
              name="image"
              onChange={handleChange}
            />
          </Button>

          {formData.image && (
            <Button
              onPress={onOpen}
              className="ring-1 ring-[#FF7143] bg-white text-[#FF7143]"
            >
              View
            </Button>
          )}
          {formData.image && (
            <Button
              onPress={() => setFormData({ image: null })}
              className="ring-1 ring-[#FF7143] bg-white text-[#FF7143]"
            >
              Remove
            </Button>
          )}
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
              "Add Blogs"
            )}
          </Button>
        </div>
      </div>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
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
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <Image
                  height={100}
                  width={500}
                  src={Viewimage}
                  alt="imageview"
                />
              </ModalBody>
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
};

export default Addblogs;
