import React from 'react';
import { Star, Copy, Download, Trash2, RotateCcw, X } from 'lucide-react';

const NoteCard = ({ note,
  onToggleFavorite,
  onDelete,
  onCopy,
  onDownloadFile,
  onRestore,
  onPermanentDelete,
  onClick,
  viewType = 'all'
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {note.title || 'Untitled'}
        </h3>
        {viewType !== 'recycle' && onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(note);
            }}
            className="ml-2"
          >
            <Star
              size={20}
              className={note.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
            />
          </button>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {note.description || 'No description'}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <span>
          {note.createdOn
            ? new Date(note.createdOn).toLocaleString("en-IN", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
              })
            : "No date"}
        </span>
        {note.hasFile && (
          <span className="flex items-center gap-1 text-indigo-600">
            <Download size={14} />
            Attachment
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {viewType === 'recycle' ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRestore(note.id);
              }}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
            >
              <RotateCcw size={16} />
              Restore
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPermanentDelete(note.id);
              }}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
            >
              <X size={16} />
              Delete
            </button>
          </>
        ) : (
          <>
            {onCopy && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(note.id);
                }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
              >
                <Copy size={16} />
                Copy
              </button>
            )}
            {note.hasFile && onDownloadFile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDownloadFile(note.id);
                }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors text-sm"
              >
                <Download size={16} />
                File
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
              >
                <Trash2 size={16} />
                Delete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NoteCard;