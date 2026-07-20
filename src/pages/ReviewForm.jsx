import { useState } from "react";
import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { FaStar } from "react-icons/fa";

const ReviewForm = () => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        review: "",
        rating: 5,
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.name === "rating"
                    ? Number(e.target.value)
                    : e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await addDoc(collection(db, "testimonials"), {
                ...formData,
                image: "",
                active: false,
                status: "pending",
                createdAt: serverTimestamp(),
            });

            setSuccess(true);

            setFormData({
                name: "",
                designation: "",
                review: "",
                rating: 5,
            });

            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        } catch (error) {
            console.error(error);
            alert("Failed to submit review");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-3xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-12">
                    <p className="uppercase tracking-[4px] text-teal-600 font-semibold">
                        Patient Feedback
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">
                        Share Your Recovery Journey
                    </h2>

                    <p className="text-slate-600 mt-5 max-w-2xl mx-auto leading-8">
                        Your feedback helps us improve our services and inspires others
                        seeking physiotherapy care.
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-2xl">
                        Thank you for sharing your experience. Your review has been
                        submitted successfully and will be published after admin approval.
                    </div>
                )}

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-slate-100 shadow-xl rounded-3xl p-8 md:p-10"
                >
                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Full Name *
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        {/* Occupation */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Occupation (Optional)
                            </label>

                            <input
                                type="text"
                                name="designation"
                                placeholder="Student, Engineer, Teacher, etc."
                                value={formData.designation}
                                onChange={handleChange}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-3">
                                Rating *
                            </label>

                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                rating: star,
                                            })
                                        }
                                    >
                                        <FaStar
                                            size={28}
                                            className={
                                                star <= formData.rating
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                            }
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Review */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Your Feedback *
                            </label>

                            <textarea
                                name="review"
                                rows="6"
                                required
                                placeholder="Tell us about your experience with HealStride..."
                                value={formData.review}
                                onChange={handleChange}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                            />
                        </div>

                        {/* Note */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-sm text-slate-600">
                                Reviews are verified by our team and published after admin
                                approval.
                            </p>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Submitting..." : "Submit Review"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ReviewForm;