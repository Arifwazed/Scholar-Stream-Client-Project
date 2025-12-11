import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const UpdateScholarship = () => {
    const {id} =useParams();
    // console.log('update scholarship id :',id);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {data : scholarship = []} = useQuery({
        queryKey: ['scholarship'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships/${id}`);
            return res.data;
        }
    })

    // console.log('data from scholar:',scholarship)
    const queryClient = useQueryClient();
    const onSubmit = (data) => {
        console.log('From update scholarship:',data);
        data.tuitionFees = parseInt(data.tuitionFees);
        data.applicationFees = parseInt(data.applicationFees);
        data.universityWorldRank = parseInt(data.universityWorldRank);
        data.serviceCharge = parseInt(data.serviceCharge);
        
        axiosSecure.patch(`/scholarships/${id}`,data).then((res) => {
          console.log('after add scholarship:',res.data)
          if(res.data.modifiedCount){
            Swal.fire({
              // position: "top-end",
              icon: "success",
              title: "Scholarship SuccessFully Updated",
              showConfirmButton: false,
              timer: 1500
            });
            queryClient.invalidateQueries(["allScholarship"]);

            setTimeout(() => {
                navigate('/dashboard/manage-scholarships');
            }, 1500);
          } 
        })
        reset();
    };
    return (
        <div>

          <div className="max-w-3xl mx-auto bg-linear-to-r from-blue-50 to-purple-50 shadow-xl rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#4F5CC3]">
              Update Scholarship
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
                  defaultValue={scholarship.scholarshipName}
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
                  defaultValue={scholarship.universityName}
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
                  defaultValue={scholarship.universityImage}
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
                    defaultValue={scholarship.universityCountry}
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
                    defaultValue={scholarship.universityCity}
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
                  defaultValue={scholarship.universityWorldRank}
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
                  defaultValue={scholarship.subjectCategory}
                />
                {errors.subjectCategory && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Scholarship Category */}

              <div>
                <label className="">Scholarship Category</label>
                <select
                  {...register("scholarshipCategory", { required: true })}
                  defaultValue={scholarship.scholarshipCategory}
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
              <div>
                <label className="">Degree</label>
                <select
                  {...register("degree", { required: true })}
                  defaultValue={scholarship.degree}
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
                  defaultValue={scholarship.tuitionFees}
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
                  defaultValue={scholarship.applicationFees}
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
                  defaultValue={scholarship.serviceCharge}
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
                  defaultValue={scholarship.applicationDeadline}
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
                  defaultValue={scholarship.scholarshipPostDate}
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
                  defaultValue={scholarship.postedUserEmail}
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
                  defaultValue={scholarship.scholarshipDescription}
                ></textarea>
                {errors.scholarshipDescription && <p className="text-red-500 text-sm">Required</p>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-full mt-4">
                Update Scholarship
              </button>

            </form>
          </div>
      </div>
    );
};

export default UpdateScholarship;