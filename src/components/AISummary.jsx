import React, { useState } from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import axiosInstance from '../services/axiosConfig';

const AISummary = ({ noteId }) => {
  const [aiSummary, setAiSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAISummarize = async () => {
     
    
    if (!noteId) {
      setError('Note ID is missing. Cannot generate summary.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      
      const response = await axiosInstance.post(`/notes/summarize/ai/${noteId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Extract the data from the response object
      const summaryText = response.data?.data || response.data;
      setAiSummary(summaryText);
      
    } catch (err) {
      console.error('❌ Error getting AI summary:', err);
      setError(err.response?.data?.message || 'Failed to generate summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <button
        onClick={handleAISummarize}
        disabled={isLoading}
        className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Summarizing...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Summarize with AI
          </>
        )}
      </button>

      {aiSummary && (
        <div className="mt-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-900 mb-3 flex items-center gap-2">
            <Sparkles size={20} className="text-indigo-600" />
            AI Summary
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {aiSummary}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default AISummary;