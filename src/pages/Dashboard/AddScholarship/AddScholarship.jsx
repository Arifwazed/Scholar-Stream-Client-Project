import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const AddScholarship = () => {
  const {user} = useAuth()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('From add scholarship:',data);
    data.tuitionFees = parseInt(data.tuitionFees);
    data.applicationFees = parseInt(data.applicationFees);
    data.universityWorldRank = parseInt(data.universityWorldRank);
    data.serviceCharge = parseInt(data.serviceCharge);
    
    axiosSecure.post('/scholarships',data).then((res) => {
      console.log('after add scholarship:',res.data)
      if(res.data.insertedId){
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "Scholarship SuccessFully Added",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/dashboard/manage-scholarships')
      } 
    })
    reset();
  };
  return (
      <div className="p-4 space-y-5">
          <h1 className="text-3xl md:text-4xl font-bold text-center "><span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Add Scholarship</span></h1>

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
                  {...register("universityImage", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="Direct image URL"
                />
                {errors.universityImage && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Country + City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="">Country</label>
                  <input
                    type="text"
                    {...register("universityCountry", { required: true })}
                    className="input input-bordered w-full mt-1"
                    placeholder="Country"
                  />
                  {errors.universityCountry && <p className="text-red-500 text-sm">Required</p>}
                </div>

                <div>
                  <label className="">City</label>
                  <input
                    type="text"
                    {...register("universityCity", { required: true })}
                    className="input input-bordered w-full mt-1"
                    placeholder="City"
                  />
                  {errors.universityCity && <p className="text-red-500 text-sm">Required</p>}
                </div>
              </div>

              {/* World Rank */}
              <div>
                <label className="">University World Rank</label>
                <input
                  type="number"
                  {...register("universityWorldRank", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="e.g. 200"
                />
                {errors.universityWorldRank && <p className="text-red-500 text-sm">Required</p>}
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
              {/* <div>
                <label className="">Scholarship Category</label>
                <input
                  type="text"
                  {...register("scholarshipCategory", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="e.g. Fully-Funded, Partial, Tuition Waiver"
                />
                {errors.scholarshipCategory && <p className="text-red-500 text-sm">Required</p>}
              </div> */}

              <div>
                <label className="">Scholarship Category</label>
                <select
                  {...register("scholarshipCategory", { required: true })}
                  defaultValue="Select Category"
                  className="select select-bordered w-full mt-1"
                >
                  <option disabled={true}>Select Category</option>
                  <option value="Full Fund">Full Fund</option>
                  <option value="Partial Fund">Partial Fund</option>
                  <option value="Self Fund">Self Fund</option>
                </select>

                {errors.scholarshipCategory && (<p className="text-red-500 text-sm">Required</p>)}
              </div>

              {/* Degree */}
              {/* <div>
                <label className="">Degree</label>
                <input
                  type="text"
                  {...register("degree", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="e.g. Bachelor, Masters, PhD"
                />
                {errors.degree && <p className="text-red-500 text-sm">Required</p>}
              </div> */}
              <div>
                <label className="">Degree</label>
                <select
                  {...register("degree", { required: true })}
                  defaultValue="Select Degree"
                  className="select select-bordered w-full mt-1"
                >
                  <option disabled={true}>Select Degree</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                  <option value="Diploma">Diploma</option>
                </select>

                {errors.degree && (<p className="text-red-500 text-sm">Required</p>)}
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
                  {...register("applicationDeadline", { required: true })}
                  className="input input-bordered w-full mt-1"
                />
                {errors.applicationDeadline && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Post Date */}
              <div>
                <label className="">Post Date</label>
                <input
                  type="date"
                  {...register("scholarshipPostDate", { required: true })}
                  className="input input-bordered w-full mt-1"
                />
                {errors.scholarshipPostDate && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* User Email */}
              <div>
                <label className="">User Email</label>
                <input
                  type="email"
                  {...register("postedUserEmail", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter your email"
                  defaultValue={user?.email}
                />
                {errors.postedUserEmail && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* scholarshipDescription */}
              <div>
                <label className="">Scholarship Description</label>
                <textarea
                  {...register("scholarshipDescription", { required: true })}
                  className="textarea w-full mt-1"
                  placeholder="Scholarship Description"
                ></textarea>
                {errors.scholarshipDescription && <p className="text-red-500 text-sm">Required</p>}
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