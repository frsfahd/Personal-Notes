import React from 'react';

function DeleteButton({ id, onDelete, archived }) {
    return (
        <button
            className="note-item__delete-button"
            onClick={() => onDelete(id, archived)}
        >
            Delete
        </button>
    );
}

export default DeleteButton;
