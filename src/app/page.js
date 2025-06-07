
"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";

const features = [
  { label: "Learning", img: "/learn.jpg", description: "Interactive resources to boost skills." },
  { label: "Skill Test", img: "/skill.webp", description: "Real-world challenges to test abilities." },
  { label: "Exam Mode", img: "/exam.jpg", description: "Simulated exam practice environment." },
];

const testimonials = [
  { name: "Amit S.", text: "MPCPCT helped me ace my IT Operator exam!", role: "Student" },
  { name: "Priya K.", text: "Top-notch, easy-to-follow learning resources.", role: "Intern" },
  { name: "Rohan M.", text: "Skill tests prepared me for real challenges.", role: "Typist" },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "500+", label: "Courses" },
  { value: "95%", label: "Success Rate" },
];

const LandingPage = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const validateMobile = (value) => {
    if (!value) return "Mobile number is required";
    if (!/^\d{10,15}$/.test(value)) return "Enter a valid 10-15 digit mobile number";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const handleMobileChange = (e) => {
    const val = e.target.value;
    setMobile(val);
    setError(validateMobile(val));
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (error && !validateMobile(mobile)) {
      setError(validatePassword(val));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mobileError = validateMobile(mobile);
    const passwordError = validatePassword(password);
    if (mobileError || passwordError) {
      setError(mobileError || passwordError);
      return;
    }
    console.log("Login submitted:", { mobile, password });
    alert("Login successful! Redirecting...");
    setMobile("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10 animate-pulse-slow" />

      {isLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/mpc.png"
                alt="MPCPCT Logo"
                className="w-10 h-10 animate-pulse"
              />
            </div>
          </div>
        </div>
      )}

      <section className="text-center mb-8 animate-text-slide-in">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Empower Your Future with MPCPCT
        </h1>
        <p className="mt-2 text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
          Master skills for government roles with interactive learning and practice.
        </p>
        <a
          href="/signup"
          className="mt-4 inline-block bg-indigo-600 text-white rounded-lg py-2 px-6 text-sm font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-indigo-200"
          aria-label="Get Started"
        >
          Get Started
        </a>
      </section>

      <main className="flex-grow flex flex-col md:flex-row items-start justify-between max-w-6xl mx-auto gap-6">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ label, img, description }, index) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-md p-4 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img
                  src={img}
                  alt={`${label} icon`}
                  className="w-32 h-32 mb-3 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
                <p className="text-xs text-gray-600 mt-1">{description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.map(({ value, label }, index) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-3 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2 + 0.6}s` }}
              >
                <h4 className="text-xl font-bold text-indigo-600">{value}</h4>
                <p className="text-xs text-gray-600">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-80 bg-white/10 backdrop-blur-xl rounded-xl shadow-xl p-6 border border-white/20 animate-fade-in-up">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-4">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 text-sm mb-4">
            Login to your MPCPCT account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="relative">
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={handleMobileChange}
                className={`peer w-full bg-transparent border-2 ${error && validateMobile(mobile) ? "border-red-500" : "border-gray-200"} rounded-lg py-2 px-3 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300`}
                placeholder="Mobile Number"
                required
                pattern="\d{10,15}"
                aria-describedby="form-error"
              />
              <label
                htmlFor="mobile"
                className="absolute left-3 -top-2 bg-transparent px-1 text-xs text-gray-600 transition-all duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-600"
              >
                Mobile Number
              </label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className={`peer w-full bg-transparent border-2 ${error && validatePassword(password) ? "border-red-500" : "border-gray-200"} rounded-lg py-2 px-3 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300 pr-10`}
                placeholder="Password"
                required
                aria-describedby="form-error"
              />
              <label
                htmlFor="password"
                className="absolute left-3 -top-2 bg-transparent px-1 text-xs text-gray-600 transition-all duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-600"
              >
                Password (8+ characters)
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center animate-fade-in" id="form-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!!error || !mobile || !password}
              className="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm font-semibold hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] focus:ring-4 focus:ring-indigo-200"
              aria-label="Login"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center space-y-1">
            <p className="text-gray-600 text-xs">
              New to MPCPCT?{" "}
              <a
                href="/signup"
                className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-all duration-300"
              >
                Register Now
              </a>
            </p>
            <p className="text-gray-600 text-xs">
              Forgot your password?{" "}
              <a
                href="/forget"
                className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-all duration-300"
              >
                Reset Password
              </a>
            </p>
          </div>
        </div>
      </main>

      <section className="py-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-4 animate-fade-in">
          What Our Users Say
        </h2>
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 animate-fade-in-up">
          <div className="text-center">
            <p className="text-gray-600 text-sm italic">"{testimonials[currentTestimonial].text}"</p>
            <p className="mt-2 font-semibold text-gray-900 text-sm">{testimonials[currentTestimonial].name}</p>
            <p className="text-xs text-gray-500">{testimonials[currentTestimonial].role}</p>
          </div>
          <button
            onClick={prevTestimonial}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-indigo-600 transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-indigo-600 transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
          <div className="flex justify-center mt-3 gap-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentTestimonial ? "bg-indigo-600" : "bg-gray-300"} transition-all duration-300`}
              />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes textSlideIn {
          0% {
            opacity: 0;
            transform: translateY(-15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseSlow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        .animate-text-slide-in {
          animation: textSlideIn 0.8s ease forwards;
        }
        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }
      `}
      </style>
    </div>
  );
};

export default LandingPage;
