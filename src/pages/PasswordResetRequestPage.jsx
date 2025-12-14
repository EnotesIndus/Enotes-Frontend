const PasswordResetRequestPage = ({
  email,
  setEmail,
  loading,
  message,
  onSubmit,
  onBack,
}) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-3 rounded mb-4"
        placeholder="Email"
      />

      <button
        onClick={onSubmit}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded"
      >
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>

      <button onClick={onBack} className="mt-4 text-indigo-600">
        Back to Home
      </button>
    </div>
  </div>
);

export default PasswordResetRequestPage;
