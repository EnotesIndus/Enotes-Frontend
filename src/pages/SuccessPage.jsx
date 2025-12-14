import { CheckCircle } from 'lucide-react';

const SuccessPage = ({ title, message, buttonText, buttonAction }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded shadow text-center">
      <CheckCircle className="mx-auto text-green-600 mb-4" />
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600 my-4">{message}</p>
      <button
        onClick={buttonAction}
        className="bg-indigo-600 text-white px-6 py-3 rounded"
      >
        {buttonText}
      </button>
    </div>
  </div>
);

export default SuccessPage;
