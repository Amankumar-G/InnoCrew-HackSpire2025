export default function SignupPage() {
    return (
      <main className="min-h-screen bg-[#1E1E2F] font-poppins flex items-center justify-center scroll-smooth pt-[6%]">
        <div className="bg-[#29293D] rounded-2xl shadow-2xl p-10 w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-[#E0E6F8] mb-8">
            Create Your Account
          </h1>
  
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-[#E0E6F8] text-lg mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-2xl bg-[#1E1E2F] text-white p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#6C63FF] shadow-md"
              />
            </div>
  
            {/* Email */}
            <div>
              <label className="block text-[#E0E6F8] text-lg mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl bg-[#1E1E2F] text-white p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#6C63FF] shadow-md"
              />
            </div>
  
            {/* Password */}
            <div>
              <label className="block text-[#E0E6F8] text-lg mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                className="w-full rounded-2xl bg-[#1E1E2F] text-white p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#6C63FF] shadow-md"
              />
            </div>
  
            {/* Age */}
            <div>
              <label className="block text-[#E0E6F8] text-lg mb-2" htmlFor="age">
                Age
              </label>
              <input
                id="age"
                type="number"
                placeholder="Enter your age"
                className="w-full rounded-2xl bg-[#1E1E2F] text-white p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#6C63FF] shadow-md"
              />
            </div>
  
            {/* Checkbox for Deaf/Mute */}
            <div className="flex items-center space-x-3">
              <input
                id="deafMute"
                type="checkbox"
                className="w-5 h-5 rounded-2xl bg-[#1E1E2F] text-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]"
              />
              <label htmlFor="deafMute" className="text-[#B8BAD0] text-base">
                I am a deaf or mute student
              </label>
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#6C63FF] hover:bg-[#817CFF] text-white py-4 rounded-2xl text-lg font-semibold shadow-md transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>
    );
  }