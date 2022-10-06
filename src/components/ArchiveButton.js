import React from 'react';

function ArchiveButton({ id, onArchive, archived }) {
    if (archived === true) {
        return (
            <button
                className="note-item__archive-button"
                onClick={() => onArchive(id, archived)}
            >
                UnArchive
            </button>
        );
    } else if (archived === false) {
        return (
            <button
                className="note-item__archive-button"
                onClick={() => onArchive(id, archived)}
            >
                Archive
            </button>
        );
    }
}

export default ArchiveButton;
