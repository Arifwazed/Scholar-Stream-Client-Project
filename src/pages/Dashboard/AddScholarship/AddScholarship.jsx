import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const AddScholarship = () => {
  const {user} = useAuth()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('From add scholarship:',data);
    Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "SuccessFully Login",
        showConfirmButton: false,
        timer: 1500
    });
    reset();
  };
  return (
      <div>
          <h1 className="text-4xl">Add Scholarship</h1>

          <div className="max-w-3xl mx-auto bg-linear-to-r from-blue-50 to-purple-50 shadow-xl rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#4F5CC3]">
              Create New Scholarship
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

              {/* Scholarship Name */}
              <div>
                <label className="font-normal">Scholarship Name</label>
                <input
                  type="text"
                  {...register("scholarshipName", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter scholarship name"
                />
                {errors.scholarshipName && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* University Name */}
              <div>
                <label className="">University Name</label>
                <input
                  type="text"
                  {...register("universityName", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter university name"
                />
                {errors.universityName && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Image */}
              <div>
                <label className="">University Image URL</label>
                <input
                  type="text"
                  {...register("image", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="Direct image URL"
                />
                {errors.image && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Country + City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="">Country</label>
                  <input
                    type="text"
                    {...register("country", { required: true })}
                    className="input input-bordered w-full mt-1"
                    placeholder="Country"
                  />
                  {errors.country && <p className="text-red-500 text-sm">Required</p>}
                </div>

                <div>
                  <label className="">City</label>
                  <input
                    type="text"
                    {...register("city", { required: true })}
                    className="input input-bordered w-full mt-1"
                    placeholder="City"
                  />
                  {errors.city && <p className="text-red-500 text-sm">Required</p>}
                </div>
              </div>

              {/* World Rank */}
              <div>
                <label className="">University World Rank</label>
                <input
                  type="number"
                  {...register("worldRank", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="e.g. 200"
                />
                {errors.worldRank && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Subject Category */}
              <div>
                <label className="">Subject Category</label>
                <input
                  type="text"
                  {...register("subjectCategory", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="e.g. Engineering, Medical, Business"
                />
                {errors.subjectCategory && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Scholarship Category */}
              <div>
                <label className="">Scholarship Category</label>
                <input
                  type="text"
                  {...register("scholarshipCategory", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="e.g. Fully-Funded, Partial, Tuition Waiver"
                />
                {errors.scholarshipCategory && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Degree */}
              <div>
                <label className="">Degree</label>
                <input
                  type="text"
                  {...register("degree", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="e.g. Bachelor, Masters, PhD"
                />
                {errors.degree && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Tuition Fees (optional) */}
              <div>
                <label className="">Tuition Fees (optional)</label>
                <input
                  type="number"
                  {...register("tuitionFees")}
                  className="input input-bordered w-full mt-1"
                  placeholder="0 or leave empty"
                />
              </div>

              {/* Application Fees */}
              <div>
                <label className="">Application Fees</label>
                <input
                  type="number"
                  {...register("applicationFees", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter amount"
                />
                {errors.applicationFees && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Service Charge */}
              <div>
                <label className="">Service Charge</label>
                <input
                  type="number"
                  {...register("serviceCharge", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter amount"
                />
                {errors.serviceCharge && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Deadline */}
              <div>
                <label className="">Deadline</label>
                <input
                  type="date"
                  {...register("deadline", { required: true })}
                  className="input input-bordered w-full mt-1"
                />
                {errors.deadline && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Post Date */}
              <div>
                <label className="">Post Date</label>
                <input
                  type="date"
                  {...register("postDate", { required: true })}
                  className="input input-bordered w-full mt-1"
                />
                {errors.postDate && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* User Email */}
              <div>
                <label className="">User Email</label>
                <input
                  type="email"
                  {...register("userEmail", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter your email"
                  defaultValue={user?.email}
                />
                {errors.userEmail && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-full mt-4">
                Create Scholarship
              </button>

            </form>
          </div>
      </div>
  );
};

export default AddScholarship;