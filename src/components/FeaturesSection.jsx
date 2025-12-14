import { FileText, Users, Zap } from 'lucide-react';

const FeaturesSection = () => (
  <div
    id="features"
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
  >
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
      Why Choose E-Notes?
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
        <div className="bg-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
          <FileText className="w-7 h-7 text-indigo-600" />
        </div>
        <h3 className="text-xl font-bold mb-3">Easy Note Taking</h3>
        <p className="text-gray-600">
          Create and edit notes with our intuitive interface. Format text,
          add images, and organize your thoughts seamlessly.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
        <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
          <Users className="w-7 h-7 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold mb-3">Collaborate</h3>
        <p className="text-gray-600">
          Share notes with team members, collaborate in real-time, and keep
          everyone on the same page.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
        <div className="bg-pink-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
          <Zap className="w-7 h-7 text-pink-600" />
        </div>
        <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
        <p className="text-gray-600">
          Access your notes instantly from any device. Our cloud-based
          platform ensures your notes are always available.
        </p>
      </div>
    </div>
  </div>
);

export default FeaturesSection;
