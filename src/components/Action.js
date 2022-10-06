import React from 'react';
import DeleteButton from './DeleteButton';
import ArchiveButton from './ArchiveButton';

function Action({ id, onDelete, onArchive, archived }) {
    return (
        <div className="note-item__action">
            <DeleteButton
                id={id}
                archived={archived}
                onDelete={onDelete}
            ></DeleteButton>
            <ArchiveButton
                id={id}
                archived={archived}
                onArchive={onArchive}
            ></ArchiveButton>
        </div>
    );
}

export default Action;
