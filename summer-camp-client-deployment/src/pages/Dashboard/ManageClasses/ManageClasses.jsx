import { useState } from "react";

import SectionTitle from "../../../hooks/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useClasses from "../../../hooks/useClasses";

const ManageClasses = () => {
  const [classes, , refetch] = useClasses();
  const [axiosSecure] = useAxiosSecure();
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const handleApprove = (id) => {
    // Update the status of the class to 'approved' using API call
    axiosSecure.put(`/classes/${id}`, { status: "approved" }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  const handleDeny = (id) => {
    // Update the status of the class to 'denied' using API call
    axiosSecure.put(`/classes/${id}`, { status: "denied" }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  const handleSendFeedback = (selectedClass) => {
    setSelectedClass(null);
    setFeedbackText("");
    setFeedbackModalOpen(false);
    // Update the status of the class to 'denied' using API call
    axiosSecure
      .put(`/classes/${selectedClass}`, { feedback: feedbackText })
      .then((res) => {
        //handleFeedbackModalClose();

        if (res.data.modifiedCount > 0) {
          refetch();
          // Perform any necessary actions after sending feedback
          // Close the modal, reset states, etc.
        }
      });
  };

  const handleFeedbackModalOpen = (id) => {
    setSelectedClass(id);
    setFeedbackModalOpen(true);
  };

  const handleFeedbackModalClose = () => {
    setSelectedClass(null);
    setFeedbackText("");
    setFeedbackModalOpen(false);
  };

  return (
    <div className="w-full">
      <SectionTitle heading="Manage Classes" subHeading="Welcome" />
      <div className="overflow-x-auto w-full">
        {classes.map((item) => (
          <div key={item._id} className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-40 h-40 rounded-full"
              />
              <div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p>{item.instructorName}</p>
                <p>{item.instructorEmail}</p>
                <p>Available seats: {item.availableSeats}</p>
                <p>Price: {item.price}</p>
                <p>Status: {item.status}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="text-blue-800"
                onClick={() => handleApprove(item._id)}
                disabled={item.status !== "pending"}
              >
                Approve
              </button>
              <button
                className="text-red-700"
                onClick={() => handleDeny(item._id)}
                disabled={item.status !== "pending"}
              >
                Deny
              </button>
              <button
                className="text-white-700"
                onClick={() => handleFeedbackModalOpen(item._id)}
                disabled={item.status !== "denied"}
              >
                Send Feedback
              </button>
            </div>
          </div>
        ))}
      </div>

      {feedbackModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4">
            <h3 className="text-lg font-medium">Send Feedback</h3>
            <textarea
              className="textarea textarea-bordered mt-2"
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Enter your feedback"
            />
            <div className="flex justify-end mt-2">
              <button
                className="btn btn-primary mr-2"
                //  onClick={handleSendFeedback}
                onClick={() => handleSendFeedback(selectedClass)}
              >
                Send
              </button>
              <button className="btn" onClick={handleFeedbackModalClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
