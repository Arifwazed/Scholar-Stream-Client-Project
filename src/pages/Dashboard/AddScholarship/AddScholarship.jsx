import React from 'react';
import { useForm } from 'react-hook-form';

const AddScholarship = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Scholarship Created!");
    reset();
  };
    return (
        <div>
            <h1 className="text-4xl">Add Scholarship</h1>

            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#4F5CC3]">
        Create New Scholarship
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Scholarship Name */}
        <div>
          <label className="font-medium">Scholarship Name</label>
          <input
            type="text"
            {...register("scholarshipName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter scholarship name"
          />
          {errors.scholarshipName && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* University Name */}
        <div>
          <label className="font-medium">University Name</label>
          <input
            type="text"
            {...register("universityName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter university name"
          />
          {errors.universityName && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Image */}
        <div>
          <label className="font-medium">University Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="input input-bordered w-full"
            placeholder="Direct image URL"
          />
          {errors.image && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Country + City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Country</label>
            <input
              type="text"
              {...register("country", { required: true })}
              className="input input-bordered w-full"
              placeholder="Country"
            />
            {errors.country && <p className="text-red-500 text-sm">Required</p>}
          </div>

          <div>
            <label className="font-medium">City</label>
            <input
              type="text"
              {...register("city", { required: true })}
              className="input input-bordered w-full"
              placeholder="City"
            />
            {errors.city && <p className="text-red-500 text-sm">Required</p>}
          </div>
        </div>

        {/* World Rank */}
        <div>
          <label className="font-medium">University World Rank</label>
          <input
            type="number"
            {...register("worldRank", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. 200"
          />
          {errors.worldRank && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Subject Category */}
        <div>
          <label className="font-medium">Subject Category</label>
          <input
            type="text"
            {...register("subjectCategory", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. Engineering, Medical, Business"
          />
          {errors.subjectCategory && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Scholarship Category */}
        <div>
          <label className="font-medium">Scholarship Category</label>
          <input
            type="text"
            {...register("scholarshipCategory", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. Fully-Funded, Partial, Tuition Waiver"
          />
          {errors.scholarshipCategory && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Degree */}
        <div>
          <label className="font-medium">Degree</label>
          <input
            type="text"
            {...register("degree", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. Bachelor, Masters, PhD"
          />
          {errors.degree && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Tuition Fees (optional) */}
        <div>
          <label className="font-medium">Tuition Fees (optional)</label>
          <input
            type="number"
            {...register("tuitionFees")}
            className="input input-bordered w-full"
            placeholder="0 or leave empty"
          />
        </div>

        {/* Application Fees */}
        <div>
          <label className="font-medium">Application Fees</label>
          <input
            type="number"
            {...register("applicationFees", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter amount"
          />
          {errors.applicationFees && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Service Charge */}
        <div>
          <label className="font-medium">Service Charge</label>
          <input
            type="number"
            {...register("serviceCharge", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter amount"
          />
          {errors.serviceCharge && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Deadline */}
        <div>
          <label className="font-medium">Deadline</label>
          <input
            type="date"
            {...register("deadline", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.deadline && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Post Date */}
        <div>
          <label className="font-medium">Post Date</label>
          <input
            type="date"
            {...register("postDate", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.postDate && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* User Email */}
        <div>
          <label className="font-medium">User Email</label>
          <input
            type="email"
            {...register("userEmail", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter your email"
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