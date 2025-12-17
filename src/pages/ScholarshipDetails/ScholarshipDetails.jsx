import { MapPinIcon, StarIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";

const ScholarshipDetails = () => {
  const { id: scholarshipId } = useParams();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  // const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Fade animation class
  const fadeIn = "opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]";

  const {data : scholarship = []} = useQuery({
    queryKey: ['scholarship',scholarshipId],
    queryFn: async () => {
        const res = await axiosSecure.get(`/scholarships/${scholarshipId}`);
        return res.data;
    }
  })
  console.log("From Scholarship Details:",scholarshipId)
  console.log('user:',user)

  // useEffect(() => {
  //   fetch("/data/scholarships.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const selected = data.find((item) => item.id === parseInt(id));
  //       setScholarship(selected);
  //     });

  //   fetch(`/api/reviews?scholarshipId=${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setReviews(data));
  // }, [id]);

  const handlePayment = async (trackingId,applicationId) => {
    const paymentInfo = {
        scholarshipName : scholarship.scholarshipName,
        universityName : scholarship.universityName,
        cost : scholarship.applicationFees,
        userEmail: user.email,
        scholarshipId: scholarship._id,
        applicationId: applicationId,
        trackingId: trackingId
    }
    // const res = await axiosSecure.post('/create-checkout-session',paymentInfo);
    console.log('Payment Info:',paymentInfo)
    const res = await axiosSecure.post('/create-checkout-session',paymentInfo)
    // console.log('After Payment Info:',res.data.url)
    window.location.href = res.data.url;
  }

  const handleApplyScholarship = async() => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to pay the application fee $${scholarship.applicationFees}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, pay it!"
      }).then((result) => {
      if (result.isConfirmed) {
        const applicationInfo = {
          scholarshipId: scholarshipId,
          scholarshipName: scholarship.scholarshipName,
          subjectCategory: scholarship.subjectCategory,
          universityCity: scholarship.universityCity,
          universityCountry: scholarship.universityCountry,
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          universityName: scholarship.universityName,
          scholarshipCategory: scholarship.scholarshipCategory,
          degree: scholarship.degree,
          applicationFees: scholarship.applicationFees,
          serviceCharge: scholarship.serviceCharge
        }
        axiosSecure.post('/applications',applicationInfo).then(res => {
          if(res.data.insertedId){
            const trackingId = res.data.trackingId;
            const applicationId= res.data.insertedId;
            handlePayment(trackingId,applicationId)
          }
        })
      }
    });
  }

  if (!scholarship){
    return <Loading></Loading>;
  }

  return (
    <div className="bg-[#e7f4ff] py-10">
      <div className="max-w-7xl mx-auto p-6 bg-white/60 backdrop-blur rounded-3xl shadow-lg">

        {/* ---------------- IMAGE SECTION ---------------- */}
        <div className="w-full h-72 rounded-3xl shadow-md bg-white mb-8 overflow-hidden">
            <img
                src={scholarship.universityImage}
                alt={scholarship.universityName}
                className="w-full h-full object-contain transition-transform duration-700 ease-in-out hover:scale-105"
            />
        </div>

        {/* ---------------- MAIN INFO ---------------- */}
        <div className="mt-6 space-y-4">

          {/* Title */}
          <h1 className="text-4xl font-bold">{scholarship.scholarshipName}</h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            {scholarship.universityName}
          </h2>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-sm">
              {scholarship.scholarshipCategory}
            </span>

            <span className="px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium shadow-sm">
              {scholarship.degree} Program
            </span>

            <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium shadow-sm">
              {scholarship.subjectCategory}
            </span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            <div className="p-4 rounded-2xl bg-white shadow hover:shadow-lg transition">
              <p className="text-lg">
                <span className="font-semibold">World Rank:</span>{" "}
                {scholarship.universityWorldRank}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white shadow hover:shadow-lg transition">
              <p className="text-lg">
                <span className="font-semibold">Deadline:</span>{" "}
                {scholarship.applicationDeadline}
              </p>
            </div>

            <div className="flex items-center p-4 rounded-2xl bg-white shadow hover:shadow-lg transition">
              <MapPinIcon className="w-6 h-6 text-primary mr-2" />
              <p className="text-lg">
                {scholarship.universityCity}, {scholarship.universityCountry}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white shadow hover:shadow-lg transition">
              <p className="text-lg">
                <span className="font-semibold">Application Fees:</span>{" "}
                {scholarship.applicationFees
                  ? `$${scholarship.applicationFees}`
                  : "No Fees"}
              </p>
            </div>
          </div>

          {/* ---------------- DESCRIPTION ---------------- */}
          <div className="mt-8 p-6 bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl shadow">
            <h3 className="text-2xl font-semibold mb-2">
              Scholarship Description
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {scholarship.scholarshipDescription}
            </p>
          </div>

          {/* ---------------- COVERAGE ---------------- */}
          {scholarship.coverage && (
            <div className="mt-6 p-6 bg-white rounded-2xl shadow border">
              <h3 className="text-2xl font-semibold mb-2">
                Stipend / Coverage
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {scholarship.coverage}
              </p>
            </div>
          )}

          {/* ---------------- APPLY BUTTON ---------------- */}
          <div className="mt-8">
            {/* <Link to={`/dashboard/payment/${scholarship._id}`}> */}
              <button onClick={handleApplyScholarship} className="px-8 py-3 bg-primary text-white hover:text-primary border-2 border-primary rounded-full font-semibold hover:bg-white transition text-lg shadow-lg hover:shadow-xl">
                Apply for Scholarship
              </button>
            {/* </Link> */}
          </div>
        </div>

        {/* ---------------- REVIEWS ---------------- */}
        <div className="mt-14">
          <h3 className="text-3xl font-bold mb-4">Reviews</h3>

          {reviews.length === 0 && (
            <p className="text-gray-600">No reviews available.</p>
          )}

          <div className="space-y-5">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-5 rounded-2xl bg-white shadow-md border hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>

                <div className="flex items-center mt-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
                  ))}
                </div>

                <p className="mt-3 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ScholarshipDetails;
