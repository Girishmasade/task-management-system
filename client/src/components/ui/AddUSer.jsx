import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../../redux/slice/app/userApiSlice";
import { setCredentials } from "../../redux/slice/authSlice";
import { useRegisterUserMutation } from "../../redux/slice/app/userApiSlice";

const AddUser = ({ open, setOpen, userData }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  let defaultValues = userData ?? {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [addNewUser, { isLoading }] = useRegisterUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        const result = await updateUser({ ...data }).unwrap();
        toast.success("Profile updated successfully");

        // If the logged-in user updated their own profile, update the store
        if (userData?._id === user?._id) {
          dispatch(setCredentials({ ...result }));
        }
      } else {
        await addNewUser({
          ...data,
          password: data.email,
        }).unwrap();
        toast.success("New user added successfully");
      }

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title
          as='h2'
          className='text-base font-bold leading-6 text-gray-900 mb-4'
        >
          {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
        </Dialog.Title>

        <div className='mt-2 flex flex-col gap-6'>
          <Textbox
            placeholder='Full name'
            type='text'
            name='name'
            label='Full Name'
            className='w-full rounded'
            register={register("name", {
              required: "Full name is required!",
            })}
            error={errors.name ? errors.name.message : ""}
          />
          <Textbox
            placeholder='Title'
            type='text'
            name='title'
            label='Title'
            className='w-full rounded'
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title ? errors.title.message : ""}
          />
          <Textbox
            placeholder='Email Address'
            type='email'
            name='email'
            label='Email Address'
            className='w-full rounded'
            register={register("email", {
              required: "Email Address is required!",
            })}
            error={errors.email ? errors.email.message : ""}
          />
          <Textbox
            placeholder='Role'
            type='text'
            name='role'
            label='Role'
            className='w-full rounded'
            register={register("role", {
              required: "User role is required!",
            })}
            error={errors.role ? errors.role.message : ""}
          />
        </div>

        {isLoading || isUpdating ? (
          <div className='py-5'>
            <Loading />
          </div>
        ) : (
          <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
            <Button
              type='submit'
              className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
              label='Submit'
            />
            <Button
              type='button'
              className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddUser;
