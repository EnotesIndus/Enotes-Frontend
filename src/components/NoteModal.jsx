import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Download, Star, X, FileText, Image as ImageIcon, File } from 'lucide-react';
import { saveNote as createNote, downloadFile } from '../redux/notes/noteThunks';
import AISummary from './AiSummary';

const NoteModal = ({ note, onClose, onToggleFavorite, onRefresh }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.notes);

  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  /* ============================
     File Utils
  ============================ */

  const getFileExtension = (fileName = '') => {
    return fileName.split('.').pop().toLowerCase();
  };

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const pdfExtensions = ['pdf'];
  const textExtensions = ['txt', 'md', 'csv', 'log', 'json'];

  /* ============================
     Handlers
  ============================ */

  const saveNoteChanges = async () => {
    const noteData = {
      id: editedNote.id,
      title: editedNote.title,
      description: editedNote.description,
      category: editedNote.category || { id: 8 },
      createdOn: editedNote.createdAt,
    };

    await dispatch(createNote({ noteData, file: null }));
    setIsEditing(false);
    onRefresh();
  };

  const downloadNoteFile = () => {
    if (!editedNote.fileDetails?.id) return;

    dispatch(
      downloadFile({
        fileId: editedNote.fileDetails.id,
        fileName: editedNote.fileDetails.displayFileName,
      })
    );
  };

  /* ============================
     Render File Preview
  ============================ */

  const renderFilePreview = () => {
    if (!editedNote.fileDetails?.fileUrl) return null;

    const ext = getFileExtension(editedNote.fileDetails.displayFileName);

    // 🖼 Image Preview
    if (imageExtensions.includes(ext)) {
      return (
        <div className="mt-4 border-t pt-4">
          <img
            src={editedNote.fileDetails.fileUrl}
            alt={editedNote.fileDetails.displayFileName}
            className="max-w-full max-h-96 rounded-lg shadow-md mx-auto"
          />
        </div>
      );
    }

    // 📄 PDF Preview
    if (pdfExtensions.includes(ext)) {
      return (
        <div className="mt-4 border-t pt-4">
          <iframe
            src={editedNote.fileDetails.fileUrl}
            className="w-full h-96 rounded-lg border"
            title="PDF Preview"
          />
        </div>
      );
    }

    // 📝 Text Preview
    if (textExtensions.includes(ext)) {
      return (
        <div className="mt-4 border-t pt-4">
          <iframe
            src={editedNote.fileDetails.fileUrl}
            className="w-full h-64 rounded-lg border bg-white"
            title="Text Preview"
          />
        </div>
      );
    }

    // 📦 Fallback
    return (
      <div className="mt-4 border-t pt-4 text-center text-gray-500">
        <p>No preview available for <strong>.{ext}</strong> files.</p>
        <p>Please download the file to view it.</p>
      </div>
    );
  };

  /* ============================
     Render
  ============================ */

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full h-full max-h-screen flex flex-col">

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-4 flex-1">
            {onToggleFavorite && (
              <>
                <button
                  onClick={() => onToggleFavorite(editedNote)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  <Star
                    size={20}
                    className={
                      editedNote.isFavorite
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-700'
                    }
                  />
                  <span className="text-sm font-medium">
                    {editedNote.isFavorite ? 'Unfavorite' : 'Favorite'}
                  </span>
                </button>

                {isEditing ? (
                  <button
                    onClick={saveNoteChanges}
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    Edit
                  </button>
                )}
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Title */}
            {isEditing ? (
              <input
                type="text"
                value={editedNote.title}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, title: e.target.value })
                }
                className="w-full text-4xl font-bold border-b-2 focus:outline-none"
              />
            ) : (
              <h1 className="text-4xl font-bold">{editedNote.title}</h1>
            )}

            {/* Description */}
            {isEditing ? (
              <textarea
                value={editedNote.description}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, description: e.target.value })
                }
                className="w-full min-h-[65vh] text-lg p-6 border rounded-lg"
              />
            ) : (
              <p className="text-lg whitespace-pre-wrap">
                {editedNote.description}
              </p>
            )}

            {/* File Section */}
            {editedNote.fileDetails && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText size={22} />
                  Attached File
                </h3>

                <div className="bg-gray-50 border rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {(() => {
                        const ext = getFileExtension(
                          editedNote.fileDetails.displayFileName
                        );

                        if (imageExtensions.includes(ext)) {
                          return <ImageIcon size={40} className="text-blue-600" />;
                        }
                        if (pdfExtensions.includes(ext)) {
                          return <FileText size={40} className="text-red-600" />;
                        }
                        return <File size={40} className="text-gray-600" />;
                      })()}

                      <div>
                        <p className="font-medium text-lg">
                          {editedNote.fileDetails.displayFileName}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={downloadNoteFile}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700  rounded-lg flex items-center gap-2"
                    >
                      <Download size={18} />
       
                    </button>
                  </div>

                  {renderFilePreview()}
                </div>
              </div>
            )}

            {/* AI Summary */}
            <AISummary noteId={editedNote.id} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
